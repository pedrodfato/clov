// Pílula pequena acima dos títulos, como na referência.
export default function Etiqueta({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] leading-none text-white/72 backdrop-blur ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(0,232,122,0.9)]" />
      {children}
    </span>
  );
}
