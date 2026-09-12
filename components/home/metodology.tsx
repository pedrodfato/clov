import { Circle } from "lucide-react";

export default function Metodology() {

  const meth = [
    {letter: "C", title: "Concept", desc: "Direção estratégica antes de qualquer execução", number: "01"},
    {letter: "L", title: "Language", desc: "Design como ferramenta de comunicação e posicionamento", number: "02"},
    {letter: "O", title: "Orchestration", desc: "Cada interação tem um propósito: conduzir à ação.", number: "03"},
    {letter: "V", title: "Velocity", desc: "Performance que acelera, conversão que escala.", number: "04"}
  ]
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center gap-[40px] px-40 text-white/80">
        <div className="w-[870px] flex flex-col justify-center items-center gap-15 relative">
        <div className="absolute bg-[#061910] w-[400px] h-[250px] top-30 left-60 z-2 rounded-full blur-3xl"></div>
      <div className="text-center flex flex-col pb-3 gap-3 items-center z-3">
        <div className="bg-gradient-to-r from-[#5BB421] to-[#0B4C11]/60 flex items-center justify-center p-[1px] rounded-md mb-3 w-fit"><span className="bg-gradient-to-r from-[#021002] to-[#000000] flex rounded-md px-4 py-1 gap-2 items-center text-[14px] text-[#00db71] uppercase"><Circle className="w-2 h-2 bg-[#00db71] rounded-full text-[#00db71] " /> Metodologia</span></div>
        <h2 className="font-bold text-4xl">O método <span className="text-[#00E87A]">CLOV</span></h2>
        <p className="font-mono text-white/50 w-[70%]">Quatro pilares que separam marcas comuns de marcas extraordinárias</p>
        </div>
        <div className="grid grid-cols-4 w-full z-3 ">
          {meth.map((m) => {
            return(
              <div key={m.number} className="flex flex-col h-full border-r border-[#11542e]/25 last:border-r-0 z-1"> 
                <div className="border-b-1 border-[#11542e]/25 text-center">
                  <h3 className="text-[70px] font-bold text-[#00E87A]">{m.letter}</h3>
                </div>
                <div className="group relative text-start font-mono gap-3 flex flex-col py-7 px-8 border-b border-[#11542e]/25 transition-all duration-500 hover:bg-[#00E87A]/[0.02] cursor-default overflow-hidden flex-1">
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#00E87A] to-transparent transition-all duration-500 group-hover:w-full"></div>
                  
                  <p className="text-white/30 text-sm transition-colors duration-500 group-hover:text-[#00E87A]/50">{m.number}</p>
                  <h3 className="font-bold text-[#00E87A] text-[15px] uppercase tracking-widest transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(0,232,122,0.6)]">
                    {m.title}
                  </h3>
                  <p className="text-white/50 text-[15px] leading-relaxed transition-colors duration-500 group-hover:text-white/70">{m.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

