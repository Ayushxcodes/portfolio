export default function ExperienceSection({ experience }: { experience: any[] }) {
  return (
    <section className="px-12 py-28 border-b border-[#222]" id="experience">
      <div className="section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">04 — Experience</div>
      <div className="flex flex-col">
        {experience.map((exp) => (
          <div key={exp.company} className="fade-up grid gap-12 py-10 border-b border-[#222] grid-cols-[200px_1fr]">
            <div>
              <div className="font-mono text-[0.7rem] text-[#6a6a6a] tracking-[0.1em] mb-2">{exp.period}</div>
              <div className="font-bold text-[0.85rem] tracking-[0.05em] text-[#d4ff47]">{exp.company}</div>
            </div>
            <div>
              <div className="font-serif text-[1.6rem] mb-3">{exp.role}</div>
              <div className="font-mono text-[0.75rem] text-[#6a6a6a] leading-[2] max-w-[520px]">{exp.desc}</div>
              {exp.achievements && (
                <div className="mt-4 font-mono text-[0.75rem] text-[#6a6a6a] leading-[1.8]">
                  {exp.achievements.map((a: string, i: number) => (
                    <div key={i} className="mb-2">→ {a}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
