"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Check, ArrowDown } from "lucide-react";
import Reveal from "../Reveal";
import StartChallengeButton from "../StartChallengeButton";
import Etiqueta from "./Etiqueta";
import { SOCIAIS, WHATSAPP } from "../contato";
import dynamic from "next/dynamic";
import useTelaGrande from "../useTelaGrande";

const SideRays = dynamic(() => import("../SideRays"), { ssr: false });

// Símbolos de código flutuando ao fundo, no lugar das contas da referência.
// `p` é a profundidade: quanto maior, mais anda com o mouse e mais nítido.
const SIMBOLOS = [
  { t: "{ }", x: 12, y: 26, s: 30, p: 0.6 },
  { t: "=>", x: 22, y: 64, s: 26, p: 1 },
  { t: "200 OK", x: 8, y: 46, s: 15, p: 0.4 },
  { t: "API", x: 33, y: 18, s: 16, p: 0.5 },
  { t: "</>", x: 72, y: 22, s: 28, p: 0.8 },
  { t: "async", x: 84, y: 40, s: 17, p: 0.5 },
  { t: "fn()", x: 78, y: 66, s: 24, p: 1 },
  { t: "POST", x: 66, y: 80, s: 14, p: 0.35 },
  { t: "[ ]", x: 90, y: 16, s: 22, p: 0.45 },
  { t: "&&", x: 16, y: 82, s: 20, p: 0.7 },
  { t: "webhook", x: 58, y: 12, s: 13, p: 0.3 },
  { t: "if ( )", x: 88, y: 84, s: 18, p: 0.6 },
];

const PROMESSAS = ["Diagnóstico sem custo", "Escopo fechado", "Entrega toda semana", "60 dias de suporte"];

export default function Hero() {
  const camposRef = useRef<HTMLDivElement>(null);
  const telaGrande = useTelaGrande();

  // Paralaxe: cada símbolo anda na direção do mouse na proporção da profundidade.
  useEffect(() => {
    const campo = camposRef.current;
    if (!campo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const itens = [...campo.querySelectorAll<HTMLElement>("[data-p]")].map((el) => ({
      p: Number(el.dataset.p),
      x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
    }));

    const mover = (e: PointerEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      for (const i of itens) {
        i.x(dx * 60 * i.p);
        i.y(dy * 40 * i.p);
      }
    };
    window.addEventListener("pointermove", mover);
    return () => window.removeEventListener("pointermove", mover);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-surface px-6 pt-32 pb-28 text-center">
      {/* Mesmo fundo do Reviews da home 1: feixes de luz + foco verde. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {telaGrande && (
          <SideRays
            speed={0.3}
            rayColor1="#00e87a"
            rayColor2="#00ed9e"
            intensity={1.2}
            spread={0.45}
            origin={[0.5, 1.4]}
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={0.95}
            opacity={0.5}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div ref={camposRef} aria-hidden className="pointer-events-none absolute inset-0 hidden select-none md:block">
        {/* Duas camadas: a de fora é a paralaxe (GSAP), a de dentro flutua (CSS).
            No mesmo elemento as duas brigariam pelo transform. */}
        {SIMBOLOS.map((s, i) => (
          <span key={s.t} data-p={s.p} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            <span
              className="v2-flutua block font-mono text-white"
              style={{
                fontSize: s.s,
                opacity: 0.06 + s.p * 0.12,
                filter: `blur(${(1 - s.p) * 2.5}px)`,
                animationDelay: `${i * -0.8}s`,
              }}
            >
              {s.t}
            </span>
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Os delays esperam a intro (3s em IntroReveal) abrir o trevo. */}
        <Reveal delay={2.1}>
          <Etiqueta>Digital systems studio</Etiqueta>
        </Reveal>

        {/* Sem `split`: com titulo-brilho o degradê precisa de uma camada só.
              Dividido em palavras, cada pedaço deslocado redesenha o degradê
              dentro de si e elas empilham enquanto a animação roda. */}
          <Reveal delay={2.3}>
          <h1 className="titulo-brilho filter-none! animate-none! mt-7 max-w-[13ch] text-balance text-[44px] font-normal leading-[0.98] tracking-[-0.035em] sm:text-[68px] lg:text-[88px]">
            Tecnologia que trabalha por você
          </h1>
        </Reveal>

        <Reveal delay={2.8} stagger={0.12} className="flex flex-col items-center">
          <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-white/70 sm:text-lg">
            Criamos seu site, o sistema que sua empresa precisa e a automação que tira o trabalho repetitivo da sua mão.
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-white/65">
            {PROMESSAS.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand" strokeWidth={2.5} aria-hidden />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <StartChallengeButton href={WHATSAPP}>Quero iniciar um projeto</StartChallengeButton>
          </div>
        </Reveal>
      </div>

      {/* Rodapé do hero: redes à esquerda, convite para rolar à direita. */}
      <div className="absolute inset-x-0 bottom-8 z-10 mx-auto hidden w-full max-w-[1400px] items-center justify-between px-10 text-[12px] text-white/60 md:flex">
        <div className="flex items-center gap-3">
          <span>Siga</span>
          {SOCIAIS.map((s) => (
            <a
              key={s.nome}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.nome}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/65 transition-colors hover:border-brand/50 hover:text-brand"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
        <a href="#numeros" className="flex items-center gap-2 transition-colors hover:text-white/80">
          Role para explorar
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
        </a>
      </div>
    </section>
  );
}
