"use client";

import { useState } from "react";
import { ChevronDown, Circle } from "lucide-react";

export default function Solutions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const solutions = [
    {
      number: "01",
      title: "Website Development",
      category: "Desenvolvimento",
      desc: [
        "Seu site é o primeiro contato de um cliente com sua marca — e a maioria das empresas perde essa oportunidade com páginas lentas, genéricas e sem propósito.",
        "Construímos sites rápidos, responsivos e pensados para conversão, unindo design, performance técnica e uma estrutura que guia o visitante até a ação.",
        "Do zero ao deploy, cuidamos de cada detalhe para que seu site represente o nível da sua empresa e sustente o crescimento que vem pela frente.",
      ],
      columns: [
        ["Design UI/UX", "Front-end", "Landing Pages"],
        ["CMS & Integrações", "Performance & SEO", "Deploy & Hosting"],
      ],
    },
    {
      number: "02",
      title: "Automações de IA",
      category: "Automação",
      desc: [
        "Tarefas repetitivas consomem tempo e energia que poderiam estar sendo investidos em crescimento. A maioria das empresas ainda opera processos que poderiam ser automatizados.",
        "Desenvolvemos agentes e fluxos que integram suas ferramentas, eliminam retrabalho e aceleram decisões em toda a operação.",
        "O resultado é uma empresa que roda sozinha e uma equipe livre para focar no que realmente importa.",
      ],
      columns: [
        ["Chatbots & Agentes", "Automação de APIs"],
        ["Fluxos com IA", "Análise de Dados", "Ferramentas Internas"],
      ],
    },
    {
      number: "03",
      title: "Segurança",
      category: "Proteção",
      desc: [
        "Crescer sem segurança é acumular risco. Vulnerabilidades não tratadas custam caro — em dados, reputação e confiança dos seus clientes.",
        "Avaliamos sua infraestrutura de ponta a ponta, identificando falhas antes que se tornem incidentes e implementando as camadas certas para proteger seu negócio.",
        "Construímos uma base sólida e monitorada, para que sua empresa escale com a confiança de que está protegida.",
      ],
      columns: [
        ["Testes de Penetração", "Auditoria de Código", "Hardening de Infra"],
        ["Monitoramento", "Resposta a Incidentes & LGPD"],
      ],
    },
  ];

  return (
    <section className="w-full flex flex-col gap-[40px] px-40 py-32 text-white/80">
      <div className="w-full max-w-[1200px] flex flex-col gap-16 align-center justify-center mx-auto">
        <div className="flex items-end justify-between border-b border-[#11542e]/25 pb-12">
          <div className="flex flex-col gap-3">
            <div className="bg-gradient-to-r from-[#5BB421] to-[#0B4C11]/60 flex items-center justify-center p-[1px] rounded-md w-fit">
              <span className="bg-gradient-to-r from-[#021002] to-[#000000] flex rounded-md px-4 py-1 gap-2 items-center text-[14px] text-[#00db71] uppercase">
                <Circle className="w-2 h-2 bg-[#00db71] rounded-full text-[#00db71]" /> Soluções
              </span>
            </div>
            <h2 className="font-bold text-4xl leading-tight">
              Três formas de ajudarmos sua empresa a{" "}
              <span className="text-[#00E87A]">crescer</span>
            </h2>
          </div>
          <p className="font-mono text-white/50 max-w-[420px] pt-2">
            Desafios de crescimento passam por como você constrói, como você automatiza ou como você se protege. É aí que atuamos.
          </p>
        </div>

        {solutions.map((s, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={s.number}
              className="group relative border-b border-[#11542e]/25 pb-16 last:border-b-0 transition-all duration-500"
            >
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#00E87A] to-transparent transition-all duration-500 group-hover:w-full"></div>

              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-white/30 text-sm">{s.number}</span>
                  <h3 className="font-bold text-[#00E87A] text-4xl transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(0,232,122,0.6)]">
                    {s.title}
                  </h3>
                  <span className="text-white/40 font-mono text-sm">{s.category}</span>
                </div>

                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#00E87A]/40 shrink-0 transition-all duration-500 group-hover:border-[#00E87A] group-hover:drop-shadow-[0_0_10px_rgba(0,232,122,0.6)]">
                  <ChevronDown
                    className={`w-4 h-4 text-[#00E87A] transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex justify-between gap-12">
                    <div className="flex flex-col gap-4 font-mono text-white/50 text-[15px] leading-relaxed max-w-[520px]">
                      {s.desc.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    <div className="flex gap-12 shrink-0">
                      {s.columns.map((col, i) => (
                        <ul key={i} className="flex flex-col gap-3">
                          {col.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-[#00E87A] font-mono text-[15px]"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#00E87A]"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
