import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { GradientButton } from "@/components/motion/GradientButton";
import { Marquee } from "@/components/motion/Marquee";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { NeuralHero } from "@/components/ia/NeuralHero";
import { ChatViz, ChartViz, PipelineViz } from "@/components/ia/AiUseCases";
import fr from "@/content/fr";
import en from "@/content/en";
import { isLocale, locales } from "@/lib/i18n";

const stackBg = ["#e6f4ea", "#e3f0fd", "#f3e8f8", "#ffffff", "#fdf1de", "#ffffff", "#fff7e0", "#eef2ff"];

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
    path: "/ia",
    title: dict.meta.ia.title,
    description: dict.meta.ia.description,
  });
}

export default async function IaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const p = dict.ia;

  const vizzes = [
    <ChatViz key="chat" user={p.viz.chatUser} ai={p.viz.chatAi} />,
    <PipelineViz key="pipe" files={p.viz.files} />,
    <ChartViz key="chart" labelLeft={p.viz.chartLeft} labelRight={p.viz.chartRight} alert={p.viz.chartAlert} />,
  ];

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
        secondaryLabel={p.casesKicker + " ↓"}
        secondaryHref={`/${locale}/ia#cases`}
      />

      {/* Trois domaines - tableau éditorial */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <ul className="grid border-t border-line">
            {p.sections.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <li
                  id={s.id}
                  className="group scroll-mt-24 grid border-b border-line transition-colors duration-300 hover:bg-card md:grid-cols-[96px_0.6fr_0.4fr]"
                >
                  <div className="flex items-center border-b border-line/60 px-6 py-5 md:border-b-0 md:border-r md:px-8 md:py-10">
                    <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="px-6 py-6 md:px-10 md:py-10">
                    <h2 className="display display-sm text-balance">{s.title}</h2>
                    <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                  <ul className="flex flex-col justify-center gap-3 px-6 pb-6 sm:pb-8 md:px-8 md:py-10 md:pb-0">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium md:text-[15px]">
                        <span aria-hidden className="h-px w-5 shrink-0 bg-accent transition-all duration-300 group-hover:w-8" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Cas d'usage livrés - cartes vivantes, sans noms de clients (NDA) */}
      <section id="cases" className="scroll-mt-24 border-t border-line bg-paper-2 py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[0.4fr_1fr] md:gap-16">
              <span className="label text-muted">{p.casesKicker}</span>
              <div>
                <h2 className="display display-md max-w-[18ch] text-balance">{p.casesTitle}</h2>
                <p className="mt-3 text-sm text-muted">{p.casesIntro}</p>
              </div>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {p.cases.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <TiltCard className="h-full">
                    <article className="flex h-full flex-col rounded-[var(--radius-site)] border border-line bg-card p-7 transition-colors duration-200 hover:border-ink/30">
                      <span className="label text-accent">{c.tag}</span>
                      <h3 className="display display-sm mt-4">{c.title}</h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{c.text}</p>
                      <div className="mt-6 min-w-0 overflow-hidden rounded-[var(--radius-site)] border border-line bg-paper p-4">{vizzes[i]}</div>
                    </article>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Tech stack : marque défilante + grille pastel */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <Container>
          <Reveal>
            <h2 className="display display-lg mx-auto max-w-[16ch] text-center text-balance">{p.stackTitle}</h2>
          </Reveal>
        </Container>

        <div
          className="relative mt-14 flex flex-col gap-4"
          style={{ maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)" }}
          aria-hidden
        >
          <Marquee className="py-1">
            <span className="marquee-label">
              {p.stack.map((t) => (
                <span key={t.name} className="mx-8 inline-flex items-center gap-3 font-mono text-sm text-paper/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.logo} alt="" className="h-5 w-auto max-w-24 object-contain" loading="lazy" />
                  {t.name}
                </span>
              ))}
            </span>
          </Marquee>
          <Marquee reverse className="py-1">
            <span className="marquee-label">
              {p.stack.slice().reverse().map((t) => (
                <span key={t.name} className="mx-8 inline-flex items-center gap-3 font-mono text-sm text-paper/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.logo} alt="" className="h-5 w-auto max-w-24 object-contain" loading="lazy" />
                  {t.name}
                </span>
              ))}
            </span>
          </Marquee>
        </div>

        <Container className="mt-12">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {p.stack.map((t, i) => (
                <div
                  key={t.name}
                  style={{ backgroundColor: stackBg[i % stackBg.length] }}
                  className="flex flex-col items-center justify-center gap-4 rounded-[var(--radius-site)] p-8 md:p-10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.logo} alt="" className="h-10 w-10 object-contain md:h-12 md:w-12" loading="lazy" />
                  <span className="text-sm font-semibold text-ink">{t.name}</span>
                </div>
              ))}
            </div>
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
                <ScrambleText text={p.kicker} />
              </span>
              <h2 className="display display-md mt-3 max-w-[18ch] text-balance">{p.ctaTitle}</h2>
              <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed text-muted">{p.ctaText}</p>
            </div>
            <GradientButton href={`/${locale}/contact`} variant="solid">
              {p.cta}
            </GradientButton>
          </div>
        </Container>
      </section>
    </>
  );
}
