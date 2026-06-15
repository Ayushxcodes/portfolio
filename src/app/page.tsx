
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

// ─── Data ────────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { label: 'React',        highlight: true  },
  { label: 'Node.js',      highlight: false },
  { label: 'TypeScript',   highlight: true  },
  { label: 'PostgreSQL',   highlight: false },
  { label: 'AWS',          highlight: false },
  { label: 'Next.js',      highlight: true  },
  { label: 'GraphQL',      highlight: false },
  { label: 'Docker',       highlight: false },
  { label: 'Redis',        highlight: true  },
  { label: 'Kubernetes',   highlight: false },
  { label: 'Python',       highlight: false },
  { label: 'Tailwind CSS', highlight: true  },
];

const SKILLS = [
  {
    icon: '[ frontend ]',
    name: 'Interface',
    items: ['React / Next.js', 'TypeScript', 'CSS / Tailwind', 'Framer Motion', 'Web Performance'],
    bar: 96,
  },
  {
    icon: '[ backend ]',
    name: 'Server',
    items: ['Node.js / Express', 'Python / FastAPI', 'GraphQL / REST', 'WebSockets', 'Microservices'],
    bar: 91,
  },
  {
    icon: '[ data ]',
    name: 'Database',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma / Drizzle', 'ElasticSearch'],
    bar: 85,
  },
  {
    icon: '[ cloud ]',
    name: 'DevOps',
    items: ['AWS / GCP', 'Docker / K8s', 'GitHub Actions', 'Terraform', 'Observability'],
    bar: 78,
  },
];

const PROJECTS = [
  {
    num: '001',
    title: 'Nexus Dashboard',
    desc: 'Real-time analytics platform processing 2M+ events/day with sub-100ms query response times. Built for a Series B fintech startup.',
    tags: ['Next.js', 'ClickHouse', 'WebSockets', 'AWS'],
  },
  {
    num: '002',
    title: 'Orchid CMS',
    desc: 'Headless content management system with a visual page builder, multi-tenant architecture, and full-text search across 10M documents.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'ElasticSearch'],
  },
  {
    num: '003',
    title: 'Flux API Gateway',
    desc: 'Open-source API gateway with rate limiting, auth middleware, and request/response transformation. 1.2k GitHub stars.',
    tags: ['Go', 'Redis', 'Docker', 'Open Source'],
  },
  {
    num: '004',
    title: 'Verse — Social Reading',
    desc: 'Mobile-first app for social book annotation and discussion. 40k active users. Featured on Product Hunt #2 of the day.',
    tags: ['React Native', 'GraphQL', 'Supabase', 'Expo'],
  },
];

const EXPERIENCE = [
  {
    period: 'Nov 2025 — Present',
    company: 'Saturn Consulting Group',
    role: 'IT Associate / Software Engineer',
    desc: 'Manage core internal IT systems, support enterprise cloud environments, and administer database architectures for client delivery systems.',
    achievements: [
      'Administered migration of critical legacy databases to optimized PostgreSQL configurations, reducing response latency and system load.',
      'Assisted in developing and maintaining Docker environments and Git-based deployment workflows.',
      'Monitored cloud resources across AWS, resolving infrastructure incidents to maintain system availability.',
    ],
    tags: ['IT Support', 'System Administration', 'Docker', 'AWS', 'PostgreSQL'],
  },
  {
    period: 'Jan 2025 — Nov 2025',
    company: 'Paper Theory Network',
    role: 'Full Stack Engineer',
    desc: 'Engineered rich media players, interactive video tools, and low-latency digital assets for high-traffic content networks.',
    achievements: [
      'Developed a custom video component utilizing intersection-based lazy playback and hover interactions to decrease network load.',
      'Designed real-time dashboard elements and analytics integrations using WebSockets and React.',
      'Collaborated on active-page navigation refinements and custom UI micro-animations, significantly boosting user retention.',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WebSockets', 'Media Streaming'],
  },
];


const CMDS = [
  'npm run dev',
  'npx prisma migrate dev',
  'docker compose up -d',
  'git push origin main',
  'kubectl rollout status',
];

// Global styles moved to `src/app/globals.css` (imported by `layout.tsx`).

// ─── Sub-components ───────────────────────────────────────────────────────────
// Term visuals moved into `Hero` component; helpers removed.

// ─── Main component ───────────────────────────────────────────────────────────
export default function Portfolio() {
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

  // Global styles are provided via `src/app/globals.css` (no runtime injection needed).

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
      const cmd = CMDS[cmdIdx.current];
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
          cmdIdx.current = (cmdIdx.current + 1) % CMDS.length;
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

      <Ticker items={TICKER_ITEMS} />

      <About />

      <Skills skills={SKILLS} />

      <Projects projects={PROJECTS} onHover={onHover} offHover={offHover} />

      <ExperienceSection experience={EXPERIENCE} />

      <Contact onHover={onHover} offHover={offHover} />
    </div>
  );
}

// ─── Reusable section label ───────────────────────────────────────────────────
 