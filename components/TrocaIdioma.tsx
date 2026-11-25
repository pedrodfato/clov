'use client'

import { useState } from "react"
import { Languages } from "lucide-react"
import { COOKIE_IDIOMA, caminho, type Idioma } from "@/dicionarios/idiomas"

// Pílula com a bolinha que desliza, como o botão de dark mode da referência:
// a bolinha fica à esquerda no português e à direita no inglês, e a sigla do
// idioma atual ocupa o outro lado.
export default function TrocaIdioma({ idioma, rotulo }: { idioma: Idioma; rotulo: string }) {
    const outro: Idioma = idioma === "pt" ? "en" : "pt"
    const [trocando, setTrocando] = useState(false)
    const mostrado = trocando ? outro : idioma
    const en = mostrado === "en"

    function trocar() {
        // Um ano: a escolha vale para as próximas visitas, e o proxy a lê
        // antes do idioma do navegador.
        document.cookie = `${COOKIE_IDIOMA}=${outro}; path=/; max-age=31536000; samesite=lax`
        setTrocando(true)
        // Recarga inteira, e não navegação do cliente: a outra língua troca o
        // <html lang> e as animações de scroll montam de novo do zero. A espera
        // deixa a bolinha terminar de deslizar.
        setTimeout(() => window.location.assign(caminho(outro) + window.location.hash), 250)
    }

    return (
        <button
            type="button"
            onClick={trocar}
            disabled={trocando}
            aria-label={rotulo}
            lang={outro === "en" ? "en" : "pt-BR"}
            className="relative flex h-10 w-[84px] shrink-0 items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-colors hover:border-brand/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
            <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-brand/40 bg-[#0b130f] text-brand shadow-[0_0_14px_-2px_rgba(0,232,122,0.55),inset_0_0_10px_rgba(0,232,122,0.15)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    en ? "translate-x-[42px]" : "translate-x-0"
                }`}
            >
                <Languages className="h-4 w-4" strokeWidth={2} aria-hidden />
            </span>
            <span
                aria-hidden
                className={`absolute top-1/2 -translate-y-1/2 text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-white/85 ${
                    en ? "left-3.5" : "right-3.5"
                }`}
            >
                {mostrado}
            </span>
        </button>
    )
}
