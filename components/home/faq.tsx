import Reveal from "../Reveal";

const perguntas = [
  {
    q: "Vocês trabalham com empresa pequena?",
    a: "Trabalhamos com empresa que já vende e já tem operação rodando. O tamanho importa menos que isso: o que muda o projeto é existir processo para organizar, em vez de começar do zero.",
  },
  {
    q: "Dá para contratar só o site?",
    a: "Dá, e é assim que a maioria começa. O site costuma ser onde o problema aparece primeiro, mesmo quando ele mora na camada de baixo.",
  },
  {
    q: "Vocês substituem um time interno?",
    a: "Não. A gente constrói e entrega a estrutura para a sua equipe usar e cuidar depois. Por isso todo projeto termina com documentação e acessos no seu nome.",
  },
  {
    q: "Vocês mexem em sistema que já existe?",
    a: "É o cenário mais comum. Quase nunca chegamos numa folha em branco: o trabalho é integrar, migrar ou substituir alguma coisa que já está em uso e não pode parar.",
  },
  {
    q: "Como funciona um projeto?",
    a: "Diagnóstico primeiro. Depois prazo, preço e entregas fechados antes da primeira linha de código. Durante o projeto, algo navegável toda semana. No fim, documentação, acessos e 60 dias de suporte.",
  },
  {
    q: "Vocês fazem manutenção depois de entregar?",
    a: "Os 60 dias de suporte entram em todo projeto. Depois disso dá para seguir com acompanhamento mensal, se fizer sentido para os dois lados.",
  },
  {
    q: "Quando não faz sentido chamar vocês?",
    a: "Quando o que você precisa é uma página simples e barata, ou quando a empresa ainda não vende e o que falta é validar a ideia. Nos dois casos existe caminho mais barato do que a gente.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="w-full px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-12">
        <Reveal split className="text-center">
          <h2 className="max-w-[22ch] text-balance text-[26px] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[34px]">
            Respostas para as perguntas mais frequentes
          </h2>
        </Reveal>

        <Reveal targets="details" stagger={0.07} className="w-full border-t border-brand-line/25">
          {perguntas.map((p) => (
            /* `name` compartilhado deixa o accordion exclusivo sem uma linha de JS. */
            <details key={p.q} name="faq" className="group border-b border-brand-line/25">
              <summary className="flex cursor-pointer list-none items-center gap-6 py-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
                <span className="flex-1 font-mono text-[15px] leading-snug text-white/70 transition-colors duration-300 group-hover:text-ink group-open:text-ink">
                  {p.q}
                </span>

                <span className="relative block h-3 w-3 shrink-0 text-white/40 transition-colors duration-300 group-hover:text-brand group-open:text-brand">
                  <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out group-open:scale-y-0" />
                </span>
              </summary>

              <p className="max-w-[62ch] pb-6 pr-9 font-mono text-[15px] leading-relaxed text-white/45">
                {p.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
