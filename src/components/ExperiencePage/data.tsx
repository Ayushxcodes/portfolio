import React from "react";

export const QUICK_STATS = [
  { num: "6+", label: "Years in industry" },
  { num: "3",  label: "Companies" },
  { num: "42", label: "Projects shipped" },
  { num: "12M",label: "Users reached" },
];

export const EXPERIENCE = [
  {
    logo: "SAT",
    period: "Nov 2025 — Present",
    company: "Saturn Consulting Group",
    type: "Full-time",
    role: "IT Associate / Software Engineer",
    desc: "Manage core internal IT systems, support enterprise cloud environments, and administer database architectures for client delivery systems.",
    achievements: [
      <>Administered migration of critical legacy databases to optimized <strong className="text-[#f0ede6]">PostgreSQL</strong> configurations, reducing response latency and system load.</>,
      <>Assisted in developing and maintaining Docker environments and Git-based deployment workflows.</>,
      <>Monitored cloud resources across <strong className="text-[#f0ede6]">AWS</strong>, resolving infrastructure incidents to maintain system availability.</>,
    ],
    tags: ["IT Support", "System Administration", "Docker", "AWS", "PostgreSQL"],
  },
  {
    logo: "PTN",
    period: "Jan 2025 — Nov 2025",
    company: "Paper Theory Network",
    type: "Full-time",
    role: "Full Stack Engineer",
    desc: "Engineered rich media players, interactive video tools, and low-latency digital assets for high-traffic content networks.",
    achievements: [
      <>Developed a custom video component utilizing intersection-based <strong className="text-[#f0ede6]">lazy playback</strong> and hover interactions to decrease network load.</>,
      <>Designed real-time dashboard elements and analytics integrations using <strong className="text-[#f0ede6]">WebSockets</strong> and React.</>,
      <>Collaborated on active-page navigation refinements and custom UI micro-animations, significantly boosting user retention.</>,
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "WebSockets", "Media Streaming"],
  },
];

export const EDUCATION = [
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

export const SKILLS: { name: string; filled: number; label: string }[] = [
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

export const WRITING = [
  { name: "How ClickHouse Saved Us $80k/Year",   detail: "Personal blog · Feb 2024" },
  { name: "The Hidden Cost of useEffect",         detail: "Personal blog · Oct 2023" },
  { name: "Building for Zero Downtime",           detail: "Vercel Engineering Blog · May 2022" },
  { name: "OT vs CRDTs: A Practical Guide",       detail: "Medium · Nov 2020 · 12k reads" },
];

export const SPEAKING = [
  { name: "React Summit 2024",        detail: '"Server Components in Production: What Nobody Tells You" — Amsterdam' },
  { name: "NodeConf EU 2023",         detail: '"WebSockets at Scale: Lessons from 10M Connections" — Kilkenny' },
  { name: "Bay Area Systems Meetup",  detail: 'Monthly talk · "Distributed Caching Patterns" · June 2023 · San Francisco' },
];


