"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

// three.js e R3F somam ~950 KB e inicializar o contexto WebGL trava a thread
// durante a hidratação. As mãos são decoração: entram depois que a página
// está interativa, em vez de disputar com ela.
const ShaderImage = dynamic(() => import("../ShaderImage"), { ssr: false });

import useShaderPermitido from "../useShaderPermitido";

gsap.registerPlugin(ScrollTrigger);

// Quanto cada mão anda ao longo do scroll do hero: a esquerda sai pela
// diagonal inferior esquerda, a direita pela superior direita. Em pixels, e
// não em % do próprio elemento: as duas têm proporções diferentes, e a mesma
// porcentagem faria uma andar quase o dobro da outra.
const DESLOCA_X = 0.2; // fração da largura da tela
const DESLOCA_Y = 0.25; // fração da altura da tela

export default function HeroHands() {
  const esquerda = useRef<HTMLDivElement>(null);
  const direita = useRef<HTMLDivElement>(null);
  const [ocioso, setOcioso] = useState(false);
  const permitido = useShaderPermitido();
  const pronto = ocioso && permitido;

  useEffect(() => {
    const janela = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (janela.requestIdleCallback) {
      const id = janela.requestIdleCallback(() => setOcioso(true), { timeout: 2500 });
      return () => janela.cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setOcioso(true), 1200);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const a = esquerda.current;
    const b = direita.current;
    if (!a || !b) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = a.closest("section");
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        })
        .to(a, { x: () => -window.innerWidth * DESLOCA_X, y: () => window.innerHeight * DESLOCA_Y }, 0)
        .to(b, { x: () => window.innerWidth * DESLOCA_X, y: () => -window.innerHeight * DESLOCA_Y }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* O wrapper externo carrega a posição e o -translate-y-1/2; o interno é
          o que o GSAP move. Animar o externo apagaria esse deslocamento, já
          que o GSAP reescreve o transform inteiro. */}
      <div className="absolute left-[-22%] top-[70%] aspect-square w-[70%] -translate-y-1/2 opacity-[0.3] [&_canvas]:-scale-y-100 [&_canvas]:rotate-[20deg] sm:left-[-10%] sm:w-[56%] sm:opacity-[0.6] lg:w-[48%]">
        <div ref={esquerda} className="h-full w-full">
          {pronto && (
            <ShaderImage
              src="/bracorobo.webp"
              className="h-full w-full"
              overrides={{ uBrightness: 0.01, uContrast: 0.6 }}
            />
          )}
        </div>
      </div>

      <div className="absolute right-[-14%] top-[60%] aspect-[1671/941] w-[76%] -translate-y-1/2 opacity-[0.22] [&_canvas]:rotate-[5deg] sm:right-[-5%] sm:w-[54%] sm:opacity-[0.4] lg:w-[46%]">
        <div ref={direita} className="h-full w-full">
          {pronto && <ShaderImage src="/maohumano.webp" className="h-full w-full" />}
        </div>
      </div>
    </>
  );
}
