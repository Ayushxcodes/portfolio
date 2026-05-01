"use client";
import { useState, useEffect, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const QUICK_STATS = [
  { num: "6+", label: "Years in industry" },
  { num: "3",  label: "Companies" },
  { num: "42", label: "Projects shipped" },
  { num: "12M",label: "Users reached" },
];

const EXPERIENCE = [
  {
    logo: "STR",
    period: "Jan 2023 — Present",
    company: "Stripe",
    type: "Full-time",
    role: "Senior Software Engineer",
    desc: "Lead engineer on the Payments Dashboard team within Stripe's merchant experience org. Own the frontend architecture for the core dashboard used by 4 million merchants worldwide.",
    achievements: [
      <>Rebuilt the payments overview page with <strong className="text-[#f0ede6]">React Server Components</strong>, reducing initial load time by 62% and cutting client bundle size by 44%.</>,
      <>Designed and implemented a new <strong className="text-[#f0ede6]">real-time notification system</strong> using Server-Sent Events, replacing a polling approach that generated 8M unnecessary API calls/day.</>,
      <>Drove adoption of <strong className="text-[#f0ede6]">TypeScript strict mode</strong> across 220k lines of frontend code via a 3-month incremental migration plan — zero production regressions.</>,
      <>Mentored 3 junior engineers through structured 1:1s, pair programming, and code review. All 3 promoted within 18 months.</>,
    ],
    tags: ["React", "TypeScript", "Next.js", "Ruby on Rails", "Go", "GraphQL"],
  },
  {
    logo: "VCL",
    period: "Mar 2021 — Dec 2022",
    company: "Vercel",
    type: "Full-time",
    role: "Software Engineer II",
    desc: "Member of the Edge Network team responsible for the infrastructure powering Next.js serverless functions and Edge middleware deployments globally.",
    achievements: [
      <>Designed and shipped a <strong className="text-[#f0ede6]">cold-start optimization</strong> for Node.js serverless functions that reduced P99 startup latency from 420ms to 82ms globally.</>,
      <>Built the <strong className="text-[#f0ede6]">Edge Config</strong> feature from 0 to GA: a globally replicated key-value store providing sub-1ms read latency at the edge. Now used by 50k+ deployments.</>,
      <>Led incident response for a <strong className="text-[#f0ede6]">multi-region outage</strong> affecting 300k deployments; wrote the postmortem and drove the infra changes that prevented recurrence.</>,
    ],
    tags: ["Node.js", "Rust", "Cloudflare Workers", "AWS Lambda", "Terraform"],
  },
  {
    logo: "NTN",
    period: "Jun 2019 — Feb 2021",
    company: "Notion",
    type: "Full-time · Engineer #28",
    role: "Full Stack Engineer",
    desc: "Early engineer on the Collaboration team. Worked on the real-time editing, comments, and sharing infrastructure during Notion's hypergrowth phase (0.5M → 4M users).",
    achievements: [
      <>Implemented <strong className="text-[#f0ede6]">real-time multiplayer editing</strong> using operational transforms. System handled 10k concurrent collaborating users at peak.</>,
      <>Built the <strong className="text-[#f0ede6]">public page sharing</strong> feature end-to-end: access controls, SEO optimization, and a Cloudflare caching layer that reduced origin load by 85%.</>,
      <>Helped grow the codebase from 50k to 300k lines while maintaining <strong className="text-[#f0ede6]">98% test coverage</strong> through a culture of TDD and mandatory PR review.</>,
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "Electron"],
  },
];

const EDUCATION = [
  {
    year: "2015 — 2019",
    school: "UC Berkeley",
    degree: "B.S. Electrical Engineering &\nComputer Science (EECS)",
    note: (
      <>
        GPA: <strong className="text-[#d4ff47]">3.87</strong> · Phi Beta Kappa · Regents' and Chancellor's Scholar
        <br />Relevant coursework: Distributed Systems, Operating Systems, Algorithms, Database Systems, Machine Learning
      </>
    ),
  },
  {
    year: "2023 — Ongoing",
    school: "Self-directed",
    degree: "Distributed Systems &\nDatabase Internals",
    note: (
      <>
        Working through: <strong className="text-[#d4ff47]">Designing Data-Intensive Applications</strong>, CMU 15-445 Database Systems (auditing), and the DDIA reading group on Discord.
      </>
    ),
  },
];

// filled = number of filled dots (out of 5)
const SKILLS: { name: string; filled: number; label: string }[] = [
  { name: "TypeScript / JavaScript", filled: 5, label: "Expert" },
  { name: "React / Next.js",         filled: 5, label: "Expert" },
  { name: "Node.js",                 filled: 5, label: "Expert" },
  { name: "PostgreSQL",              filled: 4, label: "Advanced" },
  { name: "GraphQL",                 filled: 4, label: "Advanced" },
  { name: "AWS / GCP",               filled: 4, label: "Advanced" },
  { name: "Docker / Kubernetes",     filled: 3, label: "Proficient" },
  { name: "Python",                  filled: 3, label: "Proficient" },
  { name: "Go",                      filled: 3, label: "Proficient" },
  { name: "Rust",                    filled: 2, label: "Learning" },
];

const WRITING = [
  { name: "How ClickHouse Saved Us $80k/Year",   detail: "Personal blog · Feb 2024" },
  { name: "The Hidden Cost of useEffect",         detail: "Personal blog · Oct 2023" },
  { name: "Building for Zero Downtime",           detail: "Vercel Engineering Blog · May 2022" },
  { name: "OT vs CRDTs: A Practical Guide",       detail: "Medium · Nov 2020 · 12k reads" },
];

const SPEAKING = [
  { name: "React Summit 2024",        detail: '"Server Components in Production: What Nobody Tells You" — Amsterdam' },
  { name: "NodeConf EU 2023",         detail: '"WebSockets at Scale: Lessons from 10M Connections" — Kilkenny' },
  { name: "Bay Area Systems Meetup",  detail: 'Monthly talk · "Distributed Caching Patterns" · June 2023 · San Francisco' },
];

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

      {/* ── Cursor ── */}
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
      <header className="pt-40 pb-20 px-12 border-b border-[#222] grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-12">
        <div>
          <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-6">
            Career
          </div>
          <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em]">
            Experience &amp;<br />
            <em className="italic text-[#6a6a6a]">credentials.</em>
          </h1>
        </div>
        <a
          href="#"
          onMouseEnter={ho} onMouseLeave={hu}
          className="inline-flex items-center gap-[0.6rem] bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.75rem] tracking-[0.12em] uppercase px-7 py-4 no-underline whitespace-nowrap self-end transition-[background-color,transform] duration-200 hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]"
        >
          Download résumé ↓
        </a>
      </header>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#222]">
        {QUICK_STATS.map((s, i) => (
          <div
            key={i}
            className={[
              "py-10 px-6 text-center border-b md:border-b-0",
              // right border: all except last on desktop; col-2 on mobile loses border
              i < 3 ? "md:border-r border-[#222]" : "border-[#222]",
              // mobile: 2-col layout — col-2 (i=1) and col-4 (i=3) lose right border
              i % 2 === 0 ? "border-r" : "",
            ].join(" ")}
          >
            <div className="font-['DM_Serif_Display',serif] text-[3rem] text-[#d4ff47] leading-[1]">
              {s.num}
            </div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.12em] uppercase mt-[0.4rem]">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Work Experience ── */}
      <div className="px-12 border-b border-[#222]">
        <SectionLabel>Work experience</SectionLabel>

        {EXPERIENCE.map((job, i) => (
          <div
            key={i}
            ref={(el) => { fadeRefs.current[i] = el; }}
            className={[
              "grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 py-12 opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
              i < EXPERIENCE.length - 1 ? "border-b border-[#222]" : "",
            ].join(" ")}
          >
            {/* Meta */}
            <div className="md:sticky md:top-28 h-fit">
              <div className="w-12 h-12 bg-[#141414] border border-[#222] flex items-center justify-center mb-4 font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#d4ff47] tracking-[0.05em]">
                {job.logo}
              </div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#6a6a6a] tracking-[0.08em] mb-[0.5rem]">
                {job.period}
              </div>
              <div className="font-bold text-[0.9rem] tracking-[0.04em] text-[#d4ff47] mb-[0.25rem]">
                {job.company}
              </div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.1em] uppercase">
                {job.type}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="font-['DM_Serif_Display',serif] text-[2rem] mb-[0.5rem] leading-[1.1]">
                {job.role}
              </div>
              <p className="font-['JetBrains_Mono',monospace] text-[0.78rem] text-[#aaa] leading-[2] mb-6 max-w-[540px]">
                {job.desc}
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {job.achievements.map((ach, j) => (
                  <div key={j} className="flex items-start gap-3 font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] leading-[1.7]">
                    <span className="text-[#d4ff47] shrink-0 mt-[0.05em]">→</span>
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-[0.4rem]">
                {job.tags.map((t) => (
                  <span key={t} className="font-['JetBrains_Mono',monospace] text-[0.65rem] border border-[#222] text-[#6a6a6a] px-[0.65rem] py-[0.25rem] tracking-[0.08em]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Education ── */}
      <div className="px-12 border-b border-[#222]">
        <SectionLabel>Education</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 pb-12">
          {EDUCATION.map((edu, i) => (
            <div
              key={i}
              className={[
                "py-10",
                i === 0
                  ? "md:border-r border-[#222] md:pr-12"
                  : "md:pl-12",
                i === 0 && "border-b md:border-b-0 border-[#222]",
              ].join(" ")}
            >
              <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.12em] mb-[0.5rem]">
                {edu.year}
              </div>
              <div className="font-['DM_Serif_Display',serif] text-[1.5rem] mb-[0.3rem]">
                {edu.school}
              </div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] mb-4 leading-[1.6] whitespace-pre-line">
                {edu.degree}
              </div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] leading-[1.8] border-t border-[#222] pt-4">
                {edu.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills Matrix ── */}
      <div className="px-12 py-12 border-b border-[#222]">
        <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase">
          Skills
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
          {SKILLS.map((skill, i) => {
            // bottom border: all except last 2 rows (last-n+2 equivalent)
            const isLastTwo = i >= SKILLS.length - 2;
            // right border: left column only (i%2===0)
            const isLeftCol = i % 2 === 0;
            return (
              <div
                key={i}
                onMouseEnter={ho} onMouseLeave={hu}
                className={[
                  "flex items-center justify-between px-6 py-4",
                  isLeftCol ? "border-r border-[#222]" : "",
                  !isLastTwo ? "border-b border-[#222]" : "",
                ].join(" ")}
              >
                <span className="font-['JetBrains_Mono',monospace] text-[0.78rem] text-[#f0ede6] tracking-[0.05em]">
                  {skill.name}
                </span>
                <div className="flex items-center gap-3">
                  <SkillDots filled={skill.filled} />
                  <span className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.08em] w-[60px] text-right">
                    {skill.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Writing & Speaking ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-12 py-12 border-b border-[#222]">
        {/* Writing */}
        <div className="md:border-r border-[#222] md:pr-12 border-b md:border-b-0 pb-8 md:pb-0 mb-8 md:mb-0">
          <div className="font-['DM_Serif_Display',serif] text-[1.75rem] mb-6">Writing</div>
          {WRITING.map((w, i) => (
            <div
              key={i}
              className={[
                "py-5",
                i < WRITING.length - 1 ? "border-b border-[#222]" : "",
              ].join(" ")}
            >
              <div className="font-bold text-[0.9rem] mb-[0.25rem]">{w.name}</div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] leading-[1.7]">
                {w.detail} ·{" "}
                <a
                  href="#"
                  onMouseEnter={ho} onMouseLeave={hu}
                  className="text-[#d4ff47] no-underline hover:underline"
                >
                  Read →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Speaking */}
        <div className="md:pl-12">
          <div className="font-['DM_Serif_Display',serif] text-[1.75rem] mb-6">Speaking</div>
          {SPEAKING.map((s, i) => (
            <div
              key={i}
              className={[
                "py-5",
                i < SPEAKING.length - 1 ? "border-b border-[#222]" : "",
              ].join(" ")}
            >
              <div className="font-bold text-[0.9rem] mb-[0.25rem]">{s.name}</div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] leading-[1.7]">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA Strip ── */}
      <div className="px-12 py-20 flex items-center justify-between flex-wrap gap-8 border-b border-[#222]">
        <h2 className="font-['DM_Serif_Display',serif] text-[clamp(2rem,4vw,3.5rem)]">
          Ready to build<br />
          <em className="italic text-[#d4ff47]">something great?</em>
        </h2>
        <div className="flex gap-4 flex-wrap">
          <a
            href="contact.html"
            onMouseEnter={ho} onMouseLeave={hu}
            className="inline-flex items-center gap-2 bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.75rem] tracking-[0.12em] uppercase px-7 py-4 no-underline transition-[background-color,transform] duration-200 hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]"
          >
            Get in touch ↗
          </a>
          <a
            href="#"
            onMouseEnter={ho} onMouseLeave={hu}
            className="inline-flex items-center gap-2 border border-[#222] text-[#6a6a6a] font-['JetBrains_Mono',monospace] text-[0.72rem] tracking-[0.1em] uppercase px-7 py-4 no-underline transition-[color,border-color] duration-200 hover:text-[#f0ede6] hover:border-[#f0ede6]"
          >
            Download résumé ↓
          </a>
        </div>
      </div>

      {/* Footer moved to layout */}
    </div>
  );
}