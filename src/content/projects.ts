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
};

export const projects: Project[] = [
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
