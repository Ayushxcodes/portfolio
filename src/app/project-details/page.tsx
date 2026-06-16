"use client";
import { useState, useEffect, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "about.html",      label: "About",      active: false },
  { href: "projects.html",   label: "Work",       active: true  },
  { href: "experience.html", label: "Experience", active: false },
  { href: "contact.html",    label: "Contact",    active: false },
];

const CASE_META = [
  { label: "Year",   value: "2024",              acid: false },
  { label: "Role",   value: "Lead Engineer",      acid: false },
  { label: "Team",   value: "3 engineers",        acid: false },
  { label: "Status", value: "Live in production", acid: true  },
];

const STATS = [
  { big: "2M+",  small: "Events per day"    },
  { big: "98ms", small: "P99 query latency" },
  { big: "40%",  small: "Cost reduction"    },
  { big: "4mo",  small: "Build time"        },
];

const TOC = [
  { href: "#overview",     label: "Overview"      },
  { href: "#problem",      label: "The problem"   },
  { href: "#architecture", label: "Architecture"  },
  { href: "#challenges",   label: "Key challenges"},
  { href: "#outcome",      label: "Outcome"       },
  { href: "#learnings",    label: "What I learned"},
];

const ARCH_NODES = [
  { name: "Client Events", tech: "SDKs / Webhook",  highlight: false },
  { name: "Kafka",         tech: "Event stream",    highlight: true  },
  { name: "ClickHouse",    tech: "OLAP store",      highlight: true  },
  { name: "Query API",     tech: "Node / Redis",    highlight: false },
  { name: "Dashboard",     tech: "Next.js / WS",   highlight: false },
];

const CHALLENGES = [
  {
    variant: "before" as const,
    label: "Problem",
    title: "Query fanout under load",
    desc:  "200+ concurrent users all refreshing dashboards at once created a thundering herd that saturated ClickHouse connections during market open.",
  },
  {
    variant: "after" as const,
    label: "Solution",
    title: "Shared query deduplication",
    desc:  "Built a query coalescing layer in Redis: identical queries within a 1-second window are merged into a single ClickHouse request. Reduced query load by 70%.",
  },
  {
    variant: "before" as const,
    label: "Problem",
    title: "Schema evolution",
    desc:  "Event schemas changed frequently as Meridian added new products. Each change threatened to break ingestion pipelines and historical queries.",
  },
  {
    variant: "after" as const,
    label: "Solution",
    title: "Schema registry + Avro",
    desc:  "Introduced a Confluent Schema Registry. Events are validated against versioned Avro schemas on ingestion. Old and new schema versions coexist gracefully.",
  },
];

const LEARNINGS = [
  {
    num: "01",
    title: "Choose your database for the read pattern, not the write pattern",
    body:  "We almost chose Postgres with TimescaleDB because it was familiar. ClickHouse's columnar storage turned out to be the single biggest performance lever in the entire system.",
  },
  {
    num: "02",
    title: "Build observability before you build features",
    body:  "We instrumented the entire pipeline with Prometheus and Grafana dashboards in week 1. This paid dividends in debugging the thundering herd issue — we could see exactly what was happening in production.",
  },
  {
    num: "03",
    title: "WebSockets need more thought than most tutorials suggest",
    body:  "Reconnection logic, backpressure, message ordering guarantees — the production WebSocket implementation was 5× more complex than the prototype. Plan for it.",
  },
];

// ── Small reusable pieces ─────────────────────────────────────────────────────

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
      {children}
      <span className="w-10 h-px bg-[#222]" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CaseStudyPage() {
  const [cursorPos, setCursorPos]     = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Refs for fade-up sections
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Fonts
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap";
    document.head.appendChild(link);

    // Cursor
    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", onMove);

    // Fade-up observer
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
            fadeObs.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );
    sectionRefs.current.forEach((el) => { if (el) fadeObs.observe(el); });

    // TOC active-state scroll tracker
    const onScroll = () => {
      const ids = TOC.map((t) => t.href.slice(1));
      let current = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (document.head.contains(link)) document.head.removeChild(link);
      fadeObs.disconnect();
    };
  }, []);

  const ho = () => setCursorHover(true);
  const hu = () => setCursorHover(false);

  const addRef = (el: HTMLElement | null, i: number) => {
    sectionRefs.current[i] = el;
  };

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

      {/* ── Hero ── */}
      <header className="pt-40 pb-20 px-12 border-b border-[#222]">
        {/* Breadcrumb */}
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#6a6a6a] tracking-[0.1em] mb-8 flex items-center gap-3">
          <Link
            href="/projects"
            onMouseEnter={ho} onMouseLeave={hu}
            className="text-[#6a6a6a] no-underline transition-colors duration-200 hover:text-[#d4ff47]"
          >
            Work
          </Link>
          <span>/</span>
          <span>Nexus Dashboard</span>
        </div>

        {/* Meta row */}
        <div className="flex gap-12 mb-8 flex-wrap">
          {CASE_META.map((m) => (
            <div key={m.label} className="flex flex-col gap-[0.3rem]">
              <span className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.15em] uppercase">
                {m.label}
              </span>
              <span className={`font-['JetBrains_Mono',monospace] text-[0.82rem] tracking-[0.05em] ${m.acid ? "text-[#d4ff47]" : "text-[#f0ede6]"}`}>
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3rem,7vw,7rem)] leading-[0.92] tracking-[-0.02em] mb-6">
          Nexus Analytics<br />Dashboard
        </h1>
        <p className="font-['JetBrains_Mono',monospace] text-[0.9rem] text-[#6a6a6a] max-w-[600px] leading-[1.9]">
          How we built a real-time analytics platform processing 2M+ events/day for a Series B fintech startup — in 4 months, with a team of three.
        </p>
      </header>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#222]">
        {STATS.map((s, i) => (
          <div
            key={i}
            className={[
              "py-12 px-10 text-center border-b md:border-b-0",
              i < 3 ? "md:border-r border-[#222]" : "border-[#222]",
              i % 2 === 0 ? "border-r" : "",
            ].join(" ")}
          >
            <div className="font-['DM_Serif_Display',serif] text-[clamp(2.5rem,4vw,4rem)] text-[#d4ff47] leading-[1]">
              {s.big}
            </div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.12em] uppercase mt-2">
              {s.small}
            </div>
          </div>
        ))}
      </div>

      {/* ── Two-col layout: TOC + article ── */}
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-20 px-12 py-20 border-b border-[#222]">

        {/* TOC (desktop only) */}
        <aside className="hidden md:block sticky top-28 h-fit">
          <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#d4ff47] tracking-[0.15em] uppercase mb-5">
            Contents
          </div>
          <nav className="flex flex-col">
            {TOC.map((t) => {
              const isActive = activeSection === t.href.slice(1);
              return (
                <a
                  key={t.href}
                  href={t.href}
                  onMouseEnter={ho} onMouseLeave={hu}
                  className={[
                    "font-['JetBrains_Mono',monospace] text-[0.72rem] no-underline py-3 border-b border-[#222] tracking-[0.05em] transition-[color,padding-left] duration-200 hover:text-[#d4ff47] hover:pl-2",
                    isActive ? "text-[#d4ff47]" : "text-[#6a6a6a]",
                  ].join(" ")}
                >
                  {t.label}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Article */}
        <article className="flex flex-col gap-16">

          {/* Overview */}
          <section
            id="overview"
            ref={(el) => addRef(el, 0)}
            className="opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <SectionTag>Overview</SectionTag>
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] mb-4">
              The brief
            </h2>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              Meridian Financial (name changed) had a problem: their data team was spending 3–4 hours each morning running Python scripts to generate the previous day's performance reports. Business stakeholders couldn't get answers to simple questions without filing a data request and waiting 48 hours.
            </p>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              They needed a <strong className="text-[#f0ede6]">self-service analytics platform</strong> that their operations team could use without SQL knowledge — with data fresh enough to make same-day decisions on.
            </p>
            <Callout>
              <strong className="text-[#d4ff47]">Constraint:</strong> The previous analytics vendor cost $120k/year and still couldn't deliver sub-minute data freshness. Our target was real-time (under 5 seconds) with a total infrastructure cost under $3k/month.
            </Callout>
          </section>

          {/* Problem */}
          <section
            id="problem"
            ref={(el) => addRef(el, 1)}
            className="opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <SectionTag>The problem</SectionTag>
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] mb-4">
              Why existing solutions failed
            </h2>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              We audited four existing analytics platforms. Each failed in at least one critical dimension: either they couldn't handle the event volume, the query latency was too high for real-time use, the cost was prohibitive at scale, or the embedding options were too limited for white-labeling into Meridian's own product.
            </p>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              The core technical challenge was{" "}
              <em className="italic text-[#d4ff47]">the write/read ratio</em>. They needed to ingest bursts of 50,000 events per minute during market hours while still serving sub-100ms analytical queries to 200+ concurrent dashboard users. These requirements are fundamentally in tension.
            </p>
          </section>

          {/* Architecture */}
          <section
            id="architecture"
            ref={(el) => addRef(el, 2)}
            className="opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <SectionTag>Architecture</SectionTag>
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] mb-4">
              How we built it
            </h2>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              The solution centered on a purpose-built stack designed around each layer's strength. Rather than forcing one database to do everything, we separated concerns aggressively.
            </p>

            {/* Architecture diagram */}
            <div className="bg-[#141414] border border-[#222] p-10 my-8">
              <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em] uppercase mb-8">
                Data flow — simplified
              </div>
              <div className="flex items-center justify-center flex-wrap gap-0">
                {ARCH_NODES.map((node, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={[
                        "bg-[#0c0c0c] border px-6 py-4 text-center min-w-[130px]",
                        node.highlight ? "border-[#d4ff47]" : "border-[#222]",
                      ].join(" ")}
                    >
                      <div className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#f0ede6] tracking-[0.05em]">
                        {node.name}
                      </div>
                      <div className="font-['JetBrains_Mono',monospace] text-[0.6rem] text-[#6a6a6a] mt-[0.3rem] tracking-[0.08em]">
                        {node.tech}
                      </div>
                    </div>
                    {i < ARCH_NODES.length - 1 && (
                      <span className="font-['JetBrains_Mono',monospace] text-[#6a6a6a] text-[1.2rem] px-2">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              We chose <strong className="text-[#f0ede6]">ClickHouse</strong> as the analytical store after benchmarking it against Redshift, BigQuery, and DuckDB. On our workload, ClickHouse returned aggregations over 500M rows in under 80ms — roughly 12× faster than Redshift at a third of the cost.
            </p>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              For real-time delivery to the frontend, we used WebSockets with a Redis pub/sub fanout layer. Instead of polling, the dashboard subscribes to metric channels; updates are pushed as they arrive from the ingestion pipeline.
            </p>

            {/* Code block */}
            <div className="bg-[#141414] border border-[#222] px-8 py-6 my-8 overflow-x-auto">
              <pre className="font-['JetBrains_Mono',monospace] text-[0.78rem] text-[#ccc] leading-[1.8]">
                <span className="text-[#555]">{"// Simplified metric subscription handler\n"}</span>
                <span className="text-[#d4ff47]">const </span>
                <span className="text-[#81a1c1]">subscribeToMetric</span>
                <span className="text-[#d4ff47]"> = async </span>
                {"(metricId: "}
                <span className="text-[#88c0d0]">string</span>
                {", ws: WebSocket) => {\n  "}
                <span className="text-[#d4ff47]">const </span>
                {"sub = redis.duplicate();\n  "}
                <span className="text-[#d4ff47]">await </span>
                {"sub."}
                <span className="text-[#81a1c1]">subscribe</span>
                {"("}
                <span className="text-[#88c0d0]">{"`metric:${metricId}`"}</span>
                {");\n\n  sub."}
                <span className="text-[#81a1c1]">on</span>
                {"("}
                <span className="text-[#88c0d0]">'message'</span>
                {", (_, data) => {\n    "}
                <span className="text-[#d4ff47]">if </span>
                {"(ws.readyState === WebSocket.OPEN) {\n      ws."}
                <span className="text-[#81a1c1]">send</span>
                {"(data);\n    }\n  });\n\n  ws."}
                <span className="text-[#81a1c1]">on</span>
                {"("}
                <span className="text-[#88c0d0]">'close'</span>
                {", () => sub."}
                <span className="text-[#81a1c1]">unsubscribe</span>
                {"());\n};"}
              </pre>
            </div>
          </section>

          {/* Challenges */}
          <section
            id="challenges"
            ref={(el) => addRef(el, 3)}
            className="opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <SectionTag>Key challenges</SectionTag>
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] mb-4">
              The hard parts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {CHALLENGES.map((c, i) => (
                <div
                  key={i}
                  className={[
                    "bg-[#141414] border border-[#222] border-t-2 p-7",
                    c.variant === "before" ? "border-t-[#e05252]" : "border-t-[#d4ff47]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "font-['JetBrains_Mono',monospace] text-[0.62rem] tracking-[0.15em] uppercase mb-3",
                      c.variant === "before" ? "text-[#e05252]" : "text-[#d4ff47]",
                    ].join(" ")}
                  >
                    {c.label}
                  </div>
                  <div className="font-bold text-[0.95rem] mb-2">{c.title}</div>
                  <div className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] leading-[1.85]">
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Outcome */}
          <section
            id="outcome"
            ref={(el) => addRef(el, 4)}
            className="opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <SectionTag>Outcome</SectionTag>
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] mb-4">
              The results
            </h2>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              We shipped the MVP in week 14 and reached full feature parity with the previous vendor by week 16. The platform has been running in production for 8 months with{" "}
              <strong className="text-[#f0ede6]">99.97% uptime</strong>.
            </p>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              Beyond the headline numbers, the biggest win was qualitative: the ops team went from filing data requests to self-serving answers in under 30 seconds. The data team reclaimed roughly{" "}
              <em className="italic text-[#d4ff47]">15 hours per week</em> that had been spent on manual reporting.
            </p>
            <p className="text-[1rem] text-[#bbb] leading-[1.95] mb-5">
              The platform has since been extended to support 3 new product lines that weren't in the original scope, with no architectural changes required — a good sign that the foundation held.
            </p>
          </section>

          {/* Learnings */}
          <section
            id="learnings"
            ref={(el) => addRef(el, 5)}
            className="opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <SectionTag>What I learned</SectionTag>
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] mb-4">
              Key takeaways
            </h2>
            <div className="flex flex-col">
              {LEARNINGS.map((l, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[60px_1fr] gap-8 py-8 border-b border-[#222] last:border-b-0"
                >
                  <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#d4ff47] tracking-[0.12em] pt-1">
                    {l.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-[1rem] mb-[0.4rem]">{l.title}</h4>
                    <p className="font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] leading-[1.9] m-0">
                      {l.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </article>
      </div>

      {/* ── Next / Previous project ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#222]">
        <div className="px-12 py-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#222]">
          <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em] uppercase mb-6">
            ← Previous
          </div>
          <div className="font-['DM_Serif_Display',serif] text-[2rem] mb-8">
            StoreFront Engine
          </div>
          <Link
            href="/project-details"
            onMouseEnter={ho} onMouseLeave={hu}
            className="inline-flex items-center gap-2 font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#d4ff47] tracking-[0.1em] uppercase no-underline transition-[gap] duration-200 hover:gap-4 w-fit"
          >
            View project →
          </Link>
        </div>
        <div className="px-12 py-16 flex flex-col justify-between">
          <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em] uppercase mb-6">
            Next →
          </div>
          <div className="font-['DM_Serif_Display',serif] text-[2rem] mb-8">
            Orchid CMS
          </div>
          <Link
            href="/project-details"
            onMouseEnter={ho} onMouseLeave={hu}
            className="inline-flex items-center gap-2 font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#d4ff47] tracking-[0.1em] uppercase no-underline transition-[gap] duration-200 hover:gap-4 w-fit"
          >
            View project →
          </Link>
        </div>
      </div>

      {/* Footer moved to layout */}
    </div>
  );
}

// ── Callout helper ────────────────────────────────────────────────────────────

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#141414] border border-[#222] border-l-[3px] border-l-[#d4ff47] px-8 py-6 my-8">
      <p className="font-['JetBrains_Mono',monospace] text-[0.8rem] leading-[1.9] text-[#ccc] m-0">
        {children}
      </p>
    </div>
  );
}