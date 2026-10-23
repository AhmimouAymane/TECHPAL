import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Dict } from "@/content/fr";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";
import { Container, SectionLabel } from "../ui/Container";

export function WorkCards({
  locale,
  dict,
  standalone = false,
  hideHeading = false,
}: {
  locale: Locale;
  dict: Dict;
  standalone?: boolean;
  hideHeading?: boolean;
}) {
  if (projects.length === 0) return null;
  const t = dict.work;
  const cursorLabel = locale === "fr" ? "Découvrir" : "Explore";

  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          {!hideHeading && (
            <div>
              <SectionLabel>{t.kicker}</SectionLabel>
              <SplitText as="h2" text={t.title} className="display display-md mt-6 max-w-[22ch]" />
            </div>
          )}
          {!standalone && (
            <Link href={`/${locale}/projets`} className="link-line inline-flex items-center gap-2 text-sm font-medium">
              {t.viewAll} <span aria-hidden>→</span>
            </Link>
          )}
        </div>

        <ul className="mt-14 flex flex-col gap-6 md:gap-8">
          {projects.map((p, i) => {
            const title = locale === "fr" ? p.titleFr : p.titleEn;
            const category = locale === "fr" ? p.categoryFr : p.categoryEn;
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal as="li" key={p.slug} delay={i * 0.05}>
                <TiltCard max={3}>
                  <Link
                    href={`/${locale}/projets/${p.slug}`}
                    transitionTypes={["nav-forward"]}
                    data-cursor-label={cursorLabel}
                    className="group block"
                  >
                    <article className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-site)] border border-white/10 bg-ink shadow-[0_30px_60px_-40px_rgba(10,10,20,0.5)] transition-shadow duration-500 group-hover:border-white/20 md:aspect-[21/9]">
                      <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={title}
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(160deg,var(--color-brand),var(--color-ink))]">
                              <span className="display select-none text-[24vw] leading-none text-paper/15 md:text-[13vw]">{num}</span>
                            </div>
                          )}
                        </div>
                      </ViewTransition>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/5 transition-opacity duration-500 group-hover:from-ink/95" />

                      <span className="absolute top-4 right-4 rounded-full border border-paper/25 px-3 py-1 font-mono text-[11px] tracking-widest text-paper/85 backdrop-blur-sm md:top-6 md:right-6">
                        {p.date}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-8">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="label text-paper/60">{category}</p>
                            <h3 className="display display-md mt-2 leading-[1.05] text-paper">{p.confidential ? t.confidential : title}</h3>
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-paper/60">{p.stack.join(" / ")}</p>
                          </div>
                          <span
                            aria-hidden
                            className="grid size-11 shrink-0 place-items-center rounded-full border border-paper/30 text-paper transition-all duration-300 group-hover:border-accent group-hover:bg-accent md:size-14"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" />
                              <path d="m13 6 6 6-6 6" />
                            </svg>
                          </span>
                        </div>
                      </div>
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
