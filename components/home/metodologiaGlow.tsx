"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Fração do caminho que o pulso ocupa, e quanto tempo leva cada travessia.
const TAMANHO_PULSO = 0.16;
const DURACAO = 7;

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
        // topo do 01, desce no divisor 01/02, base do 02, sobe no divisor
        // 02/03, topo do 03 e 04, desce na borda direita, volta pela base.
        d: `M 0 0 H ${x(1)} V ${h} H ${x(2)} V 0 H ${w} V ${h} H ${x(3)}`,
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
      { strokeDashoffset: pulso },
      {
        strokeDashoffset: -total,
        duration: DURACAO,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      }
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
