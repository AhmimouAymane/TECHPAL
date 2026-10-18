import Link from "next/link";
import type { Dict } from "@/content/fr";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";
import { Container, SectionLabel } from "../ui/Container";

export function ServicesIndex({ locale, dict }: { locale: Locale; dict: Dict }) {
  const t = dict.services;
  const cursorLabel = locale === "fr" ? "Explorer" : "Explore";
  const last = t.items.length - 1;

  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <SectionLabel>{t.kicker}</SectionLabel>
            <SplitText as="h2" text={t.title} className="display display-md mt-6 max-w-[20ch]" />
            <p className="mt-6 max-w-[46ch] leading-relaxed text-muted">{t.intro}</p>
            <Link href={`/${locale}/a-propos`} className="link-line mt-8 inline-flex items-center gap-2 text-sm font-medium">
              {t.link} <span aria-hidden>→</span>
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
            {t.items.map((item, i) => {
              const wide = i === 0 || i === last;
              return (
                <Reveal as="li" key={item.n} delay={i * 0.04} className={wide ? "sm:col-span-2" : undefined}>
                  <TiltCard max={4} className="h-full">
                    <Link
                      href={`/${locale}/expertise`}
                      transitionTypes={["nav-forward"]}
                      data-cursor-label={cursorLabel}
                      className="group flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[var(--radius-site)] border border-line bg-card p-6 transition-colors duration-300 hover:border-ink/30 md:p-8"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">({item.n})</span>
                        <span
                          aria-hidden
                          className="text-xl text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                        >
                          →
                        </span>
                      </div>
                      <div>
                        <h3 className="display display-md transition-transform duration-500 group-hover:-translate-y-0.5">{item.title}</h3>
                        <p className="mt-2 max-w-[48ch] text-sm text-muted">{item.desc}</p>
                        <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted/70">
                          {item.points.join(" / ")}
                        </p>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
