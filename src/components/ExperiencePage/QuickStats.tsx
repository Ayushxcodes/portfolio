"use client";
import React from "react";

export default function QuickStats({ stats }: { stats: { num: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#222]">
      {stats.map((s, i) => (
        <div key={i} className={["py-10 px-6 text-center border-b md:border-b-0", i < 3 ? "md:border-r border-[#222]" : "border-[#222]", i % 2 === 0 ? "border-r" : ""].join(" ")}>
          <div className="font-['DM_Serif_Display',serif] text-[3rem] text-[#d4ff47] leading-[1]">{s.num}</div>
          <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.12em] uppercase mt-[0.4rem]">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
