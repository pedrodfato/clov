import Reveal from "../Reveal";
import StartChallengeButton from "../StartChallengeButton";
import { EMAIL } from "../contato";

// Hélice de pontos (CSS 3D): dois fios defasados meia volta, girando juntos.
const PONTOS = 18;

function Helice() {
  return (
    <div aria-hidden className="[perspective:1000px]">
      <div className="v2-helice relative h-[520px] w-[180px]">
        {Array.from({ length: PONTOS }, (_, i) => {
          const y = (i / (PONTOS - 1)) * 100;
          const giro = i * 32;
          return [0, 180].map((fase) => (
            <span
              key={`${i}-${fase}`}
              className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#eafff4,#00e87a_45%,#03371d)] shadow-[0_0_18px_rgba(0,232,122,0.7)]"
              style={{ top: `${y}%`, transform: `rotateY(${giro + fase}deg) translateZ(70px)` }}
            />
          ));
        })}
      </div>
    </div>
  );
}

// Chamada para o diagnóstico, no lugar do "Start earning" da referência: a frase
// repetida em coluna, com a hélice atravessando por cima.
export default function Diagnostico() {
  return (
    <section className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[70%] w-[50%] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(0,232,122,0.10),transparent)]" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-16 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal targets="[data-r]" stagger={0.12} className="flex flex-col items-start gap-6">
          <h2 data-r className="max-w-[16ch] text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[44px]">
            Pare de ser a ponte entre dois sistemas.
          </h2>
          <p data-r className="max-w-[44ch] text-[15px] leading-relaxed text-white/50">
            A primeira conversa é um diagnóstico de 30 minutos, sem custo. A gente olha o seu cenário e diz se é caso
            para nós, inclusive quando a resposta é não.
          </p>
          <div data-r className="flex flex-wrap gap-3">
            <StartChallengeButton href={`mailto:${EMAIL}?subject=Agendar%20diagn%C3%B3stico`}>
              Agendar diagnóstico
            </StartChallengeButton>
          </div>
        </Reveal>

        <div aria-hidden className="relative flex h-[520px] items-center justify-center">
          <div className="absolute inset-0 flex flex-col justify-center [mask-image:linear-gradient(transparent,#000_20%,#000_80%,transparent)]">
            {Array.from({ length: 6 }, (_, i) => (
              <p
                key={i}
                className="v2-degrade whitespace-nowrap text-[52px] font-normal leading-[1.05] tracking-[-0.04em] sm:text-[72px] lg:text-[88px]"
              >
                Diagnóstico
              </p>
            ))}
          </div>
          <div className="relative hidden md:block">
            <Helice />
          </div>
        </div>
      </div>
    </section>
  );
}
