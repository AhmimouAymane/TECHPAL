"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Intro loader: 000% -> 100% puis un rideau qui se lève. Joué à chaque
 * chargement (refresh compris) ; le refresh replace aussi la page en haut.
 * Entièrement coupé pour prefers-reduced-motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    // Refresh = départ propre en haut de page (pas de restauration navigateur)
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload") window.scrollTo(0, 0);

    if (reduce) {
      const id = requestAnimationFrame(() => {
        setActive(false);
        setDone(true);
      });
      return () => cancelAnimationFrame(id);
    }

    let current = 0;
    const id = window.setInterval(() => {
      current = Math.min(100, current + Math.ceil(Math.random() * 9) + 3);
      setCount(current);
      if (current >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 380);
      }
    }, 90);
    return () => window.clearInterval(id);
  }, [reduce]);

  // Démonte le rideau une fois l'animation de sortie jouée (0.7s)
  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => setActive(false), 750);
    return () => window.clearTimeout(id);
  }, [done]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
          initial={false}
          animate={done ? "exit" : "enter"}
          variants={{
            enter: { y: 0 },
            exit: { y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
          }}
          aria-hidden="true"
        >
          <div className="flex w-full max-w-[900px] flex-col gap-6 px-8">
            <div className="flex items-end justify-between">
              <span className="label text-paper/60">TECHPAL</span>
              <span className="font-mono text-sm text-paper/60">Chargement de l&apos;expérience…</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="display display-md">{String(count).padStart(3, "0")}%</span>
              <span className="label text-paper/60">Initialisation</span>
            </div>
            <div className="h-px w-full bg-paper/20">
              <motion.div
                className="h-px bg-paper"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                style={{ transformOrigin: "left" }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
