'use client'

import { useEffect, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { X } from "lucide-react"
import StartChallengeButton from "./StartChallengeButton"
import { WHATSAPP } from "./contato"

type Ponto = [number, number]
type Props = {
    links: { label: string; href: string }[]
    // Elementos que aparecem no "print": o header fixo e o botão que foi tocado.
    navRef: React.RefObject<HTMLElement | null>
    origemRef: React.RefObject<HTMLButtonElement | null>
    onFechado: () => void
}

/**
 * Menu do celular: a tela congela, trinca a partir do botão tocado e os cacos
 * se afastam para as bordas. Os links entram no vão que eles deixam.
 *
 * O "print" é um clone das seções visíveis, recortado por clip-path em cada
 * caco. Rasterizar o DOM de verdade (html-to-image e afins) levaria meio
 * segundo num celular, e o menu precisa responder no toque.
 */
export default function MenuQuebrado({ links, navRef, origemRef, onFechado }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const camadaRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const fecharRef = useRef<(modo: "remontar" | "dispersar") => void>(() => {})

    useLayoutEffect(() => {
        const overlay = overlayRef.current!
        const camada = camadaRef.current!
        const svg = svgRef.current!
        const itens = overlay.querySelectorAll("[data-item]")
        const W = window.innerWidth
        const H = window.innerHeight
        const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            if (reduzido) {
                tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
                    .fromTo(itens, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
                fecharRef.current = () =>
                    gsap.to(overlay, { autoAlpha: 0, duration: 0.2, onComplete: onFechado })
                return
            }

            const r = origemRef.current?.getBoundingClientRect()
            const P: Ponto = r ? [r.left + r.width / 2, r.top + r.height / 2] : [W - 40, 40]
            const { cacos, aneis } = trincar(W, H, P)
            const foto = fotografar(navRef.current, W, H)

            // Mais perto do impacto, solta primeiro.
            cacos.sort((a, b) => dist(centro(a), P) - dist(centro(b), P))

            const pecas: HTMLElement[] = []
            const sombras: HTMLElement[] = []
            const veus: HTMLElement[] = []
            const destinos = cacos.map((poly) => {
                const [cx, cy] = centro(poly)
                // Cada caco é uma caixa do tamanho do seu retângulo, não da tela.
                // Com ~15 camadas de tela cheia, a GPU do celular ficava sem
                // memória, descartava camadas e o texto do menu piscava.
                const xs = poly.map((p) => p[0])
                const ys = poly.map((p) => p[1])
                const bx = Math.max(0, Math.floor(Math.min(...xs)))
                const by = Math.max(0, Math.floor(Math.min(...ys)))
                const bw = Math.min(W, Math.ceil(Math.max(...xs))) - bx
                const bh = Math.min(H, Math.ceil(Math.max(...ys))) - by
                const clip = `polygon(${poly.map(([x, y]) => `${x - bx}px ${y - by}px`).join(",")})`

                const peca = document.createElement("div")
                // Camada fixa do começo ao fim: promover e despromover no meio da
                // animação faz o Chrome repintar o caco, e ele pisca.
                peca.className = "absolute will-change-transform"
                Object.assign(peca.style, { left: `${bx}px`, top: `${by}px`, width: `${bw}px`, height: `${bh}px` })
                peca.style.transformOrigin = `${cx - bx}px ${cy - by}px`

                // Sombra preta deslocada: dá altura ao caco. Em verde, os cacos grandes
                // viravam blocos verdes na tela enquanto se mexiam.
                const sombra = document.createElement("div")
                sombra.className = "absolute inset-0 bg-black"
                sombra.style.clipPath = clip
                sombra.style.transform = "translate(6px, 10px)"
                sombra.style.opacity = "0"

                // O print continua do tamanho da tela, deslocado para o caco
                // mostrar o pedaço certo.
                const img = foto.el.cloneNode(true) as HTMLElement
                Object.assign(img.style, { inset: "auto", left: `${-bx}px`, top: `${-by}px`, width: `${W}px`, height: `${H}px` })
                const recorte = document.createElement("div")
                recorte.className = "absolute inset-0 overflow-hidden"
                recorte.style.clipPath = clip
                recorte.append(img)

                const veu = document.createElement("div")
                veu.className = "absolute inset-0 bg-black"
                veu.style.clipPath = clip
                veu.style.opacity = "0"

                peca.append(sombra, recorte, veu)
                camada.append(peca)
                pecas.push(peca)
                sombras.push(sombra)
                veus.push(veu)

                // Cada caco vai para a borda do seu lado e encolhe até caber nela,
                // deixando a coluna do meio livre para os links.
                const maior = Math.max(bw, bh)
                const escala = Math.min(0.78, (W * 0.3) / Math.max(maior, 1))
                const esquerda = cx < W / 2
                const tx = esquerda ? gsap.utils.random(-0.04, 0.13) * W : gsap.utils.random(0.87, 1.04) * W
                const ty = gsap.utils.clamp(H * 0.06, H * 0.94, cy + gsap.utils.random(-70, 70))
                return {
                    x: tx - cx,
                    y: ty - cy,
                    rotation: gsap.utils.random(12, 38) * (esquerda ? -1 : 1) * (Math.random() < 0.3 ? -1 : 1),
                    scale: escala,
                }
            })

            desenharRachaduras(svg, P, aneis)
            const linhas = svg.querySelectorAll("path")

            navigator.vibrate?.(12)

            tl.set(overlay, { autoAlpha: 1 })
                .fromTo(linhas, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.26, stagger: 0.012, ease: "power2.out" })
                .fromTo(camada, { x: 7, y: -5 }, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }, 0)
                .addLabel("solta", "+=0.1")
                .to(svg, { autoAlpha: 0, duration: 0.3 }, "solta")
                .to(pecas, {
                    x: (i) => destinos[i].x,
                    y: (i) => destinos[i].y,
                    rotation: (i) => destinos[i].rotation,
                    scale: (i) => destinos[i].scale,
                    duration: 1.1,
                    ease: "expo.out",
                    stagger: 0.025,
                }, "solta")
                .to(sombras, { opacity: 0.7, duration: 0.5 }, "solta")
                .to(veus, { opacity: 0.4, duration: 0.7 }, "solta")
                // opacity em vez de autoAlpha e force3D fixo: cada link fica numa
                // camada própria do começo ao fim. Trocar de camada no meio (o
                // que o GSAP faz ao terminar) piscava o texto no Android.
                .fromTo(itens, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", force3D: true }, "solta+=0.3")
                // Depois de assentar, os cacos ficam boiando.
                .add(() => {
                    pecas.forEach((p) =>
                        gsap.to(p, {
                            y: `+=${gsap.utils.random(6, 14)}`,
                            rotation: `+=${gsap.utils.random(-4, 4)}`,
                            duration: gsap.utils.random(2.4, 3.6),
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: -1,
                        })
                    )
                })

            fecharRef.current = (modo) => {
                tl.kill()
                gsap.killTweensOf(pecas)
                const fim = gsap.timeline({ onComplete: onFechado })
                fim.to(itens, { opacity: 0, y: -12, duration: 0.2, stagger: 0.02, ease: "power2.in", force3D: true })

                if (modo === "remontar") {
                    // Os cacos voltam ao lugar e a tela "cola" de novo.
                    fim.to(pecas, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.65, ease: "power3.inOut", stagger: { each: 0.015, from: "end" } }, 0.05)
                        .to([...sombras, ...veus], { opacity: 0, duration: 0.4 }, 0.2)
                        .to(overlay, { autoAlpha: 0, duration: 0.15 })
                } else {
                    // Link tocado: a página por trás já está rolando até a seção,
                    // então os cacos voam para fora em vez de remontar a tela velha.
                    fim.to(pecas, {
                        x: (i) => destinos[i].x * 1.9,
                        y: (i) => destinos[i].y * 1.3 + 120,
                        rotation: (i) => destinos[i].rotation * 2,
                        autoAlpha: 0,
                        duration: 0.55,
                        ease: "power2.in",
                        stagger: 0.012,
                    }, 0)
                        .to(overlay, { autoAlpha: 0, duration: 0.3 }, 0.25)
                }
            }
        }, overlay)

        return () => {
            ctx.revert()
            // Os cacos são DOM criado à mão: o revert do GSAP não os remove.
            camada.replaceChildren()
            svg.replaceChildren()
        }
    }, [links, navRef, origemRef, onFechado])

    useEffect(() => {
        overlayRef.current?.querySelector<HTMLElement>("[data-fechar]")?.focus()
        const tecla = (e: KeyboardEvent) => e.key === "Escape" && fecharRef.current("remontar")
        // Na janela e em captura: o SmoothScroll intercepta cliques em âncoras
        // no document com stopPropagation, e o onClick do React nunca chegaria.
        const clique = (e: MouseEvent) => {
            const alvo = e.target as Element | null
            if (alvo?.closest?.("[data-sai]") && overlayRef.current?.contains(alvo)) fecharRef.current("dispersar")
        }
        window.addEventListener("click", clique, true)
        // Girar o aparelho ou passar para desktop invalida o print: fecha sem animação.
        const mq = window.matchMedia("(min-width: 1024px)")
        const mudou = () => onFechado()
        window.addEventListener("keydown", tecla)
        window.addEventListener("orientationchange", mudou)
        mq.addEventListener("change", mudou)
        return () => {
            window.removeEventListener("keydown", tecla)
            window.removeEventListener("click", clique, true)
            window.removeEventListener("orientationchange", mudou)
            mq.removeEventListener("change", mudou)
        }
    }, [onFechado])

    return (
        <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            // touch-none: com a tela "congelada", arrastar não pode rolar a página por trás.
            className="invisible fixed inset-0 z-[60] touch-none overscroll-contain bg-[#050505] lg:hidden"
        >
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_50%,rgba(0,232,122,0.13),transparent)]" />
            <div ref={camadaRef} aria-hidden inert className="pointer-events-none absolute inset-0" />
            <svg ref={svgRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_0_4px_rgba(0,232,122,0.8)]" />

            <button
                type="button"
                data-item
                data-fechar
                onClick={() => fecharRef.current("remontar")}
                aria-label="Fechar menu"
                className="absolute right-6 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-xl"
            >
                <X className="h-4 w-4" aria-hidden />
            </button>

            <nav className="relative z-10 flex h-full flex-col items-center justify-center px-6">
                <ul className="flex flex-col items-center gap-1">
                    {links.map((l, i) => (
                        <li key={l.href} data-item>
                            <a
                                href={l.href}
                                data-sai
                                className="flex items-baseline gap-3 py-1.5 text-[34px] leading-tight tracking-[-0.03em] text-ink [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]"
                            >
                                <span className="font-mono text-[11px] tracking-normal text-brand">{String(i + 1).padStart(2, "0")}</span>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div data-item data-sai className="mt-10">
                    <StartChallengeButton href={WHATSAPP}>Fale conosco</StartChallengeButton>
                </div>
            </nav>
        </div>
    )
}

const dist = (a: Ponto, b: Ponto) => Math.hypot(a[0] - b[0], a[1] - b[1])
const centro = (poly: Ponto[]): Ponto => [
    poly.reduce((s, p) => s + p[0], 0) / poly.length,
    poly.reduce((s, p) => s + p[1], 0) / poly.length,
]

// Rachadura radial a partir do ponto de impacto: raios saindo dele, cortados
// por anéis tortos. Cada célula entre dois raios e dois anéis é um caco.
function trincar(W: number, H: number, P: Ponto) {
    const R = Math.max(...[[0, 0], [W, 0], [0, H], [W, H]].map((c) => dist(P, c as Ponto)))
    const N = 8
    // O último anel passa bem de fora da tela: a corda entre dois pontos dele
    // ainda tem de cobrir os cantos.
    const raios = [0, 0.13 * R, 0.42 * R, 1.3 * R]
    const giro = Math.random() * Math.PI * 2
    const angulos = Array.from({ length: N }, (_, j) => giro + ((j + gsap.utils.random(-0.25, 0.25)) * 2 * Math.PI) / N)
    const aneis: Ponto[][] = raios.map((raio, i) =>
        angulos.map((a) => {
            const r = i === 0 || i === raios.length - 1 ? raio : raio * gsap.utils.random(0.8, 1.2)
            return [P[0] + Math.cos(a) * r, P[1] + Math.sin(a) * r]
        })
    )

    const cacos: Ponto[][] = []
    for (let i = 0; i < raios.length - 1; i++) {
        for (let j = 0; j < N; j++) {
            const k = (j + 1) % N
            const poly: Ponto[] = i === 0 ? [P, aneis[1][j], aneis[1][k]] : [aneis[i][j], aneis[i][k], aneis[i + 1][k], aneis[i + 1][j]]
            const xs = poly.map((p) => p[0])
            const ys = poly.map((p) => p[1])
            // ponytail: teste por caixa, não por polígono; um caco fora da tela às vezes passa, sem custo visível.
            if (Math.max(...xs) > 0 && Math.min(...xs) < W && Math.max(...ys) > 0 && Math.min(...ys) < H) cacos.push(poly)
        }
    }
    return { cacos, aneis }
}

function desenharRachaduras(svg: SVGSVGElement, P: Ponto, aneis: Ponto[][]) {
    const ns = "http://www.w3.org/2000/svg"
    const caminhos: string[] = []
    // Raios: do impacto para fora, passando pelos pontos tortos dos anéis.
    aneis[1].forEach((_, j) => caminhos.push(`M${P} ${aneis.slice(1).map((a) => `L${a[j]}`).join(" ")}`))
    // Anéis internos (o externo fica fora da tela).
    aneis.slice(1, -1).forEach((a) => caminhos.push(`M${a.map((p) => p.join(" ")).join(" L")} Z`))

    svg.replaceChildren(
        ...caminhos.map((d) => {
            const p = document.createElementNS(ns, "path")
            p.setAttribute("d", d.replaceAll(",", " "))
            p.setAttribute("pathLength", "1")
            p.setAttribute("fill", "none")
            p.setAttribute("stroke", "rgba(235,255,245,0.9)")
            p.setAttribute("stroke-width", "1.3")
            p.setAttribute("stroke-dasharray", "1")
            return p
        })
    )
}

// "Print" da tela: clona só as seções que estão à vista, cada uma no lugar
// exato onde aparece agora (já com o transform do ScrollSmoother e o estado
// das animações, que vêm nos estilos inline).
function fotografar(nav: HTMLElement | null, W: number, H: number) {
    const el = document.createElement("div")
    el.className = "print-congelado absolute inset-0 overflow-hidden bg-surface"

    const conteudo = document.getElementById("smooth-content")
    const fontes = [...(conteudo?.children ?? []), ...(nav ? [nav] : [])] as HTMLElement[]
    for (const fonte of fontes) {
        const r = fonte.getBoundingClientRect()
        if (r.bottom <= 0 || r.top >= H || r.right <= 0 || r.left >= W) continue
        const copia = fonte.cloneNode(true) as HTMLElement
        Object.assign(copia.style, {
            position: "absolute",
            top: `${r.top}px`,
            left: `${r.left}px`,
            width: `${r.width}px`,
            height: `${r.height}px`,
            margin: "0",
            transform: "none",
        })
        achatar(fonte, copia)
        el.append(copia)
    }
    // Âncoras e leitores de tela não podem achar a cópia.
    el.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"))
    // Canvas fica de fora: cada cópia vira uma camada da GPU do tamanho dele,
    // vezes ~15 cacos (os raios da hero somavam 16 telas). E o WebGL nem deixa
    // ler o que desenhou, a cópia sairia vazia de qualquer jeito.
    el.querySelectorAll("canvas").forEach((n) => n.remove())
    return { el }
}

// Troca todo 3D da cópia pela sua projeção 2D naquele instante (vista sem
// perspectiva). O Chrome põe cada elemento com transform 3D numa camada própria
// da GPU: os cubos de palavras do Diagnóstico são 36 delas, vezes ~15 cacos, e
// o celular deixava os cacos pretos sem conseguir desenhá-las a tempo.
// Dentro de um preserve-3d a transformação se acumula pelos ancestrais, então
// o contêiner fica sem transform e cada filho recebe o acumulado projetado.
// ponytail: supõe que o filho ocupa a mesma caixa do contêiner 3D (vale para
// cubo e faces); outro layout 3D precisaria somar o deslocamento entre as caixas.
function achatar(fonte: HTMLElement, copia: HTMLElement) {
    const origens = [fonte, ...fonte.querySelectorAll<HTMLElement>("*")]
    const copias = [copia, ...copia.querySelectorAll<HTMLElement>("*")]
    const acumulado = new Map<Element, DOMMatrix>()

    origens.forEach((o, i) => {
        const c = copias[i]
        if (!c || i === 0) return
        const st = getComputedStyle(o)
        const pai = o.parentElement
        const dentro3d = pai ? acumulado.get(pai) : undefined
        if (!dentro3d && !st.transform.startsWith("matrix3d")) {
            // translate3d(0,0,0) que o GSAP deixa inline: o estilo computado diz
            // 2D, mas o Chrome cria camada para ele, e tudo que fica por cima
            // vira camada também ("overlap") — as faces dos cubos viravam ~170
            // telas de memória de vídeo. Grava o mesmo valor, em 2D de verdade.
            if (c.style.transform.includes("3d")) c.style.transform = st.transform
            return
        }

        let local = new DOMMatrix()
        if (st.transform !== "none") {
            const [ox, oy, oz = 0] = st.transformOrigin.split(" ").map(parseFloat)
            local = new DOMMatrix().translate(ox, oy, oz).multiply(new DOMMatrix(st.transform)).translate(-ox, -oy, -oz)
        }
        const m = dentro3d ? dentro3d.multiply(local) : local

        if (st.transformStyle === "preserve-3d") {
            acumulado.set(o, m)
            c.style.transform = "none"
        } else {
            c.style.transformOrigin = "0 0"
            c.style.transform = `matrix(${m.a},${m.b},${m.c},${m.d},${m.e},${m.f})`
            // De costas para a tela: no 3D ele não aparecia.
            if (m.a * m.d - m.b * m.c <= 0) c.style.visibility = "hidden"
        }
        c.style.transformStyle = "flat"
    })
    copia.querySelectorAll<HTMLElement>("*").forEach((c) => {
        if (c.style.transformStyle === "flat") c.parentElement?.style.setProperty("perspective", "none")
    })
}
