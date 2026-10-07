"use client";

import { useRef } from "react";
import Reveal from "../Reveal";
import { ANOS, PROJETOS, LINHAS_BASE, useContador } from "../home/numeros";

// Números espalhados em volta de uma cruz de linhas, como na referência: cada
// quadrante guarda um dado, e o cruzamento acende.
export default function Numeros() {
  const anosRef = useRef<HTMLSpanElement>(null);
  const projetosRef = useRef<HTMLSpanElement>(null);
  const linhasRef = useRef<HTMLSpanElement>(null);

  useContador(ANOS, anosRef);
  useContador(PROJETOS, projetosRef);
  useContador(LINHAS_BASE, linhasRef, true);

  const numero = "text-[44px] font-normal leading-none tracking-[-0.03em] text-ink tabular-nums sm:text-[56px]";
  const legenda = "mt-3 max-w-[24ch] text-[13px] leading-relaxed text-white/45";

  return (
    <section id="numeros" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <Reveal split className="flex flex-col items-center text-center">
          <h2 className="max-w-[22ch] text-balance text-[32px] font-normal leading-[1.08] tracking-[-0.03em] text-ink sm:text-[46px]">
            A Clov é nova. A experiência por trás não.
          </h2>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-white/45">
            Os números abaixo são do fundador e vêm de antes da empresa existir. A Clov é o formato novo de um trabalho
            que já vinha sendo feito.
          </p>
        </Reveal>

        {/* Cruz: linha vertical e horizontal que se encontram num ponto aceso.
            Em tela pequena vira lista simples, sem a cruz. */}
        <div className="relative mt-20 w-full md:h-[560px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="absolute left-[54%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            <div className="absolute left-0 top-[46%] h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute left-[54%] top-[46%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,232,122,0.28),transparent)]" />
            <div className="absolute left-[54%] top-[46%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9ffd9] shadow-[0_0_18px_4px_rgba(0,232,122,0.8)]" />
          </div>

          <Reveal targets="[data-stat]" stagger={0.18} className="flex flex-col gap-12 md:block">
            <div data-stat className="md:absolute md:left-[14%] md:top-[14%]">
              <p className={numero}>
                +<span ref={anosRef}>0</span>
              </p>
              <p className={legenda}>anos desenvolvendo e posicionando produtos digitais</p>
            </div>

            <div data-stat className="md:absolute md:left-[64%] md:top-[24%]">
              <p className={numero}>
                +<span ref={projetosRef}>0</span>
              </p>
              <p className={legenda}>projetos desenvolvidos, no Brasil e fora dele</p>
            </div>

            <div data-stat className="md:absolute md:left-[22%] md:top-[60%]">
              <p className={numero}>
                <span ref={linhasRef}>0</span>
              </p>
              <p className={legenda}>linhas de código escritas, e contando enquanto você lê isto</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
