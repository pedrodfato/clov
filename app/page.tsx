import Hero from "@/components/v2/Hero"
import Numeros from "@/components/v2/Numeros"
import Letreiro from "@/components/v2/Letreiro"
import QuemSomos from "@/components/v2/QuemSomos"
import Diagnostico from "@/components/v2/Diagnostico"
import ComoFunciona from "@/components/v2/ComoFunciona"
import Solucoes from "@/components/v2/Solucoes"
import Projetos from "@/components/v2/Projetos"
import PorQue from "@/components/v2/PorQue"
import Depoimentos from "@/components/v2/Depoimentos"
import Contato from "@/components/v2/Contato"
import Faq from "@/components/v2/Faq"
import Rodape from "@/components/v2/Rodape"

// v2: estrutura inspirada na referência (holofote, letreiros gigantes, etapas
// presas no scroll). A versão anterior está na tag git `v1`.
export default function Home() {
  return (
    <>
      <Hero />
      <Numeros />
      <Letreiro texto="Site · Integrações · Automação ·" />
      <QuemSomos />
      <Diagnostico />
      <ComoFunciona />
      <Solucoes />
      <Projetos />
      <PorQue />
      <Letreiro texto="Fale direto com quem constrói ·" sentido={-1} />
      <Depoimentos />
      <Contato />
      <Faq />
      <Rodape />
    </>
  )
}
