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
}: {
  locale: Locale;
  dict: Dict;
  standalone?: boolean;
}) {
  if (projects.length === 0) return null;
  const t = dict.work;
  const cursorLabel = locale === "fr" ? "Voir le projet" : "View project";

  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel>{t.kicker}</SectionLabel>
            <SplitText as="h2" text={t.title} className="display display-md mt-6 max-w-[22ch]" />
          </div>
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
                    <article className="overflow-hidden rounded-[var(--radius-site)] border border-line bg-card transition-colors duration-300 hover:border-ink/30">
                      <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                        <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft md:aspect-[21/9]">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={title}
                              fill
                              sizes="100vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="display select-none text-[22vw] leading-none text-brand/15 md:text-[14vw]">{num}</span>
                            </div>
                          )}

                          {/* overlay meta au survol */}
                          <div className="absolute inset-0 flex translate-y-full flex-col justify-center gap-4 bg-brand/95 p-6 text-paper opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 md:p-10">
                            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs md:grid-cols-4">
                              <div>
                                <dt className="text-paper/40">{t.labels.createdAt}</dt>
                                <dd className="mt-1">{p.date}</dd>
                              </div>
                              <div>
                                <dt className="text-paper/40">{t.labels.name}</dt>
                                <dd className="mt-1">{title}</dd>
                              </div>
                              <div>
                                <dt className="text-paper/40">{t.labels.type}</dt>
                                <dd className="mt-1">{p.type}</dd>
                              </div>
                              <div>
                                <dt className="text-paper/40">{t.labels.stack}</dt>
                                <dd className="mt-1">{p.stack.join(", ")}</dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </ViewTransition>

                      <div className="flex flex-wrap items-center justify-between gap-4 p-6 md:p-8">
                        <div>
                          <p className="label text-accent">{category}</p>
                          <h3 className="display display-md mt-2">{p.confidential ? t.confidential : title}</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{p.scope.join(" / ")}</span>
                          <span aria-hidden className="text-xl text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
                            →
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
