"use client";
import React from "react";
import FormGroup from "./FormGroup";
import { INQUIRY_OPTIONS, BUDGET_OPTIONS } from "./data";

interface RightPaneProps {
  onHover: () => void;
  onLeave: () => void;
  nameRef: React.RefObject<HTMLInputElement | null>;
  emailRef: React.RefObject<HTMLInputElement | null>;
  companyRef: React.RefObject<HTMLInputElement | null>;
  inquiryRef: React.RefObject<HTMLSelectElement | null>;
  budgetRef: React.RefObject<HTMLSelectElement | null>;
  messageRef: React.RefObject<HTMLTextAreaElement | null>;
  submitted: boolean;
  sentEmail: string;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RightPane({ onHover, onLeave, nameRef, emailRef, companyRef, inquiryRef, budgetRef, messageRef, submitted, sentEmail, handleSubmit }: RightPaneProps) {
  return (
    <div className="px-16 py-20 flex flex-col justify-center">
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

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <FormGroup label="Your name" required first onHo={onHover} onHu={onLeave} className="md:border-r border-[#222]">
              <input
                ref={nameRef}
                type="text"
                placeholder="Jane Smith"
                required
                className="bg-transparent border-none outline-none text-[#f0ede6] font-['Syne',sans-serif] text-[1rem] font-normal pb-4 w-full placeholder:text-[#6a6a6a]"
                onMouseEnter={onHover} onMouseLeave={onLeave}
              />
            </FormGroup>

            <FormGroup label="Email address" required onHo={onHover} onHu={onLeave} className="md:pl-6">
              <input
                ref={emailRef}
                type="email"
                placeholder="jane@company.com"
                required
                className="bg-transparent border-none outline-none text-[#f0ede6] font-['Syne',sans-serif] text-[1rem] font-normal pb-4 w-full placeholder:text-[#6a6a6a]"
                onMouseEnter={onHover} onMouseLeave={onLeave}
              />
            </FormGroup>
          </div>

          <FormGroup label="Company / Organization" onHo={onHover} onHu={onLeave}>
            <input
              ref={companyRef}
              type="text"
              placeholder="Acme Inc. (optional)"
              className="bg-transparent border-none outline-none text-[#f0ede6] font-['Syne',sans-serif] text-[1rem] font-normal pb-4 w-full placeholder:text-[#6a6a6a]"
              onMouseEnter={onHover} onMouseLeave={onLeave}
            />
          </FormGroup>

          <FormGroup label="What are you looking for?" required onHo={onHover} onHu={onLeave}>
            <select
              ref={inquiryRef}
              required
              defaultValue=""
              className="bg-transparent border-none outline-none text-[#6a6a6a] font-['Syne',sans-serif] text-[1rem] pb-4 w-full cursor-none appearance-none [&>option]:bg-[#0c0c0c] [&>option]:text-[#f0ede6]"
              onMouseEnter={onHover} onMouseLeave={onLeave}
            >
              <option value="" disabled>Select a type</option>
              {INQUIRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </FormGroup>

          <FormGroup label="Budget range (if project)" onHo={onHover} onHu={onLeave}>
            <select
              ref={budgetRef}
              defaultValue=""
              className="bg-transparent border-none outline-none text-[#6a6a6a] font-['Syne',sans-serif] text-[1rem] pb-4 w-full cursor-none appearance-none [&>option]:bg-[#0c0c0c] [&>option]:text-[#f0ede6]"
              onMouseEnter={onHover} onMouseLeave={onLeave}
            >
              <option value="" disabled>Select a range (optional)</option>
              {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </FormGroup>

          <FormGroup label="Tell me about your project" required onHo={onHover} onHu={onLeave}>
            <textarea
              ref={messageRef}
              placeholder="What are you building? What problems are you trying to solve? What's your timeline?"
              required
              className="bg-transparent border-none outline-none text-[#f0ede6] font-['Syne',sans-serif] text-[1rem] pb-4 w-full resize-none min-h-[120px] leading-[1.7] placeholder:text-[#6a6a6a]"
              onMouseEnter={onHover} onMouseLeave={onLeave}
            />
          </FormGroup>

          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <p className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#6a6a6a] leading-[1.7]">
              I'll reply within 24 hours.<br />No spam, ever.
            </p>
            <button
              type="submit"
              onMouseEnter={onHover} onMouseLeave={onLeave}
              className="group inline-flex items-center gap-3 bg-[#d4ff47] text-black font-['Syne',sans-serif] font-bold text-[0.8rem] tracking-[0.12em] uppercase px-8 py-[1.1rem] border-none cursor-none transition-[background-color,transform] duration-200 whitespace-nowrap hover:bg-white hover:-translate-x-[3px] hover:-translate-y-[3px]"
            >
              Send message <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center p-12 border border-[#222]">
          <div className="font-['DM_Serif_Display',serif] text-[4rem] text-[#d4ff47] mb-4">✓</div>
          <div className="font-['DM_Serif_Display',serif] text-[2rem] mb-3">Message sent!</div>
          <div className="font-['JetBrains_Mono',monospace] text-[0.75rem] text-[#6a6a6a] leading-[1.9]">
            Thanks for reaching out. I'll get back to you at <strong className="text-[#f0ede6]">{sentEmail}</strong> within 24 hours.
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 my-8 font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#6a6a6a] tracking-[0.1em] uppercase">
        <span className="flex-1 h-px bg-[#222]" />
        or
        <span className="flex-1 h-px bg-[#222]" />
      </div>

      <a
        href="#"
        onMouseEnter={onHover} onMouseLeave={onLeave}
        className="flex items-center justify-between px-6 py-5 border border-[#222] no-underline text-[#f0ede6] transition-[background,border-color] duration-200 hover:bg-[#141414] hover:border-[#555]"
      >
        <div>
          <div className="font-bold text-[0.9rem] mb-[0.2rem]">Schedule a call</div>
          <div className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#6a6a6a]">Book a 30-min intro call on Calendly</div>
        </div>
        <span className="text-[#d4ff47] text-[1.1rem]">↗</span>
      </a>
    </div>
  );
}
