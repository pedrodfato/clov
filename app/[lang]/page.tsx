import Hero from "@/components/v2/Hero"
import Numeros from "@/components/v2/Numeros"
import Letreiro from "@/components/v2/Letreiro"
import QuemSomos from "@/components/v2/QuemSomos"
import Diagnostico from "@/components/v2/Diagnostico"
import ComoFunciona from "@/components/v2/ComoFunciona"
import Solucoes from "@/components/v2/Solucoes"
import Projetos from "@/components/v2/Projetos"
import Contato from "@/components/v2/Contato"
import Faq from "@/components/v2/Faq"
import Rodape from "@/components/v2/Rodape"
import { dicionario } from "@/dicionarios"
import { idiomaDe } from "@/dicionarios/idiomas"

// v2: estrutura inspirada na referência (letreiros gigantes, etapas
// presas no scroll). A versão anterior está na tag git `v1`.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const d = dicionario(idiomaDe((await params).lang))

  return (
    <>
      <main>
        <Hero t={d.hero} whatsapp={d.whatsapp} />
        <Numeros t={d.numeros} locale={d.locale} />
        <Letreiro partes={d.letreiro} />
        <QuemSomos t={d.quemSomos} />
        <Diagnostico t={d.diagnostico} whatsapp={d.whatsapp} />
        <ComoFunciona t={d.comoFunciona} />
        <Solucoes t={d.solucoes} />
        <Projetos t={d.projetos} />
        <Contato t={d.contato} whatsapp={d.whatsapp} />
        <Faq t={d.faq} />
      </main>
      <Rodape t={d.rodape} links={d.header.links} whatsapp={d.whatsapp} />
    </>
  )
}
