export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-brand">
      <span className="text-brand/45">/</span>
      {children}
    </p>
  );
}
