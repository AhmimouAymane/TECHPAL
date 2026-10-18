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

        <motion.ul ref={trackRef} style={{ x }} className="mt-6 flex gap-6 px-6 will-change-transform md:px-10">
          {projects.map((p, i) => {
            const title = locale === "fr" ? p.titleFr : p.titleEn;
            const category = locale === "fr" ? p.categoryFr : p.categoryEn;
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={p.slug} className="w-[78vw] shrink-0 md:w-[38vw] md:max-w-[560px]">
                <TiltCard max={4}>
                  <Link
                    href={`/${locale}/projets/${p.slug}`}
                    transitionTypes={["nav-forward"]}
                    data-cursor-label={cursorLabel}
                    className="group block"
                  >
                    <article className="overflow-hidden rounded-[var(--radius-site)] border border-line bg-card transition-colors duration-300 hover:border-ink/30">
                      <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                        <div className="relative h-[38vh] w-full overflow-hidden bg-brand-soft">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={title}
                              fill
                              sizes="(min-width: 768px) 38vw, 78vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="display select-none text-[20vh] leading-none text-brand/12">{num}</span>
                            </div>
                          )}
                        </div>
                      </ViewTransition>

                      <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                        <div>
                          <p className="label text-accent">{category}</p>
                          <h3 className="display mt-1.5 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight">
                            {p.confidential ? t.confidential : title}
                          </h3>
                        </div>
                        <span
                          aria-hidden
                          className="text-xl text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                        >
                          →
                        </span>
                      </div>
                    </article>
                  </Link>
                </TiltCard>
              </li>
            );
          })}
        </motion.ul>

        <Container className="mt-6">
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
