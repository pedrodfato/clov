"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import useTelaGrande from "../useTelaGrande";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const PROJETOS = [
  { nome: "FinalForms", desc: "Plataforma para escolas", href: "https://www.finalforms.com/", dominio: "finalforms.com", img: "/projects/finalforms.jpg" },
  { nome: "IH Roma", desc: "Escola de idiomas", href: "https://ihroma.it/", dominio: "ihroma.it", img: "/projects/ihroma.jpg" },
  { nome: "Dazze Móveis", desc: "E-commerce de móveis", href: "https://dazzemoveis.com.br/", dominio: "dazzemoveis.com.br", img: "/projects/dazze.jpg" },
  { nome: "Borba Services", desc: "Telhados, calhas e pisos", href: "https://borbaservicesllc.com/", dominio: "borbaservicesllc.com", img: "/projects/borba.jpg" },
  { nome: "MedTracker", desc: "App de lembretes de remédios", href: "https://med.clov.com.br/", dominio: "med.clov.com.br", img: "/projects/medtracker.jpg" },
];

const dois = (n: number) => String(n).padStart(2, "0");

const MOVIMENTO_REDUZIDO = "(prefers-reduced-motion: reduce)";
const assinaMovimento = (avisa: () => void) => {
  const mq = window.matchMedia(MOVIMENTO_REDUZIDO);
  mq.addEventListener("change", avisa);
  return () => mq.removeEventListener("change", avisa);
};

// Galeria em fila, como uma sala escura com as telas penduradas: o scroll
// vertical anda a fila na horizontal, a tela do centro acende e as vizinhas
// giram para dentro e perdem a cor. Embaixo, a ficha do projeto da vez.
export default function Projetos() {
  const secaoRef = useRef<HTMLElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [ativo, setAtivo] = useState(0);
  const telaGrande = useTelaGrande();
  const reduzido = useSyncExternalStore(assinaMovimento, () => window.matchMedia(MOVIMENTO_REDUZIDO).matches, () => false);
  const animado = telaGrande && !reduzido;

  // Só em tela grande a seção fica presa. No celular (e com movimento
  // reduzido) a fila rola na horizontal com o dedo, sem pin.
  useEffect(() => {
    const secao = secaoRef.current;
    const trilho = trilhoRef.current;
    if (!secao || !trilho || !animado) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-card]", trilho);
    const n = cards.length;

    // Cada card gira e apaga conforme a distância até o centro da fila.
    const pinta = (progresso: number) => {
      const pos = progresso * (n - 1);
      cards.forEach((c, i) => {
        const d = i - pos;
        const longe = Math.min(1, Math.abs(d));
        c.style.transform = `perspective(1400px) rotateY(${gsap.utils.clamp(-28, 28, -d * 28)}deg) scale(${1 - longe * 0.14})`;
        c.style.filter = `grayscale(${longe}) brightness(${1 - longe * 0.45})`;
      });
      setAtivo(Math.round(pos));
    };

    const tween = gsap.to(trilho, {
      x: () => -(trilho.scrollWidth - secao.clientWidth),
      ease: "none",
      scrollTrigger: {
        trigger: secao,
        start: "top top",
        end: () => `+=${trilho.scrollWidth - secao.clientWidth}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => pinta(self.progress),
      },
    });
    stRef.current = tween.scrollTrigger ?? null;
    pinta(0);

    return () => {
      stRef.current = null;
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(trilho, { clearProps: "transform" });
      cards.forEach((c) => {
        c.style.transform = "";
        c.style.filter = "";
      });
    };
  }, [animado]);

  // Miniatura: leva o scroll até o ponto do pin em que aquele card fica no centro.
  const irPara = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * (i / (PROJETOS.length - 1));
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(y, true);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const p = PROJETOS[ativo];

  return (
    <section
      ref={secaoRef}
      id="projetos"
      className="relative flex w-full flex-col overflow-hidden bg-surface py-24 [--card:min(62vw,calc((100svh-340px)*1.6))] lg:h-[100svh] lg:py-0"
    >
      {/* Sala: chão mais claro e cantos escuros. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(255,255,255,0.07),transparent_55%),radial-gradient(ellipse_at_50%_40%,transparent_40%,rgba(0,0,0,0.6))]" />

      <div className="relative flex items-end justify-between gap-6 px-6 sm:px-10 lg:pt-24">
        <Reveal split>
          <h2 className="text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
            O que já colocamos no ar
          </h2>
          <p className="mt-3 text-[15px] text-white/65">Projetos que passaram pela clov e saíram com o nosso selo.</p>
        </Reveal>
        {animado && (
          <span className="hidden font-mono text-[12px] tracking-[0.2em] text-white/50 lg:block">
            {dois(ativo + 1)} / {dois(PROJETOS.length)}
          </span>
        )}
      </div>

      <div className={`relative flex flex-1 items-center ${animado ? "" : "snap-x snap-mandatory overflow-x-auto"}`}>
        <div
          ref={trilhoRef}
          className="flex gap-[4vw] px-6 py-6 sm:px-10 lg:px-[calc((100vw-var(--card))/2)]"
        >
          {PROJETOS.map((proj, i) => (
            <a
              key={proj.nome}
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-[82vw] shrink-0 snap-center flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand lg:w-[var(--card)]"
            >
              <div
                data-card
                className={`relative aspect-[16/10] overflow-hidden rounded-2xl border bg-[#0b100d] transition-shadow duration-500 will-change-transform ${
                  animado && i === ativo
                    ? "border-brand/30 shadow-[0_0_0_1px_rgba(0,232,122,0.15),0_40px_90px_-30px_rgba(0,232,122,0.5)]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={proj.img}
                  alt={`Site da ${proj.nome}`}
                  fill
                  sizes="(max-width: 1024px) 82vw, 900px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b09]/70 via-transparent to-transparent" />
              </div>

              {/* Sem pin, a ficha vai embaixo de cada card. */}
              {!animado && (
                <div className="flex items-baseline justify-between gap-4 px-1">
                  <div>
                    <h3 className="text-[20px] tracking-[-0.02em] text-ink">{proj.nome}</h3>
                    <p className="text-[13px] text-white/60">{proj.desc}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[12px] text-white/35">
                    {proj.dominio}
                    <ArrowUpRight className="h-3 w-3" aria-hidden />
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Ficha do projeto da vez, no rodapé da sala. */}
      {animado && (
        <div className="relative grid grid-cols-[1fr_1.4fr_1fr_auto] items-start gap-10 border-t border-white/10 px-10 pb-10 pt-6 font-mono text-[11px] uppercase tracking-[0.18em]">
          <div>
            <span className="text-white/40">Projeto</span>
            <p className="mt-2 font-sans text-[22px] normal-case tracking-[-0.02em] text-ink">{p.nome}</p>
          </div>
          <div>
            <span className="text-white/40">Sobre</span>
            <p className="mt-2 text-white/75">{p.desc}</p>
          </div>
          <div>
            <span className="text-white/40">Site</span>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1 text-white/75 transition-colors hover:text-brand"
            >
              {p.dominio}
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
          </div>
          <div className="flex gap-2">
            {PROJETOS.map((proj, i) => (
              <button
                key={proj.nome}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ver ${proj.nome}`}
                aria-current={i === ativo}
                className={`relative h-9 w-14 overflow-hidden rounded-md border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  i === ativo ? "border-brand opacity-100" : "border-white/15 opacity-45 grayscale hover:opacity-80"
                }`}
              >
                <Image src={proj.img} alt="" fill sizes="56px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
