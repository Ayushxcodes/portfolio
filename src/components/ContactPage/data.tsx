export const NAV_LINKS = [
  { href: "about.html",      label: "About",      active: false },
  { href: "projects.html",   label: "Work",       active: false },
  { href: "experience.html", label: "Experience", active: false },
  { href: "contact.html",    label: "Contact",    active: true  },
];

export const CONTACT_DETAILS = [
  { label: "Email",      value: "alex@alexchen.dev",        href: "mailto:alex@alexchen.dev", isLink: true },
  { label: "LinkedIn",   value: "linkedin.com/in/alexchen", href: "#",                        isLink: true },
  { label: "GitHub",     value: "github.com/alexchen",      href: "#",                        isLink: true },
  { label: "Twitter / X",value: "@alexchen_dev",             href: "#",                        isLink: true },
  { label: "Location",   value: "San Francisco, CA 🌁",      href: "",                         isLink: false },
];

export const INQUIRY_OPTIONS = [
  "Full-time role",
  "Freelance / contract project",
  "Technical consulting",
  "Speaking / writing opportunity",
  "Open source collaboration",
  "Just saying hi",
];

export const BUDGET_OPTIONS = [
  "Under $5k",
  "$5k – $20k",
  "$20k – $50k",
  "$50k – $100k",
  "$100k+",
  "Let's discuss",
];

export default {};
