import SectionLabel from "../SectionLabel";
import Reveal from "../Reveal";
import CountUp from "../CountUp";

const stats = [
  { value: 40, suffix: "+", label: "projetos entregues" },
  { value: 12, suffix: "d", label: "média até o go-live" },
  { value: 98, suffix: "%", label: "retenção de clientes" },
];

export default function About() {
  return (
    <section id="quem-somos" className="w-full px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-6">
          <SectionLabel>Quem somos</SectionLabel>
          <Reveal split>
            <h2 className="max-w-[14ch] text-[34px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[46px] lg:text-[52px]">
              Um time enxuto que entrega como um time grande
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 md:pt-1">
          <Reveal targets="p" stagger={0.16} className="flex max-w-[58ch] flex-col gap-5 font-mono text-[15px] leading-relaxed text-white/50">
            <p>
              A clov juntou três frentes que raramente sentam na mesma mesa: desenvolvimento, inteligência artificial e segurança. Você fala direto com quem constrói, sem camada de atendimento no meio do caminho.
            </p>
            <p>
              Todo projeto começa por um diagnóstico e termina em um número que dá para conferir: conversão, horas economizadas ou risco fechado.
            </p>
          </Reveal>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-brand-line/25 pt-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <dt className="text-[34px] font-semibold leading-none tracking-tight text-brand">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dt>
                <dd className="font-mono text-xs text-white/40">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
