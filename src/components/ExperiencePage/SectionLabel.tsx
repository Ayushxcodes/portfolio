"use client";
import React from "react";

export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-12 flex items-center gap-4">
      <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase">{children}</span>
      <span className="flex-1 h-px bg-[#222]" />
    </div>
  );
}
