import Image from "next/image";
import Reveal from "../Reveal";
import StartChallengeButton from "../StartChallengeButton";
import { WHATSAPP } from "../contato";

// Cena do planeta com estrelas (mesmo vocabulário da v1, que já existia em
// globals.css) e o trevo aceso, como o "Join us today" da referência.
export default function Contato() {
  return (
    <section
      id="contato"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-surface px-6 pt-32 pb-40 text-center sm:px-10"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="starfield-a animate-twinkle absolute inset-0" />
        <div className="starfield-b animate-twinkle-slow absolute inset-0" />
        <span className="comet comet-1" />
        <span className="comet comet-2" />
        <div className="absolute left-1/2 top-[74%] aspect-square w-[300vw] -translate-x-1/2 overflow-hidden rounded-full border-t border-brand/40 bg-[radial-gradient(120%_120%_at_50%_0%,#07100b_0%,#020302_45%)] shadow-[inset_0_3px_28px_-8px_rgba(0,232,122,0.4),0_-8px_70px_-14px_rgba(0,232,122,0.3)] sm:w-[240vw] lg:w-[200vw]" />
      </div>

      <Reveal targets="[data-r]" stagger={0.12} className="relative z-10 flex max-w-[760px] flex-col items-center gap-6">
        <div
          data-r
          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/40 bg-[#0b130f] shadow-[0_0_40px_-4px_rgba(0,232,122,0.55),inset_0_0_16px_rgba(0,232,122,0.18)]"
        >
          <Image src="/faviconclov.svg" alt="" width={34} height={34} unoptimized />
        </div>
        <h2
          data-r
          className="v2-glow text-balance text-[36px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[54px]"
        >
          <span className="titulo-brilho">Conte o que precisa</span> <br /> A gente responde em 24h
        </h2>
        <p data-r className="max-w-[52ch] text-[15px] leading-relaxed text-white/70">
          A primeira conversa é um diagnóstico de 30 minutos, sem custo. A gente olha o seu cenário e diz se é caso para
          nós, inclusive quando a resposta é não.
        </p>
        <div data-r className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <StartChallengeButton href={WHATSAPP}>
            Agendar diagnóstico
          </StartChallengeButton>
        </div>
      </Reveal>
    </section>
  );
}
