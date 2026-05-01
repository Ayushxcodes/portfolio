"use client";
import React from "react";

export default function Header({ onHover, onLeave }: { onHover: () => void; onLeave: () => void; }) {
  return (
    <header className="pt-40 pb-16 px-12 border-b border-[#222]">
      <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-6">
        Selected work
      </div>
      <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em] mb-8">
        Projects &amp;<br />
        <em className="italic text-[#6a6a6a]">case studies.</em>
      </h1>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <span className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] tracking-[0.08em]">
          Showing 8 projects — 2019 to present
        </span>
      </div>
    </header>
  );
}
