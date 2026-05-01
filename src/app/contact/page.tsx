"use client";
import { useState, useEffect, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "about.html",      label: "About",      active: false },
  { href: "projects.html",   label: "Work",       active: false },
  { href: "experience.html", label: "Experience", active: false },
  { href: "contact.html",    label: "Contact",    active: true  },
];

const CONTACT_DETAILS = [
  { label: "Email",      value: "alex@alexchen.dev",        href: "mailto:alex@alexchen.dev", isLink: true },
  { label: "LinkedIn",   value: "linkedin.com/in/alexchen", href: "#",                        isLink: true },
  { label: "GitHub",     value: "github.com/alexchen",      href: "#",                        isLink: true },
  { label: "Twitter / X",value: "@alexchen_dev",             href: "#",                        isLink: true },
  { label: "Location",   value: "San Francisco, CA 🌁",      href: "",                         isLink: false },
];

const INQUIRY_OPTIONS = [
  "Full-time role",
  "Freelance / contract project",
  "Technical consulting",
  "Speaking / writing opportunity",
  "Open source collaboration",
  "Just saying hi",
];

const BUDGET_OPTIONS = [
  "Under $5k",
  "$5k – $20k",
  "$20k – $50k",
  "$50k – $100k",
  "$100k+",
  "Let's discuss",
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [cursorPos, setCursorPos]     = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [sentEmail, setSentEmail]     = useState("");

  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const inquiryRef = useRef<HTMLSelectElement>(null);
  const budgetRef  = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap";
    document.head.appendChild(link);

    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", onMove);

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  const ho = () => setCursorHover(true);
  const hu = () => setCursorHover(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentEmail(emailRef.current?.value ?? "your email");
    setSubmitted(true);
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

      {/* ── Two-pane layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-73px)] mt-[73px]">

        {/* ════ LEFT PANE ════ */}
        <div className="px-16 py-20 border-b md:border-b-0 md:border-r border-[#222] flex flex-col justify-between gap-12">
          <div>
            {/* Eyebrow */}
            <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-8">
              Get in touch
            </div>

            {/* Headline */}
            <h1 className="font-['DM_Serif_Display',serif] text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.02em] mb-8">
              Let's build<br />something<br />
              <em className="italic text-[#6a6a6a]">together.</em>
            </h1>

            {/* Subtext */}
            <p className="font-['JetBrains_Mono',monospace] text-[0.8rem] text-[#6a6a6a] leading-[2] max-w-[380px] mb-12">
              Whether you have a project in mind, want to discuss a role, or just want to chat about distributed systems at 2am —{" "}
              <strong className="text-[#f0ede6]">I'm happy to hear from you.</strong>
            </p>

            {/* Contact detail rows */}
            <div className="flex flex-col">
              {CONTACT_DETAILS.map((d, i) => (
                <div
                  key={i}
                  onMouseEnter={ho} onMouseLeave={hu}
                  className="group flex items-center justify-between py-5 border-b border-[#222] first:border-t first:border-[#222]"
                >
                  <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.15em] uppercase">
                    {d.label}
                  </span>
                  {d.isLink ? (
                    <a
                      href={d.href}
                      onMouseEnter={ho} onMouseLeave={hu}
                      className="font-['JetBrains_Mono',monospace] text-[0.8rem] text-[#f0ede6] no-underline transition-colors duration-200 flex items-center gap-2 hover:text-[#d4ff47]"
                    >
                      {d.value}
                      <span className="text-[0.9rem] opacity-0 -translate-x-1 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-['JetBrains_Mono',monospace] text-[0.8rem] text-[#f0ede6] flex items-center gap-2">
                      {d.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Availability badge */}
          <div className="p-6 border border-[#222] bg-[#141414]">
            <div className="font-['JetBrains_Mono',monospace] text-[0.62rem] text-[#6a6a6a] tracking-[0.15em] uppercase mb-3 flex items-center gap-[0.6rem]">
              {/* Pulsing dot — keyframes injected via style tag (only animation, no layout/color) */}
              <span className="w-[6px] h-[6px] rounded-full bg-[#d4ff47] [animation:pulse_2s_ease-in-out_infinite]" />
              Current availability
              {/* Pulse keyframes */}
              <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}`}</style>
            </div>
            <div className="font-['JetBrains_Mono',monospace] text-[0.78rem] text-[#f0ede6] leading-[1.7]">
              Open to <span className="text-[#d4ff47]">full-time roles</span> and select{" "}
              <span className="text-[#d4ff47]">freelance projects</span>.<br />
              Typical response time: <span className="text-[#d4ff47]">within 24 hours.</span>
            </div>
          </div>
        </div>

        {/* ════ RIGHT PANE ════ */}
        <div className="px-16 py-20 flex flex-col justify-center">

          {/* Form header — hidden after submit */}
          {!submitted && (
            <div className="mb-10">
              <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.18em] uppercase mb-2">
                Send a message
              </div>
              <p className="font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] leading-[1.8]">
                Tell me about your project, timeline, and budget.<br />
                I read every message personally.
              </p>
            </div>
          )}

          {/* ── Form ── */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Name */}
                <FormGroup label="Your name" required first onHo={ho} onHu={hu}
                  className="md:border-r border-[#222]">
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder="Jane Smith"
                    required
                    className="bg-transparent border-none outline-none text-[#f0ede6] font-['Syne',sans-serif] text-[1rem] font-normal pb-4 w-full placeholder:text-[#6a6a6a]"
                    onMouseEnter={ho} onMouseLeave={hu}
                  />
                </FormGroup>
                {/* Email */}
                <FormGroup label="Email address" required onHo={ho} onHu={hu}
                  className="md:pl-6">
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="jane@company.com"
                    required
                    className="bg-transparent border-none outline-none text-[#f0ede6] font-['Syne',sans-serif] text-[1rem] font-normal pb-4 w-full placeholder:text-[#6a6a6a]"
                    onMouseEnter={ho} onMouseLeave={hu}
                  />
                </FormGroup>
              </div>

              {/* Company */}
              <FormGroup label="Company / Organization" onHo={ho} onHu={hu}>
                <input
                  ref={companyRef}
                  type="text"
                  placeholder="Acme Inc. (optional)"
                  className="bg-transparent border-none outline-none text-[#f0ede6] font-['Syne',sans-serif] text-[1rem] font-normal pb-4 w-full placeholder:text-[#6a6a6a]"
                  onMouseEnter={ho} onMouseLeave={hu}
                />
              </FormGroup>

              {/* Inquiry type */}
              <FormGroup label="What are you looking for?" required onHo={ho} onHu={hu}>
                <select
                  ref={inquiryRef}
                  required
                  defaultValue=""
                  className="bg-transparent border-none outline-none text-[#6a6a6a] font-['Syne',sans-serif] text-[1rem] pb-4 w-full cursor-none appearance-none [&>option]:bg-[#0c0c0c] [&>option]:text-[#f0ede6]"
                  onMouseEnter={ho} onMouseLeave={hu}
                >
                  <option value="" disabled>Select a type</option>
                  {INQUIRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </FormGroup>

              {/* Budget */}
              <FormGroup label="Budget range (if project)" onHo={ho} onHu={hu}>
                <select
                  ref={budgetRef}
                  defaultValue=""
                  className="bg-transparent border-none outline-none text-[#6a6a6a] font-['Syne',sans-serif] text-[1rem] pb-4 w-full cursor-none appearance-none [&>option]:bg-[#0c0c0c] [&>option]:text-[#f0ede6]"
                  onMouseEnter={ho} onMouseLeave={hu}
                >
                  <option value="" disabled>Select a range (optional)</option>
                  {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </FormGroup>

              {/* Message */}
              <FormGroup label="Tell me about your project" required onHo={ho} onHu={hu}>
                <textarea
                  ref={messageRef}
                  placeholder="What are you building? What problems are you trying to solve? What's your timeline?"
                  required
                  className="bg-transparent border-none outline-none text-[#f0ede6] font-['Syne',sans-serif] text-[1rem] pb-4 w-full resize-none min-h-[120px] leading-[1.7] placeholder:text-[#6a6a6a]"
                  onMouseEnter={ho} onMouseLeave={hu}
                />
              </FormGroup>

              {/* Footer */}
              <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                <p className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#6a6a6a] leading-[1.7]">
                  I'll reply within 24 hours.<br />No spam, ever.
                </p>
                <button
                  type="submit"
                  onMouseEnter={ho} onMouseLeave={hu}
                  className="group inline-flex items-center gap-3 bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.8rem] tracking-[0.12em] uppercase px-8 py-[1.1rem] border-none cursor-none transition-[background-color,transform] duration-200 whitespace-nowrap hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]"
                >
                  Send message{" "}
                  <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </button>
              </div>
            </form>
          ) : (
            /* ── Success state ── */
            <div className="text-center p-12 border border-[#222]">
              <div className="font-['DM_Serif_Display',serif] text-[4rem] text-[#d4ff47] mb-4">✓</div>
              <div className="font-['DM_Serif_Display',serif] text-[2rem] mb-3">Message sent!</div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] leading-[1.9]">
                Thanks for reaching out. I'll get back to you at{" "}
                <strong className="text-[#f0ede6]">{sentEmail}</strong>{" "}
                within 24 hours.
              </div>
            </div>
          )}

          {/* ── Or divider ── */}
          <div className="flex items-center gap-4 my-8 font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.1em] uppercase">
            <span className="flex-1 h-px bg-[#222]" />
            or
            <span className="flex-1 h-px bg-[#222]" />
          </div>

          {/* ── Schedule a call ── */}
          <a
            href="#"
            onMouseEnter={ho} onMouseLeave={hu}
            className="flex items-center justify-between px-6 py-5 border border-[#222] no-underline text-[#f0ede6] transition-[background,border-color] duration-200 hover:bg-[#141414] hover:border-[#555]"
          >
            <div>
              <div className="font-bold text-[0.9rem] mb-[0.2rem]">Schedule a call</div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#6a6a6a]">
                Book a 30-min intro call on Calendly
              </div>
            </div>
            <span className="text-[#d4ff47] text-[1.1rem]">↗</span>
          </a>
        </div>
      </div>

      {/* Footer moved to layout */}
    </div>
  );
}

// ── FormGroup helper ──────────────────────────────────────────────────────────

interface FormGroupProps {
  label: string;
  required?: boolean;
  first?: boolean;
  className?: string;
  onHo: () => void;
  onHu: () => void;
  children: React.ReactNode;
}

function FormGroup({ label, required, first, className = "", onHo, onHu, children }: FormGroupProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseEnter={onHo}
      onMouseLeave={onHu}
      className={[
        "flex flex-col border-b border-[#222]",
        first ? "border-t border-[#222]" : "",
        focused ? "!border-[#555]" : "",
        className,
      ].join(" ")}
    >
      <label
        className={[
          "font-['JetBrains_Mono',monospace] text-[0.62rem] tracking-[0.15em] uppercase pt-4 pb-[0.3rem] transition-colors duration-200",
          focused ? "text-[#d4ff47]" : "text-[#6a6a6a]",
        ].join(" ")}
      >
        {label}
        {required && <span className="text-[#d4ff47]"> *</span>}
      </label>
      {children}
    </div>
  );
}