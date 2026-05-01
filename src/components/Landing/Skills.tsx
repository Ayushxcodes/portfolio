export default function Skills({ skills }: { skills: any[] }) {
  return (
    <section className="px-12 pt-20 border-b border-[#222]" id="skills">
      <div className="section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">02 — Skills</div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {skills.map((skill, idx) => (
          <div key={skill.name} className={`skill-card-el px-8 py-10 border-b border-[#222] transition-colors duration-200 hover:bg-[#141414] ${idx < 3 ? 'border-r border-[#222]' : ''} ${idx < 2 ? 'max-md:border-r' : ''} ${idx === 1 ? 'max-md:border-r-0' : ''} ${idx === 3 ? 'border-r-0' : ''}`}>
            <div className="font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.1em] mb-4">{skill.icon}</div>
            <div className="font-sans text-[1.1rem] font-bold mb-2">{skill.name}</div>
            <ul className="font-mono text-[0.72rem] text-[#6a6a6a] leading-[2] list-none">
              {skill.items.map((item: string) => (<li key={item}>{item}</li>))}
            </ul>
            <div className="mt-5 h-[2px] bg-[#222] overflow-hidden">
              <div className="skill-bar-fill" style={{ width: `${skill.bar}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
