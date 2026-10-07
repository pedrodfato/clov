import Reveal from "../Reveal";

const CAMADAS = [
  {
    titulo: "Digital",
    categoria: "o que o cliente vê",
    texto:
      "A camada visível: site, loja, as telas por onde o seu cliente passa. Rápidas, responsivas, com uma estrutura que leva o visitante até a ação.",
    itens: ["Design UI/UX", "Landing Pages", "E-commerce", "Sites institucionais", "Performance & SEO"],
  },
  {
    titulo: "Systems",
    categoria: "o que faz a operação rodar",
    texto:
      "Conectamos o que você já usa, construímos as ferramentas internas que faltam e tiramos as pessoas do meio do caminho entre dois sistemas.",
    itens: ["Integrações & APIs", "Ferramentas internas", "Migração de dados", "Painéis internos"],
  },
  {
    titulo: "Intelligence",
    categoria: "o que automatiza e decide",
    texto:
      "Agentes e fluxos que conversam com as ferramentas que você já tem, cortam retrabalho e encurtam o tempo entre a informação chegar e a decisão sair.",
    itens: ["Automações", "Agentes & chatbots", "Fluxos com IA", "Relatórios automáticos"],
  },
];

// Os três cards com o numeral gigante aceso ao fundo, como os programas da
// referência (Bronze 3, Gold 1...).
export default function Solucoes() {
  return (
    <section id="solucoes" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <Reveal split className="text-center">
          <h2 className="text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
            Três camadas do mesmo sistema
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-[15px] text-white/65">
            Quase sempre o trabalho começa em uma camada e o problema estava na de baixo.
          </p>
        </Reveal>

        <Reveal targets="article" stagger={0.14} className="mt-14 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {CAMADAS.map((c, i) => (
            <article
              key={c.titulo}
              className="group relative flex min-h-[460px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b100d] p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-brand/40"
            >
              {/* Numeral gigante: contorno verde aceso, mais forte no hover. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-10 select-none text-[260px] font-normal leading-none tracking-[-0.06em] text-transparent opacity-50 transition-opacity duration-500 [-webkit-text-stroke:1.5px_rgba(125,255,191,0.55)] [text-shadow:0_0_40px_rgba(0,232,122,0.35)] group-hover:opacity-100"
              >
                {i + 1}
              </span>
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,232,122,0.18),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative mt-auto flex flex-col gap-4">
                <span className="text-[12px] text-brand">{c.categoria}</span>
                <h3 className="text-[32px] font-normal leading-none tracking-[-0.03em] text-ink">{c.titulo}</h3>
                <p className="text-[14px] leading-relaxed text-white/65">{c.texto}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {c.itens.map((item) => (
                    <li key={item} className="rounded-full border border-white/10 px-3 py-1 text-[12px] text-white/72">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
