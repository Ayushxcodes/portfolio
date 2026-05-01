"use client";
import React from "react";

interface CursorProps {
  cursorPos: { x: number; y: number };
  cursorHover: boolean;
}

export default function CustomCursor({ cursorPos, cursorHover }: CursorProps) {
  return (
    <div
      className={[
        "fixed pointer-events-none z-[9999] rounded-full bg-[#d4ff47] -translate-x-1/2 -translate-y-1/2 [mix-blend-mode:difference]",
        "[transition:transform_0.1s,width_0.2s,height_0.2s]",
        cursorHover ? "w-9 h-9" : "w-3 h-3",
      ].join(" ")}
      style={{ left: cursorPos.x, top: cursorPos.y }}
    />
  );
}
