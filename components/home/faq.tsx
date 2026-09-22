import Reveal from "../Reveal";

// Respostas abertas em vez de accordion: o accordion já é a linguagem da seção
// de camadas, e aqui texto visível ainda ajuda quem chega pela busca.
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
    q: "Quando não faz sentido chamar vocês?",
    a: "Quando o que você precisa é uma página simples e barata, ou quando a empresa ainda não vende e o que falta é validar a ideia. Nos dois casos existe caminho mais barato do que a gente.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="w-full px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
        <Reveal split>
          <h2 className="text-[26px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[32px]">
            Perguntas frequentes
          </h2>
        </Reveal>

        <Reveal targets="div[data-q]" stagger={0.1} className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
          {perguntas.map((p) => (
            <div key={p.q} data-q className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-ink">{p.q}</h3>
              <p className="max-w-[52ch] font-mono text-[15px] leading-relaxed text-white/50">{p.a}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
