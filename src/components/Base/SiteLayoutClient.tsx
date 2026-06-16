"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

export default function SiteLayoutClient({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const noop = () => {};
  const isDashboard = pathname === "/dashboard";

  return (
    <div className="min-h-full flex flex-col">
      {!isDashboard && <Nav scrolled={scrolled} onHover={noop} offHover={noop} />}
      {children}
      {!isDashboard && <Footer />}
    </div>
  );
}
