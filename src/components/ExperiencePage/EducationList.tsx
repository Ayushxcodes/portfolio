"use client";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function EducationList({ education }: { education: any[] }) {
  return (
    <div className="px-12 border-b border-[#222]">
      <SectionLabel>Education</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 pb-12">
        {education.map((edu, i) => (
          <div key={i} className={["py-10", i === 0 ? "md:border-r border-[#222] md:pr-12" : "md:pl-12", i === 0 && "border-b md:border-b-0 border-[#222]"].join(" ")}>
            <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.12em] mb-[0.5rem]">{edu.year}</div>
            <div className="font-['DM_Serif_Display',serif] text-[1.5rem] mb-[0.3rem]">{edu.school}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] mb-4 leading-[1.6] whitespace-pre-line">{edu.degree}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] leading-[1.8] border-t border-[#222] pt-4">{edu.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
