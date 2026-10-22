/**
 * Projets — entrées de DÉMONSTRATION (placeholder: true).
 * Remplacer par les vrais projets. Un tableau vide masque la section.
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
    slug: "clovi",
    image: "/projets/clovi.jpg",
    titleFr: "Clovi — Marketplace mode seconde main",
    titleEn: "Clovi — Second-hand fashion marketplace",
    categoryFr: "Application mobile",
    categoryEn: "Mobile application",
    summaryFr:
      "Marketplace mobile de mode seconde main : app Flutter pour iOS et Android, API NestJS en backend, paiements sécurisés et back-office vendeurs.",
    summaryEn:
      "Second-hand fashion marketplace app: Flutter client for iOS and Android, NestJS API on the backend, secure payments and a seller back-office.",
    type: "app",
    scope: ["UI/UX", "Mobile", "Backend", "DevOps"],
    stack: ["Flutter", "NestJS", "PostgreSQL", "Redis", "AWS"],
    date: "2026",
    href: "https://www.clovi.ma/",
    storyFr: [
      "Clovi connecte acheteurs et vendeurs de mode seconde main au Maroc. TECHPAL a conçu l'expérience mobile Flutter et l'API NestJS qui porte toute la plateforme : comptes vendeurs, annonces, messagerie, paiements et livraison.",
      "Côté mobile, une base de code Flutter unique pour iOS et Android : listes fluides, tunnel de mise en vente guidé et chat acheteur-vendeur intégré. Côté backend, une API modulaire NestJS — authentification, catalogue, commandes, paiements et notifications — testée de bout en bout et documentée.",
      "Résultat : une marketplace qui tient la charge des campagnes de lancement, une recherche instantanée et un back-office qui permet à l'équipe Clovi de tout piloter sans développeur.",
    ],
    storyEn: [
      "Clovi connects buyers and sellers of second-hand fashion in Morocco. TECHPAL designed the Flutter mobile experience and the NestJS API powering the whole platform: seller accounts, listings, chat, payments and delivery.",
      "On mobile, a single Flutter codebase for iOS and Android: smooth lists, a guided selling flow and built-in buyer-seller chat. On the backend, a modular NestJS API — authentication, catalogue, orders, payments and notifications — fully tested and documented.",
      "The result: a marketplace that handles launch-traffic spikes, instant search, and a back-office that lets the Clovi team run everything without a developer.",
    ],
    pointsFr: [
      "App Flutter iOS/Android : catalogue, favoris, chat acheteur-vendeur",
      "API NestJS modulaire : auth JWT, annonces, commandes, paiements",
      "Recherche instantanée : full-text PostgreSQL + filtres taille, marque, état",
      "Paiements en ligne et remise en main propre, suivi de commande",
      "Back-office vendeurs : modération, statistiques, gestion des retraits",
      "Infrastructure AWS : déploiement CI/CD, logs et supervision",
    ],
    pointsEn: [
      "Flutter iOS/Android app: catalogue, favorites, buyer-seller chat",
      "Modular NestJS API: JWT auth, listings, orders, payments",
      "Instant search: PostgreSQL full-text + size, brand and condition filters",
      "Online payments and in-person pickup, order tracking",
      "Seller back-office: moderation, analytics, withdrawal management",
      "AWS infrastructure: CI/CD deployment, logs and monitoring",
    ],
  },
  {
    slug: "adda",
    image: "/projets/adda.jpg",
    titleFr: "ADDA — Réservation pour salons",
    titleEn: "ADDA — Salon booking platform",
    categoryFr: "Application mobile",
    categoryEn: "Mobile application",
    summaryFr:
      "Plateforme marocaine de réservation et de gestion pour salons : app Flutter pour les gérants, backend Python (FastAPI), rappels WhatsApp et suivi des paiements.",
    summaryEn:
      "Moroccan booking and management platform for salons: Flutter app for owners, Python backend (FastAPI), WhatsApp reminders and payment tracking.",
    type: "app",
    scope: ["UI/UX", "Mobile", "Backend", "DevOps"],
    stack: ["Flutter", "Python", "FastAPI", "PostgreSQL", "Docker"],
    date: "2026",
    href: "https://adda.ma/",
    storyFr: [
      "ADDA est la plateforme marocaine de gestion et de réservation pour salons de coiffure et instituts de beauté : agenda centralisé, réservation en ligne 24/7, historique client et suivi des paiements. TECHPAL développe l'app mobile Flutter et l'API Python qui font tourner le tout.",
      "L'app Flutter couvre le quotidien du gérant : agenda du jour, rendez-vous à confirmer, plannings d'équipe et fiches clients, avec des notifications qui réduisent les no-shows. Le backend Python (FastAPI) orchestre réservations, disponibilités multi-employés et rappels automatiques — intégration WhatsApp incluse — avec une architecture pensée pour des milliers de salons.",
      "Résultat : le cahier de rendez-vous devenu plateforme — moins de rendez-vous manqués, un chiffre d'affaires visible en temps réel et des clientes fidélisées sans effort.",
    ],
    storyEn: [
      "ADDA is the Moroccan booking and management platform for hair salons and beauty institutes: a centralized agenda, 24/7 online booking, client history and payment tracking. TECHPAL develops the Flutter mobile app and the Python API that power it all.",
      "The Flutter app covers the owner's daily routine: today's agenda, appointments to confirm, team schedules and client records, with notifications that reduce no-shows. The Python backend (FastAPI) orchestrates bookings, multi-employee availability and automatic reminders — WhatsApp integration included — with an architecture designed for thousands of salons.",
      "The result: the paper appointment book turned platform — fewer missed appointments, revenue visible in real time and clients who come back without effort.",
    ],
    pointsFr: [
      "App Flutter gérant : agenda du jour, RDV, plannings d'équipe, fiches clients",
      "Backend Python (FastAPI) : réservations 24/7, disponibilités multi-employés",
      "Rappels automatiques et confirmations — intégration WhatsApp pour réduire les no-shows",
      "Suivi des paiements : RDV honoré, encaissé, à relancer",
      "Historique client en un clic : préférences, visites, relances",
      "Onboarding guidé en 5 étapes : formulaire, vérification, configuration, publication",
    ],
    pointsEn: [
      "Flutter owner app: today's agenda, appointments, team schedules, client records",
      "Python backend (FastAPI): 24/7 bookings, multi-employee availability",
      "Automatic reminders and confirmations — WhatsApp integration to cut no-shows",
      "Payment tracking: honored, collected, to follow up",
      "One-click client history: preferences, visits, follow-ups",
      "Guided 5-step onboarding: form, verification, setup, publication",
    ],
  },
  {
    slug: "projet-exemple-1",
    placeholder: true,
    titleFr: "Plateforme métier",
    titleEn: "Business platform",
    categoryFr: "Ingénierie logicielle",
    categoryEn: "Software engineering",
    summaryFr: "Exemple de réalisation — à remplacer.",
    summaryEn: "Example project — to be replaced.",
    type: "product",
    scope: ["UI/UX", "Frontend", "Backend"],
    stack: ["Next.js", "Node", "PostgreSQL"],
    date: "2024",
  },
  {
    slug: "projet-exemple-2",
    placeholder: true,
    titleFr: "Infrastructure réseau",
    titleEn: "Network infrastructure",
    categoryFr: "Cloud & infrastructure",
    categoryEn: "Cloud & infrastructure",
    summaryFr: "Exemple de réalisation — à remplacer.",
    summaryEn: "Example project — to be replaced.",
    type: "infrastructure",
    scope: ["Réseau", "Sécurité", "Supervision"],
    stack: ["Cisco", "Fortinet", "Azure"],
    date: "2024",
  },
  {
    slug: "projet-exemple-3",
    placeholder: true,
    titleFr: "Assistant IA interne",
    titleEn: "Internal AI assistant",
    categoryFr: "Intelligence artificielle",
    categoryEn: "Artificial intelligence",
    summaryFr: "Exemple de réalisation — à remplacer.",
    summaryEn: "Example project — to be replaced.",
    type: "product",
    scope: ["IA", "Automatisation"],
    stack: ["LLM", "RAG", "Python"],
    date: "2025",
  },
  {
    slug: "projet-exemple-4",
    placeholder: true,
    titleFr: "Application mobile",
    titleEn: "Mobile application",
    categoryFr: "Ingénierie logicielle",
    categoryEn: "Software engineering",
    summaryFr: "Exemple de réalisation — à remplacer.",
    summaryEn: "Example project — to be replaced.",
    type: "app",
    scope: ["UI/UX", "Mobile"],
    stack: ["React Native", "API"],
    date: "2025",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
