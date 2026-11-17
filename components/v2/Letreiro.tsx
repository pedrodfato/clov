"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LARGURA = 1440;

/**
 * Frase gigante em degradê que atravessa a tela sobre uma onda: entra pela
 * direita e sai pela esquerda enquanto a seção está à vista. Entre as partes,
 * uma bolinha verde fluorescente.
 *
 * No celular ela não corre: a frase é mais larga que a tela, e deslizando
 * nunca dava para ler inteira. Lá ela fica parada, quebrada em linhas e
 * alinhada à esquerda.
 */
export default function Letreiro({ partes }: { partes: string[] }) {
  const secaoRef = useRef<HTMLElement>(null);
  const curvaRef = useRef<SVGPathElement>(null);
  const textoRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // No celular a frase não corre: as partes, empilhadas, acendem uma por
      // vez conforme a seção sobe.
      if (!window.matchMedia("(min-width: 768px)").matches) {
        const itens = gsap.utils.toArray<HTMLElement>(".v2-letreiro-parte", secao);
        gsap.set(itens, { y: 40, opacity: 0.12, filter: "blur(6px)" });
        gsap.to(itens, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          stagger: 0.3,
          scrollTrigger: { trigger: secao, start: "top 85%", end: "center 55%", scrub: 1 },
        });
        return;
      }

      const curva = curvaRef.current;
      const texto = textoRef.current;
      if (!curva || !texto) return;

      // A frase anda sobre uma onda. A onda ondula com o scroll e, quanto mais
      // rápido se rola, mais ela verga; parou de rolar, ela relaxa.
      const estado = { p: 0, verga: 0 };
      const desenha = () => {
        const fase = estado.p * Math.PI * 1.6;
        const amp = 110 + estado.verga * 90;
        let d = "";
        for (let i = 0; i <= 96; i++) {
          const x = -200 + (i / 96) * (LARGURA + 400);
          const y = 380 + amp * Math.sin((x / LARGURA) * Math.PI * 1.8 + fase);
          d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        curva.setAttribute("d", d);
        const total = curva.getTotalLength();
        const frase = texto.getComputedTextLength();
        // Entra pela ponta direita da onda e sai inteira pela esquerda.
        texto.firstElementChild?.setAttribute("startOffset", String(total - estado.p * (total + frase)));
      };
      const vergaPara = gsap.quickTo(estado, "verga", { duration: 0.9, ease: "power3.out", onUpdate: desenha });

      // A seção fica presa um tempo no meio da tela: sem isso a última parte
      // da frase chegava quando a seção já estava saindo por cima.
      const preso = ScrollTrigger.create({ trigger: secao, start: "center center", end: "+=110%", pin: true });

      gsap.to(estado, {
        p: 1,
        ease: "none",
        onUpdate: desenha,
        scrollTrigger: {
          trigger: secao,
          start: "top 75%",
          // Termina meia tela depois de soltar, com a frase saindo inteira.
          end: () => preso.end + window.innerHeight * 0.5,
          // scrub mais longo que o resto do site: a frase desliza atrás do
          // scroll em vez de colar nele.
          scrub: 1.6,
          onUpdate: (self) => vergaPara(gsap.utils.clamp(-1, 1, self.getVelocity() / 2500)),
          onScrubComplete: () => vergaPara(0),
        },
      });
      desenha();
    }, secao);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={secaoRef}
      aria-hidden
      className="relative flex w-full items-center overflow-hidden bg-surface px-6 py-24 sm:px-10 md:px-0 md:py-10"
    >
      {/* Tela grande: a frase corre sobre a onda, em SVG. */}
      <svg viewBox={`0 0 ${LARGURA} 760`} className="hidden w-full overflow-visible md:block">
        <defs>
          <linearGradient id="v2-letreiro-degrade" gradientUnits="userSpaceOnUse" x1="0" x2={LARGURA} y1="0" y2="0">
            <stop offset="0" stopColor="#00e87a" />
            <stop offset="0.45" stopColor="#7dffbf" />
            <stop offset="0.7" stopColor="#e9fff4" />
            <stop offset="1" stopColor="#e9fff4" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path ref={curvaRef} id="v2-letreiro-onda" fill="none" />
        <text ref={textoRef} fill="url(#v2-letreiro-degrade)" fontSize="190" letterSpacing="-7">
          <textPath href="#v2-letreiro-onda" startOffset={LARGURA}>
            {partes.map((parte, i) => (
              <tspan key={parte}>
                {i > 0 && <tspan fill="#4bff9f" fontSize="60" dx="36" dy="-50">{"●"}</tspan>}
                <tspan dx={i > 0 ? 30 : 0} dy={i > 0 ? 50 : 0}>{parte}</tspan>
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>

      {/* Celular: empilhada, centralizada, com a bolinha entre as partes. */}
      <div className="flex w-full flex-col items-center gap-3 text-center md:hidden">
        {partes.map((parte, i) => (
          <div key={parte} className="v2-letreiro-parte flex flex-col items-center gap-3">
            {i > 0 && (
              <span className="h-2 w-2 rounded-full bg-[#4bff9f] shadow-[0_0_14px_3px_rgba(75,255,159,0.7)]" />
            )}
            <span className="bg-[linear-gradient(90deg,#00e87a,#7dffbf_55%,#e9fff4)] bg-clip-text text-balance text-[13vw] text-transparent font-normal leading-[1.18] tracking-[-0.045em]">
              {parte}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
