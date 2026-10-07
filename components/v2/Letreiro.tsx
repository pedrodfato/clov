"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Frase gigante em degradê que atravessa a tela: entra inteira pela direita e
 * sai pela esquerda enquanto a seção está à vista. Entre as partes, uma
 * bolinha verde fluorescente.
 */
type Props = { partes?: string[]; linhas?: string[] };

export default function Letreiro({ partes, linhas }: Props) {
  const secaoRef = useRef<HTMLElement>(null);
  const faixaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;
    // Sem movimento a frase fica parada e legível, alinhada à esquerda.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (linhas?.length) {
        const itens = gsap.utils.toArray<HTMLElement>(".v2-letreiro-linha", secao);
        gsap.set(itens, { x: () => secao.offsetWidth });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: secao,
            start: "top 95%",
            end: "top 15%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        itens.forEach((item, index) => {
          timeline.to(item, { x: 0, duration: 1, ease: "none" }, index);
        });
        return;
      }

      const faixa = faixaRef.current;
      if (!faixa) return;

      gsap.fromTo(
        faixa,
        { x: () => secao.offsetWidth },
        {
          x: () => -faixa.offsetWidth,
          ease: "none",
          scrollTrigger: {
            trigger: secao,
            // A travessia inteira acontece com a seção já à vista. Com
            // "top bottom" ela começava fora da tela, e quando a seção
            // chegava ao centro o texto já estava no meio do caminho.
            start: "top 75%",
            end: "bottom 25%",
            // scrub com número: o movimento persegue o scroll em vez de colar
            // nele, o que tira o serrilhado de quem rola de roda em roda.
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, secao);
    return () => ctx.revert();
  }, [linhas]);

  return (
    <section
      ref={secaoRef}
      aria-hidden
      className={
        linhas?.length
          ? "relative flex min-h-[42vh] w-full items-center overflow-hidden bg-surface py-10 sm:py-14"
          : "relative flex min-h-[60vh] w-full items-center overflow-hidden bg-surface"
      }
    >
      {linhas?.length ? (
        <div className="grid w-full gap-1 overflow-hidden">
          {linhas.map((linha) => (
            <div
              key={linha}
              className="v2-degrade v2-letreiro-linha w-max whitespace-nowrap text-[clamp(4rem,10vw,12rem)] font-normal leading-[0.92] tracking-[-0.05em]"
            >
              {linha}
            </div>
          ))}
        </div>
      ) : (
        /* w-max: sem isso a faixa mede a largura da tela, e não a do texto.
           leading folgado: o degradê só pinta dentro da caixa do elemento. */
        <div
          ref={faixaRef}
          className="v2-degrade flex w-max items-center whitespace-nowrap text-[13vw] font-normal leading-[1.2] tracking-[-0.04em] md:text-[13.5vw]"
        >
          {(partes ?? []).map((parte, i) => (
            <span key={parte} className="flex items-center">
              {i > 0 && (
                <span className="mx-[0.34em] h-[0.13em] w-[0.13em] shrink-0 rounded-full bg-[#4bff9f] shadow-[0_0_0.22em_0.04em_rgba(75,255,159,0.9)]" />
              )}
              {parte}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
