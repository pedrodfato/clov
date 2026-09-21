import Link from "next/link"

type Props = {
    href?: string
    children: React.ReactNode
    className?: string
}

export default function FreeTrialButton({ href = "#", children, className = "" }: Props) {
    return (
        <Link
            href={href}
            className={`flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-[15px] font-semibold leading-none text-white transition-colors hover:bg-white/10 ${className}`}
        >
            {children}
        </Link>
    )
}
