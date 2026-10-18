import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import fr from "@/content/fr";
import en from "@/content/en";
import { site } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = locale === "fr" ? fr : en;
  return { title: `${dict.legal.privacyTitle} | TECHPAL Studio` };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;

  return (
    <>
      <PageHero kicker={dict.legal.editor} title={dict.legal.privacyTitle} />
      <section className="pb-32">
        <Container className="max-w-[70ch] space-y-6 text-muted">
          <p>{dict.legal.draft}</p>
          <p>
            {locale === "fr" ? "Pour toute question" : "For any question"}: {site.email}
          </p>
        </Container>
      </section>
    </>
  );
}
