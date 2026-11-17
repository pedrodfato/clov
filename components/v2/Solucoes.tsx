import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import { whatsapp } from "../contato";

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

// Lista editorial em vez de três cards: uma linha por camada, e cada linha é
// um atalho para conversar sobre ela no WhatsApp. No hover a linha acende
// (painel, fio verde que corre no topo, numeral e seta), sem mexer no layout.
export default function Solucoes() {
  return (
    <section id="solucoes" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal split className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
          <h2 className="max-w-[16ch] text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
            Três camadas do mesmo sistema
          </h2>
          <p className="max-w-[44ch] text-[17px] leading-relaxed text-white/78 md:justify-self-end">
            Quase sempre o trabalho começa em uma camada e o problema estava na de baixo.
          </p>
        </Reveal>

        <div className="mt-14 grid border-t border-white/10 md:mt-16 lg:grid-cols-[180px_1fr]">
          <p className="hidden pt-9 font-mono text-[13px] uppercase tracking-[0.2em] text-white/55 lg:block">
            O que fazemos
          </p>

          <Reveal targets="[data-linha]" stagger={0.12}>
            <ul className="flex flex-col">
            {CAMADAS.map((c, i) => (
              <li key={c.titulo} data-linha className="border-b border-white/10 last:border-b-0">
                <a
                  href={whatsapp(`Olá! Vim pelo site da Clov e quero conversar sobre ${c.titulo}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Conversar sobre ${c.titulo} no WhatsApp`}
                  className="group relative my-2 grid grid-cols-[1fr_auto] gap-x-6 gap-y-5 rounded-2xl px-1 py-7 transition-[background-color,transform,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:bg-surface-elevated hover:shadow-[inset_0_0_0_1px_rgba(0,232,122,0.18),0_30px_60px_-30px_rgba(0,232,122,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-6 md:grid-cols-[56px_1fr_1.35fr_auto] md:gap-x-8"
                >
                  {/* Fio verde que corre pelo topo da linha no hover. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#00e87a,rgba(0,232,122,0))] transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  {/* Luz que nasce do canto esquerdo da linha acesa. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(40%_80%_at_0%_0%,rgba(0,232,122,0.10),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="relative self-center font-mono text-[14px] tracking-[0.1em] text-white/45 transition-colors duration-500 group-hover:text-brand md:self-start md:pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative col-span-2 flex flex-col gap-3 md:col-span-1 md:col-start-2 md:row-start-1">
                    <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand">{c.categoria}</span>
                    <h3 className="text-[34px] font-normal leading-none tracking-[-0.03em] text-ink sm:text-[40px]">{c.titulo}</h3>
                  </div>

                  <span className="relative col-start-2 row-start-1 flex h-12 w-12 items-center justify-center self-start rounded-full border border-white/15 text-white/80 transition-[background-color,border-color,color,transform] duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-[#04140b] group-active:scale-95 md:col-start-4">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
                  </span>

                  <div className="relative col-span-2 flex flex-col gap-5 md:col-span-1 md:col-start-3 md:row-start-1">
                    <p className="max-w-[52ch] text-[16px] leading-relaxed text-white/78">{c.texto}</p>
                    <ul className="flex flex-wrap gap-2">
                      {c.itens.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/10 px-3 py-1 text-[14px] text-white/82 transition-colors duration-500 group-hover:border-brand/30"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
              </li>
            ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
