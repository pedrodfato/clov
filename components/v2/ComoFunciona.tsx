"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import Reveal from "../Reveal";
import useTelaGrande from "../useTelaGrande";

gsap.registerPlugin(ScrollTrigger);

const ETAPAS = [
  {
    titulo: "Diagnóstico primeiro",
    texto: "A gente acha o que trava o negócio antes de propor qualquer coisa.",
  },
  {
    titulo: "Escopo fechado",
    texto: "Prazo, preço e entregas na mesa antes da primeira linha de código.",
  },
  {
    titulo: "Entrega toda semana",
    texto: "Você abre algo que já funciona e diz o que muda.",
  },
  {
    titulo: "Você sai com tudo",
    texto: "Documentação, acessos e 60 dias de suporte depois da entrega.",
  },
];

// Cartões de interface que ilustram cada etapa, no lugar das telas do app da
// referência. Os itens do diagnóstico são exemplo, e estão marcados assim.
function Cartao({ etapa }: { etapa: number }) {
  const linha = "flex items-center justify-between gap-6 border-t border-white/[0.06] py-3 text-[13px]";
  const ok = <Check className="h-3.5 w-3.5 text-brand" strokeWidth={2.5} aria-hidden />;

  const conteudo = [
    <>
      <p className="text-[12px] text-white/60">Leitura do cenário · exemplo</p>
      <div className="mt-3">
        {[
          ["CRM e financeiro", "sem integração"],
          ["Pedidos", "copiados à mão"],
          ["Site", "lento no celular"],
        ].map(([a, b]) => (
          <div key={a} className={linha}>
            <span className="text-white/80">{a}</span>
            <span className="flex items-center gap-2 text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffb454]" />
              {b}
            </span>
          </div>
        ))}
      </div>
    </>,
    <>
      <p className="text-[12px] text-white/60">Proposta</p>
      <div className="mt-3">
        {["Prazo", "Preço", "Entregas"].map((a) => (
          <div key={a} className={linha}>
            <span className="text-white/80">{a}</span>
            <span className="flex items-center gap-2 text-white/65">definido {ok}</span>
          </div>
        ))}
      </div>
    </>,
    <>
      <p className="text-[12px] text-white/60">Entrega da semana</p>
      <p className="mt-3 text-[22px] tracking-[-0.02em] text-ink">Versão navegável no ar</p>
      <div className="mt-5 flex gap-1.5">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 5 ? "bg-brand shadow-[0_0_8px_rgba(0,232,122,0.6)]" : "bg-white/10"}`} />
        ))}
      </div>
      <p className="mt-3 text-[12px] text-white/60">Ajuste de rota com você, toda semana</p>
    </>,
    <>
      <p className="text-[12px] text-white/60">Encerramento</p>
      <div className="mt-3">
        {["Documentação", "Acessos no seu nome", "60 dias de suporte"].map((a) => (
          <div key={a} className={linha}>
            <span className="text-white/80">{a}</span>
            {ok}
          </div>
        ))}
      </div>
    </>,
  ][etapa];

  return (
    <div className="w-[min(380px,82vw)] rounded-2xl border border-white/10 bg-[#0c120f]/90 p-6 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(0,232,122,0.25)] backdrop-blur">
      {conteudo}
    </div>
  );
}

// Onda verde do fundo do painel, desenhada em SVG e desfocada.
function Onda() {
  return (
    <svg aria-hidden viewBox="0 0 1200 500" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="v2-onda" x1="0" x2="1">
          <stop offset="0" stopColor="#00e87a" stopOpacity="0" />
          <stop offset="0.45" stopColor="#00e87a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7dffbf" stopOpacity="0.1" />
        </linearGradient>
        <filter id="v2-onda-blur">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <g filter="url(#v2-onda-blur)" fill="none" stroke="url(#v2-onda)">
        <path d="M-50 380 C 250 120, 520 470, 820 230 S 1150 80, 1260 160" strokeWidth="70" />
        <path d="M-50 430 C 300 200, 560 520, 860 290 S 1160 160, 1260 230" strokeWidth="26" opacity="0.7" />
      </g>
      <path d="M-50 380 C 250 120, 520 470, 820 230 S 1150 80, 1260 160" fill="none" stroke="#b9ffd9" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}

export default function ComoFunciona() {
  const secaoRef = useRef<HTMLElement>(null);
  const [ativa, setAtiva] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const telaGrande = useTelaGrande();

  // Em tela grande a seção fica presa e o scroll avança as etapas. No celular
  // as etapas viram uma lista e o painel mostra a primeira.
  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao || !telaGrande) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = ScrollTrigger.create({
      trigger: secao,
      start: "top top",
      end: `+=${ETAPAS.length * 70}%`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        setProgresso(self.progress);
        setAtiva(Math.min(ETAPAS.length - 1, Math.floor(self.progress * ETAPAS.length)));
      },
    });
    return () => st.kill();
  }, [telaGrande]);

  return (
    <section
      ref={secaoRef}
      id="metodologia"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-surface px-6 py-24 sm:px-10"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center">
        <Reveal split className="text-center">
          <h2 className="text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
            Como funciona?
          </h2>
          <p className="mt-3 text-[15px] text-white/65">As mesmas quatro etapas em todo projeto.</p>
        </Reveal>

        {/* Painel único: no celular ele sai de cena e cada etapa leva o seu
            próprio cartão, porque lá não há scroll preso para trocá-los. */}
        <div className="relative mt-12 hidden h-[340px] w-full items-center justify-center overflow-hidden rounded-3xl border border-brand/20 bg-[#070b09] shadow-[inset_0_0_80px_rgba(0,232,122,0.06)] md:flex md:h-[400px]">
          <Onda />
          <div className="relative">
            {ETAPAS.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ease-out ${
                  i === ativa ? "relative opacity-100" : "pointer-events-none absolute inset-0 translate-y-4 opacity-0"
                }`}
              >
                <Cartao etapa={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Linha de etapas: a barra de cima enche com o scroll. */}
        <ol className="mt-8 grid w-full grid-cols-1 gap-16 md:grid-cols-4 md:gap-6">
          {ETAPAS.map((e, i) => {
            const enche = Math.min(1, Math.max(0, progresso * ETAPAS.length - i));
            const acesa = !telaGrande || i === ativa;
            return (
              <li key={e.titulo} className="flex flex-col gap-3">
                <span className="relative block h-px w-full bg-white/10">
                  <span
                    className="absolute inset-y-0 left-0 bg-brand shadow-[0_0_8px_rgba(0,232,122,0.8)]"
                    style={{ width: `${(telaGrande ? enche : 1) * 100}%` }}
                  />
                </span>
                {/* A tela da etapa, em cima do card. Só no celular: no desktop
                    um painel só troca de cartão conforme o scroll. */}
                <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-brand/20 bg-[#070b09] px-4 py-7 shadow-[inset_0_0_60px_rgba(0,232,122,0.06)] md:hidden">
                  <Onda />
                  <div className="relative">
                    <Cartao etapa={i} />
                  </div>
                </div>

                <span className={`text-[11px] uppercase tracking-[0.2em] ${acesa ? "text-brand" : "text-white/30"}`}>
                  Etapa {i + 1}
                </span>
                <div className={`transition-opacity duration-500 ${acesa ? "opacity-100" : "opacity-35"}`}>
                  <h3 className="text-[17px] text-ink">{e.titulo}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{e.texto}</p>
                </div>

              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
