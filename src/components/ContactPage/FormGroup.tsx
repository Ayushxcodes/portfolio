"use client";
import React, { useState } from "react";

interface FormGroupProps {
  label: string;
  required?: boolean;
  first?: boolean;
  className?: string;
  onHo: () => void;
  onHu: () => void;
  children: React.ReactNode;
}

export default function FormGroup({ label, required, first, className = "", onHo, onHu, children }: FormGroupProps) {
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
