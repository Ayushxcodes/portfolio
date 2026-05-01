"use client";
import React from "react";

export default function FilterBar({ filters, activeFilter, setActiveFilter, onHover, onLeave }: { filters: string[]; activeFilter: string; setActiveFilter: (f: string) => void; onHover: () => void; onLeave: () => void; }) {
  return (
    <div className="flex border-b border-[#222] overflow-x-auto">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className={[
            "font-['JetBrains_Mono',monospace] text-[0.72rem] tracking-[0.12em] uppercase border-none border-r border-[#222] px-7 py-[1.1rem] cursor-none transition-[color,background] duration-200 whitespace-nowrap",
            activeFilter === f
              ? "text-black bg-[#d4ff47]"
              : "text-[#6a6a6a] bg-transparent hover:text-[#f0ede6] hover:bg-[#141414]",
          ].join(" ")}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
