"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Full-bleed ink hero with a live neural-network canvas.
 * Nodes drift, form synapses, brighten around the pointer.
 * Reduced motion: one static frame, no RAF loop.
 */
type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number; phase: number };

function NeuralCanvas({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999 };
    let nodes: Node[] = [];

    const LINK = 120;
    const PULL = 150;

    const seed = () => {
      const count = Math.max(34, Math.min(96, Math.floor((w * h) / 20000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: 0.9 + Math.random() * 1.7,
        hue: Math.random() < 0.1 ? 1 : 0, // 1 = accent, 0 = electric blue
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      if (!canvas.parentElement) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(0); // static frame only
    };

    const step = (t: number, dt: number) => {
      for (const n of nodes) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < PULL * PULL && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((PULL - d) / PULL) * 0.012;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
        n.vx *= 0.995;
        n.vy *= 0.995;
        const sp2 = n.vx * n.vx + n.vy * n.vy;
        if (sp2 > 0.16) {
          const cap = 0.4 / Math.sqrt(sp2);
          n.vx *= cap;
          n.vy *= cap;
        }
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }
      void t;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const p2 = LINK * LINK;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > p2) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / LINK) * 0.3;
          const near =
            (Math.abs(a.x - pointer.x) < 90 && Math.abs(a.y - pointer.y) < 90) ||
            (Math.abs(b.x - pointer.x) < 90 && Math.abs(b.y - pointer.y) < 90);
          ctx.strokeStyle =
            near
              ? `rgba(122,144,255,${Math.min(alpha * 2.2, 0.85)})`
              : `rgba(122,144,255,${alpha})`;
          ctx.lineWidth = near ? 1.1 : 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        const pulse = reduced ? 1 : 1 + 0.22 * Math.sin(time / 640 + n.phase);
        const near =
          Math.abs(n.x - pointer.x) < 90 && Math.abs(n.y - pointer.y) < 90;
        const size = n.r * (near ? 1.65 : 1) * pulse;
        ctx.beginPath();
        ctx.fillStyle =
          n.hue === 1
            ? near
              ? "rgba(232,110,104,0.95)"
              : "rgba(201,58,56,0.65)"
            : near
              ? "rgba(178,194,255,1)"
              : "rgba(178,194,255,0.6)";
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let last = 0;
    const loop = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (t - last < 33) return; // ~30 fps is plenty for drifting dots
      const dt = Math.min((t - last) / 16.7, 2.5);
      last = t;
      step(t, dt);
      draw(t);
    };

    resize();
    if (!reduced) {
      running = true;
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    const ro = new ResizeObserver(() => resize());

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0" />;
}

export function NeuralHero({
  kicker,
  title,
  intro,
  words,
  hint,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  className,
}: {
  kicker: string;
  title: string;
  intro: string;
  words: string[];
  hint: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}) {
  const reduce = !!useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [reduce, words.length]);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-ink text-paper",
        "before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-24 before:bg-gradient-to-b before:from-transparent before:to-transparent",
        className
      )}
    >
      <NeuralCanvas reduced={reduce} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_70%_-10%,rgba(77,107,255,0.16),transparent_60%),linear-gradient(to_bottom,rgba(10,10,20,0.55),rgba(10,10,20,0.2)_40%,rgba(10,10,20,0.85))]"
      />

      <div className="relative mx-auto flex min-h-[86vh] w-full max-w-[1400px] flex-col justify-center px-6 pb-24 pt-36 md:px-10 md:pt-44">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c93a38] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c93a38]" />
          </span>
          <span className="label font-semibold text-paper/90">{kicker}</span>
        </div>

        <h1 className="display display-xl mt-7 max-w-[16ch] text-balance">{title}</h1>

        <div className="mt-7 flex min-h-[2.6rem] items-center gap-3 text-lg md:text-xl">
          <span aria-hidden className="font-mono text-[#c93a38]">
            &gt;
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-paper/90"
            >
              {words[idx]}
            </motion.span>
          </AnimatePresence>
          <span aria-hidden className="inline-block h-5 w-[2px] animate-pulse bg-[#c93a38]" />
        </div>

        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper/65">{intro}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={ctaHref}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[var(--radius-pill)] border border-paper/25 bg-paper/10 px-7 py-3.5 text-sm font-semibold text-paper backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-paper/50 hover:bg-paper/20"
          >
            <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {ctaLabel}
            <span aria-hidden>→</span>
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="text-sm font-medium text-paper/60 underline-offset-4 transition-colors hover:text-paper"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>

        <p className="pointer-events-none absolute bottom-6 right-6 hidden font-mono text-[11px] tracking-wide text-paper/25 lg:block">
          {hint}
        </p>
      </div>
    </section>
  );
}
