"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

export function SplitText({
  text,
  as: As = "div",
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
  amount = 0.4,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotionSafe();
  const words = text.split(" ");

  if (reduce) {
    return <As className={className}>{text}</As>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "115%" },
    show: { y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <As className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
        variants={container}
        className="inline"
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>
            <span className="inline-flex overflow-hidden align-bottom pb-[0.12em]">
              <motion.span variants={word} className="split-word">
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </As>
  );
}
