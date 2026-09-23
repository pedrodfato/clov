import DotGrid from "../DotGrid"
import StartChallengeButton from "../StartChallengeButton"
import HeroHands from "./heroHands"
import Reveal from "../Reveal"

export default function Hero() {
    return (
        <section className="relative flex w-full flex-1 flex-col overflow-hidden bg-surface">
            <div className="pointer-events-none absolute inset-0">
                <DotGrid
                    dotSize={4}
                    gap={24}
                    baseColor="#111a15"
                    activeColor="#0f8b4c"
                    proximity={140}
                    speedTrigger={220}
                    shockRadius={180}
                    shockStrength={1.2}
                    resistance={2200}
                    returnDuration={1.1}
                    breathCycle={5}
                    breathStrength={0.22}
                    style={{ opacity: 0.6 }}
                />
                <div className="bg-grain absolute inset-0 opacity-[0.04] mix-blend-overlay" />
            </div>

            <div className="relative flex flex-1 flex-col items-center justify-center pt-32 pb-52">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <HeroHands />

                    <div className="bg-noise absolute inset-0 opacity-[0.55]" />
                </div>

                <div className="relative z-10 flex flex-col items-center px-6 text-center">
                    {/* Os delays esperam a intro (3s em IntroReveal) abrir o trevo. */}
                    <Reveal split delay={2.3}>
                        <h1 className="max-w-[900px] text-[30px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[40px] lg:text-[48px]">
                            Construímos os sistemas digitais por trás de empresas que estão crescendo.
                        </h1>
                    </Reveal>

                    <Reveal delay={2.8} stagger={0.14} className="flex flex-col items-center">
                        <p className="mt-6 max-w-[520px] font-mono text-base text-white/55 sm:text-lg">
                            Site, integrações e automação na mesma arquitetura. Time pequeno, contato direto com quem constrói.
                        </p>

                        <div className="mt-8">
                            <StartChallengeButton href="#contato">Fale conosco</StartChallengeButton>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
