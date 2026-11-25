import { Plus } from "lucide-react";
import Reveal from "../Reveal";
import type { Dicionario } from "@/dicionarios/pt";

export default function Faq({ t }: { t: Dicionario["faq"] }) {
  return (
    <section id="faq" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div aria-hidden className="v2-grade pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto flex w-full max-w-[760px] flex-col items-center">
        <Reveal split className="text-center">
          <h2 className="max-w-[20ch] text-balance text-[32px] font-normal leading-[1.08] tracking-[-0.03em] text-ink sm:text-[42px]">
            {t.titulo}
          </h2>
        </Reveal>

        <Reveal targets="details" stagger={0.06} className="mt-12 flex w-full flex-col gap-3">
          {t.perguntas.map((p) => (
            /* `name` compartilhado deixa o accordion exclusivo sem uma linha de JS. */
            <details
              key={p.q}
              name="faq"
              className="accordion-row group rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 open:border-brand/30 open:bg-[#0b130f]"
            >
              <summary className="flex cursor-pointer list-none items-center gap-6 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
                <span className="flex-1 text-[17px] text-white/90 transition-colors group-hover:text-ink group-open:text-ink">
                  {p.q}
                </span>
                <Plus
                  className="h-4 w-4 shrink-0 text-white/75 transition-[transform,color] duration-300 group-open:rotate-45 group-open:text-brand"
                  aria-hidden
                />
              </summary>
              <p className="max-w-[62ch] px-6 pb-6 text-[16px] leading-relaxed text-white/78">{p.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
