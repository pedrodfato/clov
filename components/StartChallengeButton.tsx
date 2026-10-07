import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type Props = {
    href?: string
    children: React.ReactNode
    className?: string
}

export default function StartChallengeButton({ href = "#", children, className = "" }: Props) {
    return (
        <Link
            href={href}
            // isolate + overflow-hidden: a onda é pintada por baixo do texto e
            // recortada na pílula.
            className={`group relative isolate flex items-center gap-[1.2em] overflow-hidden rounded-full border border-transparent bg-ink p-[0.45em] pl-[1.8em] text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-brand-deep shadow-[0_10px_40px_-10px_rgba(0,232,122,0.45)] transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#7dffbf] hover:shadow-[0_14px_50px_-8px_rgba(0,232,122,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${className}`}
        >
            {/* Onda: um círculo do tamanho exato do botão redondo, por baixo dele.
                Parado é invisível (os dois são verde-escuros); no hover cresce e se
                espalha pela pílula. Na saída volta para dentro do círculo, sem deixar
                sobra à vista. 19x cobre o botão mais largo do site, que precisa de 16x. */}
            <span
                aria-hidden
                className="pointer-events-none absolute right-[0.45em] top-1/2 -z-10 aspect-square h-[2.75em] -translate-y-1/2 scale-100 rounded-full bg-brand-deep transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[19]"
            />

            {/* O texto branco é revelado pelo mesmo círculo da onda, no mesmo
                tempo e na mesma curva: nunca fica claro sobre claro nem escuro
                sobre escuro no meio da transição. Raios em em, iguais aos da
                onda (1.375em parado, 26.125em = 19x no hover), centrados no
                botão redondo, que fica 2.575em à direita deste texto. */}
            <span className="relative leading-none">
                {children}
                <span
                    aria-hidden
                    className="absolute inset-0 text-white [clip-path:circle(1.375em_at_calc(100%_+_2.575em)_50%)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:[clip-path:circle(26.125em_at_calc(100%_+_2.575em)_50%)]"
                >
                    {children}
                </span>
            </span>

            {/* Em em, não em px: o círculo acompanha o tamanho do texto (o header usa menor).
                No hover as cores trocam: o círculo vira branco e a seta, verde-escura. */}
            <span className="flex h-[2.75em] w-[2.75em] shrink-0 items-center justify-center rounded-full bg-brand-deep text-brand transition-[transform,background-color,color] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] [transition-duration:500ms,700ms,700ms] group-hover:rotate-45 group-hover:bg-white group-hover:text-brand-deep">
                <ArrowUpRight className="h-[1.25em] w-[1.25em]" strokeWidth={2.25} />
            </span>
        </Link>
    )
}
