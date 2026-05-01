"use client";
import React from "react";

export default function StorySection({ storyLinks, onHover, onLeave }: { storyLinks: { href: string; label: string }[]; onHover: () => void; onLeave: () => void; }) {
  return (
    <section className="px-12 py-24 border-b border-[#222]">
      <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">
        The story
        <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-20">
        <div className="md:sticky md:top-28 h-fit">
          <nav className="flex flex-col">
            {storyLinks.map((s) => (
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
          <h3 id="origin" className="font-['DM_Serif_Display',serif] text-[2.2rem] mb-5 mt-0">
            How it started
          </h3>
          <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
            I wrote my first line of HTML at 13, modifying a free CSS template
            to make my gaming forum look "cooler." The fact that you could type
            words into a text file and a browser would render them as something
            visual felt like <em className="italic text-[#d4ff47]">actual magic</em> to me. It
            still does, honestly.
          </p>
          <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
            I studied Computer Science at UC Berkeley, where I became obsessed
            with systems programming and distributed computing. But I always
            found my way back to the web — it's where you can ship something
            real and put it in someone's hands the same day.
          </p>
          <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
            After graduating in 2018, I joined Notion as one of its earliest
            engineers. That experience — working on a product people loved, at
            a company growing faster than anyone could have predicted — shaped
            almost everything about how I think about software today.
          </p>

          <div className="border-l-2 border-[#d4ff47] pl-8 py-2 my-10">
            <p className="font-['DM_Serif_Display',serif] text-[1.6rem] leading-[1.4] text-[#f0ede6]">
              "Good software doesn't shout. It just works, every time, so well
              that people never have to think about it."
            </p>
          </div>

          <h3 id="approach" className="font-['DM_Serif_Display',serif] text-[2.2rem] mb-5 mt-12">
            How I work
          </h3>
          <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
            I default to <strong className="text-[#f0ede6]">boring technology</strong> where
            possible. Not because I'm lazy, but because the most exciting part
            of building products is the problem-solving, not the framework du
            jour. Postgres over a shiny NoSQL database. Server-rendered HTML
            where React isn't needed. The right tool, not the newest tool.
          </p>
          <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
            I believe deeply in <strong className="text-[#f0ede6]">writing things down</strong>. A
            short design doc before writing code has saved me weeks of work. An
            RFC before a big architectural decision has prevented countless
            misunderstandings. I write to think, and I think better when I
            write.
          </p>
          <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
            I try to work at the level above my job title. That means caring
            about why we're building something, not just how. It means talking
            to users, reading support tickets, and understanding the business
            context of every feature I ship.
          </p>
        </div>
      </div>
    </section>
  );
}
