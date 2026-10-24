import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "expertise",
    "ia",
    "staffing",
    "produits",
    "projets",
    "a-propos",
    "contact",
    "mentions-legales",
    "confidentialite",
  ];

  const pages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    paths.map((p) => {
      const clean = p ? `/${p}` : "";
      return {
        url: `${site.url}/${locale}${clean}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: p === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            fr: `${site.url}/fr${clean}`,
            en: `${site.url}/en${clean}`,
          },
        },
      };
    })
  );

  const cases: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${site.url}/${locale}/projets/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${site.url}/fr/projets/${p.slug}`,
          en: `${site.url}/en/projets/${p.slug}`,
        },
      },
    }))
  );

  return [...pages, ...cases];
}
