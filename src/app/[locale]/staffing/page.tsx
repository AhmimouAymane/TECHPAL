import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { GradientButton } from "@/components/motion/GradientButton";
import { NeuralHero } from "@/components/ia/NeuralHero";
import { partners } from "@/content/site";
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
    path: "/staffing",
    title: dict.meta.staffing.title,
    description: dict.meta.staffing.description,
  });
}

export default async function StaffingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const s = dict.staffing;

  return (
    <>
      <NeuralHero
        kicker={s.kicker}
        title={s.title}
        intro={s.intro}
        words={s.heroWords}
        hint={s.heroHint}
        ctaLabel={s.cta.button}
        ctaHref={`/${locale}/contact`}
        secondaryLabel={`${s.anchor} ↓`}
        secondaryHref={`/${locale}/staffing#processus`}
      />

      {/* Qui pouvez-vous renforcer */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{s.unitsKicker}</span>
            <h2 className="display display-md max-w-[24ch] text-balance">{s.unitsTitle}</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {s.units.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.06}>
                <article className="h-full rounded-[var(--radius-site)] border border-line bg-card p-8">
                  <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display display-sm mt-5">{u.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{u.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Comment ça marche */}
      <section id="processus" className="scroll-mt-24 border-t border-line py-24 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{s.processKicker}</span>
            <h2 className="display display-md max-w-[22ch] text-balance">{s.processTitle}</h2>
          </div>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <li className="flex h-full flex-col gap-4 border-t-2 border-ink pt-6">
                  <span className="display display-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-medium">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{p.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Chiffres */}
      <section className="relative overflow-hidden border-y border-brand/20 bg-gradient-to-br from-brand via-[#04106b] to-[#02073a] py-20 text-paper md:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-0 h-[440px] w-[440px] rounded-full bg-accent/25 blur-[130px]" />
        <Container className="relative">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {s.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div className="flex flex-col gap-3">
                  <dd className="display display-lg text-gradient-paper">{stat.value}</dd>
                  <dt className="max-w-[22ch] text-sm text-paper/60">{stat.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Sélection */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{s.vettingKicker}</span>
            <div>
              <h2 className="display display-md max-w-[22ch] text-balance">{s.vettingTitle}</h2>
              <p className="mt-5 max-w-[52ch] text-muted">{s.vettingText}</p>
            </div>
          </div>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.vetting.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <li className="h-full rounded-[var(--radius-site)] border border-line bg-card p-6">
                  <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-medium">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Partenariats */}
      <section className="band-navy relative overflow-hidden py-24 md:py-32">
        <div className="hero-grid" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_50%,rgba(201,58,56,0.14),transparent_70%)]"
        />
        <Container className="relative grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
          <span className="label text-[rgba(226,232,255,0.6)]">{s.partnerKicker}</span>
          <div>
            <h2 className="display display-md max-w-[20ch] text-balance">{s.partnerTitle}</h2>
            <p className="mt-6 max-w-[58ch] font-mono text-xs leading-relaxed text-[rgba(226,232,255,0.66)]">{s.partnerText}</p>
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {partners.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.name}
                    className="group flex h-full items-center justify-center rounded-[var(--radius-site)] bg-paper p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="relative flex h-14 w-full max-w-[210px] items-center justify-center">
                      <Image
                        src={p.logo}
                        alt={p.name}
                        fill
                        sizes="(min-width:1024px) 210px, 45vw"
                        className={`object-contain transition-opacity duration-300 group-hover:opacity-80 ${p.tall ? "p-2" : ""}`}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-24 md:py-32">
        <Container className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
          <span className="label text-muted">{s.faqKicker}</span>
          <div>
            <h2 className="display display-md max-w-[20ch] text-balance">{s.faqTitle}</h2>
            <div className="mt-10 max-w-[76ch]">
              {s.faq.map((item) => (
                <details key={item.q} className="group border-b border-line first:border-t">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden className="text-xl text-accent transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-line py-24 md:py-32">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="label text-accent">{s.cta.kicker}</span>
          <h2 className="display display-lg max-w-[16ch] text-balance">{s.cta.title}</h2>
          <p className="max-w-[46ch] text-muted">{s.cta.text}</p>
          <GradientButton href={`/${locale}/contact`} variant="solid" className="mt-4">
            {s.cta.button}
          </GradientButton>
        </Container>
      </section>
    </>
  );
}
