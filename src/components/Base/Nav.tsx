import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Nav({ scrolled, onHover, offHover }: { scrolled: boolean; onHover: () => void; offHover: () => void; }) {
  const LINKS: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
    { label: 'Resume', href: '/resume' },
  ];

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const pathname = usePathname();
  const router = useRouter();
  const [activeHref, setActiveHref] = useState(pathname || '/');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between
        px-4 md:px-12 py-4 md:py-6 transition-all duration-300
        ${scrolled
          ? 'border-b border-[#222] bg-[rgba(12,12,12,0.92)] backdrop-blur-md'
          : 'border-b border-transparent'}`}
    >
      <div className="font-mono text-[0.85rem] text-[#d4ff47] tracking-[0.08em]">AP.dev</div>

      <div className="hidden md:flex gap-8">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-mono text-[0.78rem] tracking-[0.12em] uppercase text-[#6a6a6a] no-underline font-bold transition-colors duration-200 hover:text-[#f0ede6]"
            onMouseEnter={onHover}
            onMouseLeave={offHover}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="md:hidden flex items-center">
        <button aria-label={open ? 'Close menu' : 'Open menu'} onClick={toggle} className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#111]">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="1" width="20" height="2" rx="1" fill="#d4ff47" />
            <rect y="6" width="20" height="2" rx="1" fill="#d4ff47" />
            <rect y="11" width="20" height="2" rx="1" fill="#d4ff47" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0c0c0c] border-b border-[#222] md:hidden z-50">
          <div className="flex flex-col items-center gap-4 py-4">
            {LINKS.map((link) => {
              const baseHref = link.href.split('#')[0] || '/';
              const isActive = pathname === baseHref || activeHref === baseHref;
              const handleClick = (e: React.MouseEvent) => {
                e.preventDefault();
                setActiveHref(baseHref);
                // show active animation briefly before navigating
                setTimeout(() => {
                  setOpen(false);
                  router.push(link.href);
                }, 320);
              };

              return (
                <button
                  key={link.label}
                  onClick={handleClick}
                  aria-pressed={isActive}
                  className={`font-mono text-[0.95rem] tracking-[0.12em] uppercase no-underline font-bold px-4 py-2 w-full text-center transform-gpu transition-colors transition-transform duration-300 ease-in-out ${isActive ? 'bg-[#d4ff47] text-black scale-105 shadow-[0_8px_24px_rgba(0,0,0,0.28)]' : 'text-[#f0ede6] hover:bg-[#111]'}`}
                  onMouseEnter={onHover}
                  onMouseLeave={offHover}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
