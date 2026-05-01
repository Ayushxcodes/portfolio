"use client";
import React from "react";
import { CONTACT_DETAILS } from "./data";

interface LeftPaneProps {
  onHover: () => void;
  onLeave: () => void;
}

export default function LeftPane({ onHover, onLeave }: LeftPaneProps) {
  return (
    <div className="px-16 py-20 border-b md:border-b-0 md:border-r border-[#222] flex flex-col justify-between gap-12">
      <div>
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-8">
          Get in touch
        </div>

        <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.02em] mb-8">
          Let's build<br />something<br />
          <em className="italic text-[#6a6a6a]">together.</em>
        </h1>

        <p className="font-['JetBrains_Mono',monospace] text-[0.8rem] text-[#6a6a6a] leading-[2] max-w-[380px] mb-12">
          Whether you have a project in mind, want to discuss a role, or just want to chat about distributed systems at 2am — <strong className="text-[#f0ede6]">I'm happy to hear from you.</strong>
        </p>

        <div className="flex flex-col">
          {CONTACT_DETAILS.map((d, i) => (
            <div
              key={i}
              onMouseEnter={onHover} onMouseLeave={onLeave}
              className="group flex items-center justify-between py-5 border-b border-[#222] first:border-t first:border-[#222]"
            >
              <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em] uppercase">
                {d.label}
              </span>
              {d.isLink ? (
                <a
                  href={d.href}
                  onMouseEnter={onHover} onMouseLeave={onLeave}
                  className="font-['JetBrains_Mono',monospace] text-[0.8rem] text-[#f0ede6] no-underline transition-colors duration-200 flex items-center gap-2 hover:text-[#d4ff47]"
                >
                  {d.value}
                  <span className="text-[0.9rem] opacity-0 -translate-x-1 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                    ↗
                  </span>
                </a>
              ) : (
                <span className="font-['JetBrains_Mono',monospace] text-[0.8rem] text-[#f0ede6] flex items-center gap-2">
                  {d.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border border-[#222] bg-[#141414]">
        <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.15em] uppercase mb-3 flex items-center gap-[0.6rem]">
          <span className="w-[6px] h-[6px] rounded-full bg-[#d4ff47] [animation:pulse_2s_ease-in-out_infinite]" />
          Current availability
          <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}`}</style>
        </div>
        <div className="font-['JetBrains_Mono',monospace] text-[0.78rem] text-[#f0ede6] leading-[1.7]">
          Open to <span className="text-[#d4ff47]">full-time roles</span> and select <span className="text-[#d4ff47]">freelance projects</span>.<br />
          Typical response time: <span className="text-[#d4ff47]">within 24 hours.</span>
        </div>
      </div>
    </div>
  );
}
