"use client";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function SiteLayoutClient({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const noop = () => {};

  return (
    <div className="min-h-full flex flex-col">
      <Nav scrolled={scrolled} onHover={noop} offHover={noop} />
      {children}
      <Footer />
    </div>
  );
}
