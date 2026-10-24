import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export interface PageSeoOptions {
  locale: Locale;
  path: string; // e.g. "" for home, "/expertise", "/projets/marketplaces"
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
}

export function constructMetadata({
  locale,
  path,
  title,
  description,
  image = "/og.jpg",
  type = "website",
}: PageSeoOptions): Metadata {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${site.url}/${locale}${cleanPath}`;
  const frUrl = `${site.url}/fr${cleanPath}`;
  const enUrl = `${site.url}/en${cleanPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: frUrl,
        en: enUrl,
        "x-default": frUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: site.fullName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
