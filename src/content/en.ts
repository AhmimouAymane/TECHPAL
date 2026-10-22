import type { Dict } from "./fr";

/** English dictionary — same keys as the French source of truth. */
const en: Dict = {
  nav: {
    expertise: "Expertise",
    staffing: "Staffing",
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
  reel: {
    kicker: "Showreel",
    title: "The TECHPAL signature, frame by frame.",
    note: "Sequence driven by your scroll",
    labels: ["Intro", "Network", "Software", "Production", "Cloud", "Brand"],
  },
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
    labels: { createdAt: "Created at", name: "Name", type: "Type", scope: "Scope", stack: "Stack", story: "The project", points: "Key features" },
  },
  stats: {
    kicker: "By the numbers",
    items: [
      { value: "2022", label: "Founded in Casablanca" },
      { value: "< 24 h", label: "Reply within 24 business hours" },
      { value: "24/7", label: "Monitoring & support" },
      { value: "FR·EN·AR", label: "Trilingual team" },
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
  staffing: {
    kicker: "IT staffing",
    title: "The right profiles, right on time.",
    intro:
      "TECHPAL Staffing places pre-vetted IT talent inside your teams: developers, data, cloud and support. Fast onboarding, replacement guarantee, zero paperwork.",
    unitsKicker: "Who you can strengthen",
    unitsTitle: "Profiles that join your team, not your paperwork.",
    units: [
      {
        title: "Software engineers",
        text: "Backend, frontend, full-stack and mobile. Developers up and running within the first week, without endless hiring cycles.",
      },
      {
        title: "Data & AI",
        text: "Data engineers, data analysts and AI developers to turn your data into a concrete advantage.",
      },
      {
        title: "Cloud, support & infrastructure",
        text: "Cloud administrators, DevOps, support and network technicians, ready to operate your environments every day.",
      },
    ],
    processKicker: "How it works",
    processTitle: "Four steps, one profile on board.",
    process: [
      { title: "Share the need", text: "Stack, seniority, duration: a 30-minute brief is enough." },
      { title: "Receive the profiles", text: "2 to 3 pre-vetted profiles within 48 business hours, with CVs and test results." },
      { title: "Validate & onboard", text: "You choose; we handle contract, hardware and onboarding." },
      { title: "Rest easy", text: "Monthly quality review and a 90-day replacement guarantee." },
    ],
    vettingKicker: "Selection",
    vettingTitle: "Less than 5% of candidates join the network.",
    vettingText: "Every candidate passes four filters before reaching you. The bar keeps rising, the quality stays.",
    vetting: [
      { title: "Pre-screening", text: "CV, track record and reference checks." },
      { title: "Technical interview", text: "Run by our senior engineers, not by HR." },
      { title: "Practical test", text: "A real exercise on the mission's stack." },
      { title: "Soft skills", text: "Communication, autonomy, French, English and Arabic." },
    ],
    stats: [
      { value: "48 h", label: "First profiles delivered" },
      { value: "< 7 d", label: "Average onboarding" },
      { value: "95%", label: "Retention rate" },
      { value: "90 d", label: "Replacement guarantee" },
    ],
    partnerKicker: "Partnerships",
    partnerTitle: "Teams that grow with us.",
    partnerText:
      "Our staffing continuously powers the teams of partners like Klaim, the Dubai-based health fintech: pre-vetted profiles, quality reviews and committed outcomes.",
    faqKicker: "FAQ",
    faqTitle: "Frequently asked questions.",
    faq: [
      {
        q: "Under which model do you place profiles?",
        a: "Time & materials or fixed price, under a clear service agreement. Profiles remain TECHPAL employees: no charges, no paperwork for you.",
      },
      {
        q: "What if the profile is not a fit?",
        a: "Replacement guaranteed for 90 days at no extra cost. Our 95% retention rate shows it rarely comes to that.",
      },
      {
        q: "Do you work remotely or on site?",
        a: "Both: on site in Casablanca, hybrid or fully remote depending on your setup.",
      },
      {
        q: "Do you place profiles outside IT?",
        a: "IT is our core business. Every out-of-scope request is reviewed case by case.",
      },
    ],
    cta: {
      kicker: "Staffing",
      title: "An urgent need?",
      text: "Describe the profile you're looking for: first CVs within 48 business hours.",
      button: "Request profiles",
    },
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
    members: [
      { name: "Basma Bennasser", role: "Chief Executive Officer", photo: "/team/basma-bennasser.png", tags: ["Strategy", "Management", "Partnerships"] },
      { name: "Abdelhadi Laasi", role: "Web developer & Odoo", photo: "/team/abdelhadi-laasi.png", tags: ["Web", "Odoo", "Slave"] },
      { name: "Aymane Ahmimou", role: "R&D engineer — mobile & AI", photo: "/team/aymane-ahmimou.jpeg", tags: ["Mobile", "AI", "R&D"] },
      { name: "Youssef Maimouni", role: "Data science & AI engineer", photo: "/team/youssef-maimouni.jpg", tags: ["NLP", "Data science", "AI Agents"] },
      { name: "Abderrahman Barni", role: "IT support technician", photo: "/team/abderrahman-barni.png", tags: ["Support", "Hardware", "Helpdesk"] },
      
      { name: "Oumama Agdour", role: "Data & AI consultant -Odoo", photo: "/team/oumama-agdour.png", tags: ["Data", "AI", "Odoo", "Web"] },
      { name: "Abdelmouiz Kadouaoui", role: "AI & Data Engineer", photo: "/team/abdelmouiz-kadouaoui.jpg", tags: ["Machine learning", "Data engineering", "Python"] },
    ],
    teamNote: "A trilingual team: French, English, Arabic.",
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
      title: "TECHPAL | End-to-end digital engineering in Casablanca",
      description:
        "TECHPAL builds software, AI, cloud and IT infrastructure for ambitious companies. Hardware, network, support and managed IT included.",
    },
    expertise: { title: "Expertise | TECHPAL", description: "Software engineering, AI, cloud, networks, support and managed IT." },
    staffing: { title: "IT Staffing | TECHPAL", description: "Pre-vetted IT talent embedded in your teams: dev, data, cloud and support. Profiles within 48 business hours." },
    projets: { title: "Work | TECHPAL", description: "TECHPAL's projects: business platforms, applications, infrastructure." },
    apropos: { title: "About | TECHPAL", description: "TECHPAL, a digital engineering partner based in Casablanca." },
    contact: { title: "Contact | TECHPAL", description: "Start your project with TECHPAL in Casablanca. Reply within 24 business hours." },
  },
};

export default en;
