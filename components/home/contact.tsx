"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Circle,
  GitFork,
  Link2,
  Mail,
  MapPin,
  Send,
  X,
} from "lucide-react";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full flex flex-col items-center gap-[40px] px-40 py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#00E87A]/20 blur-[140px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00E87A]/30 blur-[100px]"></div>
      </div>

      <div className="relative w-full max-w-[900px] [perspective:2000px]">
        <div
          className={`grid transition-transform duration-700 [transform-style:preserve-3d] ${
            isOpen ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front face */}
          <div
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            className={`[grid-area:1/1] w-full min-h-[420px] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-16 py-20 flex-col items-center text-center gap-6 ${
              isOpen ? "hidden" : "flex"
            }`}
          >
            <div className="bg-gradient-to-r from-[#5BB421] to-[#0B4C11]/60 flex items-center justify-center p-[1px] rounded-md w-fit">
              <span className="bg-gradient-to-r from-[#021002] to-[#000000] flex rounded-md px-4 py-1 gap-2 items-center text-[14px] text-[#00db71] uppercase">
                <Circle className="w-2 h-2 bg-[#00db71] rounded-full text-[#00db71]" /> Entre
                em contato
              </span>
            </div>

            <h2 className="font-bold text-4xl leading-tight text-white/80">
              Vamos Dar Vida A <span className="text-[#00E87A]">Sua Ideia!</span>
            </h2>

            <p className="font-mono text-white/50 max-w-[480px]">
              Estou aberto para discutir sobre novas ideias e futuros projetos. Sinta-se à
              vontade para entrar em contato e transformar sua ideia em uma máquina de
              resultados.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[15px] font-mono text-white/70 transition-all duration-300 hover:border-[#00E87A]/40 hover:text-white"
              >
                Ver projetos
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00E87A] to-[#0B4C11] px-6 py-3 text-[15px] font-bold text-black transition-all duration-300 hover:drop-shadow-[0_0_16px_rgba(0,232,122,0.5)]"
              >
                Formulário de contato
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Back face */}
          <div
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            className={`[grid-area:1/1] [transform:rotateY(180deg)] relative w-full min-h-[420px] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-12 grid-cols-2 gap-10 ${
              isOpen ? "grid" : "hidden"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/50 transition-colors duration-300 hover:border-[#00E87A]/40 hover:text-[#00E87A]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-6 justify-center">
              <div className="bg-gradient-to-r from-[#5BB421] to-[#0B4C11]/60 flex items-center justify-center p-[1px] rounded-md w-fit">
                <span className="bg-gradient-to-r from-[#021002] to-[#000000] flex rounded-md px-4 py-1 gap-2 items-center text-[14px] text-[#00db71] uppercase">
                  <Circle className="w-2 h-2 bg-[#00db71] rounded-full text-[#00db71]" /> Entre
                  em contato
                </span>
              </div>

              <h3 className="font-bold text-2xl text-white/80 leading-tight">
                Vamos Dar Vida A <span className="text-[#00E87A]">Sua Ideia!</span>
              </h3>

              <p className="font-mono text-white/50 text-[15px] leading-relaxed">
                Estou aberto para discutir sobre novas ideias e futuros projetos. Sinta-se à
                vontade para entrar em contato e transformar sua ideia em uma máquina de
                resultados.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-[#11542e]/40 bg-[#00E87A]/5 px-4 py-3 font-mono text-[15px] text-white/70">
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#00E87A]/10 text-[#00E87A]">
                    <Mail className="w-4 h-4" />
                  </span>
                  contato@webpedro.com.br
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-[#11542e]/40 bg-[#00E87A]/5 px-4 py-3 font-mono text-[15px] text-white/70">
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#00E87A]/10 text-[#00E87A]">
                    <MapPin className="w-4 h-4" />
                  </span>
                  Jau, SP
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-mono text-white/40 text-sm">Redes</span>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="flex items-center justify-center w-9 h-9 rounded-md border border-white/10 text-white/60 transition-colors duration-300 hover:border-[#00E87A]/40 hover:text-[#00E87A]"
                  >
                    <Link2 className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-9 h-9 rounded-md border border-white/10 text-white/60 transition-colors duration-300 hover:border-[#00E87A]/40 hover:text-[#00E87A]"
                  >
                    <GitFork className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <form className="flex flex-col gap-4 justify-center">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-white/40 text-sm">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-[15px] text-white/80 placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#00E87A]/40"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-white/40 text-sm">E-mail</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-[15px] text-white/80 placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#00E87A]/40"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-white/40 text-sm">Mensagem</label>
                <textarea
                  rows={4}
                  placeholder="Conte um pouco sobre seu projeto"
                  className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-[15px] text-white/80 placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#00E87A]/40"
                />
              </div>
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00E87A] to-[#0B4C11] px-6 py-3 text-[15px] font-bold text-black transition-all duration-300 hover:drop-shadow-[0_0_16px_rgba(0,232,122,0.5)]"
              >
                Enviar mensagem
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
