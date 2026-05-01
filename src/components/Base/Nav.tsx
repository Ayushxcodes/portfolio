import Link from "next/link";

export default function Nav({ scrolled, onHover, offHover }: { scrolled: boolean; onHover: () => void; offHover: () => void; }) {
  const LINKS: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'Skills', href: '/#skills' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
    { label: 'Resume', href: '/resume' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between
        px-12 py-6 transition-all duration-300
        ${scrolled
          ? 'border-b border-[#222] bg-[rgba(12,12,12,0.92)] backdrop-blur-md'
          : 'border-b border-transparent'}`}
    >
      <div className="font-mono text-[0.85rem] text-[#d4ff47] tracking-[0.08em]">AP.dev</div>
      <div className="hidden md:flex gap-10">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-mono text-[0.8rem] tracking-[0.12em] uppercase text-[#6a6a6a] no-underline font-bold transition-colors duration-200 hover:text-[#f0ede6]"
            onMouseEnter={onHover}
            onMouseLeave={offHover}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
