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

    return () => {
      clearTimeout(pendente);
      observer.disconnect();
      window.removeEventListener("load", refresh);
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
