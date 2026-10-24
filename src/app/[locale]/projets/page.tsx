import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { GradientButton } from "@/components/motion/GradientButton";
import { Marquee } from "@/components/motion/Marquee";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { NeuralHero } from "@/components/ia/NeuralHero";
import { WorkIndex } from "@/components/sections/WorkIndex";
import fr from "@/content/fr";
import en from "@/content/en";
import { clients, projectTech } from "@/content/site";
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
    path: "/projets",
    title: dict.meta.projets.title,
    description: dict.meta.projets.description,
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const w = dict.work;

  return (
    <>
      <NeuralHero
        kicker={w.kicker}
        title={w.heroTitle}
        intro={w.intro}
        words={w.heroWords}
        hint={w.heroHint}
        ctaLabel={dict.cta.button}
        ctaHref={`/${locale}/contact`}
        secondaryLabel={w.technosKicker + " ↓"}
        secondaryHref={`/${locale}/projets#technos`}
      />

      <WorkIndex locale={locale} dict={dict} hideHeading />

      {/* Technologies : bandeau defilant + grille pastel sur fond ink (design IA) */}
      <section id="technos" className="scroll-mt-24 bg-ink py-20 text-paper md:py-28">
        <Container>
          <Reveal>
            <h2 className="display display-lg mx-auto max-w-[16ch] text-center text-balance">{w.technosTitle}</h2>
          </Reveal>
        </Container>

        <div
          className="relative mt-12 flex flex-col gap-6 md:mt-16"
          style={{ maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)" }}
          aria-hidden
        >
          <Marquee className="py-2">
            <span className="marquee-label">
              {projectTech.map((t) => (
                <span key={t.name} className="mx-10 inline-flex items-center gap-4 font-mono text-base text-paper/70 md:text-lg">
                  {t.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={t.logo} alt="" className="h-8 w-auto max-w-32 object-contain md:h-10" loading="lazy" />
                  ) : (
                    <span className="label text-accent">{t.name}</span>
                  )}
                  {t.name}
                </span>
              ))}
            </span>
          </Marquee>
          <Marquee reverse className="py-2">
            <span className="marquee-label">
              {projectTech.slice().reverse().map((t) => (
                <span key={t.name} className="mx-10 inline-flex items-center gap-4 font-mono text-base text-paper/70 md:text-lg">
                  {t.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={t.logo} alt="" className="h-8 w-auto max-w-32 object-contain md:h-10" loading="lazy" />
                  ) : (
                    <span className="label text-accent">{t.name}</span>
                  )}
                  {t.name}
                </span>
              ))}
            </span>
          </Marquee>
        </div>
      </section>

      {/* Clients : logos + liens uniquement, sans association avec les projets */}
      <section className="border-t border-line bg-paper-2 py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[0.4fr_1fr] md:gap-16">
              <span className="label text-muted">{w.clientsKicker}</span>
              <div>
                <h2 className="display display-md max-w-[18ch] text-balance">{w.clientsTitle}</h2>
                <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted">{w.clientsIntro}</p>
              </div>
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {clients.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full min-h-[124px] flex-col items-center justify-center gap-3 rounded-[var(--radius-site)] border border-line bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-ink/30"
                  >
                    {c.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={c.logo} alt="" className="max-h-10 w-auto max-w-[150px] object-contain" loading="lazy" />
                    ) : (
                      <span className="display text-xl">{c.name}</span>
                    )}
                    <span className="label text-muted transition-colors duration-300 group-hover:text-ink">
                      {c.name} <span aria-hidden>↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line py-20 md:py-28">
        <div aria-hidden className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#4d6bff]/10 blur-[120px]" />
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="label text-muted">
                <ScrambleText text={dict.cta.kicker} />
              </span>
              <h2 className="display display-md mt-3 max-w-[18ch] text-balance">{dict.cta.title}</h2>
              <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed text-muted">{dict.cta.text}</p>
            </div>
            <GradientButton href={`/${locale}/contact`} variant="solid">
              {dict.cta.button}
            </GradientButton>
          </div>
        </Container>
      </section>
    </>
  );
}
