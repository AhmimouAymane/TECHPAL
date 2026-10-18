import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import fr from "@/content/fr";
import en from "@/content/en";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = locale === "fr" ? fr : en;
  return { title: dict.meta.apropos.title, description: dict.meta.apropos.description };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const a = dict.about;

  return (
    <>
      <PageHero kicker={a.kicker} title={a.title} intro={a.intro} />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <article className="h-full rounded-[var(--radius-site)] border border-line bg-card p-8">
                  <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="display display-md mt-5">{v.title}</h2>
                  <p className="mt-3 text-sm text-muted">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <Container className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
          <span className="label text-muted">{a.teamTitle}</span>
          <p className="display display-md max-w-[28ch] text-balance">{a.teamText}</p>
        </Container>
      </section>
    </>
  );
}
