import { Layers, MessagesSquare, Plug, Sprout } from "lucide-react";
import Reveal from "../Reveal";

// Os quatro argumentos vêm do posicionamento e dos princípios do PRODUCT.md.
const MOTIVOS = [
  {
    Icone: Layers,
    titulo: "Um time só",
    texto: "Design, engenharia e automação na mesma mesa. Ninguém precisa traduzir o que o outro quis dizer.",
  },
  {
    Icone: MessagesSquare,
    titulo: "Você fala com quem constrói",
    texto: "Sem camada de atendimento no meio. Quem entende o problema é quem escreve o código e responde por ele depois.",
  },
  {
    Icone: Plug,
    titulo: "O que já roda continua rodando",
    texto: "Quase nunca é folha em branco. Integramos ou substituímos o que está em uso sem parar a operação.",
  },
  {
    Icone: Sprout,
    titulo: "Feito para crescer junto",
    texto: "O que entregamos continua servindo quando a sua empresa mudar de tamanho.",
  },
];

// Bento 2x2 com ícone aceso, como o "Why choose" da referência.
export default function PorQue() {
  return (
    <section className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
        <Reveal split className="text-center">
          <h2 className="max-w-[16ch] text-balance text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
            Por que a Clov?
          </h2>
        </Reveal>

        <Reveal targets="article" stagger={0.12} className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {MOTIVOS.map(({ Icone, titulo, texto }) => (
            <article
              key={titulo}
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent p-7"
            >
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-6 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,232,122,0.16),transparent)] transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/30 bg-[#0b130f] shadow-[0_0_30px_-4px_rgba(0,232,122,0.45),inset_0_0_14px_rgba(0,232,122,0.15)]">
                <Icone className="h-7 w-7 text-brand" strokeWidth={1.6} aria-hidden />
              </div>
              <div className="relative mt-auto">
                <h3 className="text-[19px] tracking-[-0.02em] text-ink">{titulo}</h3>
                <p className="mt-2 max-w-[40ch] text-[14px] leading-relaxed text-white/65">{texto}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
