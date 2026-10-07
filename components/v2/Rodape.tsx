import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { EMAIL, SOCIAIS, TELEFONE, WHATSAPP } from "../contato";

const LINKS = [
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Como funciona", href: "#metodologia" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Projetos", href: "#projetos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

// Rodapé da referência: frase gigante cortada no topo com luz verde por trás,
// convite no meio e colunas embaixo.
export default function Rodape() {
  const link = "text-[14px] text-white/45 transition-colors hover:text-brand";

  return (
    <footer className="relative w-full overflow-hidden bg-surface">
      <div aria-hidden className="relative h-[22vw] min-h-[120px] overflow-hidden">
        <div className="absolute left-[18%] top-[30%] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,232,122,0.45),transparent)] blur-2xl" />
        <div className="absolute right-[12%] top-[10%] h-[30vw] w-[30vw] rounded-full bg-[radial-gradient(closest-side,rgba(125,255,191,0.3),transparent)] blur-2xl" />
        {/* Duas cópias lado a lado: a animação anda metade e emenda sem salto. */}
        <div className="absolute bottom-[-0.12em] left-0 flex select-none whitespace-nowrap text-[19vw] font-normal leading-none tracking-[-0.06em] text-ink">
          <div className="v2-letreiro flex shrink-0">
            <span className="pr-[0.4em]">Vamos conversar</span>
            <span className="pr-[0.4em]">Vamos conversar</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        {/* <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 px-6 py-16 text-center sm:px-10">
          <h2 className="text-[24px] font-normal tracking-[-0.02em] text-ink">Fale direto com quem constrói</h2>
          <p className="max-w-[46ch] text-[14px] text-white/45">Sem formulário longo e sem camada de atendimento: a mensagem chega em quem vai cuidar do projeto.</p>
        </div> */}

        <div className="pt-16 mx-auto grid w-full max-w-[1200px] gap-12 px-6 pb-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Image src="/logoclov.svg" alt="Clov" width={260} height={104} unoptimized className="h-8 w-auto" />
            <p className="max-w-[26ch] text-[13px] leading-relaxed text-white/40">
              Os sistemas digitais por trás de empresas que estão crescendo.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <h3 className="mb-1 text-[16px] text-ink">Navegação</h3>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className={link}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="mb-1 text-[16px] text-ink">Contato</h3>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${link} flex items-center gap-2`}>
              <Phone className="h-3.5 w-3.5 text-brand/70" aria-hidden />
              {TELEFONE}
            </a>
            <a href={`mailto:${EMAIL}`} className={`${link} flex items-center gap-2`}>
              <Mail className="h-3.5 w-3.5 text-brand/70" aria-hidden />
              {EMAIL}
            </a>
            <span className="flex items-center gap-2 text-[14px] text-white/45">
              <MapPin className="h-3.5 w-3.5 text-brand/70" aria-hidden />
              São Paulo, Brasil
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="mb-1 text-[16px] text-ink">Siga</h3>
            <div className="flex gap-3">
              {SOCIAIS.map((s) => (
                <a
                  key={s.nome}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.nome}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1200px] justify-between border-t border-white/[0.06] px-6 py-6 text-[12px] text-white/30 sm:px-10">
          <span>© 2026 Clov</span>
          <span>clov.com.br</span>
        </div>
      </div>
    </footer>
  );
}
