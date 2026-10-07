import Reveal from "../Reveal";

// Retornos reais dos três clientes (PRODUCT.md). Sem nota em estrelas: não
// existe avaliação pública para mostrar.
const DEPOIMENTOS = [
  {
    texto:
      "A gente precisava do FinalForms igual ao layout do Figma e rodando no WordPress. Ficou fiel ao design e ainda deu pra nossa equipe editar sem depender de ninguém.",
    autor: "Platty",
    contexto: "Projeto FinalForms",
  },
  {
    texto:
      "A nova versão da nossa loja ficou muito melhor que a anterior. Mais rápida, mais bonita, e a diferença apareceu nas vendas.",
    autor: "Dazze",
    contexto: "E-commerce",
  },
  {
    texto:
      "Já perdi a conta dos projetos que fizemos juntos. Passo o problema e sei que volta resolvido. Por isso sempre volto pra clov.",
    autor: "Green Dynamics",
    contexto: "Agência parceira",
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col">
        <Reveal split>
          <h2 className="max-w-[14ch] text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
            O que dizem de nós
          </h2>
        </Reveal>

        <Reveal targets="figure" stagger={0.14} className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {DEPOIMENTOS.map((d, i) => (
            <figure
              key={d.autor}
              className={`flex flex-col justify-between gap-10 rounded-3xl border p-7 ${
                // O do meio desce e acende, como na grade desalinhada da referência.
                i === 1
                  ? "border-brand/30 bg-[#0b130f] shadow-[0_0_50px_-15px_rgba(0,232,122,0.4)] md:translate-y-10"
                  : "border-white/[0.07] bg-white/[0.02]"
              }`}
            >
              <blockquote className="text-[16px] leading-relaxed text-white/85">
                <span className="text-brand">&ldquo;</span>
                {d.texto}
                <span className="text-brand">&rdquo;</span>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-[14px] text-brand">
                  {d.autor[0]}
                </span>
                <span>
                  <span className="block text-[14px] text-ink">{d.autor}</span>
                  <span className="block text-[12px] text-white/60">{d.contexto}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
