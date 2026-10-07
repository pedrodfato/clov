import Reveal from "../Reveal";
import Etiqueta from "./Etiqueta";

// Ferramentas com que o fundador trabalha hoje (PRODUCT.md), correndo como o
// ticker de cotações da referência.
const FERRAMENTAS = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "APIs", "n8n", "Make",
  "Shopify", "WordPress", "Integrações", "Automações", "SEO", "Analytics", "IA aplicada",
];

const FACES = [
  "translateZ(90px)",
  "rotateY(180deg) translateZ(90px)",
  "rotateY(90deg) translateZ(90px)",
  "rotateY(-90deg) translateZ(90px)",
  "rotateX(90deg) translateZ(90px)",
  "rotateX(-90deg) translateZ(90px)",
];

function Faixa({ reverso = false }: { reverso?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className={`flex shrink-0 gap-3 pr-3 ${reverso ? "v2-letreiro-reverso" : "v2-letreiro"}`}>
        {/* Duas cópias lado a lado: a animação anda metade e emenda sem salto. */}
        {[...FERRAMENTAS, ...FERRAMENTAS].map((f, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2 text-[13px] text-white/50"
          >
            <span className="h-1 w-1 rounded-full bg-brand/70" />
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="relative w-full overflow-hidden bg-surface pt-24 pb-20 md:pt-32">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-16 px-6 sm:px-10 md:grid-cols-2 md:gap-10">
        {/* Cubo de arame aceso com o título por cima, no lugar do
            "Our Capital, Your Success" da referência. */}
        <div className="relative flex h-[340px] items-center justify-center md:h-[440px]">
          <div aria-hidden className="absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(0,232,122,0.18),transparent)]" />
          <div aria-hidden className="[perspective:900px]">
            <div className="v2-cubo relative h-[180px] w-[180px]">
              {FACES.map((t) => (
                <div
                  key={t}
                  className="absolute inset-0 border border-[#b9ffd9]/40 bg-brand/[0.03] shadow-[0_0_24px_rgba(0,232,122,0.25),inset_0_0_24px_rgba(0,232,122,0.12)]"
                  style={{ transform: t }}
                />
              ))}
            </div>
          </div>
          <p className="v2-glow absolute max-w-[12ch] text-center text-[34px] font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-[42px]">
            O time é pequeno de propósito.
          </p>
        </div>

        <Reveal targets="[data-r]" stagger={0.12} className="flex flex-col items-start gap-5">
          <div data-r>
            <Etiqueta>Quem somos?</Etiqueta>
          </div>
          <h2 data-r className="max-w-[20ch] text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px]">
            Design, engenharia e automação no mesmo time.
          </h2>
          <p data-r className="max-w-[54ch] text-[15px] leading-relaxed text-white/50">
            Você fala direto com quem constrói, sem camada de atendimento no meio do caminho e sem o projeto trocar de mão
            três vezes até sair.
          </p>
          <p data-r className="max-w-[54ch] text-[15px] leading-relaxed text-white/50">
            Todo projeto começa por um diagnóstico e termina em algo que dá para conferir: uma conversão que subiu, horas
            que voltaram para a equipe ou um processo que parou de depender de alguém lembrar.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 flex flex-col gap-3">
        <Faixa />
        <Faixa reverso />
      </div>
    </section>
  );
}
