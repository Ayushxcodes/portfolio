"use client";
import React from "react";

function SkillDots({ filled }: { filled: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i < filled ? "bg-[#d4ff47]" : "bg-[#222]"}`} />
      ))}
    </div>
  );
}

export default function SkillsMatrix({ skills, onHover, onLeave }: { skills: { name: string; filled: number; label: string }[]; onHover: () => void; onLeave: () => void; }) {
  return (
    <div className="px-12 py-12 border-b border-[#222]">
      <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase">Skills</span>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
        {skills.map((skill, i) => {
          const isLastTwo = i >= skills.length - 2;
          const isLeftCol = i % 2 === 0;
          return (
            <div key={i} onMouseEnter={onHover} onMouseLeave={onLeave} className={["flex items-center justify-between px-6 py-4", isLeftCol ? "border-r border-[#222]" : "", !isLastTwo ? "border-b border-[#222]" : ""].join(" ")}> 
              <span className="font-['JetBrains_Mono',monospace] text-[0.78rem] text-[#f0ede6] tracking-[0.05em]">{skill.name}</span>
              <div className="flex items-center gap-3">
                <SkillDots filled={skill.filled} />
                <span className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.08em] w-[60px] text-right">{skill.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
