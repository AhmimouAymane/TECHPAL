import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Focus Google strictly on the 3 essential core pages in English
  const essentialPaths = [
    "",
    "projets",
    "contact",
  ];

  const pages: MetadataRoute.Sitemap = essentialPaths.map((p) => {
    const clean = p ? `/${p}` : "";
    const url = `${site.url}/en${clean}`;
    return {
      url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: url,
          "x-default": url,
        },
      },
    };
  });

  return pages;
}
