import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { GradientButton } from "@/components/motion/GradientButton";
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
    path: "/produits",
    title: dict.meta.produits.title,
    description: dict.meta.produits.description,
  });
}

export default async function ProduitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const p = dict.produits;

  return (
    <>
      <NeuralHero
        kicker={p.kicker}
        title={p.title}
        intro={p.intro}
        words={p.heroWords}
        hint={p.heroHint}
        ctaLabel={p.cta}
        ctaHref={`/${locale}/contact`}
        secondaryLabel={`${p.anchor} ↓`}
        secondaryHref={`/${locale}/produits#ordinateurs`}
      />

      {/* Une famille de produits par section, séparées */}
      {p.categories.map((c, i) => (
        <section key={c.id} id={c.id} className={`scroll-mt-24 border-t border-line py-16 md:py-24 ${i % 2 === 1 ? "bg-paper-2" : ""}`}>
          <Container>
            <Reveal>
              <div className="grid gap-6 md:grid-cols-[0.4fr_1fr] md:gap-16">
                <div>
                  <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="display display-md mt-2 max-w-[16ch] text-balance">{c.title}</h2>
                  <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted">{c.text}</p>
                </div>
                <div className="self-center">
                  <div className="flex flex-wrap gap-2">
                    {c.types.map((t) => (
                      <span key={t} className="rounded-full border border-line bg-card px-4 py-1.5 text-[13.5px] font-medium text-ink">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {c.brands.map((b) => (
                      <div
                        key={b.name}
                        className="flex flex-col items-center justify-center gap-2.5 rounded-[var(--radius-site)] border border-line bg-card px-4 py-5 transition-colors duration-200 hover:border-ink/30"
                      >
                        <span className="flex h-9 items-center justify-center">
                          {b.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={b.logo} alt="" className="h-7 w-auto object-contain" loading="lazy" />
                          ) : null}
                        </span>
                        <span className="text-[13px] font-semibold text-ink">{b.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      ))}

      {/* Accompagnement */}
      <section className="border-t border-line bg-paper-2 py-20 md:py-28">
        <Container>
          <h2 className="display display-md max-w-[22ch] text-balance">{p.servicesTitle}</h2>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.services.map((s) => (
              <li key={s} className="rounded-[var(--radius-site)] border border-line bg-card p-5 text-sm font-medium text-ink">
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink text-paper">
        <Container className="py-24 md:py-32">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="display display-md max-w-[22ch] text-balance">{p.ctaTitle}</h2>
              <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed text-paper/70">{p.ctaText}</p>
            </div>
            <GradientButton href={`/${locale}/contact`} variant="light">
              {p.cta}
            </GradientButton>
          </div>
        </Container>
      </section>
    </>
  );
}
