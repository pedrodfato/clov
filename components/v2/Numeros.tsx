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
  const legenda = "mt-3 max-w-[24ch] text-[13px] leading-relaxed text-white/65";

  return (
    <section id="numeros" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <Reveal className="flex w-full flex-col items-start text-left">
          <h2 className="max-w-[22ch] text-balance text-[32px] font-normal leading-[1.08] tracking-[-0.03em] text-ink sm:text-[46px]">
            <span className="titulo-brilho">A Clov é nova</span> <br /> A experiência por trás não
          </h2>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-white/65">
            Os números abaixo são do fundador e vêm de antes da empresa existir. A Clov é o formato novo de um trabalho
            que já vinha sendo feito. 
          </p>
        </Reveal>

        <div className="mt-20 w-full">
          <Reveal targets="[data-stat]" stagger={0.18} className="grid w-full grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            <div data-stat>
              <p className={numero}>
                +<span ref={anosRef}>0</span>
              </p>
              <p className={legenda}>anos construindo sites, sistemas e automações</p>
            </div>

            <div data-stat>
              <p className={numero}>
                +<span ref={projetosRef}>0</span>
              </p>
              <p className={legenda}>projetos desenvolvidos, no Brasil e fora dele</p>
            </div>

            <div data-stat>
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
