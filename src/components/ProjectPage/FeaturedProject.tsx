"use client";
import React from "react";

export default function FeaturedProject({ stats, tags, onHover, onLeave }: { stats: any[]; tags: string[]; onHover: () => void; onLeave: () => void; }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#222] min-h-[500px]">
      <div className="bg-[#141414] flex items-center justify-center overflow-hidden relative border-b md:border-b-0 md:border-r border-[#222] min-h-[260px]">
        <span className="absolute top-8 left-8 font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em]">Featured</span>
        <span className="absolute top-8 right-8 font-['JetBrains_Mono',monospace] text-[0.65rem] text-black bg-[#d4ff47] px-[0.7rem] py-[0.3rem] tracking-[0.1em]">Case study</span>
        <div className="w-[70%] aspect-video bg-[#1a1a1a] border border-[#222] flex flex-col overflow-hidden">
          <div className="h-8 bg-[#111] border-b border-[#222] flex items-center gap-1.5 px-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 p-4 grid grid-cols-2 gap-2">
            <div className="bg-[#222] rounded-[2px] row-span-2 p-[10px]">
              <div className="h-[6px] bg-[#d4ff47] w-[40%] rounded-[1px] mb-1.5" />
              <div className="h-[6px] bg-[#333] rounded-[1px] mb-1.5" />
              <div className="h-[6px] bg-[#333] w-[60%] rounded-[1px]" />
            </div>
            <div className="bg-[#222] rounded-[2px] p-2">
              <div className="h-[6px] bg-[#333] w-[60%] rounded-[1px]" />
            </div>
            <div className="bg-[#222] rounded-[2px] p-2">
              <div className="h-[6px] bg-[#d4ff47] w-[40%] rounded-[1px]" />
            </div>
            <div className="bg-[#222] rounded-[2px] col-span-2" />
          </div>
        </div>
      </div>

      <div className="px-14 py-14 flex flex-col justify-center">
        <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#d4ff47] tracking-[0.18em] uppercase mb-5">Full Stack · 2024</div>
        <h2 className="font-['DM_Serif_Display',serif] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] mb-4">Nexus Analytics Dashboard</h2>
        <p className="font-['JetBrains_Mono',monospace] text-[0.8rem] text-[#6a6a6a] leading-[1.95] mb-8">A real-time analytics platform processing over 2 million events per day for a Series B fintech startup. Built from scratch in 4 months with a team of 3. Reduced infrastructure costs by 40% vs. previous vendor.</p>

        <div className="flex gap-10 py-6 border-t border-b border-[#222] mb-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-['DM_Serif_Display',serif] text-[2rem] text-[#d4ff47]">{s.num}</div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.1em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[0.4rem] mb-8">
          {tags.map((t) => (
            <span key={t} className="font-['JetBrains_Mono',monospace] text-[0.65rem] border border-[#222] text-[#6a6a6a] px-[0.6rem] py-[0.25rem] tracking-[0.08em]">{t}</span>
          ))}
        </div>

        <a href="project-detail.html" onMouseEnter={onHover} onMouseLeave={onLeave} className="inline-flex items-center gap-2 bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.75rem] tracking-[0.12em] uppercase px-7 py-[0.9rem] no-underline w-fit transition-[background-color,transform] duration-200 hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]">Read case study ↗</a>
      </div>
    </div>
  );
}
