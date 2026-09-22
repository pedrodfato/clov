import Reveal from "../Reveal";

export default function About() {
  return (
    <section id="quem-somos" className="w-full px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-6">
          <Reveal split>
            <h2 className="max-w-[14ch] text-[34px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[46px] lg:text-[52px]">
              O time é pequeno de propósito.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 md:pt-1">
          <Reveal targets="p" stagger={0.16} className="flex max-w-[58ch] flex-col gap-5 font-mono text-[15px] leading-relaxed text-white/50">
            <p>
              Design, engenharia e automação no mesmo time. Você fala direto com quem constrói, sem camada de atendimento no meio do caminho e sem o projeto trocar de mão três vezes até sair.
            </p>
            <p>
              Todo projeto começa por um diagnóstico e termina em algo que dá para conferir: uma conversão que subiu, horas que voltaram para a equipe ou um processo que parou de depender de alguém lembrar.
            </p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
