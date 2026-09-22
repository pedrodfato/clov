"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Divide os títulos/parágrafos em palavras e revela uma a uma. */
  split?: boolean;
  /** Seletor dentro do wrapper; sem ele, anima os filhos diretos. */
  targets?: string;
  stagger?: number;
  /** Segundos de espera depois que o gatilho dispara (a intro do site dura 3s). */
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  className,
  split,
  targets,
  stagger = 0.08,
  delay = 0,
  y = 18,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;
    let st: SplitText | undefined;
    let cancelled = false;

    // O StrictMode monta, desmonta e monta de novo em dev. Reverter dentro da
    // promise deixava o revert do 1º mount apagar o split do 2º, e a seção
    // ficava invisível. A flag descarta o efeito antigo antes dele criar nada.
    // As fontes mudam a quebra de linha: dividir antes delas carregarem
    // deixa as palavras nas posições erradas.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        let items: Element[];
        if (split) {
          st = new SplitText(el.querySelectorAll("h1, h2, h3, p"), { type: "words" });
          items = st.words;
        } else {
          items = Array.from(targets ? el.querySelectorAll(targets) : el.children);
        }

        gsap.from(items, {
          opacity: 0,
          y,
          duration: 0.6,
          stagger,
          delay,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      st?.revert();
    };
  }, [split, targets, stagger, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
