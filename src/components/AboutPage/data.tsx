import portfolioData from "../../data/portfolio-data.json";

export const values = portfolioData.aboutPage.values;
export const stack = portfolioData.aboutPage.stack;
export const outside = portfolioData.aboutPage.outside;
export const storyLinks = portfolioData.aboutPage.story; // wait! let's verify if storyLinks is in story or outside.
// Wait, in portfolioData.aboutPage.story, we put links as "links" or "storyLinks". Let's check our JSON structure!
// In our JSON: "aboutPage": { "story": { "links": [ ... ], "sections": [ ... ], "quote": "..." } }
export const storyLinks = portfolioData.aboutPage.story.links;

export default {};
