import Link from 'next/link';

const CONTACT_LINKS: { label: string; href: string; target?: string }[] = [
  { label: 'GitHub', href: 'https://github.com/Ayushxcodes' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-pandey-654486291' },
  { label: 'Twitter / X', href: 'https://x.com/crimsonking989' },
  { label: 'Resume ↓', href: '#' },
];

export default function Contact({ onHover, offHover }: { onHover: () => void; offHover: () => void; }) {
  return (
    <section className="px-12 py-28 text-center" id="contact">
      <div className="section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] justify-center uppercase mb-12 flex items-center gap-4">05 — Let's Talk</div>
      <h2 className="fade-up font-serif leading-[0.95] tracking-[-0.03em] mb-8 text-[clamp(3rem,8vw,8rem)]">Got a project<br />in <em className="italic text-[#d4ff47]">mind?</em></h2>
      <p className="fade-up font-mono text-[0.85rem] text-[#6a6a6a] tracking-[0.05em] max-w-[380px] mx-auto mb-12 leading-[1.9]">I'm always open to interesting problems,<br />collaborations, and the occasional coffee.</p>
      <a href="mailto:krish989pandey@gmail.com" className="fade-up font-serif block mb-10 pb-10 border-b border-[#222] no-underline text-[#f0ede6] tracking-[-0.01em] transition-colors duration-200 hover:text-[#d4ff47] text-[clamp(1.5rem,3.5vw,3rem)]" onMouseEnter={onHover} onMouseLeave={offHover}>krish989pandey@gmail.com</a>
      <div className="fade-up flex justify-center gap-4 flex-wrap">
        {CONTACT_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="font-mono text-[0.75rem] text-[#6a6a6a] no-underline tracking-[0.1em] uppercase border border-[#222] px-6 py-3 transition-all duration-200 hover:text-black hover:bg-[#d4ff47] hover:border-[#d4ff47]"
            onMouseEnter={onHover}
            onMouseLeave={offHover}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
