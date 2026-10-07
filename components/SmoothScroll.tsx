"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const conteudoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const conteudo = conteudoRef.current;
    if (!conteudo) return;

    const refresh = () => ScrollTrigger.refresh();

    // Abrir um accordion (soluções, FAQ) muda a altura da página, mas o
    // ScrollTrigger guarda as posições em cache. Sem recalcular, o pin dispara
    // no lugar errado: a seção presa passa direto e a de cima chega já
    // desbotada. Observa a altura real do conteúdo e recalcula quando ela muda.
    let ultimaAltura = Math.round(conteudo.getBoundingClientRect().height);
    let pendente: ReturnType<typeof setTimeout> | undefined;

    const observer = new ResizeObserver(() => {
      const altura = Math.round(conteudo.getBoundingClientRect().height);
      // O próprio refresh mexe no layout dos elementos presos; sem comparar a
      // altura, ele se re-dispararia em laço.
      if (altura === ultimaAltura) return;
      ultimaAltura = altura;
      // O accordion abre com transição de altura. Esperar o silêncio evita
      // recalcular em cima de uma medida no meio do caminho.
      clearTimeout(pendente);
      pendente = setTimeout(refresh, 250);
    });
    observer.observe(conteudo);

    // A altura também muda depois do load, quando fontes e imagens chegam.
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    // Sem create() os dois divs ficam no fluxo normal — o site segue funcionando.
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = reduzido ? null : ScrollSmoother.create({ smooth: 1.1, smoothTouch: 0 });

    // Âncoras (#secao): o salto nativo do navegador rola o #smooth-wrapper,
    // que é fixo e sem barra, em vez da janela. O conteúdo ia parar milhares
    // de pixels para cima dentro dele e a tela ficava preta. Quem rola é o
    // ScrollSmoother, que conhece os pins e o espaço que eles ocupam.
    const alvoDe = (hash: string) => (hash === "#" ? 0 : document.querySelector(hash));
    const irPara = (e: MouseEvent) => {
      if (!smoother || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash) return;
      const alvo = alvoDe(hash);
      if (alvo === null) return;
      e.preventDefault();
      // Sem gravar o #secao na URL: recarregar volta ao topo, como antes.
      smoother.scrollTo(alvo, true, "top top");
    };
    document.addEventListener("click", irPara);

    // Página aberta já com #secao na URL (link de fora). O navegador salta
    // antes do React, mas depois os pins entram e empurram as seções de baixo,
    // em outro ciclo de render. Em vez de rolar uma vez e errar, a rolagem é
    // refeita a cada refresh do ScrollTrigger até o layout assentar, e para
    // assim que a pessoa rola por conta própria.
    let pararHash = () => {};
    const alvoInicial = location.hash ? alvoDe(location.hash) : null;
    const wrapper = document.getElementById("smooth-wrapper");
    if (smoother && alvoInicial !== null && wrapper) {
      wrapper.scrollTop = 0;
      const seguir = () => smoother.scrollTo(alvoInicial, false, "top top");
      const eventos = ["wheel", "touchstart", "keydown"] as const;
      const timer = setTimeout(() => pararHash(), 4000);
      pararHash = () => {
        clearTimeout(timer);
        ScrollTrigger.removeEventListener("refresh", seguir);
        eventos.forEach((ev) => window.removeEventListener(ev, pararHash));
      };
      ScrollTrigger.addEventListener("refresh", seguir);
      eventos.forEach((ev) => window.addEventListener(ev, pararHash, { passive: true }));
      requestAnimationFrame(seguir);
    }

    return () => {
      clearTimeout(pendente);
      observer.disconnect();
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", irPara);
      pararHash();
      smoother?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div ref={conteudoRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
