import Reveal from "../Reveal";

// Os sintomas são o conteúdo principal aqui, não o título: a seção existe pra
// pessoa se reconhecer numa lista, então ela pesa mais que o cabeçalho.
const sintomas = [
  "O site foi feito para uma empresa menor do que a de hoje.",
  "Informação que importa mora em planilha e no WhatsApp.",
  "As ferramentas não se falam, e alguém copia dado de uma para a outra.",
  "Ninguém dentro da empresa é dono da camada digital.",
  "Cada processo depende de alguém lembrar de fazer.",
  "O que resolveu no ano passado já está apertado agora.",
];

export default function Situacao() {
  return (
    <section id="situacao" className="w-full px-6 sm:px-10 lg:px-24 py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
        <Reveal split className="flex flex-col gap-4">
          <h2 className="max-w-[24ch] text-[26px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[32px]">
            O negócio cresceu e a estrutura ficou do mesmo tamanho.
          </h2>
          <p className="max-w-[52ch] font-mono text-[15px] leading-relaxed text-white/45">
            Nenhum desses se resolve com um site novo.
          </p>
        </Reveal>

        <Reveal targets="li" stagger={0.1}>
          <ul className="grid grid-cols-1 border-t border-brand-line/25 md:grid-cols-2 md:gap-x-16">
            {sintomas.map((s) => (
              <li
                key={s}
                className="border-b border-brand-line/25 py-6 font-mono text-[15px] leading-relaxed text-white/60"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
