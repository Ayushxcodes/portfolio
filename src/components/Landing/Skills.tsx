export interface SkillItem {
  icon: string;
  name: string;
  items: string[];
  bar: number;
}

export default function Skills({ skills }: { skills: SkillItem[] }) {
  return (
    <section className="px-4 md:px-12 pt-20 border-b border-[#222]" id="skills">
      <div className="section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">02 — Skills</div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {skills.map((skill) => (
          <div key={skill.name} className={`skill-card-el px-4 md:px-8 py-8 md:py-10 border-b md:border-b-0 border-[#222] md:border-r md:last:border-r-0 transition-colors duration-200 hover:bg-[#141414]`}>
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
