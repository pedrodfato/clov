"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Fração do circuito que o pulso ocupa, e a velocidade dele em px por
// segundo. Velocidade em vez de duração fixa: o circuito muda de comprimento
// com a largura da tela, e a duração é calculada a partir dele.
const TAMANHO_PULSO = 0.1;
const VELOCIDADE = 280;

export default function MetodologiaGlow() {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [caminho, setCaminho] = useState<{ d: string; w: number; h: number } | null>(null);
  const [anima, setAnima] = useState(false);

  // Sem movimento o pulso não existe, e o path ficaria desenhado inteiro e
  // aceso em volta da grade. Melhor não renderizar nada.
  useEffect(() => {
    setAnima(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // O caminho é medido nas células de verdade, em pixels, e não num viewBox
  // normalizado: com preserveAspectRatio="none" o traço sairia grosso na
  // horizontal e fino na vertical.
  useEffect(() => {
    const host = hostRef.current;
    const grade = host?.parentElement?.querySelector("ol");
    if (!host || !grade) return;

    const medir = () => {
      const r = grade.getBoundingClientRect();
      const celulas = [...grade.children].map((c) => c.getBoundingClientRect());

      // O traçado pressupõe as quatro colunas numa linha só. Quando a grade
      // quebra (tablet e celular) o caminho deixaria de bater com as bordas.
      const umaLinha = celulas.length === 4 && celulas.every((c) => Math.abs(c.top - celulas[0].top) < 1);
      if (!umaLinha) return setCaminho(null);

      const w = Math.round(r.width);
      const h = Math.round(r.height);
      const x = (i: number) => Math.round(celulas[i].left - r.left);

      setCaminho({
        // Circuito fechado. Ida: topo do 01, desce 01/02, base do 02, sobe
        // 02/03, topo do 03, desce 03/04, base do 04 até a direita. Volta:
        // sobe a borda direita, topo do 04 e 03, desce 02/03, base do 02 e
        // 01, sobe a borda esquerda e fecha no ponto de partida.
        d:
          // ida: topo do 01, desce 01/02, base do 02, sobe 02/03, topo do 03,
          // desce 03/04, base do 04 até a direita.
          `M 0 0 H ${x(1)} V ${h} H ${x(2)} V 0 H ${x(3)} V ${h} H ${w}` +
          // volta em ziguezague: sobe a direita, topo do 04, desce 03/04,
          // base do 03, sobe 02/03, topo do 02, desce 01/02, base do 01 e
          // sobe pela borda esquerda, fechando no ponto de partida.
          ` V 0 H ${x(3)} V ${h} H ${x(2)} V 0 H ${x(1)} V ${h} H 0 V 0 Z`,
        w,
        h,
      });
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(grade);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !caminho || !anima) return;

    const total = path.getTotalLength();
    const pulso = total * TAMANHO_PULSO;
    path.style.strokeDasharray = `${pulso} ${total}`;

    const anim = gsap.fromTo(
      path,
      { strokeDashoffset: 0 },
      { strokeDashoffset: -total, duration: total / VELOCIDADE, ease: "none", repeat: -1 }
    );

    return () => {
      anim.kill();
    };
  }, [caminho, anima]);

  return (
    <div ref={hostRef} className="pointer-events-none absolute inset-0 hidden lg:block">
      {caminho && anima && (
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${caminho.w} ${caminho.h}`}
          fill="none"
          aria-hidden
        >
          <defs>
            <filter id="metodologia-brilho" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="borrado" />
              <feMerge>
                <feMergeNode in="borrado" />
                <feMergeNode in="borrado" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={caminho.d}
            stroke="#00e87a"
            strokeWidth={1}
            opacity={0.09}
            filter="url(#metodologia-brilho)"
          />

          <path
            ref={pathRef}
            d={caminho.d}
            stroke="#00e87a"
            strokeWidth={1.5}
            strokeLinecap="round"
            filter="url(#metodologia-brilho)"
          />
        </svg>
      )}
    </div>
  );
}
