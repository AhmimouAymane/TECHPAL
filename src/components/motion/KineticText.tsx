"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

const charV: Variants = {
  hidden: { y: "70%", rotateX: -88, opacity: 0 },
  show: { y: "0%", rotateX: 0, opacity: 1, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Character-level kinetic reveal (mask + 3D flip).
 * - Uncontrolled: animates when scrolled into view.
 * - Controlled: pass `active` to replay whenever it flips to true
 *   (used by the pinned hero, where scenes are scroll-driven, not viewport-driven).
 */
export function KineticText({
  text,
  as: As = "h2",
  className,
  delay = 0,
  stagger = 0.022,
  active,
  amount = 0.4,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  active?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <As className={className}>{text}</As>;

  const words = text.split(" ");
  const controlled = typeof active === "boolean";
  const reveal = controlled
    ? { animate: active ? "show" : "hidden" }
    : { whileInView: "show", viewport: { once: true, amount } };

  return (
    <As className={className} style={{ perspective: "900px" }}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        className="inline"
        {...reveal}
      >
        {words.map((word, wi) => (
          <Fragment key={`${word}-${wi}`}>
            <span className="inline-block overflow-hidden whitespace-nowrap pb-[0.14em] align-bottom">
              {Array.from(word).map((char, ci) => (
                <motion.span key={ci} variants={charV} className="inline-block will-change-transform">
                  {char}
                </motion.span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </As>
  );
}
