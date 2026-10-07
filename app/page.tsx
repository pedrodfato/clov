import Hero from "@/components/home/hero"
import HeroToque from "@/components/home/HeroToque"
import Parceiros from "@/components/home/parceiros"
import Numeros from "@/components/home/numeros"
import About from "@/components/home/about"
import Metodology from "@/components/home/metodology"
import Solutions from "@/components/home/solutions"
import Projects from "@/components/home/projects"
import Faq from "@/components/home/faq"
import Contact from "@/components/home/contact"
import Footer from "@/components/Footer"

export default function Home() {
  return(
    <>
    {/* Hero + Parceiros dividem a primeira tela: a hero ocupa a sobra. No
        scroll ela fica presa até as mãos se tocarem — ver HeroToque. */}
    <HeroToque>
      <Hero />
      <Parceiros/>
    </HeroToque>
    <Numeros/>
    <About/>
    <Metodology/>
    <Solutions/>
    <Projects/>
    <Contact/>
    <Faq/>
    <Footer/>
    </>
  )
}