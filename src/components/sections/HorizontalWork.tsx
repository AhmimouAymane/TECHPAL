"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, ViewTransition } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Dict } from "@/content/fr";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { useMediaQuerySafe } from "@/lib/use-media-query";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";
import { Container, SectionLabel } from "../ui/Container";
import { WorkCards } from "./WorkCards";

/**
 * Pinned horizontal gallery: vertical scroll is translated into horizontal
 * movement. Falls back to the vertical list on small screens or reduced motion.
 */
export function HorizontalWork({ locale, dict }: { locale: Locale; dict: Dict }) {
  const isDesktop = useMediaQuerySafe("(min-width: 1024px)");
  const reduce = useReducedMotionSafe();
  const horizontal = isDesktop && !reduce && projects.length > 1;

  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!horizontal) return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const d = Math.max(0, el.scrollWidth - window.innerWidth + 40);
      setDistance(d);
      setHeight(d + window.innerHeight);
    };
    const id = window.requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(id);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  const { scrollYProgress } = useScroll(
    horizontal ? { target: ref, offset: ["start start", "end end"] } : {}
  );
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(xRaw, { stiffness: 130, damping: 30, mass: 0.4 });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  if (!horizontal) return <WorkCards locale={locale} dict={dict} />;

  const t = dict.work;
  const cursorLabel = locale === "fr" ? "Voir le projet" : "View project";

  return (
    <section ref={ref} className="relative" style={{ height: height ? `${height}px` : "340vh" }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionLabel>{t.kicker}</SectionLabel>
              <SplitText as="h2" text={t.title} className="display display-md mt-6 max-w-[24ch]" />
            </div>
            <Link href={`/${locale}/projets`} className="link-line inline-flex items-center gap-2 text-sm font-medium">
              {t.viewAll} <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>

        <motion.ul ref={trackRef} style={{ x }} className="mt-10 flex gap-6 px-6 will-change-transform md:gap-8 md:px-10">
          {projects.map((p, i) => {
            const title = locale === "fr" ? p.titleFr : p.titleEn;
            const category = locale === "fr" ? p.categoryFr : p.categoryEn;
            const year = p.date;
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={p.slug} className={`w-[78vw] shrink-0 md:w-[44vw] md:max-w-[640px] ${i % 2 === 1 ? "md:translate-y-10" : ""}`}>
                <TiltCard max={4}>
                  <Link
                    href={`/${locale}/projets/${p.slug}`}
                    transitionTypes={["nav-forward"]}
                    data-cursor-label={cursorLabel}
                    className="group block"
                  >
                    <article className="relative h-[52vh] overflow-hidden rounded-[var(--radius-site)] border border-white/10 bg-ink shadow-[0_40px_80px_-40px_rgba(10,10,20,0.5)] transition-shadow duration-500 group-hover:border-white/20">
                      <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={title}
                              fill
                              sizes="(min-width: 768px) 44vw, 78vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(160deg,var(--color-brand),var(--color-ink))]">
                              <span className="display select-none text-[18vh] leading-none text-paper/15">{num}</span>
                            </div>
                          )}
                        </div>
                      </ViewTransition>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/5 transition-opacity duration-500 group-hover:from-ink/95" />

                      <span className="absolute top-5 left-5 rounded-full border border-paper/25 px-3 py-1 font-mono text-[11px] tracking-widest text-paper/85 backdrop-blur-sm md:top-6 md:left-6">
                        {num}
                      </span>
                      <span className="absolute top-5 right-5 rounded-full border border-paper/25 px-3 py-1 font-mono text-[11px] tracking-widest text-paper/85 backdrop-blur-sm md:top-6 md:right-6">
                        {year}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-7">
                        <p className="mb-2 translate-y-3 font-mono text-[11px] uppercase tracking-wider text-paper/70 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 md:mb-3">
                          <span className="block">{p.stack.join(" / ")}</span>
                        </p>
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="label text-paper/60">{category}</p>
                            <h3 className="display mt-2 text-[clamp(1.6rem,2.5vw,2.4rem)] leading-[1.1] text-paper">
                              {p.confidential ? t.confidential : title}
                            </h3>
                          </div>
                          <span
                            aria-hidden
                            className="grid size-11 shrink-0 place-items-center rounded-full border border-paper/30 text-paper transition-all duration-300 group-hover:border-accent group-hover:bg-accent md:size-12"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" />
                              <path d="m13 6 6 6-6 6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </TiltCard>
              </li>
            );
          })}
        </motion.ul>

        <Container className="mt-12 md:mt-16">
          <div className="flex items-center gap-4">
            <span className="label shrink-0 text-muted">
              {String(projects.length).padStart(2, "0")} {locale === "fr" ? "projets" : "projects"}
            </span>
            <div className="h-px flex-1 bg-line">
              <motion.div className="h-px origin-left bg-ink" style={{ scaleX: progress }} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
