import React from "react";

export interface LandingExperienceItem {
  period: string;
  company: string;
  role: string;
  desc: string;
  achievements?: React.ReactNode[];
  tags?: string[];
}

export default function ExperienceSection({ experience }: { experience: LandingExperienceItem[] }) {
  return (
    <section className="px-4 md:px-12 py-20 md:py-28 border-b border-[#222]" id="experience">
      <div className="section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">
        04 — Experience
      </div>
      <div className="flex flex-col">
        {experience.map((exp) => (
          <div 
            key={exp.company} 
            className="fade-up grid gap-6 md:gap-12 py-10 border-b border-[#222] grid-cols-1 md:grid-cols-[200px_1fr] group transition-all duration-300 hover:border-[#444]"
          >
            <div>
              <div className="font-mono text-[0.7rem] text-[#6a6a6a] tracking-[0.1em] mb-2 transition-colors duration-300 group-hover:text-[#aaa]">
                {exp.period}
              </div>
              <div className="font-bold text-[0.85rem] tracking-[0.05em] text-[#d4ff47] uppercase">
                {exp.company}
              </div>
            </div>
            <div>
              <div className="font-serif text-[1.25rem] md:text-[1.6rem] mb-3 text-[#f0ede6] transition-colors duration-300 group-hover:text-[#d4ff47]">
                {exp.role}
              </div>
              <div className="font-mono text-[0.75rem] text-[#888] leading-[1.8] max-w-full md:max-w-[560px] transition-colors duration-300 group-hover:text-[#bbb]">
                {exp.desc}
              </div>
              {exp.achievements && (
                <div className="mt-6 font-mono text-[0.72rem] text-[#6a6a6a] leading-[1.8] max-w-full md:max-w-[560px] space-y-2">
                  {exp.achievements.map((a: React.ReactNode, i: number) => (
                    <div key={i} className="flex items-start gap-3 transition-colors duration-300 group-hover:text-[#9a9a9a]">
                      <span className="text-[#d4ff47] shrink-0 mt-[0.05em]">→</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              )}
              {exp.tags && (
                <div className="flex flex-wrap gap-2 pt-6">
                  {exp.tags.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="font-mono text-[0.65rem] border border-[#222] text-[#6a6a6a] px-[0.6rem] py-[0.25rem] tracking-[0.08em] transition-all duration-300 group-hover:border-[#333] group-hover:text-[#888]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
