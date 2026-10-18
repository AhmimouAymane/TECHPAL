import type { Dict } from "./fr";

/** English dictionary — same keys as the French source of truth. */
const en: Dict = {
  nav: {
    expertise: "Expertise",
    projets: "Work",
    apropos: "About",
    contact: "Contact",
    cta: "Start a project",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  hero: {
    hint: "Scroll to explore",
    cta1: "Start a project",
    cta2: "Explore expertise",
    scenes: [
      {
        label: "Digital engineering · Casablanca",
        title: "Your trusted IT partner.",
        text: "From IT support to software engineering, we cover every part of your technology stack.",
      },
      {
        label: "Approach",
        title: "We build systems that hold up in production.",
        text: "Four domains, one standard: real results, not demos.",
      },
      {
        label: "Software",
        title: "Custom web & mobile applications.",
        text: "Business platforms, APIs and integrations with your existing systems.",
      },
      {
        label: "Artificial intelligence",
        title: "AI in production, not on a slide.",
        text: "Automation, assistants on your data, decision support.",
      },
      {
        label: "Cloud & infrastructure",
        title: "Cloud, network and hardware, end to end.",
        text: "Hosting, enterprise networks, deployment, monitoring and support.",
      },
    ],
  },
  marquee: { label: "Technologies & partners" },
  services: {
    kicker: "What we do",
    title: "We design and run digital products for ambitious teams.",
    intro:
      "From launch sites to full business platforms. We start with why, then design and build the rest.",
    link: "More about us",
    items: [
      {
        n: "001",
        title: "Software engineering",
        desc: "Web & mobile applications, business platforms, APIs.",
        points: ["Web & mobile apps", "Business platforms", "APIs & integrations"],
      },
      {
        n: "002",
        title: "Artificial intelligence",
        desc: "AI integration and automation for concrete use cases.",
        points: ["AI integration", "Automation", "Intelligent apps"],
      },
      {
        n: "003",
        title: "Cloud & infrastructure",
        desc: "Cloud, networks, deployment and monitoring.",
        points: ["Cloud & hosting", "LAN/WAN & Wi-Fi networks", "Deployment & monitoring"],
      },
      {
        n: "004",
        title: "Network & hardware",
        desc: "Supply, installation and maintenance of your hardware and network.",
        points: ["Hardware supply", "Cabling & network", "Maintenance"],
      },
      {
        n: "005",
        title: "Support & managed IT",
        desc: "A single point of contact for all your day-to-day IT.",
        points: ["Responsive support", "Fully managed IT", "Proactive monitoring"],
      },
      {
        n: "006",
        title: "Digital transformation",
        desc: "From business process to production product.",
        points: ["Audit & scoping", "Roadmap", "Go-live"],
      },
    ],
  },
  work: {
    kicker: "Selected work",
    title: "A selection of projects where design and engineering meet.",
    intro: "Several engagements are covered by confidentiality agreements.",
    viewAll: "View all projects",
    confidential: "Confidential project",
    labels: { createdAt: "Created at", name: "Name", type: "Type", scope: "Scope", stack: "Stack" },
  },
  stats: {
    kicker: "By the numbers",
    items: [
      { value: "2023", label: "Founded in Casablanca" },
      { value: "< 24 h", label: "Reply within 24 business hours" },
      { value: "24/7", label: "Monitoring & support" },
      { value: "FR·EN", label: "Bilingual team" },
    ],
  },
  narrative: {
    blocks: [
      {
        kicker: "Method",
        title: "Five steps, the same for every engagement.",
        text: "Discover, design, build, integrate, evolve. You validate each step before the next.",
      },
      {
        kicker: "Commitments",
        title: "Deadlines kept and transparent invoicing.",
        text: "Written scopes, fixed quotes, no hidden fees. Trust is built on clarity.",
      },
    ],
  },
  cta: {
    kicker: "Stay in touch",
    title: "Let's build something memorable.",
    text: "An idea, a product, a vision? Tell us about it — we reply within 24 business hours.",
    button: "Start a project",
  },
  about: {
    kicker: "About",
    title: "An IT partner that thinks product.",
    intro:
      "TECHPAL brings together software engineering and the traditional IT trades to give businesses a single partner, from the workstation to the digital product.",
    values: [
      { title: "Rigor", text: "Quotes kept, deadlines met, documented work." },
      { title: "Proximity", text: "Based in Casablanca, reachable and present on site." },
      { title: "Transparency", text: "Written scopes, detailed invoices, no hidden fees." },
      { title: "Reliability", text: "Systems that work in production, monitored over time." },
    ],
    teamTitle: "The team",
    teamText: "A multidisciplinary team based in Casablanca, combining field expertise and software engineering.",
  },
  contactPage: {
    kicker: "Contact",
    title: "Let's talk about your project.",
    intro: "Describe your need — we get back to you within 24 business hours.",
    infoTitle: "Details",
    form: {
      name: "Full name",
      email: "Work email",
      company: "Company",
      message: "Your message",
      messagePh: "Describe your need in a few lines…",
      send: "Send request",
      note: "Demo form — not connected yet.",
    },
  },
  legal: {
    mentionsTitle: "Legal notice",
    privacyTitle: "Privacy policy",
    draft: "Page in progress. Final content to come.",
    editor: "Site publisher",
  },
  footer: {
    tagline: "End-to-end digital engineering partner, based in Casablanca.",
    socialTitle: "Social",
    pagesTitle: "Pages",
    contactTitle: "Contact",
    locationTitle: "Location",
    keepScrolling: "Keep scrolling",
    rights: "All rights reserved.",
    legal: "Legal notice",
    privacy: "Privacy",
    next: "next page",
  },
  meta: {
    home: {
      title: "TECHPAL Studio | End-to-end digital engineering in Casablanca",
      description:
        "TECHPAL builds software, AI, cloud and IT infrastructure for ambitious companies. Hardware, network, support and managed IT included.",
    },
    expertise: { title: "Expertise | TECHPAL Studio", description: "Software engineering, AI, cloud, networks, support and managed IT." },
    projets: { title: "Work | TECHPAL Studio", description: "TECHPAL's projects: business platforms, applications, infrastructure." },
    apropos: { title: "About | TECHPAL Studio", description: "TECHPAL, a digital engineering partner based in Casablanca." },
    contact: { title: "Contact | TECHPAL Studio", description: "Start your project with TECHPAL in Casablanca. Reply within 24 business hours." },
  },
};

export default en;
