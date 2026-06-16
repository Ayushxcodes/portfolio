import React from "react";
import portfolioData from "../../data/portfolio-data.json";

export const FILTERS = portfolioData.projectPage.filters;
export const FEATURED_STATS = portfolioData.projectPage.featuredStats;
export const FEATURED_TAGS = portfolioData.projectPage.featuredTags;
export const FEATURED_PROJECT_DETAILS = portfolioData.projectPage.featuredProjectDetails;
export const OSS = portfolioData.projectPage.oss;

export const PROJECTS = portfolioData.projectPage.projects.map((p) => ({
  ...p,
  svg: (
    <div
      className="w-full h-full"
      dangerouslySetInnerHTML={{ __html: p.svg }}
    />
  ),
}));

export default {};
