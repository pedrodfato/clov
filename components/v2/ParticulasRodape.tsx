"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Brasas subindo da linha de luz do rodapé. Canvas movido pelo ticker do GSAP:
// centenas de nós no DOM, cada um com tween, custariam bem mais no celular.
// Três coisas dão o caráter: a emissão "respira" (o GSAP anima a intensidade),
// de tempos em tempos sai uma rajada, e o vento segue o mouse com atraso.
const MAX = 140;
const CORES = ["0,232,122", "125,255,191", "233,255,244"];

type P = { x: number; y: number; vy: number; r: number; vida: number; idade: number; fase: number; balanco: number; cor: number };

// Sprite do brilho desenhado uma vez por cor; drawImage é bem mais barato que shadowBlur.
function sprite(cor: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, `rgba(${cor},1)`);
  grad.addColorStop(0.25, `rgba(${cor},0.55)`);
  grad.addColorStop(1, `rgba(${cor},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  return c;
}

export default function ParticulasRodape() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sprites = CORES.map(sprite);
    const parts: P[] = [];
    const est = { intensidade: 0.6, vento: 0 };
    let w = 0;
    let h = 0;
    let visivel = false;
    let acumulo = 0;

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting));
    io.observe(canvas);

    const nascer = (n: number) => {
      for (let i = 0; i < n && parts.length < MAX; i++) {
        // Concentra perto do centro e das duas bordas da luz: x = soma de dois sorteios.
        const x = ((Math.random() + Math.random()) / 2) * w;
        parts.push({
          x,
          y: h + 4,
          vy: h * gsap.utils.random(0.25, 0.7),
          r: gsap.utils.random(2, 6),
          vida: gsap.utils.random(2.2, 4.2),
          idade: 0,
          fase: Math.random() * Math.PI * 2,
          balanco: gsap.utils.random(6, 22),
          cor: Math.random() < 0.6 ? 0 : Math.random() < 0.7 ? 1 : 2,
        });
      }
    };

    const ctxG = gsap.context(() => {
      // Respiração: a emissão sobe e desce devagar, em vez de ser uniforme.
      gsap.to(est, { intensidade: 1.3, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      // Rajada ocasional, como uma fagulha que estoura.
      const rajada = () => {
        nascer(gsap.utils.random(14, 26, 1));
        gsap.delayedCall(gsap.utils.random(3.5, 7), rajada);
      };
      gsap.delayedCall(2, rajada);
    });

    const ventoPara = gsap.quickTo(est, "vento", { duration: 1.6, ease: "power3.out" });
    const mover = (e: PointerEvent) => ventoPara((e.clientX / window.innerWidth - 0.5) * 70);
    window.addEventListener("pointermove", mover);

    const tick = () => {
      if (!visivel) return;
      const dt = Math.min(gsap.ticker.deltaRatio(60) / 60, 0.05);
      acumulo += (w / 14) * est.intensidade * dt;
      if (acumulo >= 1) {
        nascer(Math.floor(acumulo));
        acumulo %= 1;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.idade += dt;
        if (p.idade >= p.vida) {
          parts.splice(i, 1);
          continue;
        }
        const t = p.idade / p.vida;
        p.y -= p.vy * dt * (1 - t * 0.6);
        p.x += (est.vento * dt) * (0.4 + t) + Math.sin(p.idade * 2 + p.fase) * p.balanco * dt;
        // Acende rápido, apaga devagar; o brilho encolhe junto.
        const alfa = Math.min(1, t * 8) * (1 - t) ** 1.5;
        const d = p.r * (1 - t * 0.5) * 2;
        ctx.globalAlpha = alfa * 0.85;
        ctx.drawImage(sprites[p.cor], p.x - d / 2, p.y - d / 2, d, d);
      }
      ctx.globalAlpha = 1;
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", mover);
      ctxG.revert();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
