import Image from "next/image";
import Reveal from "../Reveal";
import Etiqueta from "./Etiqueta";

// Plataformas em cima, código embaixo, correndo em sentidos opostos.
const PLATAFORMAS = ["WordPress", "Elementor", "Shopify", "n8n", "Zapier", "Make", "Wix"];
const CODIGO = ["React", "Next.js", "NestJS", "TypeScript", "Python"];

// Quantas pílulas cada metade da faixa precisa ter. A animação anda metade da
// faixa e emenda; se essa metade for mais curta que a tela, aparece um vão
// vazio na ponta antes do loop. Listas curtas são repetidas até passar disso.
const MINIMO_POR_METADE = 20;

function Faixa({ itens, reverso = false }: { itens: string[]; reverso?: boolean }) {
  const repeticoes = Math.ceil(MINIMO_POR_METADE / itens.length);
  const metade = Array.from({ length: repeticoes }, () => itens).flat();

  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className={`flex shrink-0 gap-3 pr-3 ${reverso ? "v2-letreiro-reverso" : "v2-letreiro"}`}>
        {/* Duas cópias lado a lado: a animação anda metade e emenda sem salto. */}
        {[...metade, ...metade].map((f, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2 text-[13px] text-white/65"
          >
            <span className="h-1 w-1 rounded-full bg-brand/70" />
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// Composição do "portfolio" da referência: palavra gigante ao fundo, a foto do
// fundador no meio, na frente dela, título à esquerda e texto à direita.
export default function QuemSomos() {
  return (
    <section id="quem-somos" className="relative w-full overflow-hidden bg-surface pt-16 md:pt-28">
     
      {/* Brilho verde ao fundo, como o halo da referência: concentrado atrás da
          foto e desvanecendo nas bordas. Cada mancha tem um par de divs — a de
          fora posiciona, a de dentro anima, senão um transform apaga o outro. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        
        <div className="absolute left-[10%] top-[66%] h-[26vw] w-[30vw] -translate-y-1/2">
          <div className="v2-aurora-b h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(0,237,158,0.10),transparent)] blur-2xl [animation-delay:-14s]" />
        </div>
        {/* Escurece as bordas, para o brilho ficar contido no meio. */}
        <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_40%,transparent_45%,#0a0a0a_100%)]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 select-none whitespace-nowrap text-center text-[19vw] font-normal leading-none tracking-[-0.05em] text-white/[0.04] md:top-12"
      >
        Fundador
      </div>

      <div className="relative mx-auto grid w-full max-w-[1400px] items-end gap-12 px-6 sm:px-10 md:grid-cols-[1fr_auto_1fr] md:gap-10">
        <Reveal targets="[data-r]" stagger={0.12} className="flex flex-col items-start gap-5 md:pb-28">
          <div data-r>
            <Etiqueta>Quem somos?</Etiqueta>
          </div>
          <h2
            data-r
            className="max-w-[11ch] text-balance text-[38px] font-normal leading-[1.02] tracking-[-0.035em] text-ink sm:text-[52px] lg:text-[60px]"
          >
            Quem está por trás da <span className="titulo-brilho">Clov?
</span>
          </h2>
        </Reveal>

        {/* Foto recortada e opaca, acima do brilho e da palavra ao fundo. */}
        <div className="relative z-10 order-first mx-auto w-[min(505px,82vw)] md:order-none">
          <Image
            src="/fundador.webp"
            alt="Fundador da Clov"
            width={920}
            height={1141}
            sizes="(max-width: 768px) 82vw, 460px"
            priority
            // Sem o otimizador: ele reconverte para JPEG, que não tem canal de
            // transparência, e o recorte voltava como um retângulo preto. O
            // arquivo já é um WebP de 126 KB, menor do que ele entregaria.
            unoptimized
            className="h-auto w-full"
          />
        </div>

        <Reveal
          targets="p"
          stagger={0.14}
          className="flex max-w-[60ch] flex-col gap-5 text-[15px] leading-relaxed text-white/65 md:justify-self-end md:pb-28"
        >
          <p>
            Sou Pedro, desenvolvedor e fundador da Clov.</p><p>

Há mais de 5 anos construo sites, sistemas e automações para empresas no Brasil e no exterior. Passei por agência, liderei equipe e vi de perto como um projeto se perde quando passa por muitas mãos.
          </p>
          <p>Criei a Clov para ser o contrário: tecnologia sem distância nem complicação, feita por quem você conhece. Trabalho direto em cada projeto: entendo o problema, desenho a solução e construo cada parte dela.</p>
        </Reveal>
      </div>

      <div className="relative z-0 mt-10 flex flex-col gap-3 bg-[#0A0A0A] pt-8 pb-8 shadow-[0_-24px_72px_rgba(0,232,122,0.14)] md:mt-0 md:pt-8 md:pb-10">
        <Faixa itens={PLATAFORMAS} />
        <Faixa itens={CODIGO} reverso />
      </div>
    </section>
  );
}
