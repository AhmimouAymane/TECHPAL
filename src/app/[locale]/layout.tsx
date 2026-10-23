import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SiteBackground } from "@/components/background/SiteBackground";
import { getBackgroundVideo } from "@/lib/media";
import { MagneticCursor } from "@/components/motion/MagneticCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ScrollToTop } from "@/components/motion/ScrollToTop";
import fr from "@/content/fr";
import en from "@/content/en";
import { site } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const url = `${site.url}/${locale}`;
  return {
    metadataBase: new URL(site.url),
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: url,
      languages: { fr: `${site.url}/fr`, en: `${site.url}/en` },
    },
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url,
      siteName: site.fullName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.fullName }],
    },
    twitter: { card: "summary_large_image", title: dict.meta.home.title, description: dict.meta.home.description },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const bgVideo = getBackgroundVideo();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    sameAs: [site.linkedin, site.instagram],
  };

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain min-h-svh bg-paper text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <SmoothScroll />
        <SiteBackground videoSrc={bgVideo} />
        <ScrollProgress />
        <ScrollToTop />
        <MagneticCursor />
        <Preloader />
        <Header locale={locale} nav={dict.nav} />
        <main id="contenu" className="relative z-10">{children}</main>
        <Footer locale={locale} dict={dict} />
        <noscript>
          <div className="fixed bottom-4 left-4 z-[110] rounded-full bg-ink px-4 py-2 text-xs text-paper">
            {locale === "fr" ? "Activez JavaScript pour l'expérience complète." : "Enable JavaScript for the full experience."}
          </div>
        </noscript>
      </body>
    </html>
  );
}
