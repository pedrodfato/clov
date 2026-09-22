import Hero from "@/components/home/hero"
import Parceiros from "@/components/home/parceiros"
import About from "@/components/home/about"
import Metodology from "@/components/home/metodology"
import Solutions from "@/components/home/solutions"
import Reviews from "@/components/home/reviews"
import Contact from "@/components/home/contact"

export default function Home() {
  return(
    <>
    {/* Alvo do fade-out quando o contato assume a tela (ver contact.tsx). */}
    <div id="page-top">
    {/* Hero + Parceiros dividem a primeira tela: a hero ocupa a sobra. */}
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Parceiros/>
    </div>
    <About/>
    <Metodology/>
    <Solutions/>
    <Reviews/>
    </div>
    <Contact/>
    </>
  )
}