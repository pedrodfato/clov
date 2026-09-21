const CLIENTS = ["PLATTY", "GREEN DYNAMICS", "DAZZEMOVEIS"]

export default function Parceiros() {
    return (
        <section className="relative w-full bg-surface">
            <div className="flex flex-col items-center gap-4 border-t border-brand-line/25 px-6 py-6 sm:flex-row sm:justify-between sm:px-16 lg:px-24">
                <p className="font-mono text-sm text-white/40">Confiado por profissionais e empresas como:</p>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                    {CLIENTS.map((client) => (
                        <span key={client} className="font-mono text-sm text-white/35">
                            {client}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
