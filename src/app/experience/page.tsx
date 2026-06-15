"use client";
import { useState, useEffect, useRef } from "react";
import CustomCursor from "../../components/ExperiencePage/CustomCursor";
import Header from "../../components/ExperiencePage/Header";
import QuickStats from "../../components/ExperiencePage/QuickStats";
import ExperienceList from "../../components/ExperiencePage/ExperienceList";
import EducationList from "../../components/ExperiencePage/EducationList";
import SkillsMatrix from "../../components/ExperiencePage/SkillsMatrix";
import WritingSpeaking from "../../components/ExperiencePage/WritingSpeaking";
import CTA from "../../components/ExperiencePage/CTA";
import { QUICK_STATS, EDUCATION, SKILLS, WRITING, SPEAKING } from "../../components/ExperiencePage/data";

// ── Data ─────────────────────────────────────────────────────────────────────


// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-12 flex items-center gap-4">
      <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase">
        {children}
      </span>
      <span className="flex-1 h-px bg-[#222]" />
    </div>
  );
}

function SkillDots({ filled }: { filled: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${i < filled ? "bg-[#d4ff47]" : "bg-[#222]"}`}
        />
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  const [cursorPos, setCursorPos]     = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap";
    document.head.appendChild(link);

    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", onMove);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${i * 0.1}s`;
        obs.observe(el);
      }
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (document.head.contains(link)) document.head.removeChild(link);
      obs.disconnect();
    };
  }, []);

  const ho = () => setCursorHover(true);
  const hu = () => setCursorHover(false);

  return (
    <div className="bg-[#0c0c0c] text-[#f0ede6] font-['Syne',sans-serif] cursor-none overflow-x-hidden min-h-screen scroll-smooth selection:bg-[#d4ff47] selection:text-black">

      <CustomCursor cursorPos={cursorPos} cursorHover={cursorHover} />

      <Header onHover={ho} onLeave={hu} />

      <QuickStats stats={QUICK_STATS} />

      <ExperienceList assignRef={(i, el) => { fadeRefs.current[i] = el; }} onHover={ho} onLeave={hu} />

      <EducationList education={EDUCATION} />

      <SkillsMatrix skills={SKILLS} onHover={ho} onLeave={hu} />

      <WritingSpeaking writing={WRITING} speaking={SPEAKING} onHover={ho} onLeave={hu} />

      <CTA onHover={ho} onLeave={hu} />

    </div>
  );
}