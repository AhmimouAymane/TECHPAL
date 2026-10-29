import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { GradientButton } from "@/components/motion/GradientButton";
import { NeuralHero } from "@/components/ia/NeuralHero";
import { site } from "@/content/site";
import fr from "@/content/fr";
import en from "@/content/en";
import { isLocale, locales } from "@/lib/i18n";
import { constructMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = locale === "fr" ? fr : en;
  return constructMetadata({
    locale,
    path: "/integration-odoo-maroc",
    title: dict.meta.odoo.title,
    description: dict.meta.odoo.description,
  });
}

export default async function OdooPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const s = dict.odoo;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: `${site.url}/${locale}` },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "fr" ? "Intégration Odoo Maroc" : "Odoo integration Morocco",
            item: `${site.url}/${locale}/integration-odoo-maroc`,
          },
        ],
      },
      {
        "@type": "Service",
        name: locale === "fr" ? "Intégration Odoo" : "Odoo integration",
        description: s.intro,
        serviceType: locale === "fr" ? "Intégration ERP Odoo" : "Odoo ERP integration",
        url: `${site.url}/${locale}/integration-odoo-maroc`,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Casablanca, Morocco",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NeuralHero
        kicker={s.kicker}
        title={s.title}
        intro={s.intro}
        words={s.heroWords}
        hint={s.heroHint}
        ctaLabel={s.cta.button}
        ctaHref={`/${locale}/contact`}
        secondaryLabel={`${s.anchor} ↓`}
        secondaryHref={`/${locale}/integration-odoo-maroc#livrables`}
      />

      {/* Livrables */}
      <section id="livrables" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{s.deliverablesKicker}</span>
            <h2 className="display display-md max-w-[24ch] text-balance">{s.deliverablesTitle}</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {s.deliverables.map((u, i) => (
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

      {/* Méthode */}
      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{s.processKicker}</span>
            <h2 className="display display-md max-w-[22ch] text-balance">{s.processTitle}</h2>
          </div>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* Inclus dans la mission */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{s.includedKicker}</span>
            <h2 className="display display-md max-w-[22ch] text-balance">{s.includedTitle}</h2>
          </div>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.included.map((v, i) => (
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

      {/* Pages liées */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{s.crossKicker}</span>
            <div>
              <h2 className="display display-md max-w-[22ch] text-balance">{s.crossTitle}</h2>
              <p className="mt-5 max-w-[52ch] text-muted">{s.crossIntro}</p>
            </div>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {s.cross.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <Link
                  href={`/${locale}${c.href}`}
                  className="group flex h-full flex-col rounded-[var(--radius-site)] border border-line bg-card p-8 transition-colors hover:border-ink/40"
                >
                  <h3 className="display display-sm">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>
                  <span className="link-line mt-6 text-sm font-medium" aria-hidden>
                    {locale === "fr" ? "Découvrir" : "Explore"}
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
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
