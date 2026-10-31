import type { Dict } from "./fr";

/** English dictionary - same keys as the French source of truth. */
const en: Dict = {
  nav: {
    expertise: "Expertise",
    ia: "TECHPAL AI",
    produits: "Hardware",
    staffing: "Staffing",
    projets: "Projects",
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
        title: "Your One-Stop Shop for All Your IT Needs.",
        text: "From IT support to software engineering, we cover every part of your technology stack.",
      },
      {
        label: "Approach",
        title: "We build systems that hold up in production.",
        text: "Six practices, one standard: real results, not demos.",
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
  marquee: { label: "Technologies we master" },
  reel: {
    kicker: "Showreel",
    title: "The TECHPAL signature, frame by frame.",
    note: "Sequence driven by your scroll",
    labels: ["Intro", "Network", "Software", "Production", "Cloud", "Brand"],
  },
  services: {
    kicker: "What we do",
    title: "From idea to production.",
    intro:
      "We design, build and operate digital solutions for ambitious teams. From launch sites to full business platforms.",
    heroWords: ["Software engineering", "Artificial intelligence", "Cloud & infrastructure", "Network & hardware", "Support & managed IT", "Digital transformation"],
    heroHint: "6 practices, one team - from strategy to support",
    anchor: "The six practices",
    link: "More about us",
    items: [
      {
        n: "001",
        title: "Software engineering",
        desc: "Web & mobile applications, business platforms, APIs.",
        points: ["Web & mobile apps", "Business platforms", "APIs & integrations"],
        href: "/developpement-logiciel-sur-mesure",
      },
      {
        n: "002",
        title: "Artificial intelligence",
        desc: "AI integration and automation for concrete use cases.",
        points: ["AI integration", "Automation", "Intelligent apps"],
        href: "/integration-ia-entreprise",
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
        href: "/infrastructure-reseau-materiel",
      },
      {
        n: "005",
        title: "Support & managed IT",
        desc: "A single point of contact for all your day-to-day IT.",
        points: ["Responsive support", "Fully managed IT", "Proactive monitoring"],
        href: "/infogerance-informatique-casablanca",
      },
      {
        n: "006",
        title: "Digital transformation",
        desc: "From business process to a solution in production.",
        points: ["Audit & scoping", "Roadmap", "Go-live"],
      },
    ],
  },
  work: {
    kicker: "Our solutions",
    title: "Seven solution families, one standard: production.",
    intro: "Our work is grouped by solution type, from mobile marketplaces to HRIS. Deliberately anonymized: engagements covered by confidentiality agreements are not published.",
    viewAll: "See what we build",
    confidential: "Confidential engagement",
    labels: { createdAt: "Period", name: "Name", type: "Type", scope: "Scope", stack: "Stack", story: "Our approach", points: "What we deliver" },
    heroTitle: "Solutions in production, not mockups.",
    heroWords: ["Marketplaces", "E-commerce", "Online booking", "Immersive training", "Collaborative ERP", "E-learning", "HRIS"],
    heroHint: "7 solution families - deployed in production",
    technosKicker: "Technologies",
    technosTitle: "The technologies behind these builds.",
    clientsKicker: "Clients & partners",
    clientsTitle: "They trust us.",
    clientsIntro: "Each logo links to the organization's website. Our work deliberately stays separate from our clients.",
  },
  stats: {
    kicker: "By the numbers",
    items: [
      { value: "2022", label: "Founded in Casablanca" },
      { value: "< 24 h", label: "Reply within 24 business hours" },
      { value: "24/7", label: "Managed IT contract monitoring" },
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
    title: "Tell us about your project.",
    text: "An idea, a solution, a managed IT need? Let's talk - we reply within 24 business hours.",
    button: "Start a project",
  },
  staffing: {
    kicker: "IT staffing",
    title: "The right profiles, right on time.",
    intro:
      "TECHPAL Staffing places pre-vetted IT talent inside your teams: developers, data, cloud and support. Fast onboarding, replacement guarantee, zero paperwork.",
    heroWords: ["Developers", "Data & AI", "Cloud & DevOps", "Support & network"],
    heroHint: "Vetted, tested, onboarded - within 48 business hours",
    anchor: "The process",
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
      "Our staffing continuously strengthens our clients' teams: pre-vetted profiles, quality reviews and committed outcomes.",
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
  developpement: {
    kicker: "Software development",
    title: "Custom software development.",
    intro:
      "Web and mobile applications and business platforms designed around your operations: from scoping to production, then evolution at the pace of your business.",
    heroWords: ["Web applications", "Mobile apps", "Business platforms", "APIs & integrations"],
    heroHint: "From scoping to production",
    anchor: "The deliverables",
    deliverablesKicker: "The deliverables",
    deliverablesTitle: "From client-facing solution to the front desk.",
    deliverables: [
      {
        title: "Web & mobile applications",
        text: "Launch sites, customer portals and native or cross-platform mobile apps, built to run in production.",
      },
      {
        title: "Business platforms",
        text: "The tools that replace your spreadsheets: operations, internal workflows, reporting, process digitalization.",
      },
      {
        title: "APIs & integrations",
        text: "Connection between your existing systems: ERP, payment, messaging, third-party tools. On demand or as a planned integration.",
      },
    ],
    processKicker: "The method",
    processTitle: "Five steps, the same for every mission.",
    process: [
      { title: "Scoping", text: "Your needs, edge cases and constraints written down: scope, use cases, priorities." },
      { title: "Design", text: "User journeys, architecture and wireframes validated before the first line of code." },
      { title: "Development", text: "Regular releases: you see the solution from the earliest versions." },
      { title: "Integration", text: "Go-live, data migration, user training." },
      { title: "Evolution", text: "Fixes, new features and solution monitoring after launch." },
    ],
    stats: [
      { value: "2022", label: "Founded in Casablanca" },
      { value: "7", label: "Solution families in production" },
      { value: "< 24 h", label: "Firm quote within 24 business hours" },
      { value: "FR·EN·AR", label: "A trilingual team" },
    ],
    includedKicker: "Inside the mission",
    includedTitle: "Written scope, delivered code, shared knowledge.",
    included: [
      {
        title: "Documented scoping",
        text: "Scope and priorities written before development starts: no vague projects, no mid-flight surprises.",
      },
      {
        title: "Testing & acceptance",
        text: "Checks before every release and acceptance review with you at each key milestone.",
      },
      {
        title: "Code & documentation",
        text: "Source code and documentation handed over with the solution, so you never depend on us by accident.",
      },
      {
        title: "Handover & maintenance",
        text: "Team training then, if you wish, corrective and evolutionary maintenance decided together.",
      },
    ],
    crossKicker: "Complete your setup",
    crossTitle: "One page per need.",
    crossIntro: "Custom development works hand in hand with:",
    cross: [
      { title: "Odoo integration", desc: "Sales, inventory and accounting on a modular ERP wrapped around your solution.", href: "/integration-odoo-maroc" },
      { title: "AI integration", desc: "Add assistants and automation to your solution.", href: "/ia" },
      { title: "Managed IT & maintenance", desc: "Entrust us with monitoring and maintenance of the delivered solution.", href: "/infogerance-informatique-casablanca" },
      { title: "IT staffing", desc: "Reinforce your in-house teams instead of outsourcing.", href: "/staffing" },
    ],
    faqKicker: "FAQ",
    faqTitle: "Frequently asked questions.",
    faq: [
      {
        q: "What is custom software development?",
        a: "An application designed around your real processes instead of a standard solution forced to fit: scope, journeys and integrations are defined with you. The software follows your organization, not the other way around.",
      },
      {
        q: "How much does a custom application cost in Morocco?",
        a: "Cost depends on the scope: screens, journeys, integrations and planned maintenance. After a short scoping session, we issue a firm quote with no hidden cost. Quotes are honoured and the scope stays in writing.",
      },
      {
        q: "How long until a first version in production?",
        a: "The timeline depends on the scope validated during scoping. We split the mission into releases: you see a usable solution as early as possible, then regular updates.",
      },
      {
        q: "Who owns the source code?",
        a: "What you pay for is yours: the deliverable includes source code, documentation and knowledge transfer. The exact terms are written in the service contract.",
      },
      {
        q: "What happens after production?",
        a: "The solution stays alive: fixes, evolutions and monitoring, through an evolution package or a managed IT contract. Our method plans this step during scoping, not as an afterthought.",
      },
    ],
    cta: {
      kicker: "Software development",
      title: "A solution to build?",
      text: "Describe your project: scoping and firm quote within one business day.",
      button: "Start a project",
    },
  },
  iaentreprise: {
    kicker: "TECHPAL AI",
    title: "Enterprise AI integration.",
    intro:
      "Assistants built on your internal data and measurable automation of your processes: carefully scoped use cases, architecture inside your perimeter, human validation at every step.",
    heroWords: ["Assistants on your data", "Document automation", "Decision support", "Semantic search"],
    heroHint: "Scoped use cases, measured gains",
    anchor: "The use cases",
    usecasesKicker: "The use cases",
    usecasesTitle: "Three use-case families, already delivered.",
    usecases: [
      {
        title: "Document assistants",
        text: "Ask your internal documents in natural language: semantic search, summaries and answers citing their source.",
      },
      {
        title: "Process automation",
        text: "Document data extraction, routing, matching: repetitive tasks move to controlled workflows.",
      },
      {
        title: "Decision support",
        text: "Indicators, alerts and analysis prepared by AI agents, validated by your teams before any action.",
      },
    ],
    processKicker: "How a useful AI is scoped",
    processTitle: "Four steps, from use case to measured gain.",
    process: [
      { title: "Use case & measurement", text: "One high-value case, identified data, a success metric defined before any development." },
      { title: "Measured prototype", text: "A restricted prototype on your real data, evaluated with you on precise situations." },
      { title: "Controlled integration", text: "Connection to your tools within your security perimeter, without exposing sensitive documents." },
      { title: "Monitoring & gains", text: "Human validation of sensitive actions, gains tracked week after week." },
    ],
    stats: [
      { value: "3", label: "Use-case families delivered" },
      { value: "< 24 h", label: "Scoping reply within 24 business hours" },
      { value: "FR·EN·AR", label: "A trilingual team" },
      { value: "2022", label: "Founded in Casablanca" },
    ],
    includedKicker: "Confidentiality & framework",
    includedTitle: "Your data stays inside your perimeter.",
    included: [
      {
        title: "Architecture inside your environment",
        text: "Connections go through your accounts and your permissions; access is documented, limited and revocable.",
      },
      {
        title: "Written scope",
        text: "Every use case is scoped in writing: data used, system limits and success metric.",
      },
      {
        title: "Human validation",
        text: "Deliverables are designed so your teams verify and decide: nothing essential is left uncontrolled.",
      },
      {
        title: "Limits stated plainly",
        text: "No unmeasured success rates are promised: the prototype exists to measure first, industrialize after.",
      },
    ],
    crossKicker: "Complete your setup",
    crossTitle: "One page per need.",
    crossIntro: "AI integration works hand in hand with:",
    cross: [
      { title: "Custom development", desc: "The solution hosting your AI use cases, when existing tools are not enough.", href: "/developpement-logiciel-sur-mesure" },
      { title: "Managed IT & maintenance", desc: "Monitoring of the infrastructure your AI runs on.", href: "/infogerance-informatique-casablanca" },
      { title: "IT staffing", desc: "Data and AI profiles to reinforce your internal projects.", href: "/staffing" },
    ],
    faqKicker: "FAQ",
    faqTitle: "Frequently asked questions.",
    faq: [
      {
        q: "How can AI be integrated with internal data without exposing sensitive information?",
        a: "Step by step: a restricted prototype first, on selected data, with documented and revocable access, answers citing their sources, and human validation on sensitive actions. Everything is scoped in writing before development.",
      },
      {
        q: "What is a document AI assistant (RAG)?",
        a: "A system that first searches inside your internal documents, then writes its answer from the passages found, citing the source. Your document base remains the reference, not the model's general knowledge.",
      },
      {
        q: "Which tools can be connected?",
        a: "Your document bases, ERP, messaging and business tools, through their APIs and under your permissions. The exact connection perimeter is set during scoping: nothing is open by default.",
      },
      {
        q: "What return on investment should we expect?",
        a: "ROI is measured, not promised: the prototype measures time saved and volume processed on real cases. The resulting numbers decide whether to industrialize.",
      },
      {
        q: "Will AI replace our teams?",
        a: "No: it prepares, searches and automates repetitive tasks. Your teams keep validation and decision-making, save time, and focus on cases that require judgement.",
      },
    ],
    cta: {
      kicker: "TECHPAL AI",
      title: "A use case in mind?",
      text: "Describe your data and your goal: feasibility and firm quote within one business day.",
      button: "Scope my use case",
    },
  },
  infogerance: {
    kicker: "Managed IT",
    title: "Managed IT services in Casablanca.",
    intro:
      "One point of contact for the support, maintenance and supervision of your IT. Your teams focus on their business, we handle the rest.",
    heroWords: ["Helpdesk", "Maintenance", "Supervision", "Continuity"],
    heroHint: "Reply within one business day",
    anchor: "The scope",
    scopeKicker: "The scope",
    scopeTitle: "Three dimensions, one contract.",
    scope: [
      {
        title: "User support",
        text: "A single entry point (phone, email, ticket) for your employees' incidents and requests, tracked through to resolution.",
      },
      {
        title: "Maintenance & interventions",
        text: "Updates, patches, backups and on-site interventions for your workstations, servers and network equipment.",
      },
      {
        title: "Supervision & alerts",
        text: "Continuous monitoring of your infrastructure with alerts before outages and response triggered by severity.",
      },
    ],
    processKicker: "How a contract starts",
    processTitle: "Four steps, from audit to reporting.",
    process: [
      { title: "IT audit", text: "Inventory of your workstations, servers, network and licenses. With no strings attached." },
      { title: "Written scope", text: "Terms, service levels and responsibilities set out in writing in the contract." },
      { title: "Go-live", text: "Support channel opened, documented access and onboarding for your teams." },
      { title: "Tracking & reporting", text: "Monthly review: incidents handled, interventions, recommendations and improvements." },
    ],
    stats: [
      { value: "< 24 h", label: "Reply committed within 24 business hours" },
      { value: "24/7", label: "Supervision of managed service contracts" },
      { value: "1", label: "Single point of contact for all your IT" },
      { value: "FR·EN·AR", label: "A trilingual team" },
    ],
    includedKicker: "Inside the contract",
    includedTitle: "Written, measurable, no hidden commitment.",
    included: [
      {
        title: "Response commitment",
        text: "Support answered within 24 business hours, with escalation defined by severity.",
      },
      {
        title: "On-site interventions",
        text: "Scheduled visits as well as emergency call-outs depending on the criticality of the incident.",
      },
      {
        title: "Documentation & access",
        text: "Your estate stays documented on your side. Full handover of access and documentation when the contract ends.",
      },
      {
        title: "Continuous improvement",
        text: "Hardware and software recommendations drawn from the monthly report, at your own pace.",
      },
    ],
    crossKicker: "Complete your setup",
    crossTitle: "One page per need.",
    crossIntro: "Managed IT works hand in hand with:",
    cross: [
      { title: "Products & networks", desc: "Supply, installation and licenses to equip your fleet.", href: "/produits" },
      { title: "AI integration", desc: "Automate repetitive tasks in your support and documents.", href: "/ia" },
      { title: "IT staffing", desc: "Temporarily reinforce your in-house IT teams.", href: "/staffing" },
    ],
    faqKicker: "FAQ",
    faqTitle: "Frequently asked questions.",
    faq: [
      {
        q: "What is managed IT services?",
        a: "Handing over the day-to-day running of your IT to a provider: user support, workstation and server maintenance, infrastructure monitoring and regular reporting. You keep control of the strategy, we execute and document.",
      },
      {
        q: "How much does a managed IT contract cost in Morocco?",
        a: "Pricing depends on the scope: number of workstations, servers, sites and service levels. After a free audit, we issue a firm quote with no hidden cost. Nothing is committed before the scope is agreed in writing.",
      },
      {
        q: "Which environments do you support?",
        a: "Workstations, servers, corporate networks, cloud environments (Microsoft 365, AWS, Azure) and hardware supplied by TECHPAL. Specific tools are reviewed case by case.",
      },
      {
        q: "Is supervision available 24/7?",
        a: "Yes, infrastructure supervision runs continuously on managed service contracts. Interventions are triggered by alert severity, and support replies are committed within 24 business hours.",
      },
      {
        q: "What happens at the end of the contract?",
        a: "Full handover: documentation, access, intervention history and knowledge transfer. No lock-in.",
      },
    ],
    cta: {
      kicker: "Managed IT",
      title: "A fleet to stabilize?",
      text: "Describe your environment: free audit and firm quote within one business day.",
      button: "Request an IT audit",
    },
  },
  odoo: {
    kicker: "Odoo integration",
    title: "Odoo integration for your business.",
    intro:
      "A modular ERP to run sales, purchasing, inventory, accounting and HR on a single system: configuration around your processes, custom development when standard modules are not enough.",
    heroWords: ["Module configuration", "Custom module development", "Data migration", "Team training"],
    heroHint: "An ERP that follows your processes",
    anchor: "The deliverables",
    deliverablesKicker: "The deliverables",
    deliverablesTitle: "From the standard backbone to custom development.",
    deliverables: [
      {
        title: "Deployment & configuration",
        text: "Module selection (CRM, sales, purchasing, inventory, accounting, HR) and configuration around your real processes, not a generic template.",
      },
      {
        title: "Custom development",
        text: "When the standard does not cover your need: modules built on the Odoo backbone, integrated with the existing interface.",
      },
      {
        title: "Migration, training & integrations",
        text: "Migration of your data, connection to existing tools through their APIs, and training for teams on their day-to-day use.",
      },
    ],
    processKicker: "The method",
    processTitle: "Five steps, from scoping to support.",
    process: [
      { title: "Analysis & scoping", text: "Your processes written as they actually run, edition and modules chosen for your case." },
      { title: "Configuration", text: "Selected modules configured and adjusted through workshops with your teams." },
      { title: "Custom development", text: "Needs not covered by the standard are developed and tested in your environment." },
      { title: "Migration & training", text: "Existing data migrated and verified in the tool, users trained by role." },
      { title: "Go-live & support", text: "Supported go-live, then fixes, evolutions and monitoring under the chosen contract." },
    ],
    stats: [
      { value: "4/7", label: "Solution families delivered on the Odoo backbone" },
      { value: "2022", label: "Founded in Casablanca" },
      { value: "< 24 h", label: "Firm quote within 24 business hours" },
      { value: "FR·EN·AR", label: "A trilingual team" },
    ],
    includedKicker: "Inside the mission",
    includedTitle: "Written scope, migrated data, trained teams.",
    included: [
      {
        title: "Documented module selection",
        text: "The scope is written before configuration starts: modules retained, standard limits, planned developments.",
      },
      {
        title: "Tested migration",
        text: "Your existing data is migrated and verified inside the tool before go-live, not after.",
      },
      {
        title: "User training",
        text: "Each team learns its own journey in the tool: sales, inventory, accounting, management.",
      },
      {
        title: "Code & documentation",
        text: "Custom developments are delivered with their source code and documentation.",
      },
    ],
    crossKicker: "Complete your setup",
    crossTitle: "One page per need.",
    crossIntro: "Odoo integration works hand in hand with:",
    cross: [
      { title: "Custom development", desc: "When a need goes beyond the ERP: a dedicated application around Odoo.", href: "/developpement-logiciel-sur-mesure" },
      { title: "Managed IT & maintenance", desc: "Monitoring and maintenance of the environment after go-live.", href: "/infogerance-informatique-casablanca" },
      { title: "IT staffing", desc: "Odoo profiles to reinforce your in-house teams.", href: "/staffing" },
    ],
    faqKicker: "FAQ",
    faqTitle: "Frequently asked questions.",
    faq: [
      {
        q: "Why choose Odoo as the ERP for a company in Morocco?",
        a: "Odoo is a modular ERP: you activate the modules you need (CRM, sales, inventory, accounting, HR) and the others stay out of your way. The open-source backbone also allows custom development, so you avoid switching systems at the first non-standard need.",
      },
      {
        q: "Which Odoo edition should I choose, Community or Enterprise?",
        a: "Community is the open-source version; Enterprise adds modules and services under an editor subscription. The choice is made during scoping: we first list the functions your organization actually needs, then the edition follows.",
      },
      {
        q: "How much does an Odoo integration cost?",
        a: "Cost depends on the scope: activated modules, custom developments, volume of data to migrate, and training. After scoping, we issue a firm quote with no hidden cost.",
      },
      {
        q: "Can Odoo be connected to our other tools?",
        a: "Yes: Odoo exposes APIs to connect it to your e-commerce, messaging or business tools. The exact connection perimeter is written during scoping; nothing is open by default.",
      },
      {
        q: "What happens after go-live?",
        a: "Support starts at go-live: fixes and evolutions under the chosen contract, and 24/7 monitoring if you take a managed IT contract. Custom developments stay documented so you never depend on anyone by accident.",
      },
    ],
    cta: {
      kicker: "Odoo integration",
      title: "An ERP to deploy?",
      text: "Describe your processes and current tools: scoping and firm quote within one business day.",
      button: "Scope my Odoo project",
    },
  },
  infrastructure: {
    kicker: "Infrastructure & hardware",
    title: "Network infrastructure and IT hardware.",
    intro:
      "Enterprise network, cabling, workstations and servers, supplied and installed then maintained: a setup sized to last, documented and monitored.",
    heroWords: ["Cabling & switching", "Enterprise Wi-Fi", "Firewalls & segmentation", "Workstations & servers"],
    heroHint: "Supplied, deployed, maintained",
    anchor: "The deliverables",
    deliverablesKicker: "The deliverables",
    deliverablesTitle: "A reliable network, an equipped fleet, a maintained setup.",
    deliverables: [
      {
        title: "Enterprise network",
        text: "Switching, enterprise Wi-Fi, firewalls and segmentation: a reliable, segmented network, sized for your usage.",
      },
      {
        title: "Hardware & IT fleet",
        text: "Workstations, screens, printers, servers and storage: hardware from partner brands, prepared then deployed, with the full catalogue on the Hardware page.",
      },
      {
        title: "Keeping it operational",
        text: "Corrective and preventive maintenance, equipment replacement and monitoring of the setup under a managed IT contract.",
      },
    ],
    processKicker: "The method",
    processTitle: "Five steps, from site survey to a maintained fleet.",
    process: [
      { title: "Site survey", text: "Your existing fleet, network topology and constraints recorded: what holds, what limits, what costs." },
      { title: "Infrastructure design", text: "Diagram and hardware selection, sized for your volumes and expected growth." },
      { title: "Supply & deployment", text: "Equipment installation, configuration and progressive commissioning, without cutting your usage longer than necessary." },
      { title: "Handover & documentation", text: "Verified fleet inventory, network diagram and administration guides delivered." },
      { title: "Maintenance & monitoring", text: "Fixes, planned renewal, and 24/7 monitoring if you choose a managed IT contract." },
    ],
    stats: [
      { value: "2022", label: "Founded in Casablanca" },
      { value: "< 24 h", label: "Firm quote within 24 business hours" },
      { value: "24/7", label: "Monitoring of managed IT contracts" },
      { value: "FR·EN·AR", label: "A trilingual team" },
    ],
    includedKicker: "Inside the mission",
    includedTitle: "A documented fleet, a segmented network, one single contact.",
    included: [
      {
        title: "Fleet inventory",
        text: "Workstations, licences, network equipment and warranty periods tracked in an up-to-date inventory.",
      },
      {
        title: "Segmented network",
        text: "Segmentation rules written at design time, so every use stays isolated: guests, production, management.",
      },
      {
        title: "One single contact",
        text: "From supply to maintenance, one single team answers for the setup: no ping-pong between providers.",
      },
      {
        title: "Documentation delivered",
        text: "Network diagram and administration procedures handed over with the deployment: your fleet stays understandable, not a black box.",
      },
    ],
    crossKicker: "Complete your setup",
    crossTitle: "One page per need.",
    crossIntro: "Infrastructure works hand in hand with:",
    cross: [
      { title: "Managed IT & monitoring", desc: "Your infrastructures monitored 24/7 under a managed IT contract.", href: "/infogerance-informatique-casablanca" },
      { title: "Hardware catalogue", desc: "Computers, printing, network and servers: the full range.", href: "/produits" },
      { title: "IT staffing", desc: "A network technician to reinforce your teams during the projects.", href: "/staffing" },
    ],
    faqKicker: "FAQ",
    faqTitle: "Frequently asked questions.",
    faq: [
      {
        q: "What does a company's network infrastructure and IT hardware cover?",
        a: "The network on one side: cabling, switches, Wi-Fi, firewalls. The fleet on the other: workstations, screens, printers, servers. We handle these end to end, from supply to maintenance, with one single contact.",
      },
      {
        q: "Do you supply IT hardware?",
        a: "Yes: workstations, printing, network and servers, from a catalogue of partner brands detailed on the Hardware page. Each piece of equipment is prepared then deployed in your environment.",
      },
      {
        q: "Do you handle cabling and network deployment?",
        a: "Yes: deployment starts from a site survey (cabling plan, rack location, Wi-Fi access points). The exact scope of work is written in the quote, with no hidden cost.",
      },
      {
        q: "Does 24/7 monitoring cover my new network?",
        a: "It applies to the equipment integrated into the setup when a managed IT contract is signed. Otherwise, maintenance follows the framework agreed in the contract, with the same written commitments.",
      },
      {
        q: "Do we have to replace the whole fleet at once?",
        a: "No. The site survey separates what can be kept from what limits: renewal happens step by step, following a roadmap drawn up with you.",
      },
    ],
    cta: {
      kicker: "Infrastructure & hardware",
      title: "A fleet to equip or a network to deploy?",
      text: "Describe your current situation: site survey and firm quote within one business day.",
      button: "Scope my infrastructure",
    },
  },
  ia: {
    kicker: "TECHPAL AI",
    title: "AI in production, not on display.",
    intro: "Concrete, measurable use cases, deployed for our clients.",
    heroWords: ["Assistants over your data", "Document automation", "Decision agents", "Semantic search"],
    heroHint: "Live neural network · move your cursor",
    sections: [
      {
        id: "integration",
        title: "AI integration",
        text: "Models connected to your tools and your data, without disrupting what already runs.",
        items: ["Assistants over your data", "Document search", "APIs & workflows"],
      },
      {
        id: "automatisation",
        title: "Automation",
        text: "Repetitive tasks handled automatically, with fewer errors.",
        items: ["Document processing", "Business workflows", "Automated reporting"],
      },
      {
        id: "applications",
        title: "Intelligent applications",
        text: "AI at the heart of the solution: recommendation, prediction, decision.",
        items: ["Decision support", "Detection & prediction", "Conversational interfaces"],
      },
    ],
    casesKicker: "Our AI work",
    casesTitle: "Delivered use cases.",
    casesIntro: "Production-proven use cases, delivered under confidentiality agreements.",
    cases: [
      {
        title: "Document assistant",
        text: "Application to query an internal knowledge base: semantic search, summaries and cited answers.",
        tag: "RAG · LLM",
      },
      {
        title: "Back-office automation",
        text: "Automatic document extraction and processing, integrated with the company's business tools.",
        tag: "OCR · Workflows",
      },
      {
        title: "Decision-support agent",
        text: "Predictive analysis and automatic alerts to steer day-to-day operations.",
        tag: "ML · Prediction",
      },
    ],
    stackTitle: "The tech stack we use.",
    viz: {
      chatUser: "What is the status of claim #4521?",
      chatAi: [
        "Cited answer: clause 4.2, page 12 of the 2024 contract - 15,000 MAD/month cap.",
        "An expert review was consulted, the full history is attached.",
      ],
      files: ["invoice_2024.pdf", "purchase_order.pdf", "contract_v3.pdf"],
      chartLeft: "T + 0",
      chartRight: "T + 4",
      chartAlert: "predicted alert",
    },
    stack: [
      { name: "LangChain", logo: "/ai/langchain.svg" },
      { name: "Python", logo: "/ai/python.svg" },
      { name: "Next.js", logo: "/ai/nextjs.svg" },
      { name: "OpenAI", logo: "/ai/openai.svg" },
      { name: "AWS", logo: "/ai/aws.svg" },
      { name: "Kubernetes", logo: "/ai/kubernetes.svg" },
      { name: "PyTorch", logo: "/ai/pytorch.svg" },
      { name: "Hugging Face", logo: "/ai/huggingface.svg" },
      { name: "Claude", logo: "/ai/claude.svg" },
      { name: "Gemini", logo: "/ai/gemini.svg" },
    ],
    ctaTitle: "An AI use case to explore?",
    ctaText: "Describe your need: feasibility and return on investment assessed within 24 business hours.",
    cta: "Discuss your project",
  },
  produits: {
    kicker: "Hardware",
    title: "IT hardware & products, supplied and maintained.",
    intro:
      "Supply, installation and maintenance of your hardware, by product family, with a single point of contact.",
    heroWords: ["Computers", "Printing", "Network & security", "Servers & data center", "Video surveillance", "Software & licenses", "Accessories"],
    heroHint: "Supplied, installed, maintained - one point of contact",
    anchor: "The full range",
    brandsLabel: "Partner brands",
    typesLabel: "Product lines",
    categories: [
      {
        id: "ordinateurs",
        title: "Computers",
        text: "Complete workstation equipment, supplied, installed and warranted.",
        types: ["Laptops", "Desktops", "All-in-one", "Monitors"],
        brands: [
          { name: "HP", logo: "/tech/hp.svg" },
          { name: "Dell", logo: "/tech/dell.svg" },
          { name: "Lenovo", logo: "/brands/lenovo.svg" },
          { name: "Asus", logo: "/brands/asus.svg" },
        ],
      },
      {
        id: "impression",
        title: "Printing & supplies",
        text: "A print fleet sized to your volumes, toners and maintenance included.",
        types: ["Printer", "Copier", "Scanner", "Plotter", "Supplies"],
        brands: [
          { name: "Canon", logo: "/brands/canon.png" },
          { name: "Brother", logo: "/brands/brother.svg" },
          { name: "Epson", logo: "/brands/epson.svg" },
          { name: "HP", logo: "/tech/hp.svg" },
        ],
      },
      {
        id: "reseau",
        title: "Network & security",
        text: "Switching, enterprise Wi-Fi, firewalls: a reliable, segmented infrastructure.",
        types: ["Switch", "Router", "Access point", "Network security"],
        brands: [
          { name: "Cisco", logo: "/tech/cisco.svg" },
          { name: "Fortinet", logo: "/tech/fortinet.svg" },
          { name: "Ubiquiti", logo: "/tech/ubiquiti.svg" },
          { name: "Huawei", logo: "/brands/huawei.svg" },
        ],
      },
      {
        id: "serveurs",
        title: "Servers, storage & data center",
        text: "Server rooms, NAS storage, racks and backup, sized and operated.",
        types: ["Server", "Hyper-converged", "Rack & PDU", "KVM", "Storage", "Backup"],
        brands: [
          { name: "Dell", logo: "/tech/dell.svg" },
          { name: "APC", logo: "/brands/apc.png" },
          { name: "Synology", logo: "/brands/synology.svg" },
          { name: "QNAP", logo: "/brands/qnap.svg" },
        ],
      },
      {
        id: "videosurveillance",
        title: "Video surveillance",
        text: "IP cameras and NVR recording for the security of your sites.",
        types: ["Surveillance camera", "Recording unit"],
        brands: [{ name: "Hikvision", logo: "/brands/hikvision.svg" }],
      },
      {
        id: "logiciels",
        title: "Software & licenses",
        text: "OEM licenses, cloud suites and security, activated and managed.",
        types: ["Microsoft OEM", "Cloud suite", "Antivirus"],
        brands: [
          { name: "Microsoft", logo: "/brands/microsoft.svg" },
          { name: "Microsoft 365", logo: "/tech/microsoft-365.svg" },
        ],
      },
      {
        id: "accessoires",
        title: "Accessories & peripherals",
        text: "All the everyday equipment: peripherals, memory, cabling.",
        types: ["Cables", "Hard drives", "Memory", "Keyboards & mice", "Webcams", "Audio"],
        brands: [
          { name: "Logitech", logo: "/brands/logitech.svg" },
          { name: "ADATA", logo: "/brands/adata.png" },
        ],
      },
    ],
    servicesTitle: "Our support",
    services: ["Advisory and sizing", "Supply and installation", "Maintenance and replacement", "Fleet managed services"],
    ctaTitle: "Need a hardware quote?",
    ctaText: "Describe your fleet or project: firm free quote within 24 business hours.",
    cta: "Request a quote",
  },
  about: {
    kicker: "About",
    title: "An IT partner that thinks solution.",
    intro:
      "TECHPAL brings together software engineering and the traditional IT trades to give businesses a single partner, from the workstation to the digital solution.",
    heroWords: ["Rigor", "Proximity", "Transparency", "Reliability"],
    heroHint: "From the workstation to the digital solution",
    anchor: "Our values",
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
      { name: "Abdelhadi Laasi", role: "Web developer & Odoo", photo: "/team/abdelhadi-laasi.png", tags: ["Fullstack", "Odoo", "ERP"] },
      { name: "Aymane Ahmimou", role: "R&D engineer - mobile & AI", photo: "/team/aymane-ahmimou.jpeg", tags: ["Mobile", "AI", "R&D"] },
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
    intro: "Describe your need - we get back to you within 24 business hours.",
    heroWords: ["Reply within 24 h", "30 min brief", "Detailed quote", "No strings attached"],
    heroHint: "Casablanca - Monday to Friday, 9am-6pm",
    formLabel: "Open the form",
    infoTitle: "Details",
    form: {
      name: "Full name",
      email: "Work email",
      company: "Company",
      message: "Your message",
      messagePh: "Describe your need in a few lines…",
      send: "Send request",
      note: "Replies within 24 business hours. Your information stays confidential.",
      consent: "I agree to TECHPAL processing my details to handle my request, in accordance with the Privacy Policy.",
      sending: "Sending…",
      success: "Message sent - we will get back to you shortly.",
      error: "Sending failed. Please try again or write to us directly.",
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
      title: "TECHPAL – Custom Software Development, AI & Managed IT in Casablanca",
      description:
        "Digital engineering in Casablanca: custom software, AI, cloud, networks, support, and managed IT services for companies in Morocco. Reply within 24h.",
    },
    expertise: {
      title: "Expertise: Software, AI, Cloud & Managed IT in Casablanca | TECHPAL",
      description: "Software engineering, AI, cloud, networks, support, and managed IT services in Casablanca. Six practices built for production.",
    },
    staffing: {
      title: "IT Staffing & Team Augmentation in Casablanca | TECHPAL",
      description: "Pre-vetted IT talent embedded in your teams: developers, data, cloud, and support in Morocco. Profiles ready within 48 business hours.",
    },
    infogerance: {
      title: "Managed IT Services in Casablanca | TECHPAL",
      description:
        "Managed IT & support for companies in Casablanca and Morocco: helpdesk, maintenance, monitoring. Free audit, firm quote.",
    },
    developpement: {
      title: "Custom Software Development in Morocco | TECHPAL",
      description:
        "Custom web, mobile, and business applications: scoping, development, and maintenance in Casablanca. Free scoping, firm quote.",
    },
    iaentreprise: {
      title: "Enterprise AI Integration in Morocco | TECHPAL",
      description:
        "Bring AI to your processes and business data: document assistants, automation, and decision support in Casablanca.",
    },
    odoo: {
      title: "Odoo Integration in Morocco | TECHPAL",
      description:
        "Odoo integration in Casablanca and Morocco: module configuration, custom development, data migration, and team training. Firm quote.",
    },
    infrastructure: {
      title: "Network Infrastructure & IT Hardware in Morocco | TECHPAL",
      description:
        "Enterprise network, cabling, workstations, and servers: supply, installation, and maintenance in Casablanca. Free survey, firm quote.",
    },
    projets: {
      title: "Work: 7 Solution Families in Production | TECHPAL",
      description: "TECHPAL solution families: mobile marketplaces, e-commerce, booking, VR serious games, ERP, e-learning, and HRIS, delivered in Casablanca and Morocco.",
    },
    ia: {
      title: "Artificial Intelligence & Automation in Production | TECHPAL",
      description: "Generative AI, RAG, business process automation, and intelligent agents deployed for enterprises in Casablanca.",
    },
    produits: {
      title: "IT Hardware, Networking & Licensing in Casablanca | TECHPAL",
      description: "Supply, installation, and maintenance of enterprise hardware & network infrastructure: Dell, HP, Cisco, Fortinet, Ubiquiti, Microsoft 365, AWS, Azure.",
    },
    apropos: {
      title: "About TECHPAL | Digital Engineering Firm in Casablanca",
      description: "TECHPAL supports organizations across Morocco with tailored software development, cloud modernization, and managed IT services since 2022.",
    },
    contact: {
      title: "Contact & Quote Request | TECHPAL Casablanca",
      description: "Tell us about your software or IT infrastructure project in Casablanca. Free estimate and reply within 24 business hours.",
    },
    mentions: {
      title: "Legal Notice | TECHPAL Casablanca",
      description: "Legal notice, publisher and hosting details for TECHPAL in Casablanca, Morocco.",
    },
    confidentialite: {
      title: "Privacy Policy | TECHPAL",
      description: "Personal data protection policy of TECHPAL under Moroccan Law 09-08 - TECHPAL.",
    },
  },
};

export default en;
