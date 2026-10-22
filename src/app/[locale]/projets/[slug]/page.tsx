import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Container, SectionLabel } from "@/components/ui/Container";
import { SplitText } from "@/components/motion/SplitText";
import { GradientButton } from "@/components/motion/GradientButton";
import fr from "@/content/fr";
import en from "@/content/en";
import { getProject, projects } from "@/content/projects";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProject(slug);
  if (!p || !isLocale(locale)) return {};
  const title = locale === "fr" ? p.titleFr : p.titleEn;
  return { title: `${title} | TECHPAL` };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const p = getProject(slug);
  if (!p) notFound();
  const dict = locale === "fr" ? fr : en;
  const title = locale === "fr" ? p.titleFr : p.titleEn;
  const category = locale === "fr" ? p.categoryFr : p.categoryEn;
  const summary = locale === "fr" ? p.summaryFr : p.summaryEn;
  const story = locale === "fr" ? p.storyFr : p.storyEn;
  const points = locale === "fr" ? p.pointsFr : p.pointsEn;
  const labels = dict.work.labels;

  const meta = [
    { k: labels.createdAt, v: p.date },
    { k: labels.type, v: p.type },
    { k: labels.scope, v: p.scope.join(" / ") },
    { k: labels.stack, v: p.stack.join(", ") },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-36 md:pt-52">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-10 h-[380px] w-[380px] rounded-full bg-brand/10 blur-[140px]" />
        <Container className="relative">
          <Link href={`/${locale}/projets`} className="link-line inline-flex items-center gap-2 text-sm text-muted">
            <span aria-hidden>←</span> {dict.work.kicker}
          </Link>
          <SectionLabel className="mt-10">{category}</SectionLabel>
          <SplitText as="h1" text={title} className="display display-xl mt-6 max-w-[16ch]" />
          {summary ? <p className="mt-8 max-w-[58ch] text-lg text-muted">{summary}</p> : null}
        </Container>
      </section>

      <section className="py-10 md:py-16">
        <Container>
          <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-site)] border border-line bg-paper-2">
              {p.image ? (
                <Image src={p.image} alt={title} fill sizes="100vw" className="object-cover" priority />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="display select-none text-[20vw] leading-none text-ink/[0.06] md:text-[12vw]">
                    {String(projects.findIndex((x) => x.slug === p.slug) + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          </ViewTransition>
        </Container>
      </section>

      {story?.length ? (
        <section className="pb-16 md:pb-24">
          <Container className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <span className="label text-muted">{labels.story}</span>
            <div className="max-w-[70ch] space-y-6">
              {story.map((para, i) => (
                <p key={i} className={i === 0 ? "text-lg leading-relaxed" : "leading-relaxed text-muted"}>
                  {para}
                </p>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {points?.length ? (
        <section className="border-t border-line py-16 md:py-24">
          <Container>
            <span className="label text-muted">{labels.points}</span>
            <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {points.map((pt, i) => (
                <li key={i} className="flex gap-4 border-t border-line pt-5">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed">{pt}</p>
                </li>
              ))}
            </ul>
            {p.href ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="link-line mt-10 inline-flex items-center gap-2 text-sm text-muted">
                {p.href.replace(/^https?:\/\//, "")} <span aria-hidden>↗</span>
              </a>
            ) : null}
          </Container>
        </section>
      ) : null}

      <section className="py-16 md:py-24">
        <Container>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-y border-line py-10 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="label text-muted">{m.k}</dt>
                <dd className="mt-3 text-lg">{m.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 flex flex-wrap items-center gap-4">
            <GradientButton href={`/${locale}/contact`} variant="solid" transitionTypes={["nav-forward"]}>
              {dict.cta.button}
            </GradientButton>
            <GradientButton href={`/${locale}/projets`} variant="outline" transitionTypes={["nav-back"]}>
              {dict.work.viewAll}
            </GradientButton>
          </div>
        </Container>
      </section>
    </>
  );
}
