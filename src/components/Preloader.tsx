"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Intro loader : 000 % → 100 % puis un rideau qui se lève.
 *
 * Contraintes de performance :
 * - **une seule fois par session** — l'attribut `data-intro="played"` posé par
 *   le script inline du layout masque le rideau avant la première peinture au
 *   chargement suivant (aucun flash, aucun mismatch d'hydratation) ;
 * - jamais sur une navigation interne : la navigation client (next/link) ne
 *   remonte pas ce composant, et l'ancre `#` d'un lien profond est respectée ;
 * - coupé pour `prefers-reduced-motion` et en mode économie de données ;
 * - durée totale volontairement courte (~1 s) pour ne pas retarder le LCP.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    const replay = html.getAttribute("data-intro") === "played";
    const deepLink = window.location.hash.length > 1;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

    // Session déjà vue, ancre profonde ou données économisées : pas d'intro.
    if (reduce || replay || deepLink || saveData) {
      setActive(false);
      setDone(true);
      return;
    }

    let current = 0;
    let intervalId = 0;
    let startId = 0;

    // Démarre après la première peinture : le rideau s'affiche avant de compter.
    startId = requestAnimationFrame(() => {
      intervalId = window.setInterval(() => {
        current = Math.min(100, current + 14 + Math.ceil(Math.random() * 8));
        setCount(current);
        if (current >= 100) {
          window.clearInterval(intervalId);
          window.setTimeout(() => setDone(true), 180);
        }
      }, 60);
    });

    return () => {
      cancelAnimationFrame(startId);
      window.clearInterval(intervalId);
    };
  }, [reduce]);

  // Démonte le rideau une fois l'animation de sortie jouée (0.55 s)
  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => setActive(false), 600);
    return () => window.clearTimeout(id);
  }, [done]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
          initial={false}
          animate={done ? "exit" : "enter"}
          variants={{
            enter: { y: 0 },
            exit: { y: "-100%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
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
