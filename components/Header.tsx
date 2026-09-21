'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import StartChallengeButton from "./StartChallengeButton"

const NAV_LINKS = [
    { label: "Metodologia", href: "#metodologia" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Contato", href: "#contato" },
]

export default function Header() {
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        lastScrollY.current = window.scrollY

        function handleScroll() {
            const currentScrollY = window.scrollY
            setScrolled(currentScrollY > 8)

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

    return (
        <nav
            className={`fixed py-2 top-0 left-0 right-0 z-50 border-b border-brand/30 bg-black/40 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ${
                hidden ? "-translate-y-full" : "translate-y-0"
            } ${scrolled ? "bg-black/60 border-brand/40" : ""}`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-24">
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

                <div className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="font-mono text-sm text-white/60 transition-colors hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <StartChallengeButton href="#contato" className="text-[14px]">
                    Fale conosco
                </StartChallengeButton>
            </div>
        </nav>
    )
}
