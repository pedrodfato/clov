import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-line/25 bg-surface">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-24">
        <Image
          src="/logoclov.svg"
          alt="Clov"
          width={260}
          height={104}
          unoptimized
          className="h-9 w-auto"
        />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-sm text-white/40">
          <span>© 2026 Clov</span>
          <Link href="#" className="transition-colors hover:text-white/70">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
