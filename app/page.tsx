import Hero from "@/components/home/hero"
import Parceiros from "@/components/home/parceiros"
import About from "@/components/home/about"
import Metodology from "@/components/home/metodology"
import Solutions from "@/components/home/solutions"
import Projects from "@/components/home/projects"
import Reviews from "@/components/home/reviews"
import Contact from "@/components/home/contact"

export default function Home() {
  return(
    <>
    {/* Hero + Parceiros dividem a primeira tela: a hero ocupa a sobra. */}
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Parceiros/>
    </div>
    <About/>
    <Metodology/>
    <Solutions/>
    <Projects/>
    {/* Reviews prende (pin) e o Contato desliza por cima dela — ver contact.tsx. */}
    <Reviews/>
    <Contact/>
    </>
  )
}