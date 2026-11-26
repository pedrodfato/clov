import Image from "next/image";
import { Plus } from "lucide-react";

// Os projetos da home e da página /projetos. A descrição de cada um vem do
// dicionário, pelo nome.
export type Projeto = { nome: string; img: string; href?: string; dominio?: string };

// Sem href = ainda em desenvolvimento: card cinza, faixa WIP e nenhum link.
export const PROJETOS: Projeto[] = [
  { nome: "FinalForms", href: "https://www.finalforms.com/", dominio: "finalforms.com", img: "/projects/finalforms.jpg" },
  { nome: "IH Roma", href: "https://ihroma.it/", dominio: "ihroma.it", img: "/projects/ihroma.jpg" },
  { nome: "Dazze Móveis", href: "https://dazzemoveis.com.br/", dominio: "dazzemoveis.com.br", img: "/projects/dazze.jpg" },
  { nome: "Borba Services", href: "https://borbaservicesllc.com/", dominio: "borbaservicesllc.com", img: "/projects/borba.jpg" },
  { nome: "MedTracker", href: "https://med.clov.com.br/", dominio: "med.clov.com.br", img: "/projects/medtracker.jpg" },
  { nome: "Marina Alves", img: "/projects/marina-alves.jpg" },
  { nome: "Rafael Andrade", img: "/projects/rafael-andrade.jpg" },
];

// Na página /projetos, a vaga do próximo projeto vem logo depois do último.
export const NOVO = PROJETOS.length;

// Fita atravessada no card, como obra interditada. O corpo do texto vem de
// --wip: a parede é escalada e precisa compensar.
export function FaixaWip({ texto }: { texto: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="flex w-[140%] -rotate-[8deg] justify-around gap-8 bg-[repeating-linear-gradient(-45deg,#00e87a_0_14px,#061910_14px_28px)] py-1">
        <div className="flex w-full justify-around gap-8 bg-[#0a0a0a]/90 py-2.5 font-mono text-[length:var(--wip,15px)] font-semibold uppercase tracking-[0.35em] text-brand">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="shrink-0">WIP · {texto}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

type Moldura = {
  ref?: React.Ref<HTMLDivElement>;
  proj?: Projeto;
  alt?: string;
  wip: string;
  dominio: string;
  sizes: string;
  priority?: boolean;
  children?: React.ReactNode;
};

// Tela num navegador: barra com o endereço e a luz de status (verde no ar,
// listrada em desenvolvimento). Tudo em múltiplos de --u, que vale 1px na tela
// em qualquer escala: a parede é encolhida e a barra continua legível.
// Sem proj, é a vaga do próximo projeto e o miolo vem em children.
export function Moldura({ ref, proj, alt, wip, dominio, sizes, priority, children }: Moldura) {
  const noAr = !!proj?.href;
  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[calc(var(--u)*14)] border border-white/10 bg-[#0b100d] transition-[border-color,box-shadow] duration-500 group-hover:border-white/25 group-hover:shadow-[0_calc(var(--u)*28)_calc(var(--u)*70)_calc(var(--u)*-28)_rgba(0,232,122,0.4)]"
    >
      <div className="flex h-[calc(var(--u)*30)] items-center border-b border-white/[0.07] bg-white/[0.02] px-[calc(var(--u)*12)]">
        <span aria-hidden className="flex w-[calc(var(--u)*40)] gap-[calc(var(--u)*5)]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[calc(var(--u)*7)] w-[calc(var(--u)*7)] rounded-full bg-white/15" />
          ))}
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-[calc(var(--u)*6)] rounded-full bg-white/[0.05] px-[calc(var(--u)*12)] py-[calc(var(--u)*3)] font-mono text-[length:calc(var(--u)*11)] text-white/60">
          <span
            aria-hidden
            className={`h-[calc(var(--u)*6)] w-[calc(var(--u)*6)] shrink-0 rounded-full ${
              noAr
                ? "bg-brand shadow-[0_0_calc(var(--u)*6)_rgba(0,232,122,0.9)]"
                : proj
                  ? "bg-[repeating-linear-gradient(-45deg,#00e87a_0_2px,#061910_2px_4px)]"
                  : "border border-brand/70"
            }`}
          />
          <span className="truncate">{proj ? (proj.dominio ?? wip) : dominio}</span>
        </span>
        <span aria-hidden className="w-[calc(var(--u)*40)]" />
      </div>
      <div data-tela className="relative aspect-[16/10] overflow-hidden [--wip:calc(var(--u)*13)]">
        {proj ? (
          <>
            <Image
              src={proj.img}
              alt={alt ?? ""}
              fill
              sizes={sizes}
              priority={priority}
              draggable={false}
              className={`object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${noAr ? "" : "opacity-60 grayscale"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b09]/50 via-transparent to-transparent" />
            {!noAr && <FaixaWip texto={wip} />}
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// Miolo da vaga: o lugar vazio do próximo projeto.
export function Vaga({ t }: { t: { titulo: string; texto: string } }) {
  return (
    <div className="absolute inset-[calc(var(--u)*14)] flex flex-col items-center justify-center gap-[calc(var(--u)*14)] rounded-[calc(var(--u)*8)] border border-dashed border-brand/35 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(0,232,122,0.1),transparent_70%)] text-center">
      <span className="relative flex h-[calc(var(--u)*52)] w-[calc(var(--u)*52)] items-center justify-center rounded-full border border-brand/40 bg-[#0b130f] text-brand shadow-[0_0_calc(var(--u)*30)_calc(var(--u)*-4)_rgba(0,232,122,0.55)] transition-transform duration-500 group-hover:scale-110">
        <span aria-hidden className="absolute inset-0 rounded-full border border-brand/50 motion-safe:animate-ping" />
        <Plus className="h-[calc(var(--u)*22)] w-[calc(var(--u)*22)]" aria-hidden />
      </span>
      <span className="flex flex-col gap-[calc(var(--u)*4)] px-[calc(var(--u)*16)]">
        <span className="text-[length:calc(var(--u)*20)] leading-tight tracking-[-0.02em] text-ink">{t.titulo}</span>
        <span className="text-[length:calc(var(--u)*13)] text-white/60">{t.texto}</span>
      </span>
    </div>
  );
}
