import React from 'react';
export interface LandingProjectItem {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

export default function Projects({ projects, onHover, offHover }: { projects: LandingProjectItem[]; onHover: () => void; offHover: () => void; }) {
  return (
    <section className="px-4 md:px-12 py-28 border-b border-[#222]" id="work">
      <div className="section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">03 — Selected Work</div>
      <div className="flex flex-col">
        {projects.map((project) => (
          <a
            key={project.num}
            href="#"
            className="group grid items-center gap-6 py-8 md:py-10 border-b border-[#222]
              no-underline text-inherit transition-[padding-left] duration-[0.25s]
              hover:pl-4 grid-cols-1 md:grid-cols-[80px_1fr_auto]"
            onMouseEnter={onHover}
            onMouseLeave={offHover}
          >
            <div className="font-mono text-[0.7rem] text-[#222] tracking-[0.1em] transition-colors duration-[0.25s] group-hover:text-[#d4ff47]">{project.num}</div>
            <div>
              <div className="font-serif text-[1.5rem] md:text-[2rem] mb-[0.4rem] leading-[1.1]">{project.title}</div>
              <div className="font-mono text-[0.72rem] text-[#6a6a6a] tracking-[0.05em] leading-[1.8] max-w-full md:max-w-[500px]">{project.desc}</div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="font-mono text-[0.65rem] bg-[#141414] text-[#6a6a6a] px-[0.6rem] py-[0.2rem] tracking-[0.08em] border border-[#222]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="text-2xl text-[#d4ff47] opacity-0 -translate-x-2 translate-y-2 transition-all duration-[0.25s] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">↗</div>
          </a>
        ))}
      </div>
    </section>
  );
}
