"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("landing"); // landing, about, experience, projects, contact, json
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    // Load custom fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&family=Outfit:wght@400;600;800&display=swap";
    document.head.appendChild(link);

    // Fetch initial portfolio data
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((d) => {
        if (d && !d.error) {
          setData(d);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error loading portfolio data:", e);
        setLoading(false);
      });

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showToast("All changes written to disk successfully!", "success");
      } else {
        showToast(result.error || "Failed to save portfolio data.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error: failed to communicate with route handler.", "error");
    } finally {
      setSaving(false);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const updateNestedState = (path: (string | number)[], value: any) => {
    setData((prev: any) => {
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : typeof current[key] === "object"
          ? { ...current[key] }
          : current[key];
        current = current[key];
      }
      current[path[path.length - 1]] = value;
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] text-[#f0ede6] flex flex-col items-center justify-center font-['JetBrains_Mono',monospace]">
        <div className="w-12 h-12 border-2 border-[#d4ff47] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs tracking-[0.2em] text-[#6a6a6a] uppercase">Initializing secure dashboard console...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] text-[#f0ede6] flex flex-col items-center justify-center font-['JetBrains_Mono',monospace] p-6 text-center">
        <p className="text-[#ff5f57] mb-2 font-bold">CRITICAL CONFIGURATION ERROR</p>
        <p className="text-xs text-[#6a6a6a] max-w-md">Could not read default portfolio structure. Check if src/data/portfolio-data.json exists on disk.</p>
      </div>
    );
  }

  const sidebarItems = [
    { id: "landing", label: "Landing Page" },
    { id: "about", label: "About Page" },
    { id: "experience", label: "Experience Page" },
    { id: "projects", label: "Projects Page" },
    { id: "contact", label: "Contact Page" },
    { id: "json", label: "Raw JSON Database" },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0ede6] font-['Outfit',sans-serif] flex flex-col selection:bg-[#d4ff47] selection:text-black">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[10000] px-6 py-4 rounded-lg border backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-0 animate-fade-in ${
          toast.type === "success" 
            ? "bg-black/80 border-[#d4ff47]/40 text-[#f0ede6]" 
            : "bg-black/80 border-[#ff5f57]/40 text-[#ff5f57]"
        }`}>
          <div className={`w-2 h-2 rounded-full ${toast.type === "success" ? "bg-[#d4ff47]" : "bg-[#ff5f57]"} animate-pulse`} />
          <span className="font-['JetBrains_Mono',monospace] text-xs tracking-wider uppercase">{toast.message}</span>
        </div>
      )}

      {/* Main Admin Header */}
      <header className="border-b border-[#222] bg-[#0c0c0c]/80 backdrop-blur-md px-8 py-5 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[1.2rem] font-bold tracking-[0.1em] uppercase font-['Syne',sans-serif]">
            PORTFOLIO <span className="text-[#d4ff47]">CONSOLE</span>
          </div>
          <div className="bg-[#161616] border border-[#222] rounded px-2 py-0.5 text-[0.62rem] font-['JetBrains_Mono',monospace] text-[#6a6a6a] uppercase tracking-wider">
            v1.0.0
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="px-4 py-2 border border-[#222] rounded text-xs font-['JetBrains_Mono',monospace] tracking-wider text-[#6a6a6a] hover:text-[#f0ede6] hover:border-[#444] transition-colors"
          >
            PREVIEW SITE
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#d4ff47] text-black px-6 py-2 rounded text-xs font-bold tracking-wider font-['JetBrains_Mono',monospace] uppercase hover:bg-[#c2eb3b] active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,255,71,0.15)] disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" />
                WRITING...
              </>
            ) : (
              "SAVE CHANGES"
            )}
          </button>
        </div>
      </header>

      {/* Sidebar Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sticky left sidebar */}
        <aside className="w-full md:w-[280px] border-r border-[#222] shrink-0 p-6 md:sticky md:top-[77px] h-fit md:h-[calc(100vh-77px)] overflow-y-auto">
          <div className="text-[0.68rem] font-['JetBrains_Mono',monospace] text-[#6a6a6a] tracking-[0.2em] uppercase mb-4 px-3">
            SECTIONS
          </div>
          <nav className="flex flex-col gap-1.5">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded font-['JetBrains_Mono',monospace] text-xs tracking-wider transition-all border ${
                  activeTab === item.id
                    ? "bg-[#161616] text-[#d4ff47] border-[#d4ff47]/20 shadow-[inset_0_0_12px_rgba(212,255,71,0.03)]"
                    : "text-[#6a6a6a] border-transparent hover:text-[#f0ede6] hover:bg-[#111]"
                }`}
              >
                {activeTab === item.id && <span className="mr-2">⚡</span>}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-[#111] border border-[#222] rounded">
            <h4 className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#888] uppercase mb-2">HOT TIP</h4>
            <p className="text-[0.65rem] leading-[1.6] text-[#6a6a6a]">
              Use standard Markdown bold syntax <code className="text-[#d4ff47]">**your text**</code> to highlight items in lists, quotes, and descriptions.
            </p>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-8 md:p-12 max-w-4xl overflow-y-auto">
          {activeTab === "landing" && (
            <div className="space-y-12">
              <div>
                <h2 className="font-['DM_Serif_Display',serif] text-3xl mb-2">Landing Page Settings</h2>
                <p className="text-[#6a6a6a] text-xs font-['JetBrains_Mono',monospace]">Manage main page content, skills lists, features, and terminal code lines.</p>
              </div>

              {/* Ticker Items */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">TICKER ITEMS (MARQUEE)</h3>
                  <button 
                    onClick={() => updateNestedState(["landing", "tickerItems"], [...data.landing.tickerItems, { label: "New Skill", highlight: false }])}
                    className="text-xs bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1 rounded transition-all"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.landing.tickerItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-[#131313] border border-[#222] p-3 rounded">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updateNestedState(["landing", "tickerItems", idx, "label"], e.target.value)}
                        className="flex-1 bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                      />
                      <label className="flex items-center gap-1.5 cursor-pointer select-none text-[0.7rem] font-['JetBrains_Mono',monospace]">
                        <input
                          type="checkbox"
                          checked={item.highlight}
                          onChange={(e) => updateNestedState(["landing", "tickerItems", idx, "highlight"], e.target.checked)}
                          className="accent-[#d4ff47] cursor-pointer"
                        />
                        Highlight
                      </label>
                      <button
                        onClick={() => {
                          const updated = [...data.landing.tickerItems];
                          updated.splice(idx, 1);
                          updateNestedState(["landing", "tickerItems"], updated);
                        }}
                        className="text-[#ff5f57] hover:bg-[#ff5f57]/10 p-1 rounded transition-colors text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Typewriter commands */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">TERMINAL TYPEWRITER COMMANDS</h3>
                  <button 
                    onClick={() => updateNestedState(["landing", "cmds"], [...data.landing.cmds, "new command"])}
                    className="text-xs bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1 rounded transition-all"
                  >
                    + Add Command
                  </button>
                </div>
                <div className="space-y-3">
                  {data.landing.cmds.map((cmd: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="font-['JetBrains_Mono',monospace] text-[#6a6a6a] text-xs w-6">{idx + 1}.</span>
                      <input
                        type="text"
                        value={cmd}
                        onChange={(e) => {
                          const updated = [...data.landing.cmds];
                          updated[idx] = e.target.value;
                          updateNestedState(["landing", "cmds"], updated);
                        }}
                        className="flex-1 bg-black border border-[#222] px-3 py-2 text-xs font-['JetBrains_Mono',monospace] text-[#d4ff47] rounded focus:border-[#d4ff47] outline-none"
                      />
                      <button
                        onClick={() => {
                          const updated = [...data.landing.cmds];
                          updated.splice(idx, 1);
                          updateNestedState(["landing", "cmds"], updated);
                        }}
                        className="text-[#ff5f57] hover:bg-[#ff5f57]/10 px-2 py-2 rounded transition-colors text-xs font-bold"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Cards */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-6">
                <div className="border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">LANDING PAGE SKILL CATEGORIES</h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {data.landing.skills.map((skill: any, idx: number) => (
                    <div key={idx} className="bg-[#131313] border border-[#222] p-5 rounded-lg space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">ICON</label>
                          <input
                            type="text"
                            value={skill.icon}
                            onChange={(e) => updateNestedState(["landing", "skills", idx, "icon"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">CATEGORY NAME</label>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateNestedState(["landing", "skills", idx, "name"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">BAR STRENGTH (0-100)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.bar}
                            onChange={(e) => updateNestedState(["landing", "skills", idx, "bar"], parseInt(e.target.value) || 0)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">ITEMS (COMMA SEPARATED)</label>
                        <input
                          type="text"
                          value={skill.items.join(", ")}
                          onChange={(e) => updateNestedState(["landing", "skills", idx, "items"], e.target.value.split(",").map(t => t.trim()))}
                          className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-12">
              <div>
                <h2 className="font-['DM_Serif_Display',serif] text-3xl mb-2">About Page Settings</h2>
                <p className="text-[#6a6a6a] text-xs font-['JetBrains_Mono',monospace]">Configure work methodology story, beliefs, personal settings and tool stacks.</p>
              </div>

              {/* Biography / Story Editor */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-6">
                <div className="border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">BIOGRAPHY & WORK METHODOLOGY</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1.5">SIDE QUOTE</label>
                    <textarea
                      rows={2}
                      value={data.aboutPage.story.quote}
                      onChange={(e) => updateNestedState(["aboutPage", "story", "quote"], e.target.value)}
                      className="w-full bg-black border border-[#222] px-4 py-3 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                    />
                  </div>

                  {data.aboutPage.story.sections.map((section: any, sIdx: number) => (
                    <div key={section.id} className="bg-[#131313] border border-[#222] p-5 rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#d4ff47] uppercase tracking-wider">SECTION: {section.title}</span>
                      </div>

                      <div className="space-y-3">
                        {section.paragraphs.map((para: string, pIdx: number) => (
                          <div key={pIdx} className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[0.62rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace]">PARAGRAPH {pIdx + 1}</span>
                              <button
                                onClick={() => {
                                  const updatedParas = [...section.paragraphs];
                                  updatedParas.splice(pIdx, 1);
                                  updateNestedState(["aboutPage", "story", "sections", sIdx, "paragraphs"], updatedParas);
                                }}
                                className="text-[0.65rem] text-[#ff5f57] hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                            <textarea
                              rows={3}
                              value={para}
                              onChange={(e) => {
                                const updatedParas = [...section.paragraphs];
                                updatedParas[pIdx] = e.target.value;
                                updateNestedState(["aboutPage", "story", "sections", sIdx, "paragraphs"], updatedParas);
                              }}
                              className="w-full bg-black border border-[#222] px-3 py-2 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none leading-relaxed"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => updateNestedState(["aboutPage", "story", "sections", sIdx, "paragraphs"], [...section.paragraphs, "New paragraph content..."])}
                          className="text-xs bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1.5 rounded transition-all"
                        >
                          + Add Paragraph
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Values */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">CORE VALUES</h3>
                  <button 
                    onClick={() => updateNestedState(["aboutPage", "values"], [...data.aboutPage.values, { num: "05", title: "New Value", desc: "Description here..." }])}
                    className="text-xs bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1 rounded transition-all"
                  >
                    + Add Value
                  </button>
                </div>
                <div className="space-y-4">
                  {data.aboutPage.values.map((val: any, idx: number) => (
                    <div key={idx} className="bg-[#131313] border border-[#222] p-4 rounded space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={val.num}
                          placeholder="01"
                          onChange={(e) => updateNestedState(["aboutPage", "values", idx, "num"], e.target.value)}
                          className="w-12 bg-black border border-[#222] px-2 py-1.5 text-center text-xs text-[#d4ff47] font-['JetBrains_Mono',monospace] rounded focus:border-[#d4ff47] outline-none"
                        />
                        <input
                          type="text"
                          value={val.title}
                          placeholder="Title"
                          onChange={(e) => updateNestedState(["aboutPage", "values", idx, "title"], e.target.value)}
                          className="flex-1 bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] font-bold rounded focus:border-[#d4ff47] outline-none"
                        />
                        <button
                          onClick={() => {
                            const updated = [...data.aboutPage.values];
                            updated.splice(idx, 1);
                            updateNestedState(["aboutPage", "values"], updated);
                          }}
                          className="text-[#ff5f57] hover:bg-[#ff5f57]/10 p-1.5 rounded transition-colors text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={val.desc}
                        placeholder="Description"
                        onChange={(e) => updateNestedState(["aboutPage", "values", idx, "desc"], e.target.value)}
                        className="w-full bg-black border border-[#222] px-3 py-2 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dev Tech Stack */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">DEV STACK / SETUP</h3>
                  <button 
                    onClick={() => updateNestedState(["aboutPage", "stack"], [...data.aboutPage.stack, { cat: "Editor", name: "Custom", use: "Description here..." }])}
                    className="text-xs bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1 rounded transition-all"
                  >
                    + Add Tool
                  </button>
                </div>
                <div className="space-y-4">
                  {data.aboutPage.stack.map((item: any, idx: number) => (
                    <div key={idx} className="bg-[#131313] border border-[#222] p-4 rounded space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={item.cat}
                          placeholder="Category (e.g. Editor)"
                          onChange={(e) => updateNestedState(["aboutPage", "stack", idx, "cat"], e.target.value)}
                          className="bg-black border border-[#222] px-3 py-1.5 text-xs text-[#6a6a6a] font-['JetBrains_Mono',monospace] rounded focus:border-[#d4ff47] outline-none"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item.name}
                            placeholder="Product Name"
                            onChange={(e) => updateNestedState(["aboutPage", "stack", idx, "name"], e.target.value)}
                            className="flex-1 bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] font-bold rounded focus:border-[#d4ff47] outline-none"
                          />
                          <button
                            onClick={() => {
                              const updated = [...data.aboutPage.stack];
                              updated.splice(idx, 1);
                              updateNestedState(["aboutPage", "stack"], updated);
                            }}
                            className="text-[#ff5f57] hover:bg-[#ff5f57]/10 p-1.5 rounded transition-colors text-xs font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={item.use}
                        placeholder="Detailed Use..."
                        onChange={(e) => updateNestedState(["aboutPage", "stack", idx, "use"], e.target.value)}
                        className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-12">
              <div>
                <h2 className="font-['DM_Serif_Display',serif] text-3xl mb-2">Experience & Career Settings</h2>
                <p className="text-[#6a6a6a] text-xs font-['JetBrains_Mono',monospace]">Manage professional history, quick statistics, university education details, and speaking events.</p>
              </div>

              {/* Quick Stats */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">QUICK STATS SUMMARY</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {data.experiencePage.quickStats.map((stat: any, idx: number) => (
                    <div key={idx} className="bg-[#131313] border border-[#222] p-3 rounded flex items-center gap-3">
                      <input
                        type="text"
                        value={stat.num}
                        placeholder="6+"
                        onChange={(e) => updateNestedState(["experiencePage", "quickStats", idx, "num"], e.target.value)}
                        className="w-16 bg-black border border-[#222] px-2 py-1.5 text-center text-xs font-bold text-[#d4ff47] rounded focus:border-[#d4ff47] outline-none"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        placeholder="Years experience"
                        onChange={(e) => updateNestedState(["experiencePage", "quickStats", idx, "label"], e.target.value)}
                        className="flex-1 bg-black border border-[#222] px-3 py-1.5 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Work experience timeline */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">DETAILED WORK EXPERIENCE</h3>
                  <button 
                    onClick={() => updateNestedState(["experiencePage", "experience"], [
                      ...data.experiencePage.experience, 
                      { logo: "NEW", period: "2026", company: "Company", type: "Full-time", role: "Role", desc: "Brief description", achievements: ["Achievement 1"], tags: ["Tag"] }
                    ])}
                    className="text-xs bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1 rounded transition-all"
                  >
                    + Add Work Experience
                  </button>
                </div>
                <div className="space-y-6">
                  {data.experiencePage.experience.map((exp: any, idx: number) => (
                    <div key={idx} className="bg-[#131313] border border-[#222] p-5 rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-['JetBrains_Mono',monospace] text-xs text-[#d4ff47] uppercase tracking-wider">#{idx + 1} COMPANY ITEM</span>
                        <button
                          onClick={() => {
                            const updated = [...data.experiencePage.experience];
                            updated.splice(idx, 1);
                            updateNestedState(["experiencePage", "experience"], updated);
                          }}
                          className="text-xs text-[#ff5f57] hover:underline"
                        >
                          Delete Position
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">LOGO SHORTCODE</label>
                          <input
                            type="text"
                            value={exp.logo}
                            onChange={(e) => updateNestedState(["experiencePage", "experience", idx, "logo"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">WORK PERIOD</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => updateNestedState(["experiencePage", "experience", idx, "period"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">COMPANY NAME</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateNestedState(["experiencePage", "experience", idx, "company"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">ROLE / POSITION</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateNestedState(["experiencePage", "experience", idx, "role"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">EMPLOYMENT TYPE</label>
                          <input
                            type="text"
                            value={exp.type}
                            onChange={(e) => updateNestedState(["experiencePage", "experience", idx, "type"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">TAGS (COMMA SEPARATED)</label>
                          <input
                            type="text"
                            value={exp.tags.join(", ")}
                            onChange={(e) => updateNestedState(["experiencePage", "experience", idx, "tags"], e.target.value.split(",").map(t => t.trim()))}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">SHORT ROLE INTRO</label>
                        <input
                          type="text"
                          value={exp.desc}
                          onChange={(e) => updateNestedState(["experiencePage", "experience", idx, "desc"], e.target.value)}
                          className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none"
                        />
                      </div>

                      <div className="space-y-2.5">
                        <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace]">KEY ACHIEVEMENTS (ONE PER LINE)</label>
                        {exp.achievements.map((ach: string, aIdx: number) => (
                          <div key={aIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={ach}
                              onChange={(e) => {
                                const updatedAch = [...exp.achievements];
                                updatedAch[aIdx] = e.target.value;
                                updateNestedState(["experiencePage", "experience", idx, "achievements"], updatedAch);
                              }}
                              className="flex-1 bg-black border border-[#222] px-3 py-1.5 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none"
                            />
                            <button
                              onClick={() => {
                                const updatedAch = [...exp.achievements];
                                updatedAch.splice(aIdx, 1);
                                updateNestedState(["experiencePage", "experience", idx, "achievements"], updatedAch);
                              }}
                              className="text-[#ff5f57] hover:bg-[#ff5f57]/10 px-2 rounded text-xs font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => updateNestedState(["experiencePage", "experience", idx, "achievements"], [...exp.achievements, "New achievement bullet point..."])}
                          className="text-[0.68rem] bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1 rounded transition-all"
                        >
                          + Add Bullet Point
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education section */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">EDUCATION TIMELINE</h3>
                  <button 
                    onClick={() => updateNestedState(["experiencePage", "education"], [...data.experiencePage.education, { year: "2024", school: "University", degree: "Degree name", note: "GPA and details" }])}
                    className="text-xs bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1 rounded transition-all"
                  >
                    + Add Education
                  </button>
                </div>
                <div className="space-y-6">
                  {data.experiencePage.education.map((edu: any, idx: number) => (
                    <div key={idx} className="bg-[#131313] border border-[#222] p-4 rounded space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={edu.year}
                          placeholder="Year (e.g. 2015 — 2019)"
                          onChange={(e) => updateNestedState(["experiencePage", "education", idx, "year"], e.target.value)}
                          className="bg-black border border-[#222] px-3 py-1.5 text-xs text-[#6a6a6a] font-['JetBrains_Mono',monospace] rounded focus:border-[#d4ff47] outline-none"
                        />
                        <input
                          type="text"
                          value={edu.school}
                          placeholder="School name"
                          onChange={(e) => updateNestedState(["experiencePage", "education", idx, "school"], e.target.value)}
                          className="bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] font-bold rounded focus:border-[#d4ff47] outline-none"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={edu.degree}
                            placeholder="Degree"
                            onChange={(e) => updateNestedState(["experiencePage", "education", idx, "degree"], e.target.value)}
                            className="flex-1 bg-black border border-[#222] px-3 py-1.5 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none"
                          />
                          <button
                            onClick={() => {
                              const updated = [...data.experiencePage.education];
                              updated.splice(idx, 1);
                              updateNestedState(["experiencePage", "education"], updated);
                            }}
                            className="text-[#ff5f57] hover:bg-[#ff5f57]/10 p-1.5 rounded transition-colors text-xs font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        value={edu.note}
                        placeholder="Education achievements, notes, coursework..."
                        onChange={(e) => updateNestedState(["experiencePage", "education", idx, "note"], e.target.value)}
                        className="w-full bg-black border border-[#222] px-3 py-2 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-12">
              <div>
                <h2 className="font-['DM_Serif_Display',serif] text-3xl mb-2">Projects Page Settings</h2>
                <p className="text-[#6a6a6a] text-xs font-['JetBrains_Mono',monospace]">Manage main featured project case study, detailed project index grids, and open-source contributions.</p>
              </div>

              {/* Featured Case Study Details */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">FEATURED PROJECT DETAILS</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">YEAR / TYPE</label>
                      <input
                        type="text"
                        value={data.projectPage.featuredProjectDetails.cat}
                        onChange={(e) => updateNestedState(["projectPage", "featuredProjectDetails", "cat"], e.target.value)}
                        className="w-full bg-black border border-[#222] px-3 py-2 text-xs text-[#d4ff47] rounded focus:border-[#d4ff47] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">PROJECT TITLE</label>
                      <input
                        type="text"
                        value={data.projectPage.featuredProjectDetails.title}
                        onChange={(e) => updateNestedState(["projectPage", "featuredProjectDetails", "title"], e.target.value)}
                        className="w-full bg-black border border-[#222] px-3 py-2 text-xs text-[#f0ede6] font-bold rounded focus:border-[#d4ff47] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">DESCRIPTION</label>
                    <textarea
                      rows={3}
                      value={data.projectPage.featuredProjectDetails.desc}
                      onChange={(e) => updateNestedState(["projectPage", "featuredProjectDetails", "desc"], e.target.value)}
                      className="w-full bg-black border border-[#222] px-4 py-3 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Projects */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">ALL PROJECTS (GRID INDEX)</h3>
                  <button 
                    onClick={() => updateNestedState(["projectPage", "projects"], [
                      ...data.projectPage.projects, 
                      { cat: "SaaS · 2026", title: "New Project", desc: "Short description", tags: ["React"], svg: "<svg viewBox=\"0 0 300 200\" class=\"w-full h-full opacity-40\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"300\" height=\"200\" fill=\"#141414\"/></svg>" }
                    ])}
                    className="text-xs bg-[#222] border border-[#333] hover:border-[#d4ff47] text-[#d4ff47] px-3 py-1 rounded transition-all"
                  >
                    + Add Project
                  </button>
                </div>
                <div className="space-y-6">
                  {data.projectPage.projects.map((project: any, idx: number) => (
                    <div key={idx} className="bg-[#131313] border border-[#222] p-5 rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-['JetBrains_Mono',monospace] text-xs text-[#d4ff47] uppercase tracking-wider">#{idx + 1} GRID PROJECT</span>
                        <button
                          onClick={() => {
                            const updated = [...data.projectPage.projects];
                            updated.splice(idx, 1);
                            updateNestedState(["projectPage", "projects"], updated);
                          }}
                          className="text-xs text-[#ff5f57] hover:underline"
                        >
                          Remove Project
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">CATEGORY / YEAR</label>
                          <input
                            type="text"
                            value={project.cat}
                            onChange={(e) => updateNestedState(["projectPage", "projects", idx, "cat"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">PROJECT TITLE</label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateNestedState(["projectPage", "projects", idx, "title"], e.target.value)}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] font-bold rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">TAGS (COMMA SEPARATED)</label>
                          <input
                            type="text"
                            value={project.tags.join(", ")}
                            onChange={(e) => updateNestedState(["projectPage", "projects", idx, "tags"], e.target.value.split(",").map(t => t.trim()))}
                            className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">SHORT DESCRIPTION</label>
                        <input
                          type="text"
                          value={project.desc}
                          onChange={(e) => updateNestedState(["projectPage", "projects", idx, "desc"], e.target.value)}
                          className="w-full bg-black border border-[#222] px-3 py-1.5 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[0.68rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace] mb-1">SVG VECTOR PREVIEW (INLINE CODE)</label>
                        <textarea
                          rows={4}
                          value={project.svg}
                          onChange={(e) => updateNestedState(["projectPage", "projects", idx, "svg"], e.target.value)}
                          className="w-full bg-black border border-[#222] px-3 py-2 text-xs font-['JetBrains_Mono',monospace] text-[#d4ff47] rounded focus:border-[#d4ff47] outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-12">
              <div>
                <h2 className="font-['DM_Serif_Display',serif] text-3xl mb-2">Contact & Social Settings</h2>
                <p className="text-[#6a6a6a] text-xs font-['JetBrains_Mono',monospace]">Edit social links, location text, form inquiry selections, and client project budget brackets.</p>
              </div>

              {/* Social Details list */}
              <div className="border border-[#222] bg-[#111]/30 rounded-lg p-6 space-y-4">
                <div className="border-b border-[#222] pb-3">
                  <h3 className="font-['Syne',sans-serif] font-bold text-sm tracking-wide">SOCIAL LINKS & CHANNELS</h3>
                </div>
                <div className="space-y-4">
                  {data.contactPage.contactDetails.map((detail: any, idx: number) => (
                    <div key={idx} className="bg-[#131313] border border-[#222] p-4 rounded space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={detail.label}
                          placeholder="Label (e.g. Email)"
                          onChange={(e) => updateNestedState(["contactPage", "contactDetails", idx, "label"], e.target.value)}
                          className="bg-black border border-[#222] px-3 py-1.5 text-xs text-[#6a6a6a] font-['JetBrains_Mono',monospace] rounded focus:border-[#d4ff47] outline-none"
                        />
                        <input
                          type="text"
                          value={detail.value}
                          placeholder="Visible Value"
                          onChange={(e) => updateNestedState(["contactPage", "contactDetails", idx, "value"], e.target.value)}
                          className="bg-black border border-[#222] px-3 py-1.5 text-xs text-[#f0ede6] rounded focus:border-[#d4ff47] outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-3">
                        <input
                          type="text"
                          value={detail.href}
                          placeholder="Link URL"
                          onChange={(e) => updateNestedState(["contactPage", "contactDetails", idx, "href"], e.target.value)}
                          className="bg-black border border-[#222] px-3 py-1.5 text-xs text-[#bbb] rounded focus:border-[#d4ff47] outline-none"
                        />
                        <label className="flex items-center gap-1.5 cursor-pointer select-none text-[0.7rem] font-['JetBrains_Mono',monospace]">
                          <input
                            type="checkbox"
                            checked={detail.isLink}
                            onChange={(e) => updateNestedState(["contactPage", "contactDetails", idx, "isLink"], e.target.checked)}
                            className="accent-[#d4ff47] cursor-pointer"
                          />
                          Is Clickable
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "json" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-['DM_Serif_Display',serif] text-3xl mb-2">JSON Database</h2>
                <p className="text-[#6a6a6a] text-xs font-['JetBrains_Mono',monospace]">Direct edit view of raw file contents at src/data/portfolio-data.json.</p>
              </div>

              <div className="border border-[#222] bg-black rounded-lg overflow-hidden">
                <div className="bg-[#111] px-4 py-2 border-b border-[#222] flex justify-between items-center">
                  <span className="text-[0.62rem] text-[#6a6a6a] font-['JetBrains_Mono',monospace]">portfolio-data.json</span>
                  <span className="text-[0.62rem] text-[#d4ff47] font-['JetBrains_Mono',monospace]">read-write</span>
                </div>
                <textarea
                  rows={25}
                  value={JSON.stringify(data, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setData(parsed);
                    } catch (err) {
                      // Allow typing invalid json momentarily, only bind text
                      console.log("Momentary JSON parsing exception");
                    }
                  }}
                  className="w-full bg-[#080808] text-[#d4ff47] font-['JetBrains_Mono',monospace] text-xs p-6 outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
