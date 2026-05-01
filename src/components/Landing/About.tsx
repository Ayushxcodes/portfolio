export default function About() {
  return (
    <section className="px-4 md:px-12 py-28 border-b border-[#222]" id="about">
      <div className="section-label-el font-mono text-[0.7rem] text-[#d4ff47] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">01 — About</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <h2 className="fade-up font-serif leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,5vw,4.5rem)]">
          I build things<br />for the<br />
          <em className="italic text-[#6a6a6a]">open web.</em>
        </h2>
        <div className="fade-up pt-4 space-y-6">
          <p className="text-[1.05rem] leading-[1.9] text-[#bbb]">
            I'm a full-stack engineer with{' '}
            <strong className="text-[#f0ede6] font-bold">6 years of experience</strong>{' '}
            building high-performance web applications. I care deeply about clean architecture,
            developer experience, and shipping products that are both beautiful and fast.
          </p>
          <p className="text-[1.05rem] leading-[1.9] text-[#bbb]">
            Currently focused on{' '}
            <strong className="text-[#f0ede6] font-bold">distributed systems</strong>{' '}
            and real-time applications. I love working across the entire stack — from designing
            robust APIs to crafting pixel-perfect UIs.
          </p>
          <p className="text-[1.05rem] leading-[1.9] text-[#bbb]">
            When I'm not coding, I write about web performance, contribute to open source,
            and occasionally break things in Kubernetes.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['System Design', 'API Architecture', 'Performance Optimization', 'CI/CD', 'Open Source', 'Technical Writing'].map((tag) => (
              <span key={tag} className="font-mono text-[0.7rem] border border-[#222] text-[#6a6a6a] px-[0.7rem] py-[0.3rem] tracking-[0.08em]">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
