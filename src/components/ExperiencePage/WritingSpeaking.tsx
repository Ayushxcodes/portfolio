"use client";
import React from "react";
import SectionLabel from "./SectionLabel";

export interface Item {
  name: string;
  detail: string;
}

export default function WritingSpeaking({ writing, speaking, onHover, onLeave }: { writing: Item[]; speaking: Item[]; onHover: () => void; onLeave: () => void; }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-12 py-12 border-b border-[#222]">
      <div className="md:border-r border-[#222] md:pr-12 border-b md:border-b-0 pb-8 md:pb-0 mb-8 md:mb-0">
        <div className="font-['DM_Serif_Display',serif] text-[1.75rem] mb-6">Writing</div>
        {writing.map((w, i) => (
          <div key={i} className={["py-5", i < writing.length - 1 ? "border-b border-[#222]" : ""].join(" ")}>
            <div className="font-bold text-[0.9rem] mb-[0.25rem]">{w.name}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] leading-[1.7]">{w.detail} · <a href="#" onMouseEnter={onHover} onMouseLeave={onLeave} className="text-[#d4ff47] no-underline hover:underline">Read →</a></div>
          </div>
        ))}
      </div>

      <div className="md:pl-12">
        <div className="font-['DM_Serif_Display',serif] text-[1.75rem] mb-6">Speaking</div>
        {speaking.map((s, i) => (
          <div key={i} className={["py-5", i < speaking.length - 1 ? "border-b border-[#222]" : ""].join(" ")}>
            <div className="font-bold text-[0.9rem] mb-[0.25rem]">{s.name}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] leading-[1.7]">{s.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
