"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import type { Dict } from "@/content/fr";
import { SHOT_RANGES, paintReel, shotIndex, type Fonts } from "@/lib/reel-paint";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { ScrambleText } from "../motion/ScrambleText";
import { Container } from "../ui/Container";

/**
 * Pinned scroll-scrubbed showreel. Renders the deterministic canvas
 * sequence from `@/lib/reel-paint`, recomposed live to the viewport size
 * (portrait-safe: the painter fits its typography to the real width).
 */
export function ScrollReel({ dict }: { dict: Dict }) {
  const reduce = useReducedMotionSafe();
  const pinned = !reduce;

  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const serifProbeRef = useRef<HTMLSpanElement>(null);
  const fontsRef = useRef<Fonts>({ mono: '"IBM Plex Mono", monospace', serif: '"Instrument Serif", Georgia, serif' });
  const lastPainted = useRef(-1);
  const [shot, setShot] = useState(0);

  const { scrollYProgress } = useScroll(pinned ? { target: ref, offset: ["start start", "end end"] } : {});
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.8 });

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.globalAlpha = 1;
    paintReel(ctx, smooth.get(), w, h, fontsRef.current);
  }, [smooth]);

  useEffect(() => {
    if (!pinned) return;
    const hud = hudRef.current;
    if (hud) {
      const cs = getComputedStyle(hud);
      if (cs.fontFamily) fontsRef.current.mono = cs.fontFamily;
    }
    const probe = serifProbeRef.current;
    if (probe) {
      const cs = getComputedStyle(probe);
      if (cs.fontFamily) fontsRef.current.serif = cs.fontFamily;
    }
    paint();
    const ro = new ResizeObserver(() => paint());
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", paint);
    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) paint();
    });
    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("resize", paint);
    };
  }, [pinned, paint]);

  useMotionValueEvent(smooth, "change", (p) => {
    if (Math.abs(p - lastPainted.current) > 0.0004) {
      lastPainted.current = p;
      paint();
    }
    const s = shotIndex(p);
    setShot((prev) => (prev === s ? prev : s));
  });

  if (!pinned) {
    return (
      <section className="relative">
        <Container>
          <div className="py-16 md:py-24">
            <div className="flex items-center gap-3 text-muted">
              <span className="label">{dict.reel.kicker}</span>
              <span className="label text-accent">— {dict.reel.labels[5]}</span>
            </div>
            <div className="mt-8 overflow-hidden rounded-[var(--radius-site)] bg-gradient-to-br from-[#020b52] via-brand to-[#0a0a14] px-6 py-20 text-center md:py-28">
              <p className="label text-paper/60">{dict.reel.note}</p>
              <p className="display mt-4 text-5xl text-paper md:text-7xl">TECHPAL</p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const lightShot = shot === 3 || shot === 5;

  return (
    <section ref={ref} className="relative" style={{ height: "520vh" }}>
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden bg-ink">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10">
          <div className={`flex items-center justify-between gap-6 ${lightShot ? "text-ink" : "text-paper"}`}>
            <div className={`flex items-center gap-3 ${lightShot ? "text-ink/70" : "text-paper/70"}`}>
              <span className="label">
                <ScrambleText text={dict.reel.kicker} />
              </span>
              <span aria-hidden className={`h-px w-16 ${lightShot ? "bg-ink/20" : "bg-paper/30"}`} />
            </div>
            <span className={`label hidden sm:block ${lightShot ? "text-ink/40" : "text-paper/40"}`}>{dict.reel.note}</span>
          </div>

          <div ref={hudRef} className={`font-mono flex items-end justify-between gap-6 pl-10 md:pl-14 ${lightShot ? "text-ink" : "text-paper"}`}>
            <p className={`label ${lightShot ? "text-ink/80" : "text-paper/80"}`}>
              <span className="text-accent">{String(shot + 1).padStart(2, "0")}</span>
              {" / "}
              {String(SHOT_RANGES.length).padStart(2, "0")} — {dict.reel.labels[shot]}
            </p>
            <p className={`label hidden md:block ${lightShot ? "text-ink/40" : "text-paper/40"}`}>TECHPAL · CASABLANCA</p>
          </div>
        </div>

        <div aria-hidden className={`absolute inset-x-0 bottom-0 h-0.5 ${lightShot ? "bg-ink/10" : "bg-paper/10"}`}>
          <motion.div className="h-full origin-left bg-accent" style={{ scaleX: smooth }} />
        </div>

        <span ref={serifProbeRef} aria-hidden className="sr-only font-display">
          Aa
        </span>
      </div>
    </section>
  );
}
