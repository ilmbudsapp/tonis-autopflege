type TonisTipProps = {
  children: React.ReactNode;
  className?: string;
};

/** Actionable E-E-A-T tip block for AEO/GEO scanners. */
export function TonisTip({ children, className = "" }: TonisTipProps) {
  return (
    <aside
      className={`rounded-xl border border-[#c9a227]/35 bg-[#c9a227]/[0.07] px-4 py-3 text-left shadow-[inset_0_1px_0_rgba(201,162,39,0.12)] ${className}`}
      aria-label="Toni's Tipp"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]/90">Toni&apos;s Tipp</p>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{children}</p>
    </aside>
  );
}
