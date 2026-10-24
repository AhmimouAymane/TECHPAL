"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import type { Dict } from "@/content/fr";
import type { Locale } from "@/lib/i18n";
import { GradientButton } from "../motion/GradientButton";
import { KineticText } from "../motion/KineticText";
import { CircuitHeart } from "../art/CircuitHeart";
import { Container } from "../ui/Container";

type Scene = Dict["hero"]["scenes"][number];

function SceneBlock({
  scene,
  index,
  total,
  progress,
  active,
}: {
  scene: Scene;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  // Transition séquentielle : la scène sortante atteint 0 sur `end` pile au
  // moment où l'entrante démarre — jamais deux titres lisibles en même temps.
  const w = seg * 0.14;

  const inputs = isFirst
    ? [0, end - w, end]
    : isLast
      ? [start, start + w, 1]
      : [start, start + w, end - w, end];
  const outputs = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];

  const opacity = useTransform(progress, inputs, outputs);
  const y = useTransform(progress, [start, end], [30, -30]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 flex flex-col justify-center will-change-[opacity,transform]"
      aria-hidden={!active}
    >
      <span className="label text-accent">{scene.label}</span>
      <KineticText as={index === 0 ? "h1" : "h2"} text={scene.title} active={active} className="display mt-6 max-w-[16ch] text-balance text-[clamp(2.75rem,7.5vw,7.25rem)] leading-[0.92]" />
      <p className="mt-6 max-w-[46ch] text-lg text-muted md:text-xl">{scene.text}</p>
    </motion.div>
  );
}

/** Cœur circuit : présent sur les 5 scènes, dérive lente vers le haut. */
function HeroHeart({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [0, -64]);
  const scale = useTransform(progress, [0, 1], [0.97, 1.06]);

  return (
    <motion.div
      aria-hidden
      style={{ y, scale }}
      className="pointer-events-none absolute bottom-[-8%] right-[-4%] z-0 flex w-[44vw] will-change-transform sm:inset-y-0 sm:bottom-auto sm:right-0 sm:w-[min(40vw,500px)] sm:translate-y-12 sm:items-center sm:justify-end md:translate-y-20"
    >
      <CircuitHeart delay={0.2} className="w-full opacity-25 sm:opacity-100" />
    </motion.div>
  );
}

export function PinnedHero({ locale, dict }: { locale: Locale; dict: Dict }) {
  const scenes = dict.hero.scenes;
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(
    reduce ? {} : { target: ref, offset: ["start start", "end end"] }
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(scenes.length - 1, Math.max(0, Math.floor(v * scenes.length + 0.0001)));
    setActiveIndex((prev) => (prev === i ? prev : i));
  });

  const counter = useTransform(scrollYProgress, (v) => {
    const i = Math.min(scenes.length - 1, Math.floor(v * scenes.length + 0.0001));
    return String(i + 1).padStart(2, "0");
  });

  // Parallaxe multi-couches
  const haloL = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const haloR = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const aura = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.7, 0.35]);

  // Cœur circuit : visible sur la scène 01 uniquement (fenêtre gérée dans
  // HeroHeart, même mécanique que SceneBlock).
  const seg = 1 / scenes.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.classList.toggle("hero-live", entry.isIntersecting);
      },
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("hero-live");
    };
  }, []);

  if (reduce) {
    return (
      <section className="relative pb-20 pt-32">
        <Container className="flex flex-col gap-24">
          {scenes.map((s) => (
            <div key={s.title}>
              <span className="label text-accent">{s.label}</span>
              <h1 className="display display-xl mt-5 max-w-[16ch]">{s.title}</h1>
              <p className="mt-5 max-w-[46ch] text-lg text-muted">{s.text}</p>
            </div>
          ))}
        </Container>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `${scenes.length * 100}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {/* parallax grid + halos */}
        <motion.div aria-hidden style={{ y: gridY }} className="hero-grid" />
        <motion.div
          aria-hidden
          style={{ y: haloL }}
          className="pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full bg-brand/15 blur-[150px]"
        />
        <motion.div
          aria-hidden
          style={{ y: haloR }}
          className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-accent/15 blur-[140px]"
        />
        <motion.div
          aria-hidden
          style={{ opacity: aura }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(3,17,138,0.16),transparent_70%)]"
        />

        <Container className="relative flex flex-1 flex-col justify-center">
          <div className="relative h-[62vh] md:h-[58vh]">
            <HeroHeart progress={scrollYProgress} />
            {scenes.map((s, i) => (
              <SceneBlock
                key={s.title}
                scene={s}
                index={i}
                total={scenes.length}
                progress={scrollYProgress}
                active={i === activeIndex}
              />
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4 md:mt-20">
            <GradientButton href={`/${locale}/contact`} variant="solid" transitionTypes={["nav-forward"]}>
              {dict.hero.cta1}
            </GradientButton>
            <GradientButton href={`/${locale}/expertise`} variant="outline" transitionTypes={["nav-forward"]}>
              {dict.hero.cta2}
            </GradientButton>
          </div>
        </Container>

        <Container className="relative flex items-center justify-between pb-8 font-mono text-xs text-muted">
          <span className="label">{dict.hero.hint}</span>
          <span className="flex items-baseline gap-1">
            <motion.span className="text-ink">{counter}</motion.span>
            <span>/</span>
            <span>{String(scenes.length).padStart(2, "0")}</span>
          </span>
        </Container>
      </div>
    </section>
  );
}
