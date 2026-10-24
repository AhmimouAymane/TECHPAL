import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PinnedHero } from "@/components/sections/PinnedHero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ScrollReel } from "@/components/sections/ScrollReel";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { HorizontalWork } from "@/components/sections/HorizontalWork";
import { StatsRow } from "@/components/sections/StatsRow";
import { Narrative } from "@/components/sections/Narrative";
import fr from "@/content/fr";
import en from "@/content/en";
import { isLocale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = locale === "fr" ? fr : en;
  return constructMetadata({
    locale,
    path: "",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;

  return (
    <>
      <PinnedHero locale={locale} dict={dict} />
      <LogoMarquee label={dict.marquee.label} />
      <ScrollReel dict={dict} />
      <ServicesIndex locale={locale} dict={dict} />
      <HorizontalWork locale={locale} dict={dict} />
      <StatsRow dict={dict} />
      <Narrative dict={dict} />
    </>
  );
}
