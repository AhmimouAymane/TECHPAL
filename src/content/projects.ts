/**
 * Réalisations - 7 familles de solutions généralisées.
 * Présentation volontairement anonymisée : aucune mission n'est associée à un client.
 */
export type Project = {
  slug: string;
  placeholder?: boolean;
  titleFr: string;
  titleEn: string;
  categoryFr: string;
  categoryEn: string;
  summaryFr: string;
  summaryEn: string;
  type: string;
  scope: string[];
  stack: string[];
  date: string;
  image?: string;
  href?: string;
  confidential?: boolean;
  storyFr?: string[];
  storyEn?: string[];
  pointsFr?: string[];
  pointsEn?: string[];
};

export const projects: Project[] = [
  {
    slug: "marketplaces",
    image: "/projets/marketplaces.jpg",
    titleFr: "Marketplaces & apps mobiles",
    titleEn: "Marketplaces & mobile apps",
    categoryFr: "Application mobile",
    categoryEn: "Mobile application",
    summaryFr:
      "Vendre et échanger depuis une app iOS/Android : marketplace complète avec catalogue, messagerie intégrée, paiements sécurisés et back-office pour piloter l'activité sans développeur.",
    summaryEn:
      "Sell and exchange from an iOS/Android app: a full marketplace with catalogue, built-in messaging, secure payments and a back-office to run the business without a developer.",
    type: "app",
    scope: ["UI/UX", "Mobile", "Backend", "Paiements", "Infrastructure"],
    stack: ["Flutter", "NestJS", "PostgreSQL", "Redis", "AWS"],
    date: "2026",
    storyFr: [
      "Nous construisons ce type de plateforme de bout en bout : expérience mobile, API backend et infrastructure cloud, par la même équipe. La base de code unique Flutter couvre iOS et Android, pendant que l'API NestJS porte le catalogue, les commandes et les paiements.",
      "Recherche instantanée, messagerie entre utilisateurs, notifications et back-office d'administration : chaque brique est testée de bout en bout et documentée. Résultat : une app qui tient la charge des pics de trafic, et une équipe interne qui pilote le quotidien sans développeur.",
    ],
    storyEn: [
      "We build these platforms end to end: mobile experience, backend API and cloud infrastructure, delivered by one team. A single Flutter codebase covers iOS and Android, while the NestJS API powers the catalogue, orders and payments.",
      "Instant search, user-to-user messaging, notifications and an admin back-office: every part is tested end to end and documented. The result: an app that handles traffic spikes and an in-house team that runs the day-to-day without a developer.",
    ],
    pointsFr: [
      "App mobile Flutter iOS/Android : catalogue, favoris, messagerie intégrée",
      "API backend modulaire : authentification, annonces, commandes, paiements",
      "Recherche instantanée et filtres avancés sur le catalogue",
      "Paiement en ligne et suivi de commande",
      "Back-office : modération, statistiques, gestion des utilisateurs",
      "Infrastructure cloud : déploiement CI/CD, logs et supervision",
    ],
    pointsEn: [
      "Flutter iOS/Android app: catalogue, favorites, built-in messaging",
      "Modular backend API: authentication, listings, orders, payments",
      "Instant search and advanced catalogue filters",
      "Online payments and order tracking",
      "Back-office: moderation, analytics, user management",
      "Cloud infrastructure: CI/CD deployment, logs and monitoring",
    ],
  },
  {
    slug: "e-commerce",
    image: "/projets/e-commerce.jpg",
    titleFr: "E-commerce & gestion intégrée",
    titleEn: "E-commerce & integrated management",
    categoryFr: "Site web · E-Commerce",
    categoryEn: "Website · E-Commerce",
    summaryFr:
      "Un site de vente en ligne connecté directement à la gestion de l'entreprise : catalogue centralisé, stocks, commandes et CRM dans un même système.",
    summaryEn:
      "An online store connected directly to the company's business management: centralized catalogue, stock, orders and CRM in a single system.",
    type: "web",
    scope: ["E-Commerce", "Catalogue produits", "Stocks", "CRM"],
    stack: ["Odoo", "PostgreSQL", "JavaScript"],
    date: "2025",
    storyFr: [
      "Nous connectons l'expérience d'achat en ligne aux processus internes de gestion : le site vit dans le même système que les produits, les stocks et les ventes. Les informations commerciales restent uniques - pas de doubles saisies entre la boutique et le back-office.",
      "Catalogue centralisé, suivi des disponibilités, commandes enregistrées et pilotage commercial : le socle ERP porte le site, et le site alimente l'ERP en temps réel. Les équipes gagnent une vision unique de leur activité.",
    ],
    storyEn: [
      "We connect the online shopping experience to internal business processes: the storefront lives in the same system as products, stock and sales. Business information stays unique - no double entry between the store and the back-office.",
      "Centralized catalogue, availability tracking, recorded orders and sales management: the ERP backbone powers the site, and the site feeds the ERP in real time. Teams get a single view of their business.",
    ],
    pointsFr: [
      "Boutique en ligne : présentation des produits et parcours d'achat",
      "Catalogue centralisé : fiches produits, descriptions, prix",
      "Gestion des stocks : disponibilités et quantités en temps réel",
      "Commandes : enregistrement et suivi depuis le site",
      "CRM intégré : informations clients et suivi des activités commerciales",
      "Un seul socle : site e-commerce et gestion sur la même base de données",
    ],
    pointsEn: [
      "Online store: product presentation and buying journey",
      "Centralized catalogue: product sheets, descriptions, prices",
      "Stock management: availability and quantities in real time",
      "Orders: recording and tracking from the website",
      "Integrated CRM: customer information and sales activity tracking",
      "One backbone: e-commerce site and management on the same database",
    ],
  },
  {
    slug: "reservation",
    image: "/projets/reservation.jpg",
    titleFr: "Réservation & rendez-vous en ligne",
    titleEn: "Online booking & appointments",
    categoryFr: "Mobile + Web",
    categoryEn: "Mobile + Web",
    summaryFr:
      "Prendre, gérer et suivre des rendez-vous en ligne : une app pour les clients, un espace web pour les gérants, et une API backend qui orchestre agenda, plannings et rappels.",
    summaryEn:
      "Book, manage and track appointments online: a client app, a web space for managers, and a backend API orchestrating agendas, schedules and reminders.",
    type: "app",
    scope: ["Mobile", "Web", "Backend", "Notifications", "Intégrations"],
    stack: ["Flutter", "FastAPI", "PostgreSQL", "Docker"],
    date: "2026",
    storyFr: [
      "Nous développons ce type de plateforme en deux applications jumelles : une pour les clients, simple et guidée - catalogue des prestations, réservation 24/7, historique - et une pour les gérants, qui couvre l'agenda du jour, les plannings d'équipe et les fiches clients.",
      "L'API backend orchestre les disponibilités multi-employés, les confirmations et les rappels automatiques, avec intégration de messagerie instantanée pour réduire les rendez-vous manqués. L'architecture est pensée pour passer de quelques dizaines à plusieurs milliers d'établissements sans réécriture.",
    ],
    storyEn: [
      "We build these platforms as two twin applications: one for clients, simple and guided - service catalogue, 24/7 booking, history - and one for managers, covering today's agenda, team schedules and client records.",
      "The backend API orchestrates multi-employee availability, confirmations and automatic reminders, with instant messaging integration to cut missed appointments. The architecture is designed to scale from a few dozen to several thousand venues without a rewrite.",
    ],
    pointsFr: [
      "App clientes : catalogue des prestations, réservation 24/7, rappels et historique",
      "Espace gérants : agenda du jour, rendez-vous à confirmer, plannings d'équipe",
      "API backend : disponibilités multi-employés, confirmations et notifications",
      "Rappels automatiques et messagerie instantanée pour réduire les no-shows",
      "Suivi des paiements : à venir, encaissé, à relancer",
      "Onboarding guidé : inscription, vérification, configuration, publication",
    ],
    pointsEn: [
      "Client app: service catalogue, 24/7 booking, reminders and history",
      "Manager space: today's agenda, appointments to confirm, team schedules",
      "Backend API: multi-employee availability, confirmations and notifications",
      "Automatic reminders and instant messaging to cut no-shows",
      "Payment tracking: upcoming, collected, to follow up",
      "Guided onboarding: registration, verification, setup, publication",
    ],
  },
  {
    slug: "formation-immersive",
    image: "/projets/formation-immersive.jpg",
    titleFr: "Formation immersive - serious games",
    titleEn: "Immersive training - serious games",
    categoryFr: "Jeu sérieux · VR & PC",
    categoryEn: "Serious game · VR & PC",
    summaryFr:
      "Transformer protocoles et gestes techniques en entraînement actif : serious games autonomes, jouables en VR et sur PC, qui reproduisent les scénarios réels sans aucun risque.",
    summaryEn:
      "Turn protocols and technical procedures into active practice: standalone serious games, playable in VR and on PC, reproducing real scenarios with zero risk.",
    type: "game",
    scope: ["Game design", "Unity", "VR", "PC", "Gamification"],
    stack: ["Unity", "C#", "Meta Quest", "Windows"],
    date: "2025",
    storyFr: [
      "Nous conçevons des serious games qui font apprendre en manipulant : le stagiaire s'exerce directement à un poste, un équipement ou une procédure, échoue sans conséquence et recommence jusqu'à la maîtrise. Chaque scène reproduit les situations réelles de prévention et d'intervention.",
      "Jouable en VR pour l'immersion et en version PC pour les sessions sans casque, l'expérience reste strictement identique : mêmes gestes, mêmes consignes, évaluation en temps réel. Le contenu est paramétrable pour s'adapter aux procédures internes de chaque environnement de travail.",
    ],
    storyEn: [
      "We design serious games that teach through doing: trainees practice directly on a task, an equipment or a procedure, fail without consequence and repeat until they master it. Every scene reproduces real prevention and response situations.",
      "Playable in VR for immersion and as a PC version for sessions without a headset, the experience stays strictly identical: same gestures, same rules, real-time assessment. Content is configurable to match each workplace's internal procedures.",
    ],
    pointsFr: [
      "Jeu sérieux autonome : jouable en VR (Meta Quest) et sur PC",
      "Modules d'entraînement : gestes techniques, procédures, premiers secours",
      "Évaluation en temps réel et rejeu illimité",
      "Manipulation d'équipements et de contraintes simulées",
      "Version PC identique pour les sessions hors casque",
      "Développement complet : game design, modélisation, intégration",
    ],
    pointsEn: [
      "Standalone serious game: playable on VR (Meta Quest) and PC",
      "Training modules: technical procedures, protocols, first aid",
      "Real-time assessment and unlimited replay",
      "Handling of simulated equipment and constraints",
      "Identical PC version for sessions without a headset",
      "Full development: game design, modelling, integration",
    ],
  },
  {
    slug: "erp-collaboratif",
    image: "/projets/erp-collaboratif.jpg",
    titleFr: "ERP collaboratif & gestion du travail",
    titleEn: "Collaborative ERP & work management",
    categoryFr: "Application web · ERP",
    categoryEn: "Web application · ERP",
    summaryFr:
      "Centraliser projets, dossiers, tâches et notes de frais dans un espace de travail partagé, pour que chaque collaborateur sache qui fait quoi et où en est chaque mission.",
    summaryEn:
      "Centralize projects, files, tasks and expense reports in a shared workspace so every employee knows who does what and where each mission stands.",
    type: "web",
    scope: ["Gestion de projets", "Tâches", "Dossiers", "Notes de frais", "Comptabilité"],
    stack: ["Odoo", "OWL", "JavaScript"],
    date: "2025",
    storyFr: [
      "Nous structurons ce type d'outil sur le socle Odoo : projets et dossiers organisés, tâches créées et attribuées aux collaborateurs, avancement visible dans un environnement partagé. La coordination ne dépend plus des échanges de mails.",
      "Les processus administratifs suivent : gestion des employés, notes de frais reliées à la comptabilité, suivi des activités. Résultat : une visibilité immédiate sur les responsabilités et les dépenses, depuis une interface unique.",
    ],
    storyEn: [
      "We structure these tools on the Odoo backbone: projects and files organized, tasks created and assigned to employees, progress visible in a shared environment. Coordination no longer depends on email threads.",
      "Administrative processes follow: employee management, expense reports linked to accounting, activity tracking. The result: instant visibility over responsibilities and spend, from a single interface.",
    ],
    pointsFr: [
      "Gestion des projets : création, organisation et suivi de l'avancement",
      "Attribution des tâches : assignation des missions et suivi des responsabilités",
      "Gestion des dossiers : centralisation des dossiers liés aux activités",
      "Collaboration interne : partage des informations entre collaborateurs",
      "Gestion des notes de frais : suivi des dépenses liées à la comptabilité",
      "Gestion des employés : centralisation des informations du personnel",
    ],
    pointsEn: [
      "Project management: creating, organizing and tracking progress",
      "Task assignment: mission allocation and responsibility tracking",
      "File management: centralizing business activities' files",
      "Internal collaboration: information sharing between employees",
      "Expense reports: tracking business expenses linked to accounting",
      "Employee management: centralizing staff information",
    ],
  },
  {
    slug: "e-learning",
    image: "/projets/e-learning.jpg",
    titleFr: "E-learning & certification",
    titleEn: "E-learning & certification",
    categoryFr: "Application web · LMS",
    categoryEn: "Web application · LMS",
    summaryFr:
      "Digitaliser la formation : parcours multimédias, quiz d'évaluation, certificats signés et suivi des performances, centralisés sur une plateforme en ligne.",
    summaryEn:
      "Digitalize training: multimedia paths, assessment quizzes, signed certificates and performance analytics, centralized in one online platform.",
    type: "web",
    scope: ["E-Learning", "Formations", "Évaluations", "Certifications"],
    stack: ["Odoo"],
    date: "2025",
    storyFr: [
      "Nous centralisons les contenus pédagogiques dans un environnement unique : parcours structurés intégrant documents, textes, vidéos et images, accessibles aux collaborateurs partout, à tout moment.",
      "Les acquis sont évalués par quiz, validés par des certificats signés, et la progression est analysée en continu. Les référentiels de formation deviennent traçables : qui a suivi quoi, quand, et avec quel résultat.",
    ],
    storyEn: [
      "We centralize course content in a single environment: structured paths combining documents, text, videos and images, accessible to employees anywhere, anytime.",
      "Knowledge is assessed through quizzes, validated with signed certificates, and progress is analyzed continuously. Training records become traceable: who took what, when, and with what result.",
    ],
    pointsFr: [
      "Gestion des formations : création, organisation et publication des parcours",
      "Contenus multimédias : PDF, textes, vidéos et images intégrés aux cours",
      "Parcours d'apprentissage : accès aux cours et suivi de la progression",
      "Évaluation des connaissances : quiz interactifs après chaque formation",
      "Certification : certificats signés générés après réussite",
      "Analyse des performances : suivi des résultats et de la progression",
    ],
    pointsEn: [
      "Course management: creating, organizing and publishing paths",
      "Multimedia content: PDF documents, texts, videos and images in courses",
      "Learning paths: course access and progress tracking",
      "Knowledge assessment: interactive quizzes after each course",
      "Certification: signed certificates generated upon completion",
      "Performance analytics: tracking results and progression",
    ],
  },
  {
    slug: "sirh",
    image: "/projets/sirh.jpg",
    titleFr: "SIRH - digitalisation RH",
    titleEn: "HRIS - digital HR",
    categoryFr: "Application web · SIRH",
    categoryEn: "Web application · HRIS",
    summaryFr:
      "Centraliser l'ensemble du cycle RH : dossiers du personnel, congés, absences, missions, notes de frais et heures supplémentaires, avec des validations automatisées.",
    summaryEn:
      "Centralize the entire HR cycle: personnel records, leave, absences, missions, expense reports and overtime, with automated validations.",
    type: "web",
    scope: ["Digitalisation RH", "Flux de validation", "Automatisation"],
    stack: ["Odoo", "OWL", "JavaScript"],
    date: "2024",
    storyFr: [
      "Nous digitalisons le cycle administratif complet des collaborateurs : de la gestion du personnel au traitement des congés, absences et retards, jusqu'aux ordres de mission, notes de frais et heures supplémentaires.",
      "Chaque demande suit un flux de validation structuré, historisé et traçable. Les tâches manuelles et les allers-retours papier disparaissent : la gestion RH devient fluide, mesurable et auditable.",
    ],
    storyEn: [
      "We digitalize the complete administrative cycle of employees: from personnel management to processing leave, absences and late arrivals, through to mission orders, expense reports and overtime.",
      "Every request follows a structured, logged and traceable validation flow. Manual tasks and paper back-and-forths disappear: HR management becomes smooth, measurable and auditable.",
    ],
    pointsFr: [
      "Gestion centralisée du personnel : dossiers et informations administratives",
      "Congés et absences : soumission, validation et suivi des disponibilités",
      "Retards et sorties : déclaration, suivi et historique",
      "Ordres de mission et notes de frais : demandes, validation et suivi",
      "Heures supplémentaires : déclaration et suivi administratif",
      "Demandes de recrutement : centralisation des besoins en personnel",
    ],
    pointsEn: [
      "Centralized personnel management: records and administrative information",
      "Leave and absences: submission, validation and availability tracking",
      "Late arrivals and exits: declaration, tracking and history",
      "Mission orders and expense reports: requests, validation and tracking",
      "Overtime: declaration and administrative tracking",
      "Recruitment requests: centralizing staffing needs",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
