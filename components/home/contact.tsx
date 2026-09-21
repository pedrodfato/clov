import Image from "next/image";
import Link from "next/link";
import SectionLabel from "../SectionLabel";
import StartChallengeButton from "../StartChallengeButton";
import FreeTrialButton from "../FreeTrialButton";

const EMAIL = "oi@clov.studio";
const WHATSAPP = "https://wa.me/5511999999999";

const rows = [
  { label: "E-mail", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Telefone", value: "+55 11 99999-9999", href: "tel:+5511999999999" },
  { label: "Base", value: "São Paulo · remoto" },
  { label: "Agenda", value: "2 vagas em outubro", live: true },
];

export default function Contact() {
  return (
    <section id="contato" className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-breathe absolute inset-0 origin-top">
          <div className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(90%_100%_at_50%_0%,rgba(0,232,122,0.16)_0%,rgba(11,76,17,0.22)_34%,rgba(6,25,16,0.3)_56%,rgba(10,10,10,0)_78%)]" />
        </div>
        <div className="bg-grain absolute inset-0 opacity-[0.04] mix-blend-overlay" />
      </div>

      <div className="relative grid w-full max-w-[1200px] gap-14 px-6 pt-32 pb-16 sm:px-10 lg:mx-auto lg:grid-cols-2 lg:gap-20 lg:px-24 lg:pt-40">
        <div className="flex flex-col items-start gap-6">
          <SectionLabel>Contato</SectionLabel>
          <h2 className="max-w-[15ch] text-[34px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[46px] lg:text-[52px]">
            Conte o que precisa. A gente responde em 24h.
          </h2>
          <p className="max-w-[52ch] font-mono text-[15px] leading-relaxed text-white/50">
            A primeira conversa é um diagnóstico de 30 minutos, sem custo. A gente olha o seu cenário e diz se é caso para nós, inclusive quando a resposta é não.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <StartChallengeButton href={`mailto:${EMAIL}?subject=Agendar%20diagn%C3%B3stico`}>
              Agendar diagnóstico
            </StartChallengeButton>
            <FreeTrialButton href={WHATSAPP}>WhatsApp</FreeTrialButton>
          </div>
        </div>

        <dl className="flex flex-col rounded-2xl border border-brand-line/30 bg-surface-elevated/70 px-7 py-2 backdrop-blur-sm sm:px-9">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-brand-line/25 py-5 last:border-b-0"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">{r.label}</dt>
              <dd className="font-mono text-[15px] text-white/85">
                {r.href ? (
                  <a href={r.href} className="transition-colors hover:text-brand">
                    {r.value}
                  </a>
                ) : r.live ? (
                  <span className="flex items-center gap-2 text-brand">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {r.value}
                  </span>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative w-full border-t border-brand-line/25">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-24">
          <Image
            src="/logoclov.svg"
            alt="Clov"
            width={260}
            height={104}
            unoptimized
            className="h-9 w-auto"
          />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-sm text-white/40">
            <span>© 2026 Clov</span>
            <Link href="#" className="transition-colors hover:text-white/70">
              Política de privacidade
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
