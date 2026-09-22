"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "../SectionLabel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const solutions = [
  {
    id: "sites",
    title: "Sites",
    category: "desenvolvimento",
    desc: [
      "Na maioria das empresas o site é a primeira conversa que o cliente tem com a marca, e ela acaba acontecendo em uma página lenta, parecida com a de todo mundo.",
      "A gente constrói sites rápidos e responsivos, com uma estrutura que leva o visitante até a ação em vez de deixar ele se perder no caminho.",
      "Cuidamos do projeto do começo ao deploy, para o site acompanhar o tamanho da sua empresa hoje e o crescimento que vem depois.",
    ],
    items: [
      "Design UI/UX",
      "CMS & Integrações",
      "Front-end",
      "Performance & SEO",
      "Landing Pages",
      "Deploy & Hosting",
    ],
  },
  {
    id: "automacoes",
    title: "Automações de IA",
    category: "automação",
    desc: [
      "Tarefa repetitiva custa o tempo da sua equipe todo mês, e boa parte dos processos que rodam na mão hoje já poderia estar automatizada.",
      "Desenvolvemos agentes e fluxos que conversam com as ferramentas que você já usa, cortam retrabalho e encurtam o tempo entre a informação chegar e a decisão sair.",
      "A operação passa a rodar sozinha nas partes chatas e a equipe volta a trabalhar no que só ela consegue fazer.",
    ],
    items: [
      "Chatbots & Agentes",
      "Fluxos com IA",
      "Automação de APIs",
      "Análise de Dados",
      "Ferramentas Internas",
    ],
  },
  {
    id: "seguranca",
    title: "Segurança",
    category: "proteção",
    desc: [
      "Empresa que cresce sem cuidar de segurança vai juntando risco pelo caminho, e a conta chega em dado vazado e cliente que perde a confiança.",
      "Avaliamos sua infraestrutura de ponta a ponta, achamos as falhas antes que virem incidente e colocamos as camadas de proteção que fazem sentido para o seu caso.",
      "No fim você tem uma base monitorada e sabe exatamente onde está protegido.",
    ],
    items: [
      "Testes de Penetração",
      "Monitoramento",
      "Auditoria de Código",
      "Resposta a Incidentes",
      "Hardening de Infra",
      "LGPD",
    ],
  },
];

export default function Solutions() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | undefined;
    let tween: gsap.core.Tween | undefined;

    // Espera as fontes: a quebra de linha muda depois que a PP Mori carrega.
    let cancelled = false;

    // O StrictMode monta, desmonta e monta de novo em dev. Reverter dentro da
    // promise deixava o revert do 1º mount apagar o split do 2º, e a seção
    // ficava invisível. A flag descarta o efeito antigo antes dele criar nada.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = new SplitText(el, { type: "words" });
      tween = gsap.fromTo(
        split.words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: 0.4 },
        }
      );

      // O SplitText mudou a altura deste bloco depois que o ScrollSmoother já
      // mediu a página. Sem esse refresh os limites de scroll ficam defasados e
      // as seções abaixo (contato) dão um salto ao serem alcançadas.
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section id="solucoes" className="w-full px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 md:gap-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="flex flex-col gap-4">
            <SectionLabel>Soluções</SectionLabel>
            <h2
              ref={headingRef}
              className="max-w-[18ch] text-[34px] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[46px] lg:text-[54px]"
            >
              Três formas de ajudarmos sua empresa a{" "}
              <span className="text-brand">crescer</span>
            </h2>
          </div>
          <p className="max-w-[46ch] font-mono text-[15px] leading-relaxed text-white/45 md:pb-2">
            Desafio de crescimento costuma aparecer em como você constrói, em como você automatiza ou em como você se protege.
          </p>
        </div>

        <div className="flex flex-col border-t border-brand-line/25">
          {solutions.map((s) => (
            <details
              key={s.id}
              name="solucoes"
              className="accordion-row group relative border-b border-brand-line/25"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-[-6rem] w-[40%] opacity-0 transition-opacity duration-700 group-open:opacity-100 bg-[radial-gradient(closest-side,rgba(0,232,122,0.14),rgba(0,232,122,0)_75%)] blur-2xl"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-brand to-transparent transition-transform duration-500 ease-out group-open:scale-y-100"
              />

              <summary className="relative flex cursor-pointer list-none items-center gap-4 py-7 pr-1 transition-[padding] duration-500 ease-out group-open:pl-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:gap-6 sm:py-9 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[32px] font-semibold leading-none tracking-tight text-white/45 transition-colors duration-500 group-hover:text-white/75 group-open:text-ink sm:text-[52px]">
                  {s.title}
                </h3>
                <span className="mt-auto pb-1 font-mono text-xs text-white/30 transition-colors duration-500 group-open:text-brand sm:pb-2 sm:text-[13px]">
                  {s.category}
                </span>

                <span className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-line/50 text-white/50 transition-colors duration-500 group-hover:border-brand/60 group-hover:text-brand group-open:border-brand group-open:text-brand">
                  <span className="relative block h-3 w-3 transition-transform duration-500 ease-out group-open:rotate-90">
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-3 -translate-y-1/2 rounded-full bg-current" />
                    <span className="absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-500 ease-out group-open:scale-y-0" />
                  </span>
                </span>
              </summary>

              <div className="relative flex flex-col gap-10 pb-12 group-open:pl-5 md:flex-row md:justify-between md:gap-16">
                <div className="flex max-w-[58ch] flex-col gap-4 font-mono text-[15px] leading-relaxed text-white/50">
                  {s.desc.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <ul className="grid shrink-0 grid-cols-1 gap-x-12 gap-y-3 sm:grid-cols-2 md:w-[340px] md:pr-14">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-mono text-[15px] text-white/70">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
