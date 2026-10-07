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
            className={`group flex items-center gap-[1.2em] rounded-full bg-ink p-[0.45em] pl-[1.8em] text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-brand-deep shadow-[0_10px_40px_-10px_rgba(0,232,122,0.45)] transition-[box-shadow,background-color] duration-300 hover:bg-white hover:shadow-[0_14px_50px_-8px_rgba(0,232,122,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${className}`}
        >
            <span className="leading-none">{children}</span>
            {/* Em em, não em px: o círculo acompanha o tamanho do texto (o header usa menor). */}
            <span className="flex h-[2.75em] w-[2.75em] shrink-0 items-center justify-center rounded-full bg-brand-deep text-brand transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-[1.25em] w-[1.25em]" strokeWidth={2.25} />
            </span>
        </Link>
    )
}
