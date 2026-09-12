import Image from "next/image";
import StartChallengeButton from "../StartChallengeButton";
import FreeTrialButton from "../FreeTrialButton";

export default function Hero() {
    return(
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <Image
                src="/hero1.png"
                alt=""
                fill
                priority
                className="absolute inset-0 m-auto object-contain pointer-events-none select-none"
            />
            <div className="relative text-center">
            <h1 className='text-[52px] font-semibold leading-[1.2em]'>Onde a criatividade<br/>
encontra resultados</h1>
            <ul className='text-muted flex items-center justify-center gap-4 my-8'>
                <li>Desenvolvimento</li>
                <li>Segurança</li>
                <li>Automações com IA</li>
            </ul>
            <div className='flex items-center justify-center gap-4'>
                <StartChallengeButton />
                <FreeTrialButton />
            </div>
            </div>
        </section>
    )
}