"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Frase gigante em degradê que atravessa a tela: entra inteira pela direita e
 * sai pela esquerda enquanto a seção está à vista. Entre as partes, uma
 * bolinha verde fluorescente.
 *
 * No celular ela não corre: a frase é mais larga que a tela, e deslizando
 * nunca dava para ler inteira. Lá ela fica parada, quebrada em linhas e
 * alinhada à esquerda.
 *
 * Com `linhas`, a frase fica centralizada e cada linha sobe do pé da tela.
 */
type Props = { partes?: string[]; linhas?: string[] };

export default function Letreiro({ partes, linhas }: Props) {
  const secaoRef = useRef<HTMLElement>(null);
  const faixaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // As linhas sobem do pé da tela acendendo, uma depois da outra, e
      // assentam quando a seção chega ao centro. Sem travessia lateral, então
      // vale também no celular.
      if (linhas?.length) {
        const itens = gsap.utils.toArray<HTMLElement>(".v2-letreiro-linha", secao);
        // set separado: num fromTo com stagger, só a primeira linha nascia
        // escondida e a segunda aparecia pronta antes da hora.
        // Distância fixa, não yPercent: no celular cada frase quebra em duas
        // ou três linhas e 90% da altura empurrava o texto para fora da seção.
        gsap.set(itens, { y: 120, opacity: 0 });
        gsap.to(
          itens,
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            stagger: 0.35,
            scrollTrigger: {
              trigger: secao,
              start: "top bottom",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
        return;
      }

      // No celular a faixa não corre: fica parada e legível.
      if (!window.matchMedia("(min-width: 768px)").matches) return;

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
          ? "relative flex w-full items-center bg-surface px-6 py-16 sm:px-10 md:min-h-[42vh] md:px-0 md:py-14"
          : "relative flex w-full items-center overflow-hidden bg-surface px-6 py-16 sm:px-10 md:min-h-[60vh] md:px-0 md:py-0"
      }
    >
      {linhas?.length ? (
        <div className="grid w-full justify-items-center gap-1">
          {/* Primeira frase branca; o degradê só na segunda. */}
          {linhas.map((linha, i) => (
            <div
              key={linha}
              className={`${i === 0 ? "text-ink" : "v2-degrade"} v2-letreiro-linha text-center text-[11vw] font-normal leading-[1.05] tracking-[-0.04em] md:w-max md:whitespace-nowrap md:text-[5.6vw] md:leading-[0.92] md:tracking-[-0.05em]`}
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
          className="v2-degrade flex flex-col items-start text-left text-[13vw] font-normal leading-[1.1] tracking-[-0.04em] md:w-max md:flex-row md:items-center md:whitespace-nowrap md:text-[13.5vw] md:leading-[1.2]"
        >
          {(partes ?? []).map((parte, i) => (
            <span key={parte} className="flex items-center">
              {/* A bolinha separa as partes em linha; empilhadas no celular,
                  elas já se separam pela quebra. */}
              {i > 0 && (
                <span className="mx-[0.34em] hidden h-[0.13em] w-[0.13em] shrink-0 rounded-full bg-[#4bff9f] shadow-[0_0_0.22em_0.04em_rgba(75,255,159,0.9)] md:block" />
              )}
              {parte}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
