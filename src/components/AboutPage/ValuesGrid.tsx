"use client";
import React from "react";

export interface ValueItem {
  num: string;
  title: string;
  desc: string;
}

export default function ValuesGrid({ values, onHover, onLeave, assignRef }: { values: ValueItem[]; onHover: () => void; onLeave: () => void; assignRef: (i: number, el: HTMLDivElement | null) => void; }) {
  const valueBorder = (i: number) => (i % 3 !== 2 ? "border-b border-r border-[#222]" : "border-b border-[#222]");

  return (
    <section id="values" className="border-b border-[#222]">
      <div className="px-12 pt-24 pb-8">
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase flex items-center gap-4">
          What I believe
          <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {values.map((v, i) => (
          <div
            key={i}
            ref={(el) => assignRef(i, el)}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`p-10 opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${valueBorder(i)}`}
          >
            <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em] mb-4">
              {v.num}
            </div>
            <div className="font-['DM_Serif_Display',serif] text-[1.5rem] mb-3">
              {v.title}
            </div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] leading-[2]">
              {v.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
