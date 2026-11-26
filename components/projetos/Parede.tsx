"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ArrowLeft, ArrowRight, Move } from "lucide-react";
import StartChallengeButton from "../StartChallengeButton";
import { ENTRADA } from "../Reveal";
import { semIntro } from "../IntroReveal";
import { Moldura, NOVO, PROJETOS, Vaga, dois } from "./comum";
import Caso from "./Caso";
import type { Dicionario } from "@/dicionarios/pt";

gsap.registerPlugin(Draggable, InertiaPlugin);

type Props = { t: Dicionario["paginaProjetos"]; p: Dicionario["projetos"] };

// A parede, em unidades dela: px antes da escala da câmera.
const W = 3400;
const H = 2200;

// Onde cada tela está pregada (canto de cima à esquerda e largura), na ordem
// de PROJETOS. A última é a vaga do próximo projeto. A altura sai da largura
// (16:10) mais a barra.
const LUGARES = [
  { x: 1220, y: 700, w: 960 },
  { x: 200, y: 200, w: 760 },
  { x: 2440, y: 260, w: 760 },
  { x: 2480, y: 940, w: 700 },
  { x: 160, y: 900, w: 620 },
  { x: 520, y: 1520, w: 600 },
  { x: 2300, y: 1580, w: 580 },
  { x: 1400, y: 1560, w: 600 },
];

const centroDe = (i: number) => ({ x: LUGARES[i].x + LUGARES[i].w / 2, y: LUGARES[i].y + LUGARES[i].w * 0.3125 });

// Escala de descanso: no desktop sobra parede à volta do FinalForms (~40% da
// largura); no celular ele ocupa quase a tela inteira.
const escalaDe = (largura: number) => gsap.utils.clamp(0.38, 0.72, largura / 2300);

const REDONDO =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors active:border-brand/60 active:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const MOVIMENTO_REDUZIDO = "(prefers-reduced-motion: reduce)";
// No celular a parede encaixa uma tela por vez; no desktop ela é livre.
const celular = () => window.matchMedia("(max-width: 1023px)").matches;

// Grade de medição da parede: fina a cada 100 unidades, marcada a cada 400.
// Linhas de var(--u), 1px na tela em qualquer escala.
const GRADE: React.CSSProperties = {
  backgroundImage: [
    "linear-gradient(rgba(255,255,255,0.03) var(--u), transparent var(--u))",
    "linear-gradient(90deg, rgba(255,255,255,0.03) var(--u), transparent var(--u))",
    "linear-gradient(rgba(255,255,255,0.06) var(--u), transparent var(--u))",
    "linear-gradient(90deg, rgba(255,255,255,0.06) var(--u), transparent var(--u))",
  ].join(","),
  backgroundSize: "100px 100px, 100px 100px, 400px 400px, 400px 400px",
  maskImage: "radial-gradient(closest-side, #000 75%, transparent)",
  WebkitMaskImage: "radial-gradient(closest-side, #000 75%, transparent)",
};

// Os projetos pregados numa parede maior que a tela, que se explora
// arrastando. A entrada abre com a parede inteira à vista e mergulha até o
// FinalForms; abrir uma tela leva ela voando até o caso, com o orçamento ao lado.
export default function Parede({ t, p }: Props) {
  const secaoRef = useRef<HTMLElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const paredeRef = useRef<HTMLDivElement>(null);
  const vistaRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const molduras = useRef<(HTMLDivElement | null)[]>([]);
  const dragRef = useRef<Draggable | null>(null);
  const kRef = useRef(1);
  const arrastou = useRef(false);
  const rotuloRef = useRef(t.arraste);
  const [rotulo, setRotulo] = useState(t.arraste);
  const [mexeu, setMexeu] = useState(false);
  const [aberto, setAberto] = useState<number | null>(null);
  // A tela da vez no celular: a que a câmera encaixou.
  const [atual, setAtual] = useState(0);

  // Até onde a câmera vai: a borda da parede encosta na da tela, com folga.
  // Se a tela for maior que a parede, ela fica centrada.
  const limites = useCallback((k: number) => {
    const palco = palcoRef.current!;
    const folga = 160;
    const eixo = (tam: number, meio: number) => {
      const min = -(tam - meio) - folga;
      const max = -meio + folga;
      return min > max ? [-tam / 2, -tam / 2] : [min, max];
    };
    const [minX, maxX] = eixo(W, palco.clientWidth / (2 * k));
    const [minY, maxY] = eixo(H, palco.clientHeight / (2 * k));
    return { minX, maxX, minY, maxY };
  }, []);

  const leva = useCallback(
    (x: number, y: number, duracao: number, ease = "power3.out") => {
      const parede = paredeRef.current!;
      const b = limites(kRef.current);
      const reduzido = window.matchMedia(MOVIMENTO_REDUZIDO).matches;
      gsap.to(parede, {
        x: gsap.utils.clamp(b.minX, b.maxX, x),
        y: gsap.utils.clamp(b.minY, b.maxY, y),
        duration: reduzido ? 0 : duracao,
        ease,
        overwrite: true,
        onComplete: () => dragRef.current?.update(),
      });
    },
    [limites],
  );

  const irPara = useCallback(
    (i: number) => {
      const c = centroDe(i);
      leva(-c.x, -c.y, 0.9, "power3.inOut");
      setAtual(i);
    },
    [leva],
  );

  // Desloca a câmera em px de tela (roda, setas).
  const empurra = useCallback(
    (dx: number, dy: number) => {
      const parede = paredeRef.current!;
      const k = kRef.current;
      leva((gsap.getProperty(parede, "x") as number) - dx / k, (gsap.getProperty(parede, "y") as number) - dy / k, 0.6);
    },
    [leva],
  );

  // A tela cujo centro (já dentro dos limites) fica mais perto do ponto.
  const maisPerto = useCallback(
    (x: number, y: number) => {
      const b = limites(kRef.current);
      let melhor = { i: 0, x, y, d: Infinity };
      LUGARES.forEach((_, i) => {
        const c = centroDe(i);
        const px = gsap.utils.clamp(b.minX, b.maxX, -c.x);
        const py = gsap.utils.clamp(b.minY, b.maxY, -c.y);
        const d = Math.hypot(px - x, py - y);
        if (d < melhor.d) melhor = { i, x: px, y: py, d };
      });
      return melhor;
    },
    [limites],
  );

  useEffect(() => {
    const secao = secaoRef.current!;
    const palco = palcoRef.current!;
    const camera = cameraRef.current!;
    const parede = paredeRef.current!;
    const reduzido = window.matchMedia(MOVIMENTO_REDUZIDO).matches;
    // revert() no fim, e não kill(): no StrictMode o efeito roda duas vezes, e
    // um from() interrompido deixaria as telas presas invisíveis.
    const ctx = gsap.context(() => {}, secao);
    let tl: gsap.core.Timeline | undefined;
    const pressa = () => tl?.timeScale(5);

    const k = escalaDe(palco.clientWidth);
    kRef.current = k;
    camera.style.setProperty("--k", String(k));
    const b = limites(k);
    const c0 = centroDe(0);
    // No desktop a tela desce 60px para a legenda não passar por baixo do título.
    const desce = palco.clientWidth >= 1024 ? 60 / k : 0;
    const fim = { x: gsap.utils.clamp(b.minX, b.maxX, -c0.x), y: gsap.utils.clamp(b.minY, b.maxY, -c0.y + desce) };

    const drag = Draggable.create(parede, {
      type: "x,y",
      trigger: palco,
      bounds: b,
      inertia: !reduzido,
      edgeResistance: 0.8,
      dragClickables: true,
      zIndexBoost: false,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() {
        gsap.killTweensOf(parede);
        this.update();
        arrastou.current = false;
      },
      onDragStart() {
        arrastou.current = true;
        setMexeu(true);
      },
      // Celular: o arremesso termina sempre em cima de uma tela.
      snap: {
        points: (pt: { x: number; y: number }) => {
          if (!celular()) return pt;
          // Chamado ao soltar: a ficha já troca enquanto a tela desliza.
          const m = maisPerto(pt.x, pt.y);
          setAtual(m.i);
          return { x: m.x, y: m.y };
        },
      },
      maxDuration: 1,
      // Sem inércia (movimento reduzido) não há arremesso: encaixa direto.
      onDragEnd() {
        if (reduzido && celular()) irPara(maisPerto(this.x, this.y).i);
      },
    })[0];
    dragRef.current = drag;

    // O mapa acompanha a câmera a cada quadro: arrasto, inércia e tweens
    // mexem no mesmo transform, e ler daqui cobre os três.
    const vista = vistaRef.current;
    const atualizaMapa = () => {
      if (!vista) return;
      const kAgora = gsap.getProperty(camera, "scale") as number;
      const vw = palco.clientWidth / kAgora;
      const vh = palco.clientHeight / kAgora;
      const cx = -(gsap.getProperty(parede, "x") as number);
      const cy = -(gsap.getProperty(parede, "y") as number);
      vista.style.left = `${((cx - vw / 2) / W) * 100}%`;
      vista.style.top = `${((cy - vh / 2) / H) * 100}%`;
      vista.style.width = `${(vw / W) * 100}%`;
      vista.style.height = `${(vh / H) * 100}%`;
    };
    gsap.ticker.add(atualizaMapa);

    const hud = secao.querySelectorAll("[data-hud]");

    ctx.add(() => {
    if (reduzido) {
      gsap.set(camera, { scale: k });
      gsap.set(parede, fim);
      gsap.set(secao.querySelectorAll(".parede-espera"), { opacity: 1 });
    } else {
      // Começa de longe, com a parede inteira na tela, e mergulha.
      drag.disable();
      const kLonge = Math.min(palco.clientWidth / W, palco.clientHeight / H) * 0.92;
      gsap.set(camera, { scale: kLonge });
      gsap.set(parede, { x: -W / 2, y: -H / 2 });
      gsap.set(secao.querySelectorAll(".parede-espera"), { opacity: 1 });

      // As telas acendem do centro para fora.
      const pecas = gsap.utils.toArray<HTMLElement>("[data-peca]", parede).sort((a, b) => {
        const d = (el: HTMLElement) => Math.hypot(el.offsetLeft + el.offsetWidth / 2 - W / 2, el.offsetTop + el.offsetHeight / 2 - H / 2);
        return d(a) - d(b);
      });
      const telas = pecas.map((el) => el.querySelector("[data-tela]"));

      tl = gsap.timeline({
        delay: semIntro() ? 0.15 : 2.1,
        onComplete: () => {
          drag.applyBounds(limites(kRef.current));
          drag.enable();
          drag.update();
          palco.removeEventListener("pointerdown", pressa);
        },
      });
      tl.fromTo(
        "[data-grade]",
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(75% at 50% 50%)", duration: 1.6, ease: "power2.out" },
        0,
      )
        .from("[data-palavra]", { opacity: 0, scale: 0.92, duration: 1.4, ease: "power3.out" }, 0.1)
        .from(pecas, { opacity: 0, y: 70, duration: 0.9, ease: "power3.out", stagger: 0.09, clearProps: "opacity,transform" }, 0.3)
        .from(telas, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "power2.inOut", stagger: 0.09 }, 0.5)
        .to(camera, { scale: k, duration: 1.8, ease: "expo.inOut" }, "+=0.2")
        .to(parede, { x: fim.x, y: fim.y, duration: 1.8, ease: "expo.inOut" }, "<")
        .from(hud, { ...ENTRADA, y: 20, stagger: 0.08 }, "-=0.8");

      // Quem já quer mexer não espera: o resto da entrada corre.
      palco.addEventListener("pointerdown", pressa);
    }
    });

    const roda = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinça do trackpad: zoom do navegador
      e.preventDefault();
      if (tl?.isActive()) return pressa();
      const linha = e.deltaMode === 1 ? 40 : 1;
      empurra(e.deltaX * linha, e.deltaY * linha);
      setMexeu(true);
    };
    palco.addEventListener("wheel", roda, { passive: false });

    // Girar o celular ou redimensionar: nova escala, mesmo ponto no centro.
    // O observer também dispara ao começar; sem mudança de tamanho, nada.
    let tamanho = `${palco.clientWidth}x${palco.clientHeight}`;
    const redimensiona = () => {
      const agora = `${palco.clientWidth}x${palco.clientHeight}`;
      if (agora === tamanho) return;
      tamanho = agora;
      // A faixa do título muda de altura quando as fontes chegam, no meio da
      // entrada: a câmera já é centrada pelo CSS, e os limites se ajustam no fim.
      if (tl?.isActive()) return;
      const kNovo = escalaDe(palco.clientWidth);
      kRef.current = kNovo;
      camera.style.setProperty("--k", String(kNovo));
      gsap.set(camera, { scale: kNovo });
      const bNovo = limites(kNovo);
      drag.applyBounds(bNovo);
      gsap.set(parede, {
        x: gsap.utils.clamp(bNovo.minX, bNovo.maxX, gsap.getProperty(parede, "x") as number),
        y: gsap.utils.clamp(bNovo.minY, bNovo.maxY, gsap.getProperty(parede, "y") as number),
      });
      drag.update();
    };
    const ro = new ResizeObserver(redimensiona);
    ro.observe(palco);

    return () => {
      ro.disconnect();
      palco.removeEventListener("wheel", roda);
      palco.removeEventListener("pointerdown", pressa);
      gsap.ticker.remove(atualizaMapa);
      ctx.revert();
      drag.kill();
      dragRef.current = null;
    };
  }, [limites, empurra, maisPerto, irPara]);

  // Etiqueta que segue o mouse: diz o que acontece se apertar ali.
  const seguePonteiro = (e: React.PointerEvent) => {
    const cursor = cursorRef.current;
    if (!cursor || e.pointerType !== "mouse") return;
    const r = secaoRef.current!.getBoundingClientRect();
    const alvo = e.target as Element;
    // Em cima dos controles da barra (orçamento, mapa) a etiqueta sai do caminho.
    const fora = !palcoRef.current!.contains(alvo) && !!alvo.closest("button, a");
    gsap.to(cursor, { x: e.clientX - r.left, y: e.clientY - r.top, opacity: fora ? 0 : 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    const novo = alvo.closest<HTMLElement>("[data-rotulo]")?.dataset.rotulo ?? t.arraste;
    if (novo !== rotuloRef.current) {
      rotuloRef.current = novo;
      setRotulo(novo);
    }
  };

  const setas = (e: React.KeyboardEvent) => {
    const passo = 280;
    const d = { ArrowLeft: [-passo, 0], ArrowRight: [passo, 0], ArrowUp: [0, -passo], ArrowDown: [0, passo] }[e.key];
    if (!d) return;
    e.preventDefault();
    empurra(d[0], d[1]);
  };

  // Clique de verdade, não o fim de um arrasto que começou em cima da tela.
  // No celular, tocar numa tela vizinha traz ela para o centro; só a da vez abre.
  const abrir = (i: number) => {
    if (arrastou.current) return;
    if (celular() && i !== atual) return irPara(i);
    setAberto(i);
  };
  const passo = (n: number) => irPara((atual + n + LUGARES.length) % LUGARES.length);
  const projAtual = PROJETOS[atual];

  const noAr = PROJETOS.filter((x) => x.href).length;
  const contagem = t.contagem.replace("{n}", String(PROJETOS.length)).replace("{m}", String(noAr));

  return (
    <>
    <section
      ref={secaoRef}
      aria-labelledby="parede-titulo"
      onKeyDown={setas}
      onPointerMove={seguePonteiro}
      onPointerLeave={() => cursorRef.current && gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 })}
      className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-surface lg:block"
    >
      {/* Sem JS a parede não tem câmera: fica à vista como está. */}
      <noscript>
        <style>{`.parede-espera{opacity:1!important}`}</style>
      </noscript>

      {/* No celular a parede fica entre o título e a ficha, sem nada por cima. */}
      <div ref={palcoRef} className="parede-espera relative order-2 min-h-0 flex-1 touch-none select-none overflow-hidden opacity-0 lg:absolute lg:inset-0">
        <div
          ref={cameraRef}
          className="absolute left-1/2 top-1/2 origin-top-left [--k:1] [--u:calc(1px/var(--k))]"
        >
          <div ref={paredeRef} className="absolute left-0 top-0 will-change-transform" style={{ width: W, height: H }}>
            {/* Luz verde no centro da parede: a única fonte de luz da sala. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(28%_30%_at_50%_45%,rgba(0,232,122,0.14),transparent_70%)]" />
            <div aria-hidden data-grade className="pointer-events-none absolute inset-0" style={GRADE} />

            {/* Régua: coordenadas a cada 400 unidades nas bordas de cima e da esquerda. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 font-mono text-[length:calc(var(--u)*10)] text-white/25">
              {Array.from({ length: Math.floor(W / 400) }, (_, i) => (
                <span key={`x${i}`} className="absolute top-[calc(var(--u)*8)]" style={{ left: (i + 1) * 400 + 8 }}>
                  {(i + 1) * 400}
                </span>
              ))}
              {Array.from({ length: Math.floor(H / 400) }, (_, i) => (
                <span key={`y${i}`} className="absolute left-[calc(var(--u)*8)]" style={{ top: (i + 1) * 400 + 8 }}>
                  {(i + 1) * 400}
                </span>
              ))}
            </div>

            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[230px] flex select-none justify-center">
              <span data-palavra className="whitespace-nowrap text-[300px] leading-none tracking-[-0.04em] text-white/[0.045]">
                {t.titulo.toUpperCase()}
              </span>
            </div>

            {LUGARES.map((l, i) => {
              const proj = PROJETOS[i];
              const vaga = i === NOVO;
              return (
                <button
                  key={proj?.nome ?? "vaga"}
                  type="button"
                  data-peca
                  data-rotulo={t.abrir}
                  onClick={() => abrir(i)}
                  onFocus={(e) => e.currentTarget.matches(":focus-visible") && irPara(i)}
                  aria-label={vaga ? `${t.vaga.titulo}. ${t.vaga.texto}` : t.abrirX.replace("{x}", proj.nome)}
                  className={`group absolute cursor-[inherit] text-left transition-opacity duration-500 focus-visible:outline-none [&:focus-visible>div:last-child]:outline-2 [&:focus-visible>div:last-child]:outline-offset-[calc(var(--u)*6)] [&:focus-visible>div:last-child]:outline-brand ${
                    i === atual ? "" : "max-lg:opacity-30"
                  }`}
                  style={{ left: l.x, top: l.y, width: l.w }}
                >
                  {/* Legenda pregada acima da tela. */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-full hidden items-start lg:flex justify-between gap-[calc(var(--u)*12)] pb-[calc(var(--u)*10)]">
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-[length:calc(var(--u)*17)] leading-tight tracking-[-0.02em] text-ink">
                        {vaga ? t.vaga.legenda : proj.nome}
                      </span>
                      <span className="truncate text-[length:calc(var(--u)*13)] leading-snug text-white/60">
                        {vaga ? t.vaga.status : p.descricoes[proj.nome]}
                      </span>
                    </span>
                    {proj?.href && (
                      <span className="flex shrink-0 items-center gap-[calc(var(--u)*6)] pt-[calc(var(--u)*3)] font-mono text-[length:calc(var(--u)*11)] uppercase tracking-[0.18em] text-white/65">
                        <span className="h-[calc(var(--u)*6)] w-[calc(var(--u)*6)] rounded-full bg-brand shadow-[0_0_calc(var(--u)*6)_rgba(0,232,122,0.9)]" />
                        {t.noAr}
                      </span>
                    )}
                  </span>

                  <Moldura
                    ref={(el) => {
                      molduras.current[i] = el;
                    }}
                    proj={proj}
                    wip={p.emDesenvolvimento}
                    dominio={t.vaga.dominio}
                    sizes="(max-width: 1024px) 70vw, 60vw"
                    priority={i === 0}
                  >
                    <Vaga t={t.vaga} />
                  </Moldura>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bordas escuras: o título e a barra de baixo leem por cima das telas. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />

      {/* Celular: faixa sólida acima da parede. Desktop: por cima, num degradê. */}
      <div className="parede-espera pointer-events-none relative z-10 order-1 border-b border-white/10 bg-surface pb-4 pt-24 opacity-0 lg:absolute lg:inset-x-0 lg:top-0 lg:border-0 lg:bg-transparent lg:bg-gradient-to-b lg:from-surface lg:via-surface/70 lg:to-transparent lg:pb-12 lg:pt-28">
        <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-4 px-6 sm:px-10 lg:block">
          <h1 id="parede-titulo" data-hud className="titulo-brilho w-fit text-[36px] font-normal leading-none tracking-[-0.03em] sm:text-[48px] lg:text-[64px]">
            {t.titulo}
          </h1>
          <span data-hud className="flex flex-col items-end gap-1 pb-1 text-right font-mono text-[11px] uppercase tracking-[0.16em] lg:hidden">
            <span className="text-white/60">{contagem}</span>
            <span className="flex items-center gap-1.5 text-white/80">
              <Move className="h-3.5 w-3.5 text-brand" aria-hidden />
              {t.deslize}
            </span>
          </span>
        </div>
      </div>

      {/* Celular: ficha da tela da vez, com as setas e o orçamento dela. */}
      <div className="parede-espera relative z-10 order-3 flex flex-col gap-4 border-t border-white/10 bg-surface px-6 pb-6 pt-4 opacity-0 sm:px-10 lg:hidden">
        <div data-hud className="flex items-center justify-between gap-4">
          <div className="min-w-0" aria-live="polite">
            <p className="truncate text-[20px] leading-tight tracking-[-0.02em] text-ink">{projAtual ? projAtual.nome : t.vaga.legenda}</p>
            <p className="truncate text-[14px] text-white/60">
              {projAtual ? `${p.descricoes[projAtual.nome]}${projAtual.href ? "" : ` · ${p.emDesenvolvimento}`}` : t.vaga.status}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="mr-1 font-mono text-[12px] tracking-[0.18em] text-white/55">
              {dois(atual + 1)}/{dois(LUGARES.length)}
            </span>
            <button type="button" onClick={() => passo(-1)} aria-label={t.caso.anterior} className={REDONDO}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" onClick={() => passo(1)} aria-label={t.caso.proximo} className={REDONDO}>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
        <div data-hud>
          <StartChallengeButton onClick={() => setAberto(atual)} className="w-full justify-between whitespace-nowrap">
            {t.orcamento}
          </StartChallengeButton>
        </div>
      </div>

      <div className="parede-espera pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden bg-gradient-to-t from-surface via-surface/70 to-transparent pt-20 opacity-0 lg:block">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-end gap-5 px-10 pb-8">
          <div data-hud className="flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[0.18em]">
            <span className={`flex items-center gap-2 text-white/75 transition-opacity duration-700 ${mexeu ? "opacity-50" : ""}`}>
              <Move className="h-4 w-4 text-brand" aria-hidden />
              {t.arraste}
            </span>
            <span className="text-white/55">{contagem}</span>
          </div>

          <div data-hud className="pointer-events-auto w-fit">
            <StartChallengeButton
              onClick={() => {
                irPara(NOVO);
                setAberto(NOVO);
              }}
            >
              {t.orcamento}
            </StartChallengeButton>
          </div>

          <div data-hud role="group" aria-label={t.mapa} className="pointer-events-auto relative h-[114px] w-[176px] justify-self-end overflow-hidden rounded-xl border border-white/10 bg-black/60">
            {LUGARES.map((l, i) => {
              const proj = PROJETOS[i];
              return (
                <button
                  key={proj?.nome ?? "vaga"}
                  type="button"
                  onClick={() => irPara(i)}
                  aria-label={t.irPara.replace("{x}", proj?.nome ?? t.vaga.legenda)}
                  className={`absolute rounded-[2px] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand ${
                    !proj ? "border border-dashed border-brand/60" : proj.href ? "bg-white/35" : "bg-white/15"
                  }`}
                  style={{
                    left: `${(l.x / W) * 100}%`,
                    top: `${(l.y / H) * 100}%`,
                    width: `${(l.w / W) * 100}%`,
                    height: `${((l.w * 0.625 + 30) / H) * 100}%`,
                  }}
                />
              );
            })}
            <span ref={vistaRef} aria-hidden className="pointer-events-none absolute rounded-[3px] border border-brand shadow-[0_0_10px_rgba(0,232,122,0.5)]" />
          </div>
        </div>
      </div>

      {/* Só com mouse: no toque não há o que seguir. */}
      <div ref={cursorRef} aria-hidden className="pointer-events-none absolute left-0 top-0 z-20 opacity-0">
        <span className="ml-4 mt-4 block whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-brand-deep shadow-[0_8px_24px_-8px_rgba(0,232,122,0.6)]">
          {rotulo}
        </span>
      </div>
    </section>

      {/* Fora da <section>: as setas e o mouse dentro do caso não mexem na parede. */}
      {aberto !== null && (
        <Caso
          i={aberto}
          t={t}
          p={p}
          origem={(i) => molduras.current[i]}
          onTrocar={(i) => {
            irPara(i);
            setAberto(i);
          }}
          onFechado={() => setAberto(null)}
        />
      )}
    </>
  );
}
