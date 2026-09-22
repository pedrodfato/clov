"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import StartChallengeButton from "../StartChallengeButton";
import FreeTrialButton from "../FreeTrialButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EMAIL = "oi@clov.studio";
const WHATSAPP = "https://wa.me/5511999999999";

export default function Contact() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const copy = copyRef.current;
    if (!scene || !copy) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = copy.querySelector("h2");
    const rest = copy.querySelectorAll("p, .cta-row");
    if (!heading) return;

    // Scroll 100% nativo — nada prende a tela. A cena entra no fluxo normal
    // (Reviews sobe e sai por cima, o contato entra por baixo) e só o texto
    // ganha uma entrada: título palavra a palavra, depois parágrafo e CTAs.
    let ctx: gsap.Context | undefined;
    let split: SplitText | undefined;
    let cancelled = false;

    // O StrictMode monta, desmonta e monta de novo em dev. Reverter dentro da
    // promise deixava o revert do 1º mount apagar o split do 2º, e a seção
    // ficava invisível. A flag descarta o efeito antigo antes dele criar nada.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        split = new SplitText(heading, { type: "words" });

        gsap
          .timeline({
            scrollTrigger: { trigger: scene, start: "top 70%", toggleActions: "play none none reverse" },
          })
          .from(split!.words, { opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: "power2.out" })
          .fromTo(rest, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, "-=0.2");
      }, scene);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      split?.revert();
    };
  }, []);

  return (
    <section id="contato" className="relative z-10 w-full bg-surface">
      {/* Cena espacial: estrelas, cometas e o planeta com atmosfera verde no rodapé. */}
      <div
        ref={sceneRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-surface px-6 pt-32 pb-24 text-center sm:px-10"
      >
        <div className="pointer-events-none absolute inset-0">
          {/* Brilho ambiente no topo. */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(80%_100%_at_50%_0%,rgba(0,232,122,0.06),transparent_70%)]" />

          {/* Duas camadas de estrelas para dar profundidade. */}
          <div className="starfield-a animate-twinkle absolute inset-0" />
          <div className="starfield-b animate-twinkle-slow absolute inset-0" />

          {/* Cometas. */}
          <span className="comet comet-1" />
          <span className="comet comet-2" />

          {/* Planeta: círculo gigante ancorado embaixo, com só o arco superior à mostra.
              O brilho da atmosfera vem das sombras (inset + externa), que acompanham
              a curva da borda em vez de uma linha reta. */}
          <div className="absolute left-1/2 top-[78%] aspect-square w-[300vw] -translate-x-1/2 overflow-hidden rounded-full border-t border-brand/30 bg-[radial-gradient(120%_120%_at_50%_0%,#07100b_0%,#020302_45%)] shadow-[inset_0_3px_28px_-8px_rgba(0,232,122,0.32),0_-6px_60px_-16px_rgba(0,232,122,0.2)] sm:w-[240vw] lg:w-[200vw]">
            {/* Halftone de pontos verdes na atmosfera, no mesmo estilo das mãos do hero.
                O mask concentra os pontos na faixa do topo (rim) e some descendo. */}
            <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(3,150,82,0.75)_1px,transparent_1.7px)] [background-size:7px_7px] [mask-image:radial-gradient(140%_140%_at_50%_0%,#000_0%,#000_4%,transparent_15%)] [-webkit-mask-image:radial-gradient(140%_140%_at_50%_0%,#000_0%,#000_4%,transparent_15%)]" />
          </div>
        </div>

        <div ref={copyRef} className="relative z-10 flex max-w-[760px] flex-col items-center gap-6">
          <h2 className="text-balance text-[34px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[52px] lg:text-[60px]">
            Conte o que precisa. A gente responde em 24h.
          </h2>
          <p className="max-w-[52ch] font-mono text-[15px] leading-relaxed text-white/55">
            A primeira conversa é um diagnóstico de 30 minutos, sem custo. A gente olha o seu cenário e diz se é caso para nós, inclusive quando a resposta é não.
          </p>
          <div className="cta-row mt-2 flex flex-wrap items-center justify-center gap-3">
            <StartChallengeButton href={`mailto:${EMAIL}?subject=Agendar%20diagn%C3%B3stico`}>
              Agendar diagnóstico
            </StartChallengeButton>
            <FreeTrialButton href={WHATSAPP}>WhatsApp</FreeTrialButton>
          </div>
        </div>
      </div>

      {/* Footer, logo abaixo do planeta. */}
      <div className="w-full border-t border-brand-line/25">
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
