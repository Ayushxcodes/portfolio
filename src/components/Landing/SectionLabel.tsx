export default function SectionLabel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em]
        uppercase mb-12 flex items-center gap-4 ${className}`}
    >
      {children}
    </div>
  );
}
