
 'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Hero from '../components/Landing/Hero';
import Ticker from '../components/Landing/Ticker';
import About from '../components/Landing/About';
import Skills from '../components/Landing/Skills';
import Projects from '../components/Landing/Projects';
import ExperienceSection from '../components/Landing/ExperienceSection';
import Contact from '../components/Landing/Contact';
import SectionLabel from '../components/Landing/SectionLabel';

import portfolioDataRaw from '../data/portfolio-data.json';

// Markdown bold parser: parses **text** into <strong className="text-[#f0ede6]">text</strong>
const parseBoldText = (text: string, boldColorClass = "text-[#f0ede6]") => {
  if (typeof text !== "string") return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className={boldColorClass}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [data, setData] = useState(portfolioDataRaw);
  const [scrolled,    setScrolled]    = useState(false);
  const [cursorPos,   setCursorPos]   = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [typedCmd,    setTypedCmd]    = useState('');
  const [typedGit,    setTypedGit]    = useState('');
  const [gitCursorOn, setGitCursorOn] = useState(false);

  const cmdIdx   = useRef(0);
  const charIdx  = useRef(0);
  const erasing  = useRef(false);
  const cmdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep a ref to the cycling commands to avoid stale closures in the typewriter effect
  const cmdsRef = useRef(data.landing.cmds);
  useEffect(() => {
    cmdsRef.current = data.landing.cmds;
  }, [data.landing.cmds]);

  // Fetch dynamic portfolio data
  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((dynData) => {
        if (dynData && !dynData.error) {
          setData(dynData);
        }
      })
      .catch((err) => console.error("Error fetching portfolio data:", err));
  }, []);

  // ── Custom cursor ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  // ── Nav scroll state ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── IntersectionObserver — fade-up + skill bars ───────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll('.fade-up, .skill-card-el').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Typewriter — cycling commands (Terminal 1) ────────────────────────────
  useEffect(() => {
    const tick = () => {
      const currentCmds = cmdsRef.current || [];
      const cmd = currentCmds[cmdIdx.current] || '';
      if (!erasing.current) {
        charIdx.current += 1;
        setTypedCmd(cmd.slice(0, charIdx.current));
        if (charIdx.current === cmd.length) {
          erasing.current = true;
          cmdTimer.current = setTimeout(tick, 1800);
          return;
        }
        cmdTimer.current = setTimeout(tick, 68);
      } else {
        charIdx.current -= 1;
        setTypedCmd(cmd.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          erasing.current = false;
          cmdIdx.current = currentCmds.length > 0 ? (cmdIdx.current + 1) % currentCmds.length : 0;
          cmdTimer.current = setTimeout(tick, 400);
          return;
        }
        cmdTimer.current = setTimeout(tick, 32);
      }
    };
    cmdTimer.current = setTimeout(tick, 1200);
    return () => { if (cmdTimer.current) clearTimeout(cmdTimer.current); };
  }, []);

  // ── Typewriter — git log (Terminal 2) ────────────────────────────────────
  useEffect(() => {
    const text = 'git log --oneline';
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (i <= text.length) {
        setGitCursorOn(true);
        setTypedGit(text.slice(0, i));
        i += 1;
        timer = setTimeout(tick, 80);
      }
    };
    timer = setTimeout(tick, 2400);
    return () => clearTimeout(timer);
  }, []);

  const onHover  = useCallback(() => setCursorHover(true),  []);
  const offHover = useCallback(() => setCursorHover(false), []);

  // Parse experience achievements
  const parsedExperience = data.landing.experience.map((exp) => ({
    ...exp,
    achievements: exp.achievements.map((ach) => parseBoldText(ach)),
  }));

  return (
    <div className="bg-[#0c0c0c] text-[#f0ede6] font-sans overflow-x-hidden min-h-screen">

      {/* ── Custom cursor ─────────────────────────────────────────────── */}
      {/*
        cursorPos.x / cursorPos.y are runtime values → must stay in style.
        transform: translate(-50%,-50%) is static → moved to Tailwind.
      */}
      <div
        aria-hidden="true"
        className={`fixed pointer-events-none z-[9999] rounded-full bg-[#d4ff47]
          mix-blend-difference -translate-x-1/2 -translate-y-1/2
          transition-[width,height] duration-200
          ${cursorHover ? 'w-9 h-9' : 'w-3 h-3'}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />


      <Hero onHover={onHover} offHover={offHover} typedCmd={typedCmd} typedGit={typedGit} gitCursorOn={gitCursorOn} />

      <Ticker items={data.landing.tickerItems} />

      <About />

      <Skills skills={data.landing.skills} />

      <Projects projects={data.landing.projects} onHover={onHover} offHover={offHover} />

      <ExperienceSection experience={parsedExperience} />

      <Contact onHover={onHover} offHover={offHover} />
    </div>
  );
}

// ─── Reusable section label ───────────────────────────────────────────────────
 