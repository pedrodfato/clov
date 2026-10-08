"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useTelaGrande from "../useTelaGrande";
import type { EstadoLuz } from "../HeroLuz";

gsap.registerPlugin(ScrollTrigger);

const HeroLuz = dynamic(() => import("../HeroLuz"), { ssr: false });

// Onde os dedos se encontram, em fração da primeira tela.
const ALVO = { x: 0.5, y: 0.52 };
// Meia distância entre as pontas no toque, em px: encostam, não se atravessam.
const FOLGA = 3;

// Ponta do dedo dentro da caixa de cada mão, em fração da caixa. Medido na
// imagem já girada pelo CSS; como tudo escala junto com a caixa, a fração
// vale em qualquer largura de tela.
const PONTA = {
  esquerda: { x: 1.01, y: 0.49 },
  direita: { x: 0.13, y: 0.345 },
};

/**
 * Primeira tela (hero + parceiros) presa no scroll: os textos somem, as mãos
 * andam até as pontas dos dedos se tocarem e a luz explode do ponto de
 * contato até cobrir a tela de branco.
 *
 * Enquanto isso, a seção seguinte já vem subindo por baixo do hero preso
 * (pinSpacing: false, como em coverTransition, só que com o hero por cima).
 * No branco total o hero fica invisível e a luz se dissolve sobre ela; o
 * dissolve acaba junto com o pin, quando a seção chega ao topo. Assim ela
 * aparece já encaixada, em vez de terminar de abrir com ela passando.
 *
 * Só em tela grande e com movimento: as mãos e o WebGL só existem lá, e no
 * celular a página rola normalmente.
 */
// Duração do pin, em alturas de tela. O espaçador depois do hero tem uma tela a
// menos: somado à altura do próprio hero, põe o topo da seção seguinte
// exatamente no fim do pin.
const PIN = 2.2;

export default function HeroToque({ children }: { children: React.ReactNode }) {
  const palcoRef = useRef<HTMLDivElement>(null);
  const luzRef = useRef<HTMLDivElement>(null);
  const dissolveRef = useRef<HTMLDivElement>(null);
  // Objeto estável que a timeline escreve e o shader lê; não dispara render.
  const [estado] = useState<EstadoLuz>(() => ({ progresso: 0, centro: [ALVO.x, ALVO.y] }));
  const telaGrande = useTelaGrande();
  // telaGrande só fica true depois da hidratação, então window existe aqui.
  const ativo = telaGrande && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const palco = palcoRef.current;
    const luz = luzRef.current;
    const dissolve = dissolveRef.current;
    if (!palco || !luz || !dissolve || !ativo) return;

    // O irmão logo depois do hero é o espaçador; a seção vem depois dele.
    const proxima = palco.nextElementSibling?.nextElementSibling;
    const texto = palco.querySelector("[data-hero-texto]");
    // O conteúdo, não a faixa: sumindo o fundo dela, abria um buraco por onde
    // aparecia a seção que sobe por baixo.
    const parceiros = palco.querySelectorAll("[data-hero-parceiros] > *");
    const esquerda = palco.querySelector<HTMLElement>('[data-mao="esquerda"]');
    const direita = palco.querySelector<HTMLElement>('[data-mao="direita"]');
    if (!proxima || !texto || !parceiros.length || !esquerda || !direita) return;

    // Quanto a mão precisa andar para a ponta do dedo chegar ao alvo. Mede a
    // caixa externa, que o GSAP não move, então a conta não depende de onde a
    // animação está; as funções relêem o layout a cada refresh.
    const ate = (mao: HTMLElement, ponta: { x: number; y: number }, lado: -1 | 1) => {
      const medir = () => [mao.parentElement!.getBoundingClientRect(), palco.getBoundingClientRect()];
      return {
        x: () => {
          const [caixa, tela] = medir();
          return tela.left + ALVO.x * tela.width + lado * FOLGA - (caixa.left + ponta.x * caixa.width);
        },
        y: () => {
          const [caixa, tela] = medir();
          return tela.top + ALVO.y * tela.height - (caixa.top + ponta.y * caixa.height);
        },
      };
    };
    const escreve = () => {
      estado.progresso = brilho.v;
    };

    const brilho = { v: 0 };

    const ctx = gsap.context(() => {
      gsap.set(luz, { autoAlpha: 0 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: palco,
            start: "top top",
            end: `+=${PIN * 100}%`,
            pin: true,
            // Sem espaçador do GSAP: o nosso (abaixo) é uma tela mais curto,
            // então a seção seguinte rola por baixo do hero durante o pin.
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
            // Primeira seção presa da página: recalcula antes das de baixo.
            refreshPriority: 1,
          },
        })
        // 1. Os textos saem, ficam só as mãos.
        .to(texto, { autoAlpha: 0, y: -48, filter: "blur(10px)", duration: 0.2, ease: "power1.in" }, 0)
        .to(parceiros, { autoAlpha: 0, duration: 0.14 }, 0)
        // 2. As mãos se procuram até os dedos encostarem.
        .to(esquerda, { ...ate(esquerda, PONTA.esquerda, -1), duration: 0.49, ease: "power2.inOut" }, 0.06)
        .to(direita, { ...ate(direita, PONTA.direita, 1), duration: 0.49, ease: "power2.inOut" }, 0.06)
        // 3. No toque, a luz explode do ponto de contato e toma a tela.
        .set(luz, { autoAlpha: 1 }, 0.55)
        .fromTo(brilho, { v: 0 }, { v: 1, duration: 0.29, ease: "power2.in", onUpdate: escreve }, 0.55)
        // 4. No branco total a seção seguinte está a ~30% do topo, subindo por
        //    baixo. O hero some e a luz se dissolve sobre ela, terminando junto
        //    com o pin: ela chega ao topo com a tela já aberta.
        //    (1 - 0.86) × PIN telas ≈ 0,3 tela de percurso para abrir.
        //    autoAlpha, não só opacity: dissolvida, a camada fica `hidden` e
        //    deixa de existir para o clique e para o compositor.
        .set(palco, { autoAlpha: 0 }, 0.85)
        .to(dissolve, { autoAlpha: 0, duration: 0.14, ease: "power1.out" }, 0.86)
        // Progresso zerado no fim: com a luz invisível o shader para de desenhar.
        .to(brilho, { v: 0, duration: 0.001, onUpdate: escreve }, 0.999);
    }, palco);

    return () => {
      ctx.revert();
      estado.progresso = 0;
    };
  }, [ativo, estado]);

  return (
    <>
    {/* z-20: durante o pin a seção seguinte sobe por baixo do hero, não por cima. */}
    <div ref={palcoRef} className="relative z-20 flex min-h-[100svh] flex-col">
      {children}
      {/* A luz fica fixa na tela enquanto a próxima seção sobe. Dentro do
          ScrollSmoother o conteúdo é transformado e `fixed` passaria a valer
          para ele, não para a janela; por isso ela vai para o body, como o
          header. */}
      {ativo &&
        createPortal(
          // Acima do header (z-50): no branco total, a tela inteira é luz.
          <div ref={luzRef} aria-hidden className="pointer-events-none invisible fixed inset-0 z-[60]">
            <div ref={dissolveRef} className="h-full w-full">
              <HeroLuz estado={estado} className="h-full w-full" />
            </div>
          </div>,
          document.body
        )}
    </div>
    {/* Espaçador do pin: PIN - 1 telas. Em % de altura de tela, a mesma
        unidade do `end` do ScrollTrigger. */}
    {ativo && <div aria-hidden style={{ height: `${(PIN - 1) * 100}vh` }} />}
    </>
  );
}
