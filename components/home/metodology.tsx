import SectionLabel from "../SectionLabel";
import Reveal from "../Reveal";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    desc: "Mapeamos o que trava o negócio hoje e o que dá retorno mais rápido.",
  },
  {
    number: "02",
    title: "Escopo fechado",
    desc: "Prazo, preço e entregáveis definidos antes da primeira linha de código.",
  },
  {
    number: "03",
    title: "Sprints de 7 dias",
    desc: "Toda semana tem algo navegável na sua mão, com ajuste de rota imediato.",
  },
  {
    number: "04",
    title: "Handoff e suporte",
    desc: "Documentação, acessos e 60 dias de acompanhamento depois da entrega.",
  },
];

export default function Metodology() {
  return (
    <section id="metodologia" className="w-full px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
        <SectionLabel>Metodologia</SectionLabel>

        <Reveal targets="li" stagger={0.12}>
          {/* Cada célula desenha topo/esquerda; o wrapper fecha direita e baixo.
              Fecha a grade sozinho em 1, 2 ou 4 colunas, sem nth-child. */}
          <ol className="grid grid-cols-1 border-b border-r border-brand-line/25 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.number}
                className="flex flex-col gap-3 border-l border-t border-brand-line/25 p-7"
              >
                <span className="font-mono text-xs text-brand">{s.number}</span>
                <h3 className="text-xl font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="max-w-[34ch] font-mono text-[15px] leading-relaxed text-white/50">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
