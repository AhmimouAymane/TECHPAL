export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/**
 * Réglage temporaire (direction, oct. 2026) : seule la version anglaise est
 * accessible au public, le contenu français étant en révision. Le FR reste
 * entièrement dans le code : repasser cette valeur à false (et ajuster les
 * redirections de next.config.ts) pour remettre le français en ligne.
 */
export const hideFr = true as const;

/** Locales affichées au public (sélecteurs, sitemap). */
export const publicLocales = (hideFr ? ["en"] : locales) as readonly Locale[];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Swap the locale segment of a pathname, e.g. /fr/projets -> /en/projets */
export function withLocale(pathname: string, locale: Locale): string {
  const parts = (pathname || "/").split("?")[0].split("/");
  if (isLocale(parts[1] ?? "")) parts[1] = locale;
  else parts.splice(1, 0, locale);
  return parts.join("/") || `/${locale}`;
}
