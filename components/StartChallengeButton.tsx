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
            className={`group flex items-center gap-3 rounded-full bg-white pl-5 pr-1.5 py-1.5 text-[15px] font-semibold leading-none text-black transition-colors hover:bg-white/90 ${className}`}
        >
            <span className="leading-none">{children}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-black transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
        </Link>
    )
}
