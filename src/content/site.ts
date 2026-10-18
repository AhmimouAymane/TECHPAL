import type { Locale } from "@/lib/i18n";

export const site = {
  name: "TECHPAL",
  fullName: "TECHPAL Studio",
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

export const socials: { label: string; href: string }[] = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "Instagram", href: site.instagram },
];

export type NavKey = "expertise" | "projets" | "apropos" | "contact";

export const routes: { key: NavKey; path: string }[] = [
  { key: "expertise", path: "expertise" },
  { key: "projets", path: "projets" },
  { key: "apropos", path: "a-propos" },
  { key: "contact", path: "contact" },
];

export function href(locale: Locale, path = ""): string {
  return path ? `/${locale}/${path}` : `/${locale}`;
}

/** Sequence of pages for the "[ next page ]" flow. */
export function nextPage(locale: Locale, currentPath: string): { label: string; href: string } {
  const order = ["", "expertise", "projets", "a-propos", "contact"];
  const clean = currentPath.split("/")[2] ?? "";
  const base = order.includes(clean) ? clean : "";
  const idx = order.indexOf(base);
  const next = order[(idx + 1) % order.length];
  return { label: next, href: href(locale, next) };
}
