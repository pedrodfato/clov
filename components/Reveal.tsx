"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * A entrada do site inteiro: sobe um pouco, sai do desfoque e assenta com uma
 * desaceleração longa. Quem anima sem o <Reveal> (seções com pin, o menu)
 * espalha isto no gsap.from para todas as entradas terem o mesmo jeito.
 * O filtro é limpo no fim: deixado como blur(0px) ele apagaria o brilho de
 * quem já usa `filter` no CSS.
 */
export const ENTRADA = {
  opacity: 0,
  y: 32,
  filter: "blur(10px)",
  duration: 1,
  ease: "power3.out",
  clearProps: "filter",
} satisfies gsap.TweenVars;

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
  /** Gatilho do ScrollTrigger. O que fica no pé da página nunca sobe até 88%
   *  da tela e precisa de um mais baixo ("top bottom"). Sem clamp(): ele
   *  prende em 0 o gatilho do que já nasce à vista, e o hero não aparecia. */
  start?: string;
};

export default function Reveal({
  children,
  className,
  split,
  targets,
  stagger = 0.08,
  delay = 0,
  y = ENTRADA.y,
  start = "top 88%",
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
    // O que nasce fora da tela espera o navegador ficar livre, um bloco por
    // vez: montar todas as entradas juntas no carregamento travava a thread
    // do celular por centenas de ms. O que já está à vista (o hero) monta na
    // hora, senão o delay da intro passaria a contar do momento errado.
    let ocioso = 0;
    const monta = () => {
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
          ...ENTRADA,
          y,
          stagger,
          delay,
          scrollTrigger: { trigger: el, start },
        });
      }, el);
    };
    document.fonts.ready.then(() => {
      if (cancelled) return;
      if (el.getBoundingClientRect().top < window.innerHeight || !("requestIdleCallback" in window)) monta();
      else ocioso = requestIdleCallback(monta, { timeout: 1500 });
    });

    return () => {
      cancelled = true;
      if (ocioso) cancelIdleCallback(ocioso);
      ctx?.revert();
      st?.revert();
    };
  }, [split, targets, stagger, delay, y, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
