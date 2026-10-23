import type { Locale } from "@/lib/i18n";

export const site = {
  name: "TECHPAL",
  fullName: "TECHPAL",
  url: "https://www.techpalservices.com",
  email: "contact@techpalservices.com",
  phone: "+212 7 10 77 77 20",
  phoneHref: "tel:+212710777720",
  whatsapp: "https://wa.me/212710788887",
  address: "Bureau B3, Rue Ettah, Casablanca 20000",
  mapsUrl: "https://maps.google.com/?q=Rue+Ettah+Casablanca+Morocco",
  linkedin: "https://www.linkedin.com/company/techpal-services",
  instagram: "https://www.instagram.com/techpalservices/",
} as const;

/** Technologies maîtrisées (bandeau home). Sans logo = badge texte. */
export const tech: { name: string; logo?: string }[] = [
  { name: "Microsoft 365", logo: "/tech/microsoft-365.svg" },
  { name: "Dell", logo: "/tech/dell.svg" },
  { name: "HP", logo: "/tech/hp.svg" },
  { name: "Cisco", logo: "/tech/cisco.svg" },
  { name: "Fortinet", logo: "/tech/fortinet.svg" },
  { name: "Ubiquiti", logo: "/tech/ubiquiti.svg" },
  { name: "Linux", logo: "/tech/linux.svg" },
  { name: "AWS" },
  { name: "Azure", logo: "/tech/azure.svg" },
];

/** Partenaires et clients staffing (page staffing). */
export const partners: { name: string; logo: string; href?: string; tall?: boolean }[] = [
  { name: "Klaim", logo: "/partners/klaim.png", href: "https://klaim.ai" },
  { name: "Novo Nordisk", logo: "/partners/novo.png", href: "https://www.novonordisk.com/" },
  { name: "CBA", logo: "/partners/cba.png", href: "https://cba.ma/" },
  { name: "ICE Maghreb", logo: "/partners/ice.png", href: "https://icemaghreb.com/" },
  { name: "Naviroc", logo: "/partners/naviro.png", href: "https://naviroc.net/" },
];

/** Clients (page clients) : logos + liens uniquement, sans association avec les projets. */
export const clients: { name: string; logo?: string; href: string }[] = [
  { name: "Klaim", logo: "/partners/klaim.png", href: "https://klaim.ai" },
  { name: "Novo Nordisk", logo: "/partners/novo.png", href: "https://www.novonordisk.com/" },
  { name: "Safran", logo: "/partners/safran.svg", href: "https://www.safran-group.com/" },
  { name: "CBA", logo: "/partners/cba.png", href: "https://cba.ma/" },
  { name: "ICE Maghreb", logo: "/partners/ice.png", href: "https://icemaghreb.com/" },
  { name: "Naviroc", logo: "/partners/naviro.png", href: "https://naviroc.net/" },
  { name: "Adda", logo: "/partners/adda.png", href: "https://adda.ma/" },
  { name: "IBS Group", logo: "/partners/ibs.png", href: "https://www.groupeibs.com/fr/" },
  { name: "AMIBLU", logo: "/partners/amiblu.png", href: "https://www.amiblu.com/fr/" },
  { name: "Clovi", href: "https://www.clovi.ma/" },
  { name: "FDM Clean", logo: "/partners/fdmclean.png", href: "https://www.fdmclean.ma/" },
  { name: "HBA Conseil", logo: "/partners/hbaconseil.png", href: "https://hbaconseil.com/" },
  { name: "Forafric", logo: "/partners/forafric.png", href: "https://forafric.com/" },
  { name: "SMC", logo: "/partners/smc.png", href: "https://www.smcworld.com/" },
  { name: "Ademis", logo: "/partners/ademis.png", href: "https://ademis.ma/" },
  { name: "Euromed", logo: "/partners/euromed.png", href: "https://ueuromed.org/fr" },
  { name: "Mediazest", logo: "/partners/mediazest.png", href: "https://www.mediazest.com/" },
  { name: "Canpack", logo: "/partners/canpack.png", href: "https://www.canpack.com/" },
  { name: "Un Amour de Tapis", logo: "/partners/tapis.png", href: "https://www.unamourdetapis.ma/" },
  { name: "M-Automotiv", logo: "/partners/mautomotiv.png", href: "https://m-automotiv.ma/" },
  { name: "Sketch Design", logo: "/partners/sketch.png", href: "https://sketch-design.ma/" },
  { name: "Hexcel", logo: "/partners/hexcel.png", href: "https://www.hexcel.com/" },
  { name: "Corail l'Océan", logo: "/partners/corail.png", href: "https://www.coraillocean.com/fr/" },
];

/** Technologies utilisées dans les études de cas (page clients). */
export const projectTech: { name: string; logo?: string }[] = [
  { name: "Flutter", logo: "/tech/flutter.svg" },
  { name: "NestJS", logo: "/tech/nestjs.svg" },
  { name: "FastAPI", logo: "/tech/fastapi.svg" },
  { name: "Python", logo: "/ai/python.svg" },
  { name: "PostgreSQL", logo: "/tech/postgresql.svg" },
  { name: "Redis", logo: "/tech/redis.svg" },
  { name: "Docker", logo: "/ai/docker.svg" },
  { name: "AWS", logo: "/ai/aws.svg" },
  { name: "Unity", logo: "/tech/unity.svg" },
  { name: "Meta Quest", logo: "/tech/quest.svg" },
  { name: "C#" },
  { name: "Windows", logo: "/tech/windows.svg" },
  { name: "Odoo", logo: "/tech/odoo.svg" },
  { name: "JavaScript", logo: "/tech/javascript.svg" },
];

export const socials: { label: string; href: string }[] = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "Instagram", href: site.instagram },
];

export type NavKey = "expertise" | "ia" | "produits" | "staffing" | "projets" | "apropos" | "contact";

export const routes: { key: NavKey; path: string }[] = [
  { key: "expertise", path: "expertise" },
  { key: "ia", path: "ia" },
  { key: "projets", path: "projets" },
  { key: "produits", path: "produits" },
  { key: "staffing", path: "staffing" },
  { key: "apropos", path: "a-propos" },
  { key: "contact", path: "contact" },
];

export function href(locale: Locale, path = ""): string {
  return path ? `/${locale}/${path}` : `/${locale}`;
}

/** Sequence of pages for the "[ next page ]" flow. */
export function nextPage(locale: Locale, currentPath: string): { label: string; href: string } {
  const order = ["", "expertise", "ia", "projets", "produits", "staffing", "a-propos", "contact"];
  const clean = currentPath.split("/")[2] ?? "";
  const base = order.includes(clean) ? clean : "";
  const idx = order.indexOf(base);
  const next = order[(idx + 1) % order.length];
  return { label: next, href: href(locale, next) };
}
