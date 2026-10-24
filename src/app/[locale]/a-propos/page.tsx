import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { NeuralHero } from "@/components/ia/NeuralHero";
import fr from "@/content/fr";
import en from "@/content/en";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = locale === "fr" ? fr : en;
  return constructMetadata({
    locale,
    path: "/a-propos",
    title: dict.meta.apropos.title,
    description: dict.meta.apropos.description,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const a = dict.about;

  return (
    <>
      <NeuralHero
        kicker={a.kicker}
        title={a.title}
        intro={a.intro}
        words={a.heroWords}
        hint={a.heroHint}
        ctaLabel={dict.cta.button}
        ctaHref={`/${locale}/contact`}
        secondaryLabel={`${a.anchor} ↓`}
        secondaryHref={`/${locale}/a-propos#valeurs`}
      />

      <section id="valeurs" className="scroll-mt-24 border-t border-line py-20 md:py-28">
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
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{a.teamTitle}</span>
            <p className="display display-md max-w-[28ch] text-balance">{a.teamText}</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {a.members.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <article className="flex h-full flex-col gap-4 rounded-[var(--radius-site)] border border-line bg-card p-6">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={112}
                      height={112}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/5 font-mono text-sm text-accent"
                    >
                      {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <div>
                    <h3 className="font-medium">{m.name}</h3>
                    <p className="mt-1 text-sm text-muted">{m.role}</p>
                  </div>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 font-mono text-xs text-muted">{a.teamNote}</p>
        </Container>
      </section>
    </>
  );
}
