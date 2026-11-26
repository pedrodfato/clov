'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import StartChallengeButton from "./StartChallengeButton"
import MenuQuebrado from "./MenuQuebrado"
import TrocaIdioma from "./TrocaIdioma"
import { semIntro } from "./IntroReveal"
import type { Dicionario } from "@/dicionarios/pt"
import { caminho, type Idioma } from "@/dicionarios/idiomas"

type Props = { t: Dicionario["header"]; idioma: Idioma; whatsapp: string }

export default function Header({ t, idioma, whatsapp }: Props) {
    const pathname = usePathname()
    // O pathname pode chegar reescrito pelo proxy (/pt) no servidor.
    const naHome = pathname === caminho(idioma) || pathname === `/${idioma}`
    // Fora da home as âncoras levam de volta para ela (/#faq). Na home ficam
    // #faq, que é o que o ScrollSmoother intercepta para rolar.
    const links = useMemo(
        () => naHome ? t.links : t.links.map((l) => l.href.startsWith("#") ? { ...l, href: caminho(idioma) + (l.href === "#" ? "" : l.href) } : l),
        [t.links, naHome, idioma]
    )
    const [hidden, setHidden] = useState(false)
    // Link da seção que está no meio da tela; "#" (Início) no topo da página.
    const [ativo, setAtivo] = useState("#")
    const lastScrollY = useRef(0)
    const [menu, setMenu] = useState(false)
    const navRef = useRef<HTMLElement>(null)
    const botaoRef = useRef<HTMLButtonElement>(null)
    const fecharMenu = useCallback(() => {
        setMenu(false)
        botaoRef.current?.focus()
    }, [])

    useEffect(() => {
        lastScrollY.current = window.scrollY

        function handleScroll() {
            const currentScrollY = window.scrollY

            if (currentScrollY <= 0) {
                setHidden(false)
            } else if (currentScrollY > lastScrollY.current) {
                setHidden(true)
            } else if (currentScrollY < lastScrollY.current) {
                setHidden(false)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Entrada depois da intro (3s): logo, links e botão descem em sequência.
    // Sem o desfoque da ENTRADA: filtro por cima do backdrop-blur da pílula
    // apagava o vidro durante a animação.
    useEffect(() => {
        const nav = navRef.current
        if (!nav || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const t = gsap.from(nav.querySelectorAll("[data-entra]"), {
            opacity: 0,
            y: -16,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            delay: semIntro() ? 0 : 1.9,
        })
        return () => void t.revert()
    }, [])

    // Acende o link da seção que cruza a faixa do meio da tela.
    useEffect(() => {
        if (!naHome) return
        const secoes = links.map((l) => l.href)
            .filter((h) => h.startsWith("#") && h !== "#")
            .map((h) => document.querySelector(h))
            .filter((el): el is Element => el !== null)

        const visiveis = new Set<string>()
        const io = new IntersectionObserver(
            (entradas) => {
                for (const e of entradas) {
                    if (e.isIntersecting) visiveis.add(`#${e.target.id}`)
                    else visiveis.delete(`#${e.target.id}`)
                }
                const atual = links.map((l) => l.href).filter((h) => visiveis.has(h)).pop()
                setAtivo(atual ?? "#")
            },
            { rootMargin: "-45% 0px -50% 0px" }
        )
        secoes.forEach((s) => io.observe(s))
        return () => io.disconnect()
    }, [links, naHome])

    return (
        <>
        {/* Sem faixa de fundo: o vidro fica só na pílula dos links, como na referência. */}
        <nav
            ref={navRef}
            className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
                hidden ? "-translate-y-[120%]" : "translate-y-0"
            }`}
        >
            {/* Só no celular: o menu fica sobre o conteúdo e precisa de contraste. */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/90 via-black/50 to-transparent lg:hidden" />
            <div className="relative mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-6 sm:px-10">
                <div className="flex items-center gap-6">
                    <Link href={caminho(idioma)} data-entra className="flex flex-shrink-0 items-center">
                        <Image
                            src="/logoclov.svg"
                            alt="Clov"
                            width={130}
                            height={52}
                            unoptimized
                            className="h-7 w-auto"
                        />
                    </Link>

                    <div data-entra className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl backdrop-saturate-150 lg:flex">
                        {links.map((link) => {
                            // Fora da home acende o link da própria página.
                            const aceso = naHome ? link.href === ativo : link.href === pathname
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    aria-current={aceso ? "true" : undefined}
                                    className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                                        aceso
                                            ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                                            : "text-white/70 hover:text-white"
                                    }`}
                                >
                                    {aceso && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle shadow-[0_0_8px_rgba(0,232,122,0.9)]" />}
                                    {link.label}
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div data-entra>
                        <TrocaIdioma idioma={idioma} rotulo={t.trocarIdioma} />
                    </div>

                    {/* No celular o botão vai para dentro do menu. */}
                    <div data-entra className="hidden lg:block">
                        <StartChallengeButton href={whatsapp} className="text-[12px]!">
                            {t.cta}
                        </StartChallengeButton>
                    </div>

                    <button
                        ref={botaoRef}
                        type="button"
                        onClick={() => setMenu(true)}
                        aria-label={t.abrirMenu}
                        aria-expanded={menu}
                        data-entra
                        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl lg:hidden"
                    >
                        <span className="h-px w-4 bg-white" />
                        <span className="h-px w-4 bg-white" />
                    </button>
                </div>
            </div>
        </nav>

        {/* Fora do <nav>: o translate dele viraria o bloco de contenção do
            overlay fixo, que passaria a medir o header em vez da tela. */}
        {menu && (
            <MenuQuebrado
                links={links}
                rotulos={t}
                whatsapp={whatsapp}
                navRef={navRef}
                origemRef={botaoRef}
                onFechado={fecharMenu}
            />
        )}
        </>
    )
}
