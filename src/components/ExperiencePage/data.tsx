import React from "react";
import portfolioData from "../../data/portfolio-data.json";

export const QUICK_STATS = portfolioData.experiencePage.quickStats;
export const SKILLS = portfolioData.experiencePage.skills;
export const WRITING = portfolioData.experiencePage.writing;
export const SPEAKING = portfolioData.experiencePage.speaking;

// Markdown bold parser: parses **text** into <strong className="text-[#f0ede6]">text</strong>
const parseBoldText = (text: string, boldColorClass = "text-[#f0ede6]") => {
  if (typeof text !== "string") return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className={boldColorClass}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Education note parser: handles bold text and line breaks \n
const formatNote = (text: string) => {
  if (typeof text !== "string") return text;
  return text.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {parseBoldText(line, "text-[#d4ff47]")}
    </React.Fragment>
  ));
};

export const EXPERIENCE = portfolioData.experiencePage.experience.map((exp) => ({
  ...exp,
  achievements: exp.achievements.map((ach) => parseBoldText(ach)),
}));

export const EDUCATION = portfolioData.experiencePage.education.map((edu) => ({
  ...edu,
  note: formatNote(edu.note),
}));
