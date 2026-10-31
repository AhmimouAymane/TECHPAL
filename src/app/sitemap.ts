import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { publicLocales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "expertise",
    "developpement-logiciel-sur-mesure",
    "integration-odoo-maroc",
    "integration-ia-entreprise",
    "infrastructure-reseau-materiel",
    "infogerance-informatique-casablanca",
    "ia",
    "staffing",
    "solutions",
    "projets",
    "a-propos",
    "contact",
    "mentions-legales",
    "confidentialite",
  ];

  const pages: MetadataRoute.Sitemap = publicLocales.flatMap((locale) =>
    paths.map((p) => {
      const clean = p ? `/${p}` : "";
      const legalPage = p === "mentions-legales" || p === "confidentialite";
      const url = `${site.url}/${locale}${clean}`;
      return {
        url,
        lastModified: new Date(),
        changeFrequency: legalPage ? ("yearly" as const) : ("weekly" as const),
        priority: p === "" ? 1.0 : legalPage ? 0.3 : 0.8,
        alternates: {
          languages: {
            en: url,
            "x-default": url,
          },
        },
      };
    })
  );

  const cases: MetadataRoute.Sitemap = publicLocales.flatMap((locale) =>
    projects.map((p) => {
      const url = `${site.url}/${locale}/projets/${p.slug}`;
      return {
        url,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: url,
            "x-default": url,
          },
        },
      };
    })
  );

  return [...pages, ...cases];
}
