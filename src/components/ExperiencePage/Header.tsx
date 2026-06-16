"use client";
import React from "react";

export default function Header({ onHover, onLeave }: { onHover: () => void; onLeave: () => void; }) {
  return (
    <header className="pt-40 pb-20 px-12 border-b border-[#222] grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-12">
      <div>
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-6">Career</div>
        <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em]">Experience &amp;<br /><em className="italic text-[#6a6a6a]">credentials.</em></h1>
      </div>
      <a href="/resume" onMouseEnter={onHover} onMouseLeave={onLeave} className="inline-flex items-center gap-[0.6rem] bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.75rem] tracking-[0.12em] uppercase px-7 py-4 no-underline whitespace-nowrap self-end transition-[background-color,transform] duration-200 hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]">Download résumé ↓</a>
    </header>
  );
}
