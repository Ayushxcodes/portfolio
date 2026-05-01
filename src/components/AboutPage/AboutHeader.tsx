"use client";
import React from "react";

export default function AboutHeader({ onHover, onLeave }: { onHover: () => void; onLeave: () => void; }) {
  return (
    <header className="pt-40 pb-20 px-12 border-b border-[#222] grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
      <div>
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-6">
          About me
        </div>
        <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em]">
          The person<br />behind the<br />
          <em className="italic text-[#6a6a6a]">commits.</em>
        </h1>
      </div>
      <p className="font-['JetBrains_Mono',monospace] text-[0.85rem] text-[#aaa] leading-[2]">
        Full stack engineer, occasional writer, and habitual over-engineer of
        personal projects. I've been building for the web for over six years —
        from tiny side projects to infrastructure serving millions of users.
        <br /><br />
        This is a little more about who I am, how I think, and what drives the
        work I do.
      </p>
    </header>
  );
}
