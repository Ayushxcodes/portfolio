"use client";
import React from "react";

export interface OutsideItem {
  emoji: string;
  title: string;
  desc: string;
}

export default function OutsideGrid({ outside }: { outside: OutsideItem[] }) {
  return (
    <section id="outside" className="border-b border-[#222]">
      <div className="px-12 pt-24 pb-8">
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase flex items-center gap-4">
          Beyond code
          <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {outside.map((item, i) => (
          <div
            key={i}
            className={[
              "p-10 relative overflow-hidden group",
              "border-b border-[#222] md:border-b-0",
              i < outside.length - 1 ? "md:border-r md:border-[#222]" : "",
            ].join(" ")}
          >
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4ff47] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="text-[2rem] mb-4 block">{item.emoji}</span>
            <div className="font-['DM_Serif_Display',serif] text-[1.3rem] mb-2">{item.title}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] leading-[1.9]">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
