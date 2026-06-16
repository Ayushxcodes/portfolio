"use client";
import { useState, useEffect, useRef } from "react";
import CustomCursor from "../../components/ProjectPage/CustomCursor";
import Header from "../../components/ProjectPage/Header";
import FilterBar from "../../components/ProjectPage/FilterBar";
import FeaturedProject from "../../components/ProjectPage/FeaturedProject";
import ProjectsGrid from "../../components/ProjectPage/ProjectsGrid";
import OSSStrip from "../../components/ProjectPage/OSSStrip";
import portfolioDataRaw from "../../data/portfolio-data.json";

export default function WorkPage() {
  const [data, setData] = useState(portfolioDataRaw);
  const [cursorPos, setCursorPos]     = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const fadeRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Fetch latest portfolio data
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((dynData) => {
        if (dynData && !dynData.error) {
          setData(dynData);
        }
      })
      .catch((err) => console.error("Error fetching portfolio data:", err));

    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap";
    document.head.appendChild(link);

    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", onMove);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${(i % 3) * 0.1}s`;
        obs.observe(el);
      }
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (document.head.contains(link)) document.head.removeChild(link);
      obs.disconnect();
    };
  }, []);

  const ho = () => setCursorHover(true);
  const hu = () => setCursorHover(false);

  const assignRef = (i: number, el: HTMLAnchorElement | null) => { fadeRefs.current[i] = el; };

  // Parse SVG strings to React elements for grid rendering
  const projects = data.projectPage.projects.map((p) => ({
    ...p,
    svg: (
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: p.svg }}
      />
    ),
  }));

  // Filter projects by category
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.cat.toLowerCase().includes(activeFilter.toLowerCase()) || p.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase()));

  return (
    <div className="bg-[#0c0c0c] text-[#f0ede6] font-['Syne',sans-serif] cursor-none overflow-x-hidden min-h-screen scroll-smooth selection:bg-[#d4ff47] selection:text-black">

      <CustomCursor cursorPos={cursorPos} cursorHover={cursorHover} />

      <Header onHover={ho} onLeave={hu} />

      <FilterBar filters={data.projectPage.filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} onHover={ho} onLeave={hu} />

      <FeaturedProject 
        stats={data.projectPage.featuredStats} 
        tags={data.projectPage.featuredTags} 
        details={data.projectPage.featuredProjectDetails}
        onHover={ho} 
        onLeave={hu} 
      />

      <ProjectsGrid projects={filteredProjects} assignRef={assignRef} onHover={ho} onLeave={hu} />

      <OSSStrip oss={data.projectPage.oss} onHover={ho} onLeave={hu} />

    </div>
  );
}