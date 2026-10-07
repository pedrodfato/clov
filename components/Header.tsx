'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import StartChallengeButton from "./StartChallengeButton"

const NAV_LINKS = [
    { label: "Início", href: "#" },
    { label: "Quem somos", href: "#quem-somos" },
    { label: "Como funciona", href: "#metodologia" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Projetos", href: "#projetos" },
    { label: "FAQ", href: "#faq" },
]

export default function Header() {
    const [hidden, setHidden] = useState(false)
    // Link da seção que está no meio da tela; "#" (Início) no topo da página.
    const [ativo, setAtivo] = useState("#")
    const lastScrollY = useRef(0)

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

    // Acende o link da seção que cruza a faixa do meio da tela.
    useEffect(() => {
        const secoes = NAV_LINKS.map((l) => l.href)
            .filter((h) => h !== "#")
            .map((h) => document.querySelector(h))
            .filter((el): el is Element => el !== null)

        const visiveis = new Set<string>()
        const io = new IntersectionObserver(
            (entradas) => {
                for (const e of entradas) {
                    if (e.isIntersecting) visiveis.add(`#${e.target.id}`)
                    else visiveis.delete(`#${e.target.id}`)
                }
                const atual = NAV_LINKS.map((l) => l.href).filter((h) => visiveis.has(h)).pop()
                setAtivo(atual ?? "#")
            },
            { rootMargin: "-45% 0px -50% 0px" }
        )
        secoes.forEach((s) => io.observe(s))
        return () => io.disconnect()
    }, [])

    return (
        // Sem faixa de fundo: o vidro fica só na pílula dos links, como na referência.
        <nav
            className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
                hidden ? "-translate-y-[120%]" : "translate-y-0"
            }`}
        >
            <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-6 sm:px-10">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex flex-shrink-0 items-center">
                        <Image
                            src="/logoclov.svg"
                            alt="Clov"
                            width={130}
                            height={52}
                            unoptimized
                            className="h-7 w-auto"
                        />
                    </Link>

                    <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl backdrop-saturate-150 lg:flex">
                        {NAV_LINKS.map((link) => {
                            const aceso = link.href === ativo
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    aria-current={aceso ? "true" : undefined}
                                    className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                                        aceso
                                            ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                                            : "text-white/55 hover:text-white"
                                    }`}
                                >
                                    {aceso && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle shadow-[0_0_8px_rgba(0,232,122,0.9)]" />}
                                    {link.label}
                                </a>
                            )
                        })}
                    </div>
                </div>

                <StartChallengeButton href="#contato" className="text-[11px]! sm:text-[12px]!">
                    Fale conosco
                </StartChallengeButton>
            </div>
        </nav>
    )
}
