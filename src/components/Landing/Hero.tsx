import React from 'react';
function TermBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#111] border-b border-[#1e1e1e]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shrink-0" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shrink-0" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] shrink-0" />
      <span className="flex-1 text-center text-[#444] text-[0.62rem] tracking-[0.08em]">{title}</span>
    </div>
  );
}

export default function Hero({ onHover, offHover, typedCmd, typedGit, gitCursorOn }: { onHover: () => void; offHover: () => void; typedCmd: string; typedGit: string; gitCursorOn: boolean; }) {
  const termShadow = '0 24px 56px rgba(0,0,0,0.7), 0 0 0 1px #1a1a1a';

  return (
    <section className="min-h-screen flex flex-col justify-end px-4 md:px-12 pb-16 relative border-b border-[#222]">
      <div className="font-mono text-[0.75rem] text-[#d4ff47] tracking-[0.15em] border border-[#d4ff47] px-3 py-[0.35rem] w-fit mb-10">Available for hire — 2026</div>
      <h1 className="font-serif leading-[0.9] tracking-[-0.02em] mb-4 text-[clamp(4.5rem,11vw,11rem)]">Ayush<br /><em className="italic text-[#d4ff47]">Pandey</em></h1>
      <p className="font-mono text-[0.9rem] text-[#6a6a6a] tracking-[0.05em] max-w-full md:max-w-[420px] leading-[1.8] mb-12">Full Stack Engineer crafting<br /><span className="text-[#d4ff47]">scalable systems</span>{' & '}<span className="text-[#d4ff47]">delightful interfaces</span><br/>that people actually want to use.</p>

      <div className="flex items-end justify-between flex-wrap gap-4">
        <a href="#work" className="inline-flex items-center gap-3 bg-[#d4ff47] text-black font-sans font-bold text-[0.8rem] tracking-[0.12em] uppercase px-8 py-4 no-underline transition-all duration-200 hover:bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 group" onMouseEnter={onHover} onMouseLeave={offHover}>
          View my work <span className="text-[1.1rem] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </a>
        <div className="hero-scroll-el font-mono text-[0.7rem] text-[#6a6a6a] tracking-[0.1em] flex items-center gap-3">Scroll to explore</div>
      </div>

      <div aria-hidden className="absolute hidden lg:block pointer-events-none top-[88px] left-12 right-12 bottom-[42%] min-h-[260px]">
        <div className="animate-float-1 absolute w-[360px] top-40 right-40 z-[3] bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg overflow-hidden font-mono text-[0.7rem] leading-[1.75]" style={{ boxShadow: termShadow }}>
          <TermBar title="server.ts — nexus-api" />
          <div className="p-[14px_16px] text-[#555]">
            <div className="block"><span className="text-[#c678dd]">import</span> <span className="text-[#abb2bf]">{'{ createServer }'}</span> <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">&apos;./core&apos;</span><span className="text-[#abb2bf]">;</span></div>
            <div className="block"><span className="text-[#c678dd]">import</span> <span className="text-[#abb2bf]">{'{ authMiddleware, rateLimiter }'}</span> <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">&apos;./middleware&apos;</span><span className="text-[#abb2bf]">;</span></div>
            <div className="block">&nbsp;</div>
            <div className="block"><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">app</span> <span className="text-[#abb2bf]">{`= createServer({`}</span></div>
            <div className="block"><span className="text-[#abb2bf]">{'  port:'}</span> <span className="text-[#e5c07b]">8080</span><span className="text-[#abb2bf]">,</span></div>
            <div className="block"><span className="text-[#abb2bf]">{'  middleware: ['}</span><span className="text-[#61afef]">authMiddleware</span><span className="text-[#abb2bf]">, </span><span className="text-[#61afef]">rateLimiter</span><span className="text-[#abb2bf]">],</span></div>
            <div className="block"><span className="text-[#abb2bf]">{'  db: '}</span><span className="text-[#98c379]">&apos;postgresql://localhost/nexus&apos;</span><span className="text-[#abb2bf]">,</span></div>
            <div className="block"><span className="text-[#abb2bf]">{'});'}</span></div>
            <div className="block">&nbsp;</div>
            <div className="block"><span className="text-[#61afef]">app</span><span className="text-[#abb2bf]">.</span><span className="text-[#d4ff47]">listen</span><span className="text-[#abb2bf]">{`(() => {`}</span></div>
            <div className="block"><span className="text-[#abb2bf]">  console.</span><span className="text-[#d4ff47]">log</span><span className="text-[#abb2bf]">(&apos;Server ready on :8080&apos;);</span></div>
            <div className="block">{'});'}</div>
            <div className="block">&nbsp;</div>
            <div className="block"><span className="text-[#d4ff47]">❯</span> <span className="text-[#abb2bf]">{typedCmd}</span> <span className="animate-cursor-blink inline-block w-[6px] h-[0.8em] bg-[#d4ff47] align-middle ml-px" /></div>
          </div>
        </div>

        <div className="animate-float-2 absolute w-[285px] top-5 right-150 z-[2] opacity-[0.88] bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg overflow-hidden font-mono text-[0.7rem] leading-[1.75]" style={{ boxShadow: termShadow }}>
          <TermBar title="git log — main" />
          <div className="p-[14px_16px] text-[#555]">
            <div className="block"><span className="text-[#e5c07b]">commit</span> <span className="text-[#d4ff47]">a3f9c12</span></div>
            <div className="block"><span className="text-[#444]">Author: Ayush Pandey</span></div>
            <div className="block"><span className="text-[#98c379]">✓ feat: add rate limiter middleware</span></div>
            <div className="block">&nbsp;</div>
            <div className="block"><span className="text-[#e5c07b]">commit</span> <span className="text-[#d4ff47]">7b2e841</span></div>
            <div className="block"><span className="text-[#444]">Author: Ayush Pandey</span></div>
            <div className="block"><span className="text-[#98c379]">✓ refactor: db connection pooling</span></div>
            <div className="block">&nbsp;</div>
            <div className="block"><span className="text-[#e5c07b]">commit</span> <span className="text-[#d4ff47]">cc104fa</span></div>
            <div className="block"><span className="text-[#98c379]">✓ fix: resolve N+1 query in /users</span></div>
            <div className="block"><span className="text-[#d4ff47]">❯</span> <span className="text-[#abb2bf]">{typedGit}</span> {gitCursorOn && (<span className="animate-cursor-blink inline-block w-[6px] h-[0.8em] bg-[#d4ff47] align-middle ml-px" />)}</div>
          </div>
        </div>

        <div className="animate-float-3 absolute w-[250px] bottom-0 z-[2] opacity-75 left-180 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg overflow-hidden font-mono text-[0.7rem] leading-[1.75]" style={{ boxShadow: termShadow }}>
          <TermBar title="vitest" />
          <div className="p-[14px_16px] text-[#555]"><div className="block"><span className="text-[#444]">running tests...</span></div><div className="block">&nbsp;</div><div className="block"><span className="text-[#98c379]">✓</span> <span className="text-[#abb2bf]">auth middleware</span> <span className="text-[#444]">12ms</span></div><div className="block"><span className="text-[#98c379]">✓</span> <span className="text-[#abb2bf]">rate limiter</span> <span className="text-[#444]">8ms</span></div><div className="block"><span className="text-[#98c379]">✓</span> <span className="text-[#abb2bf]">db pool connect</span> <span className="text-[#444]">31ms</span></div><div className="block"><span className="text-[#98c379]">✓</span> <span className="text-[#abb2bf]">POST /api/users</span> <span className="text-[#444]">5ms</span></div><div className="block">&nbsp;</div><div className="block"><span className="text-[#d4ff47]">Tests</span> <span className="text-[#abb2bf]">4 passed</span> <span className="text-[#444]">(4)</span></div></div>
        </div>
      </div>
    </section>
  );
}
