import Reveal from "../Reveal";
import StartChallengeButton from "../StartChallengeButton";
import type { Dicionario } from "@/dicionarios/pt";
import PalavrasGirando from "./PalavrasGirando";

// Chamada para o diagnóstico, com as três etapas girando ao lado.
export default function Diagnostico({ t, whatsapp }: { t: Dicionario["diagnostico"]; whatsapp: string }) {
  return (
    <section className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[70%] w-[50%] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(0,232,122,0.10),transparent)]" />

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1fr)] items-center gap-16 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal targets="[data-r]" stagger={0.12} className="flex flex-col items-start gap-6">
          <h2 data-r className="max-w-[16ch] text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[44px]">
            {t.titulo}
          </h2>
          <p data-r className="max-w-[44ch] text-[17px] leading-relaxed text-white/78">
            {t.texto}
          </p>
          <div data-r className="flex flex-wrap gap-3">
            <StartChallengeButton href={whatsapp}>{t.cta}</StartChallengeButton>
          </div>
        </Reveal>

        {/* As três etapas em cubos que giram, uma palavra por face. A máscara
            dissolve as pontas da pilha em vez de cortá-las em linha reta. */}
        <Reveal y={48} delay={0.15}>
          <div className="h-[460px] overflow-hidden [mask-image:linear-gradient(transparent,#000_14%,#000_86%,transparent)] md:h-[560px]">
            <PalavrasGirando palavras={t.palavras} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
