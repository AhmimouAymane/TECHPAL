import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Narrative } from "@/components/sections/Narrative";
import { NeuralHero } from "@/components/ia/NeuralHero";
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
  return { title: dict.meta.expertise.title, description: dict.meta.expertise.description };
}

export default async function ExpertisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;

  return (
    <>
      <NeuralHero
        kicker={dict.services.kicker}
        title={dict.services.title}
        intro={dict.services.intro}
        words={dict.services.heroWords}
        hint={dict.services.heroHint}
        ctaLabel={dict.cta.button}
        ctaHref={`/${locale}/contact`}
        secondaryLabel={`${dict.services.anchor} ↓`}
        secondaryHref={`/${locale}/expertise#pratiques`}
      />
      <section id="pratiques" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <Container className="grid gap-6 md:grid-cols-2">
          {dict.services.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.04}>
              <article className="flex h-full flex-col rounded-[var(--radius-site)] border border-line bg-card p-8 transition-colors hover:border-ink/30 md:p-10">
                <span className="label text-accent">({item.n})</span>
                <h2 className="display display-md mt-5">{item.title}</h2>
                <p className="mt-3 max-w-[44ch] text-muted">{item.desc}</p>
                <ul className="mt-8 space-y-3 border-t border-line pt-8 text-sm">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-ink/80">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>
      <Narrative dict={dict} />
    </>
  );
}
