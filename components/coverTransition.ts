import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Timeline da transição em camadas: `presa` fica fixa na tela enquanto a seção
 * seguinte sobe por cima dela como uma folha opaca.
 *
 * `pinSpacing: false` é o ponto que faz funcionar. Com o espaçador padrão, o
 * pin empurra a posição natural da seção de cima uma tela para baixo, e ela
 * termina o percurso sem nunca chegar a cobrir. Sem espaçador, a seção de cima
 * sobe por scroll nativo, e o percurso custa exatamente a altura da seção
 * presa, em vez de consumir distância extra.
 *
 * Por isso a seção presa precisa ter a altura da viewport: o `end` é a altura
 * dela, e é esse valor que faz a cobertura terminar junto com o pin.
 */
export default function timelineDeCobertura(presa: HTMLElement) {
  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: presa,
      start: "top top",
      end: () => `+=${presa.offsetHeight}`,
      pin: presa,
      pinSpacing: false,
      // Sem valor de atraso: a posição é a do scroll, 1:1. Com lag o movimento
      // chega atrasado e a tela parece travada em vez de arrastada.
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}
