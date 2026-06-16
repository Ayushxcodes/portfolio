"use client";
import React from "react";
import Link from "next/link";

export default function CTA({ onHover, onLeave }: { onHover: () => void; onLeave: () => void; }) {
  return (
    <section className="px-12 py-24 text-center">
      <h2 className="font-['DM_Serif_Display',serif] text-[clamp(2.5rem,5vw,5rem)] leading-[1] mb-8">
        Want to work<br />together? <em className="italic text-[#d4ff47]">Let's talk.</em>
      </h2>
      <div className="flex justify-center gap-4 flex-wrap mt-8">
        <Link
          href="/contact"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className="inline-flex items-center gap-2 bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.8rem] tracking-[0.12em] uppercase px-8 py-4 no-underline transition-[background-color,transform] duration-200 hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]"
        >
          Get in touch ↗
        </Link>
        <Link
          href="/projects"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className="inline-flex items-center gap-2 border border-[#222] text-[#6a6a6a] font-['JetBrains_Mono',monospace] text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 no-underline transition-[color,border-color] duration-200 hover:text-[#f0ede6] hover:border-[#f0ede6]"
        >
          See my work →
        </Link>
      </div>
    </section>
  );
}
