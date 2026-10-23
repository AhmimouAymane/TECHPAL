"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, ViewTransition } from "react";
import type { Dict } from "@/content/fr";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { useMediaQuerySafe } from "@/lib/use-media-query";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import { Container, SectionLabel } from "../ui/Container";
import { WorkCards } from "./WorkCards";

/**
 * Projects index: asymmetric bento mosaic - every logo is visible on load.
 * Falls back to the vertical cards below 1024px or with reduced motion.
 */
export function WorkIndex({ locale, dict, hideHeading = false }: { locale: Locale; dict: Dict; hideHeading?: boolean }) {
  const isDesktop = useMediaQuerySafe("(min-width: 1024px)");
  const reduce = useReducedMotionSafe();
  if (!isDesktop || reduce) return <WorkCards locale={locale} dict={dict} standalone hideHeading={hideHeading} />;
  return <BentoGrid locale={locale} dict={dict} hideHeading={hideHeading} />;
}

/* Column spans, repeating so consecutive rows sum to 12: [7+5] [4+8] [6+6] */
const SPANS = [7, 5, 4, 8, 6, 6];
/* Static classes so Tailwind keeps them in the build */
const COLS: Record<number, string> = {
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  12: "md:col-span-12",
};

function BentoGrid({ locale, dict, hideHeading }: { locale: Locale; dict: Dict; hideHeading: boolean }) {
  const t = dict.work;
  const years = useMemo(() => [...new Set(projects.map((p) => p.date))], []);
  const [year, setYear] = useState<string | null>(null);
  const list = year ? projects.filter((p) => p.date === year) : projects;

  const cursorLabel = locale === "fr" ? "Découvrir" : "Explore";
  const allLabel = locale === "fr" ? "Tous" : "All";

  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <div className={`flex flex-wrap items-end gap-8 ${hideHeading ? "justify-end" : "justify-between"}`}>
          {!hideHeading && (
            <div>
              <SectionLabel>{t.kicker}</SectionLabel>
              <h2 className="display display-md mt-6 max-w-[24ch] leading-[1.05]">{t.title}</h2>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip active={year === null} onClick={() => setYear(null)} label={allLabel} />
            {years.map((y) => (
              <FilterChip
                key={y}
                active={year === y}
                onClick={() => setYear(y === year ? null : y)}
                label={y}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span className="label shrink-0 text-muted">
            {String(list.length).padStart(2, "0")} {locale === "fr" ? "projets" : "projects"}
          </span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <ul className="mt-10 grid auto-rows-[clamp(230px,24vw,380px)] grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {list.map((p, i) => {
            const title = locale === "fr" ? p.titleFr : p.titleEn;
            const category = locale === "fr" ? p.categoryFr : p.categoryEn;
            const num = String(i + 1).padStart(2, "0");
            const span = SPANS[i % SPANS.length];
            return (
              <Reveal
                as="li"
                key={p.slug}
                delay={i * 0.06}
                className={`h-full ${COLS[span] ?? "md:col-span-6"}`}
              >
                <TiltCard max={3} className="h-full">
                  <Link
                    href={`/${locale}/projets/${p.slug}`}
                    transitionTypes={["nav-forward"]}
                    data-cursor-label={cursorLabel}
                    className="group flex h-full flex-col"
                  >
                    <article className="relative h-full min-h-[220px] flex-1 overflow-hidden rounded-[var(--radius-site)] border border-white/10 bg-ink shadow-[0_30px_60px_-40px_rgba(10,10,20,0.5)] transition-shadow duration-500 group-hover:border-white/20">
                      <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={title}
                              fill
                              sizes="(min-width:1024px) 50vw, 100vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(160deg,var(--color-brand),var(--color-ink))]">
                              <span className="display select-none text-[22vh] leading-none text-paper/15">{num}</span>
                            </div>
                          )}
                        </div>
                      </ViewTransition>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/5 transition-opacity duration-500 group-hover:from-ink/95" />

                      <span className="absolute top-4 right-4 rounded-full border border-paper/25 px-3 py-1 font-mono text-[11px] tracking-widest text-paper/85 backdrop-blur-sm md:top-5 md:right-5">
                        {p.date}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 p-4 text-paper md:p-6">
                        <p className="label text-paper/60">{category}</p>
                        <h3 className="display mt-2 text-[clamp(1.25rem,1.8vw,1.9rem)] leading-[1.1] text-paper">
                          {p.confidential ? t.confidential : title}
                        </h3>
                      </div>

                      <span
                        aria-hidden
                        className="absolute right-4 bottom-4 grid size-10 shrink-0 place-items-center rounded-full border border-paper/30 text-paper transition-all duration-300 group-hover:border-accent group-hover:bg-accent md:right-6 md:bottom-6 xl:size-11"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </span>
                    </article>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 font-mono text-[11px] tracking-widest uppercase transition-colors duration-300 ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-line text-muted hover:border-ink/40 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
