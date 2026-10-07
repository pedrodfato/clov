"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// three.js e R3F somam ~950 KB e inicializar o contexto WebGL trava a thread
// durante a hidratação. As mãos são decoração: entram depois que a página
// está interativa, em vez de disputar com ela.
const ShaderImage = dynamic(() => import("../ShaderImage"), { ssr: false });

import useTelaGrande from "../useTelaGrande";

// Entrada das mãos, em segundos depois do início da intro (3s): saem das
// laterais quando o trevo já abriu a tela, junto com o título. A direita vem
// com atraso para não espelhar a outra.
const ENTRADA_ESQUERDA = 2.3;
const ENTRADA_DIREITA = 2.5;
const ENTRADA_DURACAO = 2;

// A intro começa na hidratação, não no carregamento da página, então o
// relógio certo é o da própria animação CSS. Se ela já acabou (ou não rodou),
// as mãos entram na hora.
function inicioDaIntro() {
  const intro = document
    .getAnimations()
    .find((a) => a instanceof CSSAnimation && a.animationName === "intro-clover");
  return intro?.startTime != null ? Number(intro.startTime) / 1000 : -Infinity;
}

export default function HeroHands() {
  // Início da intro, lido quando as mãos montam; null até lá.
  const [intro, setIntro] = useState<number | null>(null);
  const permitido = useTelaGrande();
  const pronto = intro !== null && permitido;
  // Só é lido quando `pronto`, que nunca é true no servidor.
  const semMovimento = pronto && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const janela = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (janela.requestIdleCallback) {
      const id = janela.requestIdleCallback(() => setIntro(inicioDaIntro()), { timeout: 2500 });
      return () => janela.cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setIntro(inicioDaIntro()), 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {/* O wrapper externo carrega a posição e o -translate-y-1/2; o interno
          (data-mao) é o que o scroll move, em HeroToque. Animar o externo
          apagaria esse deslocamento, já que o GSAP reescreve o transform. */}
      <div className="absolute left-[-22%] top-[70%] aspect-square w-[70%] -translate-y-1/2 opacity-[0.3] [&_canvas]:-scale-y-100 [&_canvas]:rotate-[20deg] sm:left-[-10%] sm:w-[56%] sm:opacity-[0.75] lg:w-[48%]">
        <div data-mao="esquerda" className="h-full w-full">
          {pronto && (
            <ShaderImage
              src="/bracorobo.webp"
              className="h-full w-full"
              overrides={{ uBrightness: 0.01, uContrast: 0.6 }}
              reveal={semMovimento ? undefined : { from: "left", at: intro + ENTRADA_ESQUERDA, duration: ENTRADA_DURACAO }}
            />
          )}
        </div>
      </div>

      <div className="absolute right-[-14%] top-[60%] aspect-[1671/941] w-[76%] -translate-y-1/2 opacity-[0.22] [&_canvas]:rotate-[5deg] sm:right-[-5%] sm:w-[54%] sm:opacity-[0.55] lg:w-[46%]">
        <div data-mao="direita" className="h-full w-full">
          {pronto && (
            <ShaderImage
              src="/maohumano.webp"
              className="h-full w-full"
              reveal={semMovimento ? undefined : { from: "right", at: intro + ENTRADA_DIREITA, duration: ENTRADA_DURACAO }}
            />
          )}
        </div>
      </div>
    </>
  );
}
