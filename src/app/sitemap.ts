import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "expertise", "projets", "a-propos", "contact", "mentions-legales", "confidentialite"];
  const pages = locales.flatMap((locale) =>
    paths.map((p) => ({
      url: `${site.url}/${locale}${p ? `/${p}` : ""}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    }))
  );
  const cases = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${site.url}/${locale}/projets/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );
  return [...pages, ...cases];
}
