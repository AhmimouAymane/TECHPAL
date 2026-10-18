import { notFound } from "next/navigation";
import { PinnedHero } from "@/components/sections/PinnedHero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { HorizontalWork } from "@/components/sections/HorizontalWork";
import { StatsRow } from "@/components/sections/StatsRow";
import { Narrative } from "@/components/sections/Narrative";
import fr from "@/content/fr";
import en from "@/content/en";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;

  return (
    <>
      <h1 className="sr-only">{dict.meta.home.title}</h1>
      <PinnedHero locale={locale} dict={dict} />
      <LogoMarquee label={dict.marquee.label} />
      <ServicesIndex locale={locale} dict={dict} />
      <HorizontalWork locale={locale} dict={dict} />
      <StatsRow dict={dict} />
      <Narrative dict={dict} />
    </>
  );
}
