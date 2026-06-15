"use client";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function ExperienceList({ experience, assignRef, onHover, onLeave }: { experience: any[]; assignRef: (i: number, el: HTMLDivElement | null) => void; onHover: () => void; onLeave: () => void; }) {
  return (
    <div className="px-12 border-b border-[#222]">
      <SectionLabel>Work experience</SectionLabel>

      {experience.map((job, i) => (
        <div
          key={i}
          ref={(el) => assignRef(i, el)}
          className={[
            "grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 py-12 opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group",
            i < experience.length - 1 ? "border-b border-[#222]" : "",
          ].join(" ")}
        >
          <div className="md:sticky md:top-28 h-fit">
            <div className="w-12 h-12 bg-[#141414] border border-[#222] flex items-center justify-center mb-4 font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#d4ff47] tracking-[0.05em] group-hover:border-[#d4ff47] transition-all duration-300">{job.logo}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#6a6a6a] tracking-[0.08em] mb-[0.5rem]">{job.period}</div>
            <div className="font-bold text-[0.9rem] tracking-[0.04em] text-[#d4ff47] mb-[0.25rem]">{job.company}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.1em] uppercase">{job.type}</div>
          </div>

          <div>
            <div className="font-['DM_Serif_Display',serif] text-[2rem] mb-[0.5rem] leading-[1.1] text-[#f0ede6] group-hover:text-[#d4ff47] transition-colors duration-300">{job.role}</div>
            <p className="font-['JetBrains_Mono',monospace] text-[0.78rem] text-[#aaa] leading-[2] mb-6 max-w-[540px] group-hover:text-[#bbb] transition-colors duration-300">{job.desc}</p>
            <div className="flex flex-col gap-2 mb-6">
              {job.achievements.map((ach: any, j: number) => (
                <div key={j} className="flex items-start gap-3 font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] leading-[1.7] group-hover:text-[#9a9a9a] transition-colors duration-300">
                  <span className="text-[#d4ff47] shrink-0 mt-[0.05em]">→</span>
                  <span>{ach}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-[0.4rem]">
              {job.tags.map((t: string) => (
                <span key={t} className="font-['JetBrains_Mono',monospace] text-[0.65rem] border border-[#222] text-[#6a6a6a] px-[0.65rem] py-[0.25rem] tracking-[0.08em] group-hover:border-[#333] group-hover:text-[#888] transition-all duration-300">{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
