export default function Ticker({ items }: { items: { label: string; highlight: boolean }[] }) {
  return (
    <div className="border-t border-b border-[#222] overflow-hidden py-4 bg-[#141414]">
      <div className="animate-ticker flex items-center w-max">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-mono text-[0.75rem] tracking-[0.12em] uppercase px-10 whitespace-nowrap
                ${item.highlight ? 'text-[#d4ff47]' : 'text-[#6a6a6a]'}`}
            >
              {item.label}
            </span>
            <span className="text-[#222] text-xl">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
