"use client";
import React from "react";
import Link from "next/link";

export default function CTA({ onHover, onLeave }: { onHover: () => void; onLeave: () => void; }) {
  return (
    <div className="px-12 py-20 flex items-center justify-between flex-wrap gap-8 border-b border-[#222]">
      <h2 className="font-['DM_Serif_Display',serif] text-[clamp(2rem,4vw,3.5rem)]">Ready to build<br /><em className="italic text-[#d4ff47]">something great?</em></h2>
      <div className="flex gap-4 flex-wrap">
        <Link href="/contact" onMouseEnter={onHover} onMouseLeave={onLeave} className="inline-flex items-center gap-2 bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.75rem] tracking-[0.12em] uppercase px-7 py-4 no-underline transition-[background-color,transform] duration-200 hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]">Get in touch ↗</Link>
        <Link href="/resume" onMouseEnter={onHover} onMouseLeave={onLeave} className="inline-flex items-center gap-2 border border-[#222] text-[#6a6a6a] font-['JetBrains_Mono',monospace] text-[0.72rem] tracking-[0.1em] uppercase px-7 py-4 no-underline transition-[color,border-color] duration-200 hover:text-[#f0ede6] hover:border-[#f0ede6]">View résumé ↗</Link>
      </div>
    </div>
  );
}
