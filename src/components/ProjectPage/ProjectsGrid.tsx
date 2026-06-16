"use client";
import React from "react";
import Link from "next/link";

export interface ProjectGridItem {
  svg: React.ReactNode;
  cat: string;
  title: string;
  desc: string;
  tags: string[];
}

export default function ProjectsGrid({ projects, assignRef, onHover, onLeave }: { projects: ProjectGridItem[]; assignRef: (i: number, el: HTMLAnchorElement | null) => void; onHover: () => void; onLeave: () => void; }) {
  const cardBorder = (i: number) => (i % 3 !== 2 ? "border-r border-b border-[#222]" : "border-b border-[#222]");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#222]">
      {projects.map((p, i) => (
        <Link
          key={i}
          href="/project-details"
          ref={(el: any) => { assignRef(i, el); }}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className={[
            "no-underline text-inherit block overflow-hidden transition-colors duration-200 opacity-0 translate-y-7 [transition:background_0.2s,opacity_0.7s_cubic-bezier(0.23,1,0.32,1),transform_0.7s_cubic-bezier(0.23,1,0.32,1)] group hover:bg-[#141414]",
            cardBorder(i),
          ].join(" ")}
        >
          <div className="h-[200px] bg-[#141414] overflow-hidden relative border-b border-[#222]">
            <div className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]">
              {p.svg}
            </div>
          </div>

          <div className="p-7">
            <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#d4ff47] tracking-[0.15em] uppercase mb-3">{p.cat}</div>
            <div className="font-['DM_Serif_Display',serif] text-[1.6rem] leading-[1.1] mb-[0.6rem]">{p.title}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] leading-[1.85] mb-5">{p.desc}</div>
            <div className="flex items-center justify-between">
              <div className="flex gap-[0.35rem] flex-wrap">
                {p.tags.map((t: string) => (
                  <span key={t} className="font-['JetBrains_Mono',monospace] text-[0.62rem] bg-white/[0.04] border border-[#222] text-[#6a6a6a] px-[0.55rem] py-[0.2rem] tracking-[0.06em]">{t}</span>
                ))}
              </div>
              <span className="text-[1.2rem] text-[#d4ff47] opacity-0 -translate-x-[6px] translate-y-[6px] transition-[opacity,transform] duration-[250ms] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">↗</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
