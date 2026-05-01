import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Resume — Ayush Pandey',
};

export default function ResumePage() {
  return (
    <main className="min-h-screen px-12 pb-16 pt-32">
      <section className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase">06 — Résumé</div>
          <h1 className="font-serif text-[clamp(2.4rem,6vw,3.5rem)] leading-[0.95] mt-4 mb-2">Résumé</h1>
          <p className="font-mono text-[#6a6a6a]">View or download my résumé PDF.</p>
        </div>

        <div className="flex gap-4 mb-6">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#d4ff47] text-black font-sans font-bold text-[0.8rem] uppercase px-5 py-3 no-underline hover:bg-white transition">Open PDF ↗</a>
          <a href="/resume.pdf" download className="inline-flex items-center gap-3 border border-[#222] text-[#6a6a6a] font-mono px-5 py-3 no-underline hover:text-black hover:bg-[#d4ff47] transition">Download ↓</a>
          <Link href="/contact" className="inline-flex items-center gap-3 font-mono px-5 py-3 border border-[#222] text-[#6a6a6a] no-underline hover:text-[#f0ede6] transition">Contact</Link>
        </div>

        <div className="w-full h-[800px] bg-[#0a0a0a] border border-[#222] rounded-md overflow-hidden">
          <iframe src="/resume.pdf" title="Resume PDF" className="w-full h-full" />
        </div>

        <p className="mt-6 font-mono text-[#6a6a6a]">If the PDF doesn't load, you can <a href="/resume.pdf" className="text-[#d4ff47]">download it directly</a>.</p>
      </section>
    </main>
  );
}
