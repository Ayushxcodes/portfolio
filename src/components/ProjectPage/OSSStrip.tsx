"use client";
import React from "react";

export interface OSSItem {
  name: string;
  desc: string;
  stars: string;
  forks: string;
  lang: string;
}

export default function OSSStrip({ oss, onHover, onLeave }: { oss: OSSItem[]; onHover: () => void; onLeave: () => void; }) {
  return (
    <div className="px-12 py-20 border-b border-[#222]">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-['DM_Serif_Display',serif] text-[2.5rem]">Open source</h2>
        <a href="#" onMouseEnter={onHover} onMouseLeave={onLeave} className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] no-underline tracking-[0.08em] hover:text-[#f0ede6] transition-colors duration-200">View all on GitHub →</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {oss.map((o, i) => (
          <div key={i} onMouseEnter={onHover} onMouseLeave={onLeave} className={["p-7 border-t border-[#222]", i < oss.length - 1 ? "border-r border-[#222]" : ""].join(" ")}>
            <div className="font-bold text-[0.95rem] mb-[0.35rem] text-[#d4ff47]">{o.name}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] leading-[1.8] mb-3">{o.desc}</div>
            <div className="flex gap-6">
              <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.08em]">⭐ <span className="text-[#f0ede6]">{o.stars}</span></span>
              <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.08em]">Forks <span className="text-[#f0ede6]">{o.forks}</span></span>
              <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.08em]">{o.lang}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
