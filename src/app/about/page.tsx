"use client";
import { useState, useEffect, useRef } from "react";

const values = [
  { num: "01", title: "Craft matters", desc: "Details compound. The difference between good and great software is 1000 small decisions made with care. Every API shape, every error message, every loading state." },
  { num: "02", title: "Ship it", desc: "Perfect is the enemy of shipped. I'd rather have real users interacting with an 80% solution than spend three months polishing something nobody has tested in the wild." },
  { num: "03", title: "Own the outcome", desc: "I don't see myself as someone who \"just writes code.\" I'm accountable for the thing working — the full cycle from spec to deployment to monitoring in production." },
  { num: "04", title: "Simplicity wins", desc: "Complexity is a liability. If a junior engineer can't understand the system in a day, it's too complex. I actively fight abstraction creep and over-engineering." },
  { num: "05", title: "Teach relentlessly", desc: "The best engineers I know are obsessive teachers. Writing docs, pair programming, code review comments — these compound into a better team and a better codebase." },
  { num: "06", title: "Stay curious", desc: "I read widely outside my domain. Organizational psychology, systems biology, urban planning — the best software insights often come from somewhere completely unexpected." },
];

const stack = [
  { cat: "Editor",   name: "Neovim",          use: "Custom config. Fast. Opinionated. Still explaining it to coworkers." },
  { cat: "Terminal", name: "Ghostty + Fish",   use: "Fish shell with custom prompt. Ghostty for GPU-accelerated rendering." },
  { cat: "Browser",  name: "Arc",              use: "Spaces for work/personal separation. Custom CSS overrides for everything." },
  { cat: "Notes",    name: "Obsidian",         use: "Zettelkasten method. ~2400 notes. Synced via iCloud." },
  { cat: "Design",   name: "Figma",            use: "For wireframes and design handoff. I design my own UIs when needed." },
  { cat: "DB GUI",   name: "TablePlus",        use: "Postgres, MySQL, Redis — all in one. Native macOS feel." },
  { cat: "API",      name: "Hoppscotch",       use: "Open source Postman alternative. Self-hosted for sensitive envs." },
  { cat: "Machine",  name: "M3 MacBook Pro",   use: "14-inch. 36GB RAM. Runs Docker, 4 browsers, and 12 VS Code windows fine." },
];

const outside = [
  { emoji: "📚", title: "Reading", desc: "Currently: \"A Pattern Language\" by Christopher Alexander. Building a system to track every book I've read since 2015. Up to 340 entries and it's made me read more, not less." },
  { emoji: "🏃", title: "Running", desc: "Training for my third half marathon. Running is where I process architecture problems. Some of my best ideas come at mile 6 when my brain has nothing left to distract itself with." },
  { emoji: "🎸", title: "Guitar", desc: "Playing for 10 years. Mostly fingerstyle acoustic. Currently learning Chet Atkins' \"Windy and Warm.\" It's deeply humbling to be a beginner at something." },
];

const storyLinks = [
  { href: "#origin",   label: "How it started" },
  { href: "#approach", label: "How I work" },
  { href: "#values",   label: "What I believe" },
  { href: "#outside",  label: "Beyond code" },
];

export default function AboutPage() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Inject Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap";
    document.head.appendChild(link);

    const onMouseMove = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", onMouseMove);

    // Fade-up IntersectionObserver
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

  // Border helpers for grid items
  const valueBorder = (i: number) =>
    i % 3 !== 2 ? "border-b border-r border-[#222]" : "border-b border-[#222]";

  const stackBorder = (i: number) => {
    // 4-col desktop, 2-col mobile
    // mobile: no right border on col-2 (i%2===1)
    // desktop: no right border on col-4 (i%4===3)
    const mobileRight = i % 2 !== 1;
    const desktopRight = i % 4 !== 3;
    if (mobileRight && desktopRight)  return "border-b border-r border-[#222]";
    if (mobileRight && !desktopRight) return "border-b border-r md:border-r-0 border-[#222]";
    if (!mobileRight && desktopRight) return "border-b border-[#222] md:border-r md:border-[#222]";
    return "border-b border-[#222]";
  };

  return (
    <div
      className="bg-[#0c0c0c] text-[#f0ede6] font-['Syne',sans-serif] cursor-none overflow-x-hidden min-h-screen scroll-smooth selection:bg-[#d4ff47] selection:text-black"
    >
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
      <header className="pt-40 pb-20 px-12 border-b border-[#222] grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
        <div>
          <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-6">
            About me
          </div>
          <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em]">
            The person<br />behind the<br />
            <em className="italic text-[#6a6a6a]">commits.</em>
          </h1>
        </div>
        <p className="font-['JetBrains_Mono',monospace] text-[0.85rem] text-[#aaa] leading-[2]">
          Full stack engineer, occasional writer, and habitual over-engineer of
          personal projects. I've been building for the web for over six years —
          from tiny side projects to infrastructure serving millions of users.
          <br /><br />
          This is a little more about who I am, how I think, and what drives the
          work I do.
        </p>
      </header>

      {/* ── Story ── */}
      <section className="px-12 py-24 border-b border-[#222]">
        {/* Section label */}
        <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">
          The story
          <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-20">
          {/* Sidebar */}
          <div className="md:sticky md:top-28 h-fit">
            <nav className="flex flex-col">
              {storyLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  onMouseEnter={ho} onMouseLeave={hu}
                  className="font-['JetBrains_Mono',monospace] text-[0.72rem] tracking-[0.1em] uppercase text-[#6a6a6a] no-underline py-[0.9rem] border-b border-[#222] transition-[color,padding-left] duration-200 hover:text-[#d4ff47] hover:pl-2"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Body */}
          <div>
            <h3 id="origin" className="font-['DM_Serif_Display',serif] text-[2.2rem] mb-5 mt-0">
              How it started
            </h3>
            <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
              I wrote my first line of HTML at 13, modifying a free CSS template
              to make my gaming forum look "cooler." The fact that you could type
              words into a text file and a browser would render them as something
              visual felt like{" "}
              <em className="italic text-[#d4ff47]">actual magic</em> to me. It
              still does, honestly.
            </p>
            <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
              I studied Computer Science at UC Berkeley, where I became obsessed
              with systems programming and distributed computing. But I always
              found my way back to the web — it's where you can ship something
              real and put it in someone's hands the same day.
            </p>
            <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
              After graduating in 2018, I joined Notion as one of its earliest
              engineers. That experience — working on a product people loved, at
              a company growing faster than anyone could have predicted — shaped
              almost everything about how I think about software today.
            </p>

            {/* Pull quote */}
            <div className="border-l-2 border-[#d4ff47] pl-8 py-2 my-10">
              <p className="font-['DM_Serif_Display',serif] text-[1.6rem] leading-[1.4] text-[#f0ede6]">
                "Good software doesn't shout. It just works, every time, so well
                that people never have to think about it."
              </p>
            </div>

            <h3 id="approach" className="font-['DM_Serif_Display',serif] text-[2.2rem] mb-5 mt-12">
              How I work
            </h3>
            <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
              I default to{" "}
              <strong className="text-[#f0ede6]">boring technology</strong> where
              possible. Not because I'm lazy, but because the most exciting part
              of building products is the problem-solving, not the framework du
              jour. Postgres over a shiny NoSQL database. Server-rendered HTML
              where React isn't needed. The right tool, not the newest tool.
            </p>
            <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
              I believe deeply in{" "}
              <strong className="text-[#f0ede6]">writing things down</strong>. A
              short design doc before writing code has saved me weeks of work. An
              RFC before a big architectural decision has prevented countless
              misunderstandings. I write to think, and I think better when I
              write.
            </p>
            <p className="text-[1.05rem] text-[#bbb] leading-[1.95] mb-5">
              I try to work at the level above my job title. That means caring
              about why we're building something, not just how. It means talking
              to users, reading support tickets, and understanding the business
              context of every feature I ship.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section id="values" className="border-b border-[#222]">
        <div className="px-12 pt-24 pb-8">
          <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase flex items-center gap-4">
            What I believe
            <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={i}
              ref={(el) => { fadeRefs.current[i] = el; }}
              onMouseEnter={ho} onMouseLeave={hu}
              className={`p-10 opacity-0 translate-y-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${valueBorder(i)}`}
            >
              <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em] mb-4">
                {v.num}
              </div>
              <div className="font-['DM_Serif_Display',serif] text-[1.5rem] mb-3">
                {v.title}
              </div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] leading-[2]">
                {v.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="border-b border-[#222]">
        <div className="px-12 pt-24 pb-8">
          <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase flex items-center gap-4">
            Daily stack
            <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stack.map((s, i) => (
            <div
              key={i}
              onMouseEnter={ho} onMouseLeave={hu}
              className={`p-8 transition-colors duration-200 hover:bg-[#141414] ${stackBorder(i)}`}
            >
              <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#d4ff47] tracking-[0.12em] uppercase mb-2">
                {s.cat}
              </div>
              <div className="font-bold text-[1rem] mb-1">{s.name}</div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#6a6a6a] leading-[1.7]">
                {s.use}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Outside / Beyond Code ── */}
      <section id="outside" className="border-b border-[#222]">
        <div className="px-12 pt-24 pb-8">
          <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase flex items-center gap-4">
            Beyond code
            <span className="flex-1 h-px bg-[#222] max-w-[80px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {outside.map((item, i) => (
            <div
              key={i}
              className={[
                "p-10 relative overflow-hidden group",
                "border-b border-[#222] md:border-b-0",
                i < outside.length - 1 ? "md:border-r md:border-[#222]" : "",
              ].join(" ")}
            >
              {/* Acid underline on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4ff47] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="text-[2rem] mb-4 block">{item.emoji}</span>
              <div className="font-['DM_Serif_Display',serif] text-[1.3rem] mb-2">
                {item.title}
              </div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.72rem] text-[#6a6a6a] leading-[1.9]">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-12 py-24 text-center">
        <h2 className="font-['DM_Serif_Display',serif] text-[clamp(2.5rem,5vw,5rem)] leading-[1] mb-8">
          Want to work<br />together?{" "}
          <em className="italic text-[#d4ff47]">Let's talk.</em>
        </h2>
        <div className="flex justify-center gap-4 flex-wrap mt-8">
          <a
            href="contact.html"
            onMouseEnter={ho} onMouseLeave={hu}
            className="inline-flex items-center gap-2 bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.8rem] tracking-[0.12em] uppercase px-8 py-4 no-underline transition-[background-color,transform] duration-200 hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]"
          >
            Get in touch ↗
          </a>
          <a
            href="projects.html"
            onMouseEnter={ho} onMouseLeave={hu}
            className="inline-flex items-center gap-2 border border-[#222] text-[#6a6a6a] font-['JetBrains_Mono',monospace] text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 no-underline transition-[color,border-color] duration-200 hover:text-[#f0ede6] hover:border-[#f0ede6]"
          >
            See my work →
          </a>
        </div>
      </section>

      {/* Footer moved to layout */}
    </div>
  );
}