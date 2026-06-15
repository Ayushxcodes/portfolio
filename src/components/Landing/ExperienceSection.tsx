export default function ExperienceSection() {
  return (
    <section className="px-4 md:px-12 py-20 md:py-28 border-b border-[#222]" id="experience">
      <div className="section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">
        04 — Experience
      </div>
      <div className="fade-up w-full border border-[#222] bg-[#0e0e0e]/60 backdrop-blur-md rounded-lg p-8 md:p-12 relative overflow-hidden group">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none" />
        
        {/* Ambient glow in the corner */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#d4ff47]/10 rounded-full blur-[60px] transition-all duration-700 group-hover:bg-[#d4ff47]/20 group-hover:blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-[0.7rem] text-[#d4ff47] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4ff47] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4ff47]"></span>
              </span>
              <span>SYSTEM: TIMELINE_COMPILE_PENDING</span>
            </div>
            
            <h3 className="font-serif italic text-[#f0ede6] text-[2.5rem] md:text-[3.5rem] leading-none mb-4 tracking-tight">
              Coming <span className="text-[#6a6a6a]">Soon</span>
            </h3>
            
            <p className="font-mono text-[0.78rem] text-[#888] leading-relaxed max-w-[500px]">
              A detailed record of professional engineering roles, core technical contributions, and system architectures is currently being updated.
            </p>
          </div>

          <div className="font-mono text-[0.7rem] border border-[#222] bg-[#0c0c0c] p-4 rounded text-[#6a6a6a] self-start lg:self-center min-w-[240px] shadow-inner select-none">
            <div className="text-[#d4ff47] mb-1">$ cat info.json</div>
            <div className="pl-2">
              {"{"}
              <div className="pl-4">"status": <span className="text-[#f0ede6]">"updating"</span>,</div>
              <div className="pl-4">"location": <span className="text-[#f0ede6]">"indore_mp"</span>,</div>
              <div className="pl-4">"open_to_work": <span className="text-[#f0ede6]">true</span></div>
              {"}"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
