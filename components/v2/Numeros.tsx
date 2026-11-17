"use client";

import { useEffect, useRef } from "react";
import Reveal from "../Reveal";

// TROQUE PELOS VALORES REAIS antes de publicar. O contador de linhas sobe
// sozinho a partir daqui, então a base precisa ser um número que você assine.
const ANOS = 5;
const PROJETOS = 200;
const LINHAS_BASE = 1_284_390;

// De quanto em quanto tempo a contagem anda, e quantas linhas por vez.
const TICK_MS = 1600;
const LINHAS_POR_TICK = [1, 4] as const;

function useContador(alvo: number, ref: React.RefObject<HTMLSpanElement | null>, continua = false) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const formatar = (n: number) => n.toLocaleString("pt-BR");
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) {
      el.textContent = formatar(alvo);
      return;
    }

    let atual = 0;
    let raf = 0;
    let intervalo: ReturnType<typeof setInterval> | undefined;
    let inicio = 0;
    const duracao = 1600;

    const subir = (t: number) => {
      if (!inicio) inicio = t;
      const p = Math.min(1, (t - inicio) / duracao);
      // easeOutCubic: acelera e assenta, em vez de terminar seco.
      atual = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      el.textContent = formatar(atual);
      if (p < 1) {
        raf = requestAnimationFrame(subir);
      } else if (continua) {
        const [min, max] = LINHAS_POR_TICK;
        intervalo = setInterval(() => {
          atual += min + Math.floor(Math.random() * (max - min + 1));
          el.textContent = formatar(atual);
        }, TICK_MS);
      }
    };

    // Só começa quando a seção chega na tela, senão a contagem passa despercebida.
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        io.disconnect();
        raf = requestAnimationFrame(subir);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      if (intervalo) clearInterval(intervalo);
    };
  }, [alvo, ref, continua]);
}

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
  const legenda = "mt-3 max-w-[24ch] text-[15px] leading-relaxed text-white/78";

  return (
    <section id="numeros" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <Reveal className="flex w-full flex-col items-start text-left">
          <h2 className="max-w-[22ch] text-balance text-[32px] font-normal leading-[1.08] tracking-[-0.03em] text-ink sm:text-[46px]">
            <span className="titulo-brilho">A Clov é nova</span> <br /> A experiência por trás não
          </h2>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-white/78">
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
