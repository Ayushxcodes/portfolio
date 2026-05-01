"use client";
import { useState, useEffect, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const FILTERS = ["All", "Full Stack", "Frontend", "Backend / API", "Open Source", "Mobile"];

const FEATURED_STATS = [
  { num: "2M+",  label: "Events/day" },
  { num: "98ms", label: "P99 latency" },
  { num: "40%",  label: "Cost reduction" },
];

const FEATURED_TAGS = ["Next.js", "ClickHouse", "WebSockets", "AWS ECS", "Terraform"];

const PROJECTS = [
  {
    cat: "CMS · 2024",
    title: "Orchid CMS",
    desc: "Headless content management system with visual page builder and multi-tenant architecture. 10M+ documents indexed.",
    tags: ["React", "Node", "Elastic"],
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#141414"/>
        <line x1="0" y1="50"  x2="300" y2="50"  stroke="#222" strokeWidth="1"/>
        <line x1="0" y1="100" x2="300" y2="100" stroke="#222" strokeWidth="1"/>
        <line x1="0" y1="150" x2="300" y2="150" stroke="#222" strokeWidth="1"/>
        <line x1="75"  y1="0" x2="75"  y2="200" stroke="#222" strokeWidth="1"/>
        <line x1="150" y1="0" x2="150" y2="200" stroke="#222" strokeWidth="1"/>
        <line x1="225" y1="0" x2="225" y2="200" stroke="#222" strokeWidth="1"/>
        <rect x="20"  y="120" width="40" height="60" fill="#d4ff47" opacity="0.7"/>
        <rect x="95"  y="80"  width="40" height="100" fill="#d4ff47" opacity="0.5"/>
        <rect x="170" y="60"  width="40" height="120" fill="#d4ff47" opacity="0.8"/>
        <rect x="245" y="100" width="40" height="80"  fill="#d4ff47" opacity="0.4"/>
      </svg>
    ),
  },
  {
    cat: "Infrastructure · 2023",
    title: "Flux API Gateway",
    desc: "Open-source API gateway with rate limiting, auth middleware, and request transformation. 1.2k GitHub stars.",
    tags: ["Go", "Redis", "Docker"],
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#141414"/>
        <circle cx="150" cy="100" r="80" fill="none" stroke="#222" strokeWidth="1"/>
        <circle cx="150" cy="100" r="55" fill="none" stroke="#333" strokeWidth="1"/>
        <circle cx="150" cy="100" r="30" fill="none" stroke="#d4ff47" strokeWidth="1" opacity="0.6"/>
        <circle cx="150" cy="100" r="8"  fill="#d4ff47" opacity="0.9"/>
        <line x1="150" y1="20"  x2="150" y2="180" stroke="#222" strokeWidth="0.5"/>
        <line x1="70"  y1="100" x2="230" y2="100" stroke="#222" strokeWidth="0.5"/>
      </svg>
    ),
  },
  {
    cat: "Mobile · 2023",
    title: "Verse — Social Reading",
    desc: "Mobile-first app for social book annotation. 40k active users. Product Hunt #2 of the day at launch.",
    tags: ["React Native", "GraphQL"],
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#141414"/>
        <rect x="20" y="20" width="260" height="160" rx="4" fill="#1a1a1a" stroke="#222"/>
        <rect x="30" y="30" width="240" height="28"  rx="2" fill="#111" stroke="#333"/>
        <rect x="40" y="68" width="100" height="8"  rx="1" fill="#333"/>
        <rect x="40" y="82" width="160" height="6"  rx="1" fill="#222"/>
        <rect x="40" y="94" width="130" height="6"  rx="1" fill="#222"/>
        <rect x="40"  y="120" width="80" height="28" rx="2" fill="#d4ff47" opacity="0.85"/>
        <rect x="130" y="120" width="70" height="28" rx="2" fill="#1e1e1e" stroke="#333"/>
      </svg>
    ),
  },
  {
    cat: "FinTech · 2022",
    title: "TradeView Pro",
    desc: "Real-time trading dashboard with WebSocket price feeds, portfolio analytics, and risk visualization for retail investors.",
    tags: ["React", "WebSockets", "D3"],
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#141414"/>
        <polyline points="20,150 60,110 100,130 140,70 180,90 220,40 260,60 290,50"  fill="none" stroke="#d4ff47" strokeWidth="2" opacity="0.8"/>
        <polyline points="20,170 60,155 100,160 140,140 180,145 220,120 260,130 290,125" fill="none" stroke="#555" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="220" cy="40" r="4" fill="#d4ff47"/>
        <line x1="0" y1="50"  x2="300" y2="50"  stroke="#1e1e1e" strokeWidth="1"/>
        <line x1="0" y1="100" x2="300" y2="100" stroke="#1e1e1e" strokeWidth="1"/>
        <line x1="0" y1="150" x2="300" y2="150" stroke="#1e1e1e" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    cat: "SaaS · 2022",
    title: "Relay — Team Inbox",
    desc: "Shared inbox and CRM for small support teams. Built-in automation rules, SLA tracking, and Slack integration.",
    tags: ["Next.js", "Postgres", "Redis"],
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#141414"/>
        <rect x="20"  y="30" width="120" height="70" rx="3" fill="#1a1a1a" stroke="#333"/>
        <rect x="160" y="30" width="120" height="70" rx="3" fill="#1a1a1a" stroke="#333"/>
        <rect x="20"  y="120" width="120" height="50" rx="3" fill="#1a1a1a" stroke="#d4ff47" strokeWidth="1.5" opacity="0.7"/>
        <rect x="160" y="120" width="120" height="50" rx="3" fill="#1a1a1a" stroke="#333"/>
        <line x1="140" y1="65" x2="160" y2="65" stroke="#d4ff47" strokeWidth="1" opacity="0.6"/>
        <line x1="150" y1="100" x2="150" y2="120" stroke="#333"/>
        <circle cx="80"  cy="65" r="12" fill="#222" stroke="#d4ff47" strokeWidth="1" opacity="0.6"/>
        <circle cx="220" cy="65" r="12" fill="#222" stroke="#333"/>
      </svg>
    ),
  },
  {
    cat: "E-Commerce · 2021",
    title: "StoreFront Engine",
    desc: "Headless e-commerce framework with composable checkout, multi-currency support, and edge-cached product pages.",
    tags: ["Next.js", "Stripe", "Cloudflare"],
    svg: (
      <svg viewBox="0 0 300 200" className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#141414"/>
        <rect x="20"  y="20" width="80" height="40" rx="2" fill="#1e1e1e" stroke="#333"/>
        <rect x="110" y="20" width="80" height="40" rx="2" fill="#1e1e1e" stroke="#333"/>
        <rect x="200" y="20" width="80" height="40" rx="2" fill="#1e1e1e" stroke="#333"/>
        <rect x="40"  y="80" width="220" height="90" rx="3" fill="#1a1a1a" stroke="#222"/>
        <rect x="55"  y="95"  width="60"  height="6"  rx="1" fill="#333"/>
        <rect x="55"  y="108" width="100" height="5"  rx="1" fill="#222"/>
        <rect x="55"  y="120" width="80"  height="5"  rx="1" fill="#222"/>
        <rect x="55"  y="140" width="50"  height="20" rx="1" fill="#d4ff47" opacity="0.7"/>
        <rect x="115" y="140" width="50"  height="20" rx="1" fill="#222" stroke="#333"/>
      </svg>
    ),
  },
];

const OSS = [
  {
    name: "flux-gateway",
    desc: "Programmable API gateway with Lua scripting support, JWT auth, rate limiting, and plugin ecosystem.",
    stars: "1.2k", forks: "183", lang: "Go",
  },
  {
    name: "ts-result",
    desc: "Rust-inspired Result and Option types for TypeScript with zero dependencies and full type inference.",
    stars: "430", forks: "52", lang: "TypeScript",
  },
  {
    name: "pg-migrate-cli",
    desc: "Zero-config PostgreSQL migration tool with rollback, dry-run mode, and CI/CD integrations out of the box.",
    stars: "280", forks: "41", lang: "Node.js",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function WorkPage() {
  const [cursorPos, setCursorPos]     = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const fadeRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Inject Google Fonts
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap";
    document.head.appendChild(link);

    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", onMove);

    // Fade-up observer
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
        el.style.transitionDelay = `${(i % 3) * 0.1}s`;
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

  // Right-border logic for 3-col project grid
  const cardBorder = (i: number) =>
    i % 3 !== 2
      ? "border-r border-b border-[#222]"
      : "border-b border-[#222]";

  return (
    <div className="bg-[#0c0c0c] text-[#f0ede6] font-['Syne',sans-serif] cursor-none overflow-x-hidden min-h-screen scroll-smooth selection:bg-[#d4ff47] selection:text-black">

      {/* ── Custom Cursor ── */}
      <div
        className={[
          "fixed pointer-events-none z-[9999] rounded-full bg-[#d4ff47] -translate-x-1/2 -translate-y-1/2 [mix-blend-mode:difference]",
          "[transition:transform_0.1s,width_0.2s,height_0.2s]",
          cursorHover ? "w-9 h-9" : "w-3 h-3",
        ].join(" ")}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      {/* Nav moved to layout */}

      {/* ── Page Header ── */}
      <header className="pt-40 pb-16 px-12 border-b border-[#222]">
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-6">
          Selected work
        </div>
        <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em] mb-8">
          Projects &amp;<br />
          <em className="italic text-[#6a6a6a]">case studies.</em>
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <span className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] tracking-[0.08em]">
            Showing 8 projects — 2019 to present
          </span>
        </div>
      </header>

      {/* ── Filter Bar ── */}
      <div className="flex border-b border-[#222] overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            onMouseEnter={ho} onMouseLeave={hu}
            className={[
              "font-['JetBrains_Mono',monospace] text-[0.72rem] tracking-[0.12em] uppercase border-none border-r border-[#222] px-7 py-[1.1rem] cursor-none transition-[color,background] duration-200 whitespace-nowrap",
              activeFilter === f
                ? "text-black bg-[#d4ff47]"
                : "text-[#6a6a6a] bg-transparent hover:text-[#f0ede6] hover:bg-[#141414]",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Featured Project ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#222] min-h-[500px]">
        {/* Visual */}
        <div className="bg-[#141414] flex items-center justify-center overflow-hidden relative border-b md:border-b-0 md:border-r border-[#222] min-h-[260px]">
          <span className="absolute top-8 left-8 font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em]">
            Featured
          </span>
          <span className="absolute top-8 right-8 font-['JetBrains_Mono',monospace] text-[0.65rem] text-black bg-[#d4ff47] px-[0.7rem] py-[0.3rem] tracking-[0.1em]">
            Case study
          </span>
          {/* Mockup */}
          <div className="w-[70%] aspect-video bg-[#1a1a1a] border border-[#222] flex flex-col overflow-hidden">
            {/* Title bar */}
            <div className="h-8 bg-[#111] border-b border-[#222] flex items-center gap-1.5 px-3 shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            {/* Content */}
            <div className="flex-1 p-4 grid grid-cols-2 gap-2">
              {/* Tall card */}
              <div className="bg-[#222] rounded-[2px] row-span-2 p-[10px]">
                <div className="h-[6px] bg-[#d4ff47] w-[40%] rounded-[1px] mb-1.5" />
                <div className="h-[6px] bg-[#333] rounded-[1px] mb-1.5" />
                <div className="h-[6px] bg-[#333] w-[60%] rounded-[1px]" />
              </div>
              <div className="bg-[#222] rounded-[2px] p-2">
                <div className="h-[6px] bg-[#333] w-[60%] rounded-[1px]" />
              </div>
              <div className="bg-[#222] rounded-[2px] p-2">
                <div className="h-[6px] bg-[#d4ff47] w-[40%] rounded-[1px]" />
              </div>
              <div className="bg-[#222] rounded-[2px] col-span-2" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-14 py-14 flex flex-col justify-center">
          <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#d4ff47] tracking-[0.18em] uppercase mb-5">
            Full Stack · 2024
          </div>
          <h2 className="font-['DM_Serif_Display',serif] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] mb-4">
            Nexus Analytics Dashboard
          </h2>
          <p className="font-['JetBrains_Mono',monospace] text-[0.8rem] text-[#6a6a6a] leading-[1.95] mb-8">
            A real-time analytics platform processing over 2 million events per day for a Series B fintech startup. Built from scratch in 4 months with a team of 3. Reduced infrastructure costs by 40% vs. previous vendor.
          </p>

          {/* Stats */}
          <div className="flex gap-10 py-6 border-t border-b border-[#222] mb-10">
            {FEATURED_STATS.map((s) => (
              <div key={s.label}>
                <div className="font-['DM_Serif_Display',serif] text-[2rem] text-[#d4ff47]">{s.num}</div>
                <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.1em] uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-[0.4rem] mb-8">
            {FEATURED_TAGS.map((t) => (
              <span key={t} className="font-['JetBrains_Mono',monospace] text-[0.65rem] border border-[#222] text-[#6a6a6a] px-[0.6rem] py-[0.25rem] tracking-[0.08em]">
                {t}
              </span>
            ))}
          </div>

          <a
            href="project-detail.html"
            onMouseEnter={ho} onMouseLeave={hu}
            className="inline-flex items-center gap-2 bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.75rem] tracking-[0.12em] uppercase px-7 py-[0.9rem] no-underline w-fit transition-[background-color,transform] duration-200 hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]"
          >
            Read case study ↗
          </a>
        </div>
      </div>

      {/* ── Projects Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#222]">
        {PROJECTS.map((p, i) => (
          <a
            key={i}
            href="project-detail.html"
            ref={(el) => { fadeRefs.current[i] = el; }}
            onMouseEnter={ho} onMouseLeave={hu}
            className={[
              "no-underline text-inherit block overflow-hidden transition-colors duration-200 opacity-0 translate-y-7 [transition:background_0.2s,opacity_0.7s_cubic-bezier(0.23,1,0.32,1),transform_0.7s_cubic-bezier(0.23,1,0.32,1)] group hover:bg-[#141414]",
              cardBorder(i),
            ].join(" ")}
          >
            {/* Card visual */}
            <div className="h-[200px] bg-[#141414] overflow-hidden relative border-b border-[#222]">
              <div className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]">
                {p.svg}
              </div>
            </div>

            {/* Card body */}
            <div className="p-7">
              <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#d4ff47] tracking-[0.15em] uppercase mb-3">
                {p.cat}
              </div>
              <div className="font-['DM_Serif_Display',serif] text-[1.6rem] leading-[1.1] mb-[0.6rem]">
                {p.title}
              </div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] leading-[1.85] mb-5">
                {p.desc}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-[0.35rem] flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="font-['JetBrains_Mono',monospace] text-[0.62rem] bg-white/[0.04] border border-[#222] text-[#6a6a6a] px-[0.55rem] py-[0.2rem] tracking-[0.06em]">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[1.2rem] text-[#d4ff47] opacity-0 -translate-x-[6px] translate-y-[6px] transition-[opacity,transform] duration-[250ms] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                  ↗
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Open Source Strip ── */}
      <div className="px-12 py-20 border-b border-[#222]">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-['DM_Serif_Display',serif] text-[2.5rem]">Open source</h2>
          <a
            href="#"
            onMouseEnter={ho} onMouseLeave={hu}
            className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] no-underline tracking-[0.08em] hover:text-[#f0ede6] transition-colors duration-200"
          >
            View all on GitHub →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {OSS.map((o, i) => (
            <div
              key={i}
              onMouseEnter={ho} onMouseLeave={hu}
              className={[
                "p-7 border-t border-[#222]",
                i < OSS.length - 1 ? "border-r border-[#222]" : "",
              ].join(" ")}
            >
              <div className="font-bold text-[0.95rem] mb-[0.35rem] text-[#d4ff47]">{o.name}</div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] leading-[1.8] mb-3">{o.desc}</div>
              <div className="flex gap-6">
                <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.08em]">
                  ⭐ <span className="text-[#f0ede6]">{o.stars}</span>
                </span>
                <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.08em]">
                  Forks <span className="text-[#f0ede6]">{o.forks}</span>
                </span>
                <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.08em]">
                  {o.lang}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer moved to layout */}
    </div>
  );
}