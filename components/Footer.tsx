"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Mail, MapPin, Phone } from "lucide-react";
import useNearViewport from "./useNearViewport";
import useTelaGrande from "./useTelaGrande";
import { EMAIL, SOCIAIS, TELEFONE, WHATSAPP } from "./contato";

// Mesmo motivo do hero: three.js + R3F só entram quando as dunas chegam perto.
const ShaderImage = dynamic(() => import("./ShaderImage"), { ssr: false });

const LINKS = [
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Projetos", href: "#projetos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

const CONTATOS = [
  { Icon: Phone, label: TELEFONE, href: WHATSAPP },
  { Icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: MapPin, label: "São Paulo, Brasil" },
];

export default function Footer() {
  const [dunasRef, perto] = useNearViewport<HTMLDivElement>();
  const telaGrande = useTelaGrande();

  return (
    <footer className="relative z-10 w-full overflow-hidden border-t border-brand-line/25 bg-surface">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:gap-0 lg:px-24">
        <div className="flex flex-col items-start gap-5 lg:pr-12">
          <Image
            src="/logoclov.svg"
            alt="Clov"
            width={260}
            height={104}
            unoptimized
            className="h-9 w-auto"
          />

          <p className="max-w-[26ch] font-mono text-[13px] leading-relaxed text-white/40">
            Software sob medida para empresas que precisam de resultado, não de promessa.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAIS.map((s) => (
              <a
                key={s.nome}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.nome}
                className="text-white/40 transition-colors hover:text-brand focus-visible:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <span className="font-mono text-[13px] text-white/25">© 2026 Clov</span>
        </div>

        <nav className="flex flex-col gap-4 lg:border-l lg:border-brand-line/25 lg:pl-12">
          <h3 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">Links rápidos</h3>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[13px] text-white/40 transition-colors hover:text-brand focus-visible:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4 lg:border-l lg:border-brand-line/25 lg:pl-12">
          <h3 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">Contato</h3>
          {CONTATOS.map(({ Icon, label, href }) => {
            const conteudo = (
              <>
                <Icon className="h-[14px] w-[14px] shrink-0 text-brand/70" aria-hidden />
                {label}
              </>
            );
            const classe = "flex items-center gap-2.5 font-mono text-[13px] text-white/40";

            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${classe} transition-colors hover:text-brand focus-visible:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand`}
              >
                {conteudo}
              </a>
            ) : (
              <span key={label} className={classe}>
                {conteudo}
              </span>
            );
          })}
        </div>
      </div>

      {/* Dunas: mesma trama de pontos verdes das mãos do hero, desenhada por
          cima da foto para ela entrar na paleta do site. */}
      <div ref={dunasRef} className="relative aspect-[1817/866] w-full">
        {/* No celular o shader não roda e sobraria a foto em cinza. O tingimento
            por filtro chega perto do verde sem trazer o WebGL junto; no desktop
            ela volta a ser só a base cinza por baixo do shader. */}
        <Image
          src="/deserto.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50 [filter:grayscale(1)_brightness(0.55)_contrast(1.9)_sepia(1)_hue-rotate(72deg)_saturate(5)] lg:opacity-[0.18] lg:[filter:grayscale(1)]"
        />
        {perto && telaGrande && (
          <div className="absolute inset-0 opacity-70">
            <ShaderImage
              src="/deserto.webp"
              className="h-full w-full"
              overrides={{ uGridSize: 2.5, uContrast: 1.15, uBrightness: -0.04 }}
            />
          </div>
        )}
        {/* Dissolve o topo da foto no preto da seção. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-surface to-transparent" />
      </div>
    </footer>
  );
}
