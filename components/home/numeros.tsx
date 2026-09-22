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

export default function Numeros() {
  const anosRef = useRef<HTMLSpanElement>(null);
  const projetosRef = useRef<HTMLSpanElement>(null);
  const linhasRef = useRef<HTMLSpanElement>(null);

  useContador(ANOS, anosRef);
  useContador(PROJETOS, projetosRef);
  useContador(LINHAS_BASE, linhasRef, true);

  return (
    <section id="numeros" className="relative w-full overflow-hidden px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      {/* Luz verde entrando pela direita, na mesma família do resto do site. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] bg-[radial-gradient(70%_60%_at_100%_40%,rgba(0,232,122,0.10),transparent_70%)]" />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-16 md:gap-24">
        <Reveal split className="flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-[20ch] text-balance text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[38px]">
            A Clov é nova. A experiência por trás dela não.
          </h2>
          <p className="max-w-[58ch] font-mono text-[15px] leading-relaxed text-white/45">
            Os números abaixo são do fundador e vêm de antes da empresa existir. A
            Clov é o formato novo de um trabalho que já vinha sendo feito.
          </p>
        </Reveal>

        <Reveal
          targets="[data-stat]"
          stagger={0.18}
          className="mx-auto grid w-full max-w-[900px] grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:gap-8"
        >
          <div data-stat className="flex flex-col items-center gap-2">
            <p className="flex h-[44px] items-end justify-center text-[44px] font-semibold leading-none tracking-tight text-brand sm:h-[56px] sm:text-[56px]">
              +<span ref={anosRef}>0</span>
            </p>
            <p className="max-w-[24ch] font-mono text-[13px] leading-relaxed text-white/45">
              anos desenvolvendo e posicionando produtos digitais
            </p>
          </div>

          <div data-stat className="flex flex-col items-center gap-2">
            <p className="flex h-[44px] items-end justify-center text-[44px] font-semibold leading-none tracking-tight text-brand sm:h-[56px] sm:text-[56px]">
              +<span ref={projetosRef}>0</span>
            </p>
            <p className="max-w-[24ch] font-mono text-[13px] leading-relaxed text-white/45">
              projetos desenvolvidos, no Brasil e fora dele
            </p>
          </div>

          <div data-stat className="flex flex-col items-center gap-2">
            <p className="flex h-[44px] items-end justify-center font-mono text-[30px] font-semibold leading-none tracking-tight text-ink tabular-nums sm:h-[56px] sm:text-[38px]">
              <span ref={linhasRef}>0</span>
            </p>
            <p className="max-w-[24ch] font-mono text-[13px] leading-relaxed text-white/45">
              linhas de código escritas, e contando enquanto você lê isto
            </p>
          </div>

        </Reveal>
      </div>
    </section>
  );
}
