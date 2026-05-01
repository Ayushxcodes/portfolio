"use client";
import { useState, useEffect, useRef } from "react";
import CustomCursor from "../../components/AboutPage/CustomCursor";
import AboutHeader from "../../components/AboutPage/AboutHeader";
import StorySection from "../../components/AboutPage/StorySection";
import ValuesGrid from "../../components/AboutPage/ValuesGrid";
import StackGrid from "../../components/AboutPage/StackGrid";
import OutsideGrid from "../../components/AboutPage/OutsideGrid";
import CTA from "../../components/AboutPage/CTA";
import { values, stack, outside, storyLinks } from "../../components/AboutPage/data";

export default function AboutPage() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap";
    document.head.appendChild(link);

    const onMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", onMouseMove);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${(i % 3) * 0.1}s`;
        obs.observe(el);
      }
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (document.head.contains(link)) document.head.removeChild(link);
      obs.disconnect();
    };
  }, []);

  const ho = () => setCursorHover(true);
  const hu = () => setCursorHover(false);

  const assignRef = (i: number, el: HTMLDivElement | null) => {
    fadeRefs.current[i] = el;
  };

  return (
    <div className="bg-[#0c0c0c] text-[#f0ede6] font-['Syne',sans-serif] cursor-none overflow-x-hidden min-h-screen scroll-smooth selection:bg-[#d4ff47] selection:text-black">
      <CustomCursor cursorPos={cursorPos} cursorHover={cursorHover} />

      <AboutHeader onHover={ho} onLeave={hu} />

      <StorySection storyLinks={storyLinks} onHover={ho} onLeave={hu} />

      <ValuesGrid values={values} onHover={ho} onLeave={hu} assignRef={assignRef} />

      <StackGrid stack={stack} onHover={ho} onLeave={hu} />

      <OutsideGrid outside={outside} />

      <CTA onHover={ho} onLeave={hu} />
    </div>
  );
}