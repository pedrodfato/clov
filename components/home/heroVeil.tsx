"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShaderImage from "../ShaderImage";

gsap.registerPlugin(ScrollTrigger);

// Mesmo tratamento das mãos do hero, com o ponto um pouco maior: a camada
// sobe por cima delas e a trama precisa se distinguir da que está atrás.
const HALFTONE = { uGridSize: 4.2, uDotSize: 0.92, uContrast: 0.85, uBrightness: 0.01 };

export default function HeroVeil() {
  const ref = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    // Sem movimento, a camada não tem função: ela existe para acontecer no
    // scroll. Melhor não montar o canvas do que deixá-la parada cobrindo tudo.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAtivo(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    const hero = el?.parentElement;
    if (!ativo || !el || !hero) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        })
        // Sobe do rodapé do hero. O overflow-hidden da seção é o que a recorta
        // enquanto ela ainda está embaixo.
        .fromTo(el, { yPercent: 100 }, { yPercent: 0, duration: 0.55 }, 0)
        // E some antes da seção de números entrar.
        .to(el, { opacity: 0, duration: 0.35 }, 0.65);
    }, el);

    return () => ctx.revert();
  }, [ativo]);

  if (!ativo) return null;

  return (
    <div ref={ref} data-hero-veil className="pointer-events-none absolute inset-0 z-[5]">
      <ShaderImage src="/maorobo.webp" className="h-full w-full" overrides={HALFTONE} />
    </div>
  );
}
