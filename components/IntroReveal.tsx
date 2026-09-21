"use client"

import { useEffect, useState } from "react"

// Duração total da intro — precisa bater com a animação em globals.css.
const DURATION = 3000

// Paths do "o" da logo (mesmo desenho do faviconclov.svg, viewBox 192.76 x 190.03).
const CLOVER_PATHS = [
    "M48.63,127.99c17.38,12.24,16.36,23.22,40.14,24.83v36.95C42.65,189.9,1.54,150.44.21,103.84l37.36.03c2.12,8.99,5,17.26,11.06,24.12Z",
    "M62.96,49.66c-10.8,13.64-20.66,10.86-25.62,37.32l-37.34.14C2.93,40.05,40.72,2.13,88.64,0l.28,37.6c-10.03.33-19.37,3.76-25.95,12.06Z",
    "M137.69,56.38l-10.58-11c-5.25-5.46-13.43-6.71-21.57-7.98l-.22-37.04c48.03.8,85.9,38.79,87.44,86.62l-37.01.06c-1.25-13.09-9.2-21.44-18.07-30.66Z",
    "M105.62,190.03l-.28-37.35c10.76-.67,19.89-4.63,26.9-12.3l10.19-9.79c7.38-7.4,11.7-16.32,13.16-26.81l37.02.14c-2.25,45.43-38.68,85.25-87,86.1Z",
]

export default function IntroReveal() {
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setHidden(true)
            return
        }

        document.body.style.overflow = "hidden"
        const timeout = setTimeout(() => {
            setHidden(true)
            document.body.style.overflow = ""
        }, DURATION)

        return () => {
            clearTimeout(timeout)
            document.body.style.overflow = ""
        }
    }, [])

    if (hidden) return null

    return (
        <div className="intro-overlay pointer-events-none fixed inset-0 z-[9999]">
            <svg className="h-full w-full" aria-hidden="true">
                <defs>
                    {/* Granulado que preenche o trevo antes dele virar janela. */}
                    <pattern id="clov-intro-grain" width="3" height="3" patternUnits="userSpaceOnUse">
                        <rect width="3" height="3" fill="#101010" />
                        <circle cx="1" cy="1" r="0.55" fill="#1f1f1f" />
                        <circle cx="2.4" cy="2.2" r="0.35" fill="#181818" />
                    </pattern>

                    <mask id="clov-intro-mask">
                        {/* Branco = tapa a tela. Preto = buraco por onde o site aparece. */}
                        <rect width="100%" height="100%" fill="white" />
                        <g className="intro-clover" fill="black">
                            {CLOVER_PATHS.map((d) => (
                                <path key={d} d={d} />
                            ))}
                        </g>
                    </mask>
                </defs>

                <rect width="100%" height="100%" fill="#0a0a0a" mask="url(#clov-intro-mask)" />

                {/* Tampa o buraco no começo: só a silhueta texturizada aparece. */}
                <g className="intro-clover intro-clover-fill" fill="url(#clov-intro-grain)">
                    {CLOVER_PATHS.map((d) => (
                        <path key={d} d={d} />
                    ))}
                </g>

                {/* Anel verde marca o momento em que o trevo abre. */}
                <g
                    className="intro-clover intro-clover-glow"
                    fill="none"
                    stroke="#00ff66"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                >
                    {CLOVER_PATHS.map((d) => (
                        <path key={d} d={d} />
                    ))}
                </g>
            </svg>
        </div>
    )
}
