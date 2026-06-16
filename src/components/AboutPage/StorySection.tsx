"use client";
import React from "react";

export interface StorySectionData {
  links: { href: string; label: string }[];
  sections: { id: string; title: string; paragraphs: string[] }[];
  quote: string;
}

export default function StorySection({ story, onHover, onLeave }: { story: StorySectionData; onHover: () => void; onLeave: () => void; }) {
  // Simple bold and italic converter
  const parseHtml = (text: string) => {
    let parsed = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#f0ede6] font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-[#d4ff47]">$1</em>');
    return parsed;
  };

  return (
    <section className="px-12 py-24 border-b border-[#222]">
      <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">
        The story
        <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-20">
        <div className="md:sticky md:top-28 h-fit">
          <nav className="flex flex-col">
            {story.links.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                className="font-['JetBrains_Mono',monospace] text-[0.72rem] tracking-[0.1em] uppercase text-[#6a6a6a] no-underline py-[0.9rem] border-b border-[#222] transition-[color,padding-left] duration-200 hover:text-[#d4ff47] hover:pl-2"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          {story.sections.map((sec, idx) => (
            <React.Fragment key={sec.id}>
              <h3 id={sec.id} className={`font-['DM_Serif_Display',serif] text-[2.2rem] mb-5 ${idx > 0 ? "mt-12" : "mt-0"}`}>
                {sec.title}
              </h3>
              {sec.paragraphs.map((para, pIdx) => (
                <p 
                  key={pIdx} 
                  className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5"
                  dangerouslySetInnerHTML={{ __html: parseHtml(para) }}
                />
              ))}

              {idx === 0 && story.quote && (
                <div className="border-l-2 border-[#d4ff47] pl-8 py-2 my-10">
                  <p className="font-['DM_Serif_Display',serif] text-[1.6rem] leading-[1.4] text-[#f0ede6]">
                    "{story.quote}"
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
