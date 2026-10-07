import { Plus } from "lucide-react";
import Reveal from "../Reveal";

const PERGUNTAS = [
  {
    q: "Precisamos contratar tudo de uma vez?",
    a: "Não. Dá para começar pela camada que está doendo agora, seja o site, uma integração ou uma automação. A arquitetura já é montada para o resto entrar depois, quando você quiser.",
  },
  {
    q: "Por que não contratar uma agência e um dev separados?",
    a: "Porque aí você vira o gerente de projeto dos dois. Aqui quem desenha é quem constrói, então não existe a conversa em que um lado explica por que a culpa é do outro.",
  },
  {
    q: "Vocês vão entender o nosso negócio?",
    a: "É a primeira etapa, antes de qualquer proposta. E é o que os clientes mais comentam: você explica uma vez e não precisa repetir.",
  },
  {
    q: "E os sistemas que a gente já usa?",
    a: "Continuam. Quase nunca chegamos numa folha em branco, e o trabalho costuma ser integrar ou substituir alguma coisa que está rodando e não pode parar.",
  },
  {
    q: "Como é o primeiro passo, na prática?",
    a: "Uma conversa de 30 minutos, sem custo. Depois dela a gente volta com uma leitura do que está travando e do que construiria primeiro. Proposta só quando o objetivo estiver claro.",
  },
  {
    q: "O que acontece depois que vocês entregam?",
    a: "Você fica com a documentação, os acessos no seu nome e 60 dias de suporte. Depois disso dá para seguir com acompanhamento mensal, se fizer sentido para os dois lados.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div aria-hidden className="v2-grade pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto flex w-full max-w-[760px] flex-col items-center">
        <Reveal split className="text-center">
          <h2 className="max-w-[20ch] text-balance text-[32px] font-normal leading-[1.08] tracking-[-0.03em] text-ink sm:text-[42px]">
            Respostas para as perguntas mais frequentes
          </h2>
        </Reveal>

        <div className="mt-12 flex w-full flex-col gap-3">
          {PERGUNTAS.map((p) => (
            /* `name` compartilhado deixa o accordion exclusivo sem uma linha de JS. */
            <details
              key={p.q}
              name="faq"
              className="accordion-row group rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 open:border-brand/30 open:bg-[#0b130f]"
            >
              <summary className="flex cursor-pointer list-none items-center gap-6 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
                <span className="flex-1 text-[15px] text-white/75 transition-colors group-hover:text-ink group-open:text-ink">
                  {p.q}
                </span>
                <Plus
                  className="h-4 w-4 shrink-0 text-white/40 transition-[transform,color] duration-300 group-open:rotate-45 group-open:text-brand"
                  aria-hidden
                />
              </summary>
              <p className="max-w-[62ch] px-6 pb-6 text-[14px] leading-relaxed text-white/50">{p.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
