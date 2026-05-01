"use client";
import { useState, useEffect, useRef } from "react";
import CustomCursor from "../../components/ContactPage/CustomCursor";
import LeftPane from "../../components/ContactPage/LeftPane";
import RightPane from "../../components/ContactPage/RightPane";
import { CONTACT_DETAILS, INQUIRY_OPTIONS, BUDGET_OPTIONS } from "../../components/ContactPage/data";

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

      <CustomCursor cursorPos={cursorPos} cursorHover={cursorHover} />

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-73px)] mt-[73px]">
        <LeftPane onHover={ho} onLeave={hu} />
        <RightPane
          onHover={ho}
          onLeave={hu}
          nameRef={nameRef}
          emailRef={emailRef}
          companyRef={companyRef}
          inquiryRef={inquiryRef}
          budgetRef={budgetRef}
          messageRef={messageRef}
          submitted={submitted}
          sentEmail={sentEmail}
          handleSubmit={handleSubmit}
        />
      </div>

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