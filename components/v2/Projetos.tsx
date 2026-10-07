"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

const PROJETOS = [
  { nome: "FinalForms", desc: "Plataforma para escolas", href: "https://www.finalforms.com/", dominio: "finalforms.com", img: "/projects/finalforms.jpg" },
  { nome: "IH Roma", desc: "Escola de idiomas", href: "https://ihroma.it/", dominio: "ihroma.it", img: "/projects/ihroma.jpg" },
  { nome: "Dazze Móveis", desc: "E-commerce de móveis", href: "https://dazzemoveis.com.br/", dominio: "dazzemoveis.com.br", img: "/projects/dazze.jpg" },
];

// Inclina o card na direção do mouse, como o certificado da referência.
function inclina(e: React.PointerEvent<HTMLAnchorElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
}

function solta(e: React.PointerEvent<HTMLAnchorElement>) {
  e.currentTarget.style.transform = "";
}

// "Payouts / Certificates" da referência: palavras gigantes apagadas atrás e
// os projetos de verdade na frente, acesos.
export default function Projetos() {
  return (
    <section id="projetos" className="relative w-full overflow-hidden bg-surface px-6 py-28 sm:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 flex select-none justify-between whitespace-nowrap px-4 text-[17vw] font-normal leading-none tracking-[-0.05em] text-white/[0.04]">
        <span>No ar</span>
        <span>hoje</span>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <Reveal split className="text-center">
          <h2 className="text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
            O que já colocamos no ar
          </h2>
          <p className="mt-3 text-[15px] text-white/65">Clientes reais, todos no ar hoje.</p>
        </Reveal>

        <Reveal targets="a" stagger={0.14} className="mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {PROJETOS.map((p) => (
            <a
              key={p.nome}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerMove={inclina}
              onPointerLeave={solta}
              className="group flex flex-col gap-4 rounded-2xl transition-transform duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-brand/25 bg-[#0b100d] shadow-[0_0_0_1px_rgba(0,232,122,0.05),0_30px_70px_-30px_rgba(0,232,122,0.45)] transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(0,232,122,0.3),0_30px_80px_-20px_rgba(0,232,122,0.6)]">
                <Image
                  src={p.img}
                  alt={`Site da ${p.nome}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-top opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b09] via-transparent to-transparent" />
              </div>
              <div className="flex items-baseline justify-between gap-4 px-1">
                <div>
                  <h3 className="text-[20px] tracking-[-0.02em] text-ink">{p.nome}</h3>
                  <p className="text-[13px] text-white/60">{p.desc}</p>
                </div>
                <span className="flex items-center gap-1 text-[12px] text-white/35 transition-colors group-hover:text-brand">
                  {p.dominio}
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
