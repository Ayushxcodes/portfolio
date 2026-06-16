"use client";
import React from "react";

export interface StackItem {
  cat: string;
  name: string;
  use: string;
}

export default function StackGrid({ stack, onHover, onLeave }: { stack: StackItem[]; onHover: () => void; onLeave: () => void; }) {
  const stackBorder = (i: number) => {
    const mobileRight = i % 2 !== 1;
    const desktopRight = i % 4 !== 3;
    if (mobileRight && desktopRight) return "border-b border-r border-[#222]";
    if (mobileRight && !desktopRight) return "border-b border-r md:border-r-0 border-[#222]";
    if (!mobileRight && desktopRight) return "border-b border-[#222] md:border-r md:border-[#222]";
    return "border-b border-[#222]";
  };

  return (
    <section className="border-b border-[#222]">
      <div className="px-12 pt-24 pb-8">
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase flex items-center gap-4">
          Daily stack
          <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stack.map((s, i) => (
          <div key={i} onMouseEnter={onHover} onMouseLeave={onLeave} className={`p-8 transition-colors duration-200 hover:bg-[#141414] ${stackBorder(i)}`}>
            <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#d4ff47] tracking-[0.12em] uppercase mb-2">{s.cat}</div>
            <div className="font-bold text-[1rem] mb-1">{s.name}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#6a6a6a] leading-[1.7]">{s.use}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
