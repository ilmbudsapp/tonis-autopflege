/** Short AEO answer (40–200 chars) directly below an H2. */
export function SectionSummary({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`section-summary mx-auto mt-3 max-w-2xl text-pretty text-sm font-medium leading-relaxed text-zinc-400 md:text-base ${className}`.trim()}
    >
      {children}
    </p>
  );
}
