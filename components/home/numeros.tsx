"use client";

import { useEffect, useRef } from "react";
import Reveal from "../Reveal";

// TROQUE PELOS VALORES REAIS antes de publicar. O contador de linhas sobe
// sozinho a partir daqui, então a base precisa ser um número que você assine.
const ANOS = 5;
const PROJETOS = 200;
const LINHAS_BASE = 1_284_390;

// Máscara de pontos sobre o texto: o glifo é recortado numa matriz, que é o
// mesmo vocabulário do halftone das mãos e dos cards de projeto. Evita trazer
// uma fonte pixelada como terceira família do site.
const PONTOS =
  "[mask-image:radial-gradient(circle,#000_46%,transparent_53%)] [mask-size:7px_7px] " +
  "[-webkit-mask-image:radial-gradient(circle,#000_46%,transparent_53%)] [-webkit-mask-size:7px_7px]";

// Caixa de altura fixa com o número encostado embaixo: a contagem usa corpo
// menor e sem isso ela flutuaria acima da linha de base dos outros dois.
const CORPO =
  `flex h-[64px] items-end font-mono text-[56px] font-semibold leading-none tracking-tight tabular-nums ` +
  `sm:h-[112px] sm:text-[88px] lg:text-[112px] ${PONTOS}`;
const MENOR = "text-[34px] sm:text-[58px] lg:text-[74px]";
const RODAPE = "flex items-start gap-2.5 max-w-[30ch] font-mono text-[13px] leading-relaxed text-white/45";
const MARCA = "mt-[7px] h-[5px] w-[5px] shrink-0 bg-brand";

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

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-20 md:gap-28">
        <Reveal split className="flex max-w-[54ch] flex-col gap-5">
          <h2 className="max-w-[20ch] text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[38px]">
            A Clov é nova. A experiência por trás não.
          </h2>
          <p className="font-mono text-[15px] leading-relaxed text-white/45">
            Os números abaixo são do fundador e vêm de antes da empresa existir. A
            Clov é o formato novo de um trabalho que já vinha sendo feito.
          </p>
        </Reveal>

        {/* A terceira coluna é mais larga porque a contagem tem nove dígitos e
            não caberia no mesmo corpo dos outros dois num terço da largura. */}
        <Reveal
          targets="[data-stat]"
          stagger={0.18}
          className="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_1fr_1.5fr] sm:gap-8"
        >
          <div data-stat className="flex flex-col gap-4">
            <p className={`${CORPO} text-brand`}>
              +<span ref={anosRef}>0</span>
            </p>
            <p className={RODAPE}>
              <span className={MARCA} />
              anos desenvolvendo e posicionando produtos digitais
            </p>
          </div>

          <div data-stat className="flex flex-col gap-4">
            <p className={`${CORPO} text-brand`}>
              +<span ref={projetosRef}>0</span>
            </p>
            <p className={RODAPE}>
              <span className={MARCA} />
              projetos desenvolvidos, no Brasil e fora dele
            </p>
          </div>

          <div data-stat className="flex flex-col gap-4">
            <p className={`${CORPO} ${MENOR} text-ink`}>
              <span ref={linhasRef}>0</span>
            </p>
            <p className={RODAPE}>
              <span className={MARCA} />
              linhas de código escritas, e contando enquanto você lê isto
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
