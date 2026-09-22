"use client";

import { useCallback, useEffect, useState } from "react";
import SectionLabel from "../SectionLabel";

// Depoimentos provisórios, escritos a partir do feedback real dos clientes.
// Troque `author` e `context` pelos nomes e cargos reais assim que os tiver.
const reviews = [
  {
    quote:
      "A gente precisava do FinalForms igual ao layout do Figma e rodando no WordPress. Ficou fiel ao design e ainda deu pra nossa equipe editar sem depender de ninguém.",
    author: "Platty",
    context: "Projeto FinalForms",
  },
  {
    quote:
      "A nova versão da nossa loja ficou muito melhor que a anterior. Mais rápida, mais bonita, e a diferença apareceu nas vendas.",
    author: "Dazze",
    context: "E-commerce",
  },
  {
    quote:
      "Já perdi a conta dos projetos que fizemos juntos. Passo o problema e sei que volta resolvido. Por isso sempre volto pra clov.",
    author: "Green Dynamics",
    context: "Cliente recorrente",
  },
];

const ROTATE_MS = 7000;

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((prev) => (prev + next + reviews.length) % reviews.length);
  }, []);

  // Auto-rotação, pausada no hover e desligada em prefers-reduced-motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setIndex((p) => (p + 1) % reviews.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [paused, index]);

  const current = reviews[index];

  return (
    <section
      id="depoimentos"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24 sm:px-10 md:py-32 lg:px-24"
    >
      {/* Foco de luz sutil atrás da citação, no verde da marca. */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-full w-full max-w-[900px] bg-[radial-gradient(60%_55%_at_50%_38%,rgba(0,232,122,0.10)_0%,rgba(10,10,10,0)_70%)]" />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[900px] flex-col items-center text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <SectionLabel>
          O que dizem sobre a <span className="text-ink">CLOV</span>
        </SectionLabel>

        {/* A altura vem do depoimento mais longo dos três, empilhado e invisível
            atrás (grid-stack). Sem isso, cada troca de citação move tudo abaixo
            dela — e junto o ponto de fim do pin/slide do Contato (ver contact.tsx). */}
        <div className="relative mt-10 w-full">
          <div aria-hidden className="invisible grid">
            {reviews.map((r) => (
              <p
                key={r.author}
                className="col-start-1 row-start-1 text-balance text-[26px] font-light leading-[1.25] tracking-tight sm:text-[34px] lg:text-[40px]"
              >
                &ldquo;{r.quote}&rdquo;
              </p>
            ))}
          </div>
          <blockquote aria-live="polite" className="absolute inset-0 flex items-center justify-center">
            <p className="text-balance text-[26px] font-light leading-[1.25] tracking-tight text-ink sm:text-[34px] lg:text-[40px]">
              <span className="text-brand/40">&ldquo;</span>
              {current.quote}
              <span className="text-brand/40">&rdquo;</span>
            </p>
          </blockquote>
        </div>

        <div className="mt-9 h-px w-10 bg-brand/60" />

        <div className="mt-6 flex flex-col items-center gap-1">
          <p className="font-mono text-sm text-white/85">{current.author}</p>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">
            {current.context}
          </p>
        </div>

        <div className="mt-10 flex items-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Depoimento anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line/40 font-mono text-lg text-white/50 transition-colors hover:border-brand/60 hover:text-brand"
          >
            &lsaquo;
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.author}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver depoimento ${i + 1} de ${reviews.length}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-brand" : "w-1.5 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo depoimento"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line/40 font-mono text-lg text-white/50 transition-colors hover:border-brand/60 hover:text-brand"
          >
            &rsaquo;
          </button>
        </div>
      </div>
    </section>
  );
}
