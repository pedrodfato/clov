"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Frase gigante em degradê que atravessa a tela conforme o scroll, como os
// "-free for 28 pairs" e "Get a refund" da referência.
export default function Letreiro({ texto, sentido = 1 }: { texto: string; sentido?: 1 | -1 }) {
  const secaoRef = useRef<HTMLElement>(null);
  const faixaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const secao = secaoRef.current;
    const faixa = faixaRef.current;
    if (!secao || !faixa) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        faixa,
        { xPercent: sentido === 1 ? 0 : -40 },
        {
          xPercent: sentido === 1 ? -40 : 0,
          ease: "none",
          scrollTrigger: { trigger: secao, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, secao);
    return () => ctx.revert();
  }, [sentido]);

  return (
    <section ref={secaoRef} aria-hidden className="relative w-full overflow-hidden bg-surface py-10 md:py-16">
      <div
        ref={faixaRef}
        className="v2-degrade whitespace-nowrap text-[22vw] font-normal leading-[0.9] tracking-[-0.05em] md:text-[15vw]"
      >
        {/* Repetido para nunca faltar texto na ponta durante o deslocamento. */}
        {texto} {texto} {texto}
      </div>
    </section>
  );
}
