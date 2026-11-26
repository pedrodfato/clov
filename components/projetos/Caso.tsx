"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import StartChallengeButton from "../StartChallengeButton";
import { whatsapp } from "../contato";
import { Moldura, NOVO, PROJETOS, Vaga, dois } from "./comum";
import type { Dicionario } from "@/dicionarios/pt";

const TOTAL = PROJETOS.length + 1;

const reduzido = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  i: number;
  t: Dicionario["paginaProjetos"];
  p: Dicionario["projetos"];
  /** A tela correspondente na parede, de onde o caso sai voando e para onde volta. */
  origem: (i: number) => HTMLElement | null | undefined;
  onTrocar: (i: number) => void;
  onFechado: () => void;
};

// Retângulo de onde a tela parte, se ela estiver à vista: de fora da tela o
// voo atravessaria a página e é melhor só aparecer.
function deOnde(el: HTMLElement | null | undefined) {
  const r = el?.getBoundingClientRect();
  if (!r || r.right < 0 || r.bottom < 0 || r.left > innerWidth || r.top > innerHeight) return null;
  return r;
}

// Diferença de transform que põe o alvo em cima da fonte (FLIP).
const voo = (fonte: DOMRect, alvo: DOMRect) => ({
  x: fonte.left - alvo.left,
  y: fonte.top - alvo.top,
  scaleX: fonte.width / alvo.width,
  scaleY: fonte.height / alvo.height,
  transformOrigin: "0 0",
});

// O projeto aberto, com o pedido de orçamento ao lado: neste estilo ou num
// estilo novo, e o tipo de site. O botão leva a mensagem pronta ao WhatsApp.
export default function Caso({ i, t, p, origem, onTrocar, onFechado }: Props) {
  const c = t.caso;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const telaRef = useRef<HTMLDivElement>(null);
  const fechando = useRef(false);
  const anterior = useRef(i);
  const [estilo, setEstilo] = useState<"neste" | "novo">(i === NOVO ? "novo" : "neste");
  const [tipo, setTipo] = useState<number | null>(null);

  const proj = i === NOVO ? undefined : PROJETOS[i];
  const novo = !proj || estilo === "novo";
  const frase = tipo === null ? c.tipoPadrao : c.tipos[tipo].frase;
  const mensagem = (novo ? c.mensagemNovo : c.mensagemEstilo.replace("{x}", proj.nome)).replace("{tipo}", frase);

  // Abre já com a tela saindo do lugar dela na parede.
  useLayoutEffect(() => {
    const dialog = dialogRef.current!;
    if (!dialog.open) dialog.showModal();
    if (reduzido()) return;
    const fonte = deOnde(origem(i));
    const tl = gsap.timeline();
    tl.from(dialog.querySelector("[data-fundo]"), { opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
    if (fonte) tl.from(telaRef.current, { ...voo(fonte, telaRef.current!.getBoundingClientRect()), duration: 0.9, ease: "expo.out" }, 0);
    else tl.from(telaRef.current, { opacity: 0, scale: 0.94, duration: 0.7, ease: "expo.out" }, 0);
    tl.from(
      dialog.querySelectorAll("[data-info] > *, [data-nav]"),
      { opacity: 0, x: 24, filter: "blur(8px)", duration: 0.7, ease: "power3.out", stagger: 0.05, clearProps: "filter" },
      0.25,
    );
    // revert(): no StrictMode um from() interrompido deixaria tudo invisível.
    return () => void tl.revert();
    // Só na abertura: trocar de projeto tem a própria animação, abaixo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Anterior/próximo: a tela nova desliza do lado de onde veio.
  useEffect(() => {
    if (anterior.current === i) return;
    const lado = (i - anterior.current + TOTAL) % TOTAL === 1 ? 1 : -1;
    anterior.current = i;
    if (reduzido()) return;
    const dialog = dialogRef.current!;
    gsap.fromTo(telaRef.current, { opacity: 0, x: 48 * lado }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", overwrite: true });
    gsap.fromTo(
      dialog.querySelectorAll("[data-info] > *"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.04, overwrite: true },
    );
  }, [i]);

  // Volta voando para o lugar na parede (que a câmera já seguiu).
  const fechar = () => {
    if (fechando.current) return;
    fechando.current = true;
    const dialog = dialogRef.current!;
    const fim = () => {
      dialog.close();
      onFechado();
    };
    if (reduzido()) return fim();
    const fonte = deOnde(origem(i));
    const tela = telaRef.current!;
    gsap
      .timeline({ onComplete: fim })
      .to(dialog.querySelectorAll("[data-info] > *, [data-nav], [data-fechar]"), { opacity: 0, x: 16, duration: 0.25, stagger: 0.02 }, 0)
      .to(tela, fonte ? { ...voo(fonte, tela.getBoundingClientRect()), duration: 0.6, ease: "power3.inOut" } : { opacity: 0, scale: 0.96, duration: 0.3 }, 0)
      .to(dialog.querySelector("[data-fundo]"), { opacity: 0, duration: 0.45, ease: "power2.in" }, 0.15);
  };

  const troca = (passo: number) => {
    // A vaga só tem estilo novo; ao sair dela, volta ao "neste estilo".
    if (i === NOVO) setEstilo("neste");
    onTrocar((i + passo + TOTAL) % TOTAL);
  };

  const teclas = (e: React.KeyboardEvent) => {
    if ((e.target as Element).closest("[data-orcamento]")) return;
    if (e.key === "ArrowRight") troca(1);
    if (e.key === "ArrowLeft") troca(-1);
  };

  const pilula = (ativo: boolean) =>
    `flex items-center gap-2 rounded-full px-4 py-2 text-[14px] leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
      ativo ? "bg-white/[0.1] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" : "text-white/70 hover:text-white"
    }`;
  const ponto = <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(0,232,122,0.9)]" />;
  const rotulo = "font-mono text-[12px] uppercase tracking-[0.18em] text-white/60";
  const redondo =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        fechar();
      }}
      onKeyDown={teclas}
      aria-labelledby="caso-titulo"
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent p-0 text-ink [--u:1px] backdrop:bg-transparent"
    >
      <div data-fundo onClick={fechar} className="fixed inset-0 bg-[#040705]/85 backdrop-blur-md" />

      <button type="button" data-fechar autoFocus onClick={fechar} aria-label={c.fechar} className={`${redondo} fixed right-5 top-5 z-10 sm:right-8 sm:top-8`}>
        <X className="h-4 w-4" aria-hidden />
      </button>

      {/* Os vãos da grade deixam o clique passar para o fundo, que fecha. */}
      <div className="pointer-events-none relative mx-auto grid min-h-full max-w-[1400px] content-center items-center gap-10 px-6 pb-16 pt-24 sm:px-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(340px,1fr)] lg:gap-16 lg:py-24">
        <div className="pointer-events-auto flex flex-col gap-5">
          <div ref={telaRef}>
            <Moldura
              proj={proj}
              alt={proj && p.alt.replace("{x}", proj.nome)}
              wip={p.emDesenvolvimento}
              dominio={t.vaga.dominio}
              sizes="(max-width: 1024px) 92vw, 60vw"
            >
              <Vaga t={t.vaga} />
            </Moldura>
          </div>
          <div data-nav className="flex items-center gap-3">
            <button type="button" onClick={() => troca(-1)} aria-label={c.anterior} className={redondo}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" onClick={() => troca(1)} aria-label={c.proximo} className={redondo}>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <span className="ml-2 font-mono text-[13px] tracking-[0.2em] text-white/60" aria-live="polite">
              {dois(i + 1)} / {dois(TOTAL)}
            </span>
          </div>
        </div>

        <div data-info className="pointer-events-auto flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 id="caso-titulo" className="text-balance text-[38px] font-normal leading-[1.02] tracking-[-0.03em] sm:text-[52px]">
              {proj ? proj.nome : c.novoTitulo}
            </h2>
            <p className="max-w-[44ch] text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
              {proj ? p.descricoes[proj.nome] : c.novoTexto}
            </p>
          </div>

          {proj &&
            (proj.href ? (
              <a
                href={proj.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(0,232,122,0.9)]" />
                {c.visitar} · {proj.dominio}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            ) : (
              <span className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[repeating-linear-gradient(-45deg,#00e87a_0_2px,#061910_2px_4px)]" />
                {p.emDesenvolvimento}
              </span>
            ))}

          <div data-orcamento className="flex flex-col gap-5 border-t border-white/10 pt-6">
            {proj && (
              <div className="flex flex-col gap-2.5">
                <span className={rotulo} id="caso-estilo">{c.estilo}</span>
                <div role="group" aria-labelledby="caso-estilo" className="flex w-fit gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
                  {(["neste", "novo"] as const).map((e) => (
                    <button key={e} type="button" aria-pressed={estilo === e} onClick={() => setEstilo(e)} className={pilula(estilo === e)}>
                      {estilo === e && ponto}
                      {c[e]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              <span className={rotulo} id="caso-tipo">{c.tipo}</span>
              <div role="group" aria-labelledby="caso-tipo" className="flex flex-wrap gap-2">
                {c.tipos.map((tp, n) => (
                  <button
                    key={tp.rotulo}
                    type="button"
                    aria-pressed={tipo === n}
                    onClick={() => setTipo(tipo === n ? null : n)}
                    className={`rounded-full border px-4 py-2 text-[14px] leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                      tipo === n ? "border-brand/60 bg-brand/10 text-ink" : "border-white/12 text-white/70 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {tp.rotulo}
                  </button>
                ))}
              </div>
            </div>

            <figure className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <figcaption className={rotulo}>{c.previa}</figcaption>
              <blockquote className="font-mono text-[13px] leading-relaxed text-white/80" aria-live="polite">
                {mensagem}
              </blockquote>
            </figure>

            <div className="flex flex-col gap-3">
              <StartChallengeButton href={whatsapp(mensagem)} className="w-fit text-[12px]! sm:text-[13px]!">
                {c.cta}
              </StartChallengeButton>
              <p className="text-[13px] text-white/55">{c.nota}</p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
