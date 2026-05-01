// Data module for Projects page
export const FILTERS = ["All", "Full Stack", "Frontend", "Backend / API", "Open Source", "Mobile"];

export const FEATURED_STATS = [
  { num: "2M+",  label: "Events/day" },
  { num: "98ms", label: "P99 latency" },
  { num: "40%",  label: "Cost reduction" },
];

export const FEATURED_TAGS = ["Next.js", "ClickHouse", "WebSockets", "AWS ECS", "Terraform"];

export const PROJECTS = [
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

export const OSS = [
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

export default {};
