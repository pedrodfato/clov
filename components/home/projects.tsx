"use client";


import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "../SectionLabel";
import Reveal from "../Reveal";
import ShaderImage from "../ShaderImage";
import useNearViewport from "../useNearViewport";

// Grade mais fechada que a do hero: a tela do site tem mais detalhe que uma
// mão. Ponto pequeno e verde puxado pra baixo deixam o efeito mais discreto.
const HALFTONE = {
  uGridSize: 2.6,
  uDotSize: 0.8,
  uContrast: 1.08,
  uBrightness: -0.01,
  uColor: "#00ff66",
};

// Sites de fundo claro precisam da luminância invertida, senão o branco
// preenche todos os pontos e vira um borrão verde.
const HALFTONE_LIGHT = { ...HALFTONE, uInvert: 1, uContrast: 1.2, uBrightness: -0.04 };

const projects = [
  {
    name: "FinalForms",
    desc: "Plataforma para escolas",
    href: "https://www.finalforms.com/",
    domain: "finalforms.com",
    img: "/projects/finalforms.jpg",
  },
  {
    name: "IH Roma",
    desc: "Escola de idiomas",
    href: "https://ihroma.it/",
    domain: "ihroma.it",
    img: "/projects/ihroma.jpg",
    light: true,
  },
  {
    name: "Dazze Móveis",
    desc: "E-commerce de móveis",
    href: "https://dazzemoveis.com.br/",
    domain: "dazzemoveis.com.br",
    img: "/projects/dazze.jpg",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [ref, near] = useNearViewport<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-xl border border-brand-line/25 bg-surface transition-colors duration-500 group-hover:border-brand/50"
      >
        <Image
          src={project.img}
          alt={`Site da ${project.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover object-top"
        />

        {/* Véu: o screenshot aparece por baixo o tempo todo e o halftone é só
            uma textura por cima. O canvas já é transparente entre os pontos,
            então a opacidade baixa deixa o site legível. Some todo no hover. */}
        <div className="absolute inset-0 bg-surface/30 opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0 group-focus-visible:opacity-0">
          <div className="absolute inset-0 opacity-[0.35]">
            {near && (
              <ShaderImage
                src={project.img}
                className="h-full w-full"
                overrides={project.light ? HALFTONE_LIGHT : HALFTONE}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight text-ink">{project.name}</h3>
        <span className="flex items-center gap-1.5 font-mono text-xs text-white/35 transition-colors duration-300 group-hover:text-brand">
          {project.domain}
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
      <p className="-mt-2 font-mono text-[13px] text-white/40">{project.desc}</p>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projetos" className="flex min-h-[100dvh] w-full flex-col justify-center px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      <div data-projetos-content className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 md:gap-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="flex flex-col gap-4">
            <SectionLabel>Projetos</SectionLabel>
            <Reveal split>
              <h2 className="max-w-[20ch] text-balance text-[34px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[46px] lg:text-[52px]">
                O que já colocamos no ar
              </h2>
            </Reveal>
          </div>
          <p className="max-w-[40ch] font-mono text-[15px] leading-relaxed text-white/45 md:pb-2">
            Clientes reais, todos no ar hoje.
            {/* A dica só aparece em aparelho que tem mouse pra passar. */}
            <span className="hidden [@media(hover:hover)]:inline">
              {" "}
              Passe o mouse para ver sem o efeito.
            </span>
          </p>
        </div>

        <Reveal targets="a" stagger={0.14} className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
