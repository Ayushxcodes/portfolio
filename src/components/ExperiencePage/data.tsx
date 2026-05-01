import React from "react";

export const QUICK_STATS = [
  { num: "6+", label: "Years in industry" },
  { num: "3",  label: "Companies" },
  { num: "42", label: "Projects shipped" },
  { num: "12M",label: "Users reached" },
];

export const EXPERIENCE = [
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

export default {};
