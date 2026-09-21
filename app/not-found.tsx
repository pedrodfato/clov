import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E87A]/20 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E87A]/30 blur-[100px]" />
      </div>

      <div className="relative flex items-center justify-center gap-2 sm:gap-4">
        <span className="text-[120px] font-bold leading-none text-white sm:text-[180px]">4</span>
        <Image
          src="/faviconclov.svg"
          alt=""
          width={193}
          height={190}
          unoptimized
          className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]"
        />
        <span className="text-[120px] font-bold leading-none text-white sm:text-[180px]">4</span>
      </div>

      <p className="relative mt-4 max-w-[420px] font-mono text-white/50">
        Não encontramos a página que você estava procurando.
      </p>

      <Link
        href="/"
        className="group relative mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[15px] font-mono text-white/70 transition-all duration-300 hover:border-[#00E87A]/40 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        Voltar para o início
      </Link>
    </section>
  );
}
