"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import useTelaGrande from "../useTelaGrande";

// As três etapas, cada uma numa face do cubo. O corpo é por palavra: as três
// têm comprimentos bem diferentes. A caixa do cubo se mede pelo maior, então
// dá para mexer nestes números sem acertar mais nada.
const PALAVRAS = [
  { texto: "Análise", corpo: 68 },
  { texto: "Desenvolvimento", corpo: 53 },
  { texto: "Deploy", corpo: 70 }, 
];

// Quantos cubos empilhados e quanto a pilha inclina, em graus. O giro entra
// na conta da escala: inclinada, a pilha ocupa muito mais largura.
// A pilha cheia só no desktop: na coluna estreita do celular ela vira um
// borrão de texto. O mesmo corte de 1024px que o resto do site usa.
const N_DESKTOP = 19;
const N_CELULAR = 12;
const GIRO = 9;

// Giro de cada face e seu brilho quando está nessa posição: a da frente quase
// branca, as laterais mais apagadas, a de trás preta.
const ROTS = [
  { ry: 270, luz: 0.5 },
  { ry: 0, luz: 0.85 },
  { ry: 90, luz: 0.4 },
  { ry: 180, luz: 0 },
];

// Verde da marca variando pouco ao longo da pilha, do mais quente ao mais frio.
const cor = (i: number, n: number, luz: number) => `hsl(${(i / n) * 28 + 142}, 88%, ${100 * luz}%)`;

export default function PalavrasGirando() {
  const povRef = useRef<HTMLDivElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const n = useTelaGrande() ? N_DESKTOP : N_CELULAR;

  useEffect(() => {
    const pov = povRef.current;
    const tray = trayRef.current;
    if (!pov || !tray) return;

    const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const dados = gsap.utils.toArray<HTMLElement>(".v2-die");

      dados.forEach((die, i) => {
        const cubo = die.querySelector<HTMLElement>(".v2-cube");
        const faces = die.querySelectorAll<HTMLElement>(".v2-face");
        if (!cubo) return;

        // Monta o cubo: as faces giram em torno de um eixo no centro dele.
        // O raio é metade da largura, senão as faces laterais não fecham.
        const raio = die.offsetWidth / 2;
        gsap.set(faces, {
          z: raio,
          rotateY: (j: number) => ROTS[j].ry,
          transformOrigin: `50% 50% ${-raio - 1}px`,
        });

        if (parado) {
          gsap.set(faces, { color: (j: number) => cor(i, n, ROTS[(j + 1) % 4].luz) });
          return;
        }

        // Meia volta de ida e volta, com as cores acompanhando a face que vem
        // para a frente. O progress inicial defasa cada cubo e cria a onda.
        gsap
          .timeline({ repeat: -1, yoyo: true, defaults: { ease: "power3.inOut", duration: 1 } })
          .fromTo(cubo, { rotateY: -90 }, { rotateY: 90, ease: "power1.inOut", duration: 3 })
          .fromTo(
            faces,
            { color: (j: number) => cor(i, n, [ROTS[3].luz, ROTS[0].luz, ROTS[1].luz][j]) },
            { color: (j: number) => cor(i, n, [ROTS[0].luz, ROTS[1].luz, ROTS[2].luz][j]) },
            0
          )
          .to(faces, { color: (j: number) => cor(i, n, [ROTS[1].luz, ROTS[2].luz, ROTS[3].luz][j]) }, 1)
          .progress(i / n);
      });

      if (parado) return;

      // A pilha inteira balança, gira devagar e respira.
      gsap
        .timeline()
        .from(tray, { yPercent: -3, duration: 2, ease: "power1.inOut", yoyo: true, repeat: -1 }, 0)
        .fromTo(tray, { rotate: -GIRO }, { rotate: GIRO, duration: 4, ease: "power1.inOut", yoyo: true, repeat: -1 }, 0)
        .to(tray, { scale: 1.06, duration: 2, ease: "power3.inOut", yoyo: true, repeat: -1 }, 0);
    }, pov);

    // A pilha tem altura fixa em px; a escala é que a encaixa no espaço da
    // seção. Divide também pela largura: numa coluna estreita é ela, e não a
    // altura, que manda — senão a pilha vaza pelos lados ao girar.
    const medir = () => {
      const die = tray.querySelector<HTMLElement>(".v2-die");
      if (!die) return;
      const h = n * die.offsetHeight;
      gsap.set(tray, { height: h });

      // Largura que a pilha ocupa já inclinada: a altura dela entra na conta
      // pelo seno do giro, e é o que faz as palavras encostarem na borda.
      const rad = (GIRO * Math.PI) / 180;
      const larguraInclinada = die.offsetWidth * Math.cos(rad) + h * Math.sin(rad);
      // 0.8 reserva uma faixa livre de 10% de cada lado.
      gsap.set(pov, {
        scale: Math.min(pov.clientHeight / h, (pov.clientWidth * 0.8) / larguraInclinada),
      });
    };
    medir();
    window.addEventListener("resize", medir);

    return () => {
      window.removeEventListener("resize", medir);
      ctx.revert();
      gsap.set(pov, { clearProps: "transform" });
    };
  }, [n]);

  return (
    <div ref={povRef} aria-hidden className="v2-pov">
      <div ref={trayRef}>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className="v2-die">
            <div className="v2-medida" aria-hidden>
              {PALAVRAS.map((p) => (
                <span key={p.texto} style={{ fontSize: p.corpo }}>
                  {p.texto}
                </span>
              ))}
            </div>
            <div className="v2-cube">
              {PALAVRAS.map((p) => (
                <div key={p.texto} className="v2-face" style={{ fontSize: p.corpo, letterSpacing: "0.02em" }}> 
                  {p.texto}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
