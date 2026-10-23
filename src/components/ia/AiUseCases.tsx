"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Card 1 - Document assistant: live chat loop.
   Both messages always occupy space (opacity-only cycling) so the card
   height never changes when the "reply" arrives. */
export function ChatViz({
  user,
  ai,
}: {
  user: string;
  ai: string[];
}) {
  const [step, setStep] = useState(1);
  const reduce = !!useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setStep(99);
      return;
    }
    const id = setInterval(() => setStep((s) => (s >= ai.length + 4 ? 1 : s + 1)), 1700);
    return () => clearInterval(id);
  }, [reduce, ai.length]);

  const total = ai.length + 4;

  return (
    <div className="flex h-[190px] min-w-0 flex-col justify-start gap-2 overflow-hidden">
      <motion.div
        initial={false}
        animate={{
          opacity: reduce ? 1 : step >= 1 ? 1 : 0,
          y: reduce ? 0 : step >= 1 ? 0 : 6,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[88%] min-w-0 self-end rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-[12.5px] leading-snug text-paper [overflow-wrap:anywhere]"
      >
        {user}
      </motion.div>
      {ai.map((t, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            opacity: reduce ? 1 : step >= i + 2 ? 1 : 0,
            y: reduce ? 0 : step >= i + 2 ? 0 : 6,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[88%] min-w-0 self-start rounded-2xl rounded-bl-md border border-line bg-paper-2 px-3.5 py-2 text-[12.5px] leading-snug text-ink [overflow-wrap:anywhere]"
        >
          {t}
        </motion.div>
      ))}
      <motion.div
        key="dots"
        aria-hidden
        animate={{ opacity: reduce ? 0 : step >= total - 1 ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="flex w-14 items-center justify-center gap-1 self-start rounded-full border border-line bg-paper-2 px-3 py-1.5"
      >
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="h-1.5 w-1.5 rounded-full bg-ink/50"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.18 }}
          />
        ))}
      </motion.div>
      <span className="sr-only">{ai.join(" ")}</span>
    </div>
  );
}

/* Card 2 - Automation: documents flowing through a pipeline */
export function PipelineViz({ files }: { files: string[] }) {
  return (
    <div className="flex min-h-[150px] flex-col justify-center gap-3 font-mono text-[12px]">
      {files.map((f, i) => (
        <div key={f} className="flex items-center gap-3">
          <span className="w-32 shrink-0 truncate text-ink/70 md:w-40">{f}</span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-[#c93a38]"
              animate={{ width: ["0%", "100%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 1.1,
                delay: i * 0.55,
                ease: "easeInOut",
              }}
            />
          </div>
          <motion.span
            aria-hidden
            className="text-[#1d7a4f]"
            animate={{ opacity: [0, 0, 1, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 1.1,
              delay: i * 0.55 + 1.3,
              times: [0, 0.7, 0.85, 1],
            }}
          >
            ✓
          </motion.span>
        </div>
      ))}
    </div>
  );
}

/* Card 3 - Decision agent: live predictive chart */
const BARS = [34, 58, 42, 70, 55, 88, 64, 96];

export function ChartViz({
  labelLeft,
  labelRight,
  alert,
}: {
  labelLeft: string;
  labelRight: string;
  alert: string;
}) {
  const reduce = !!useReducedMotion();
  return (
    <div className="flex min-h-[150px] flex-col justify-end">
      <div className="flex h-[110px] items-end gap-1.5">
        {BARS.map((v, i) => (
          <motion.div
            key={i}
            className="relative flex-1 rounded-t-md bg-gradient-to-t from-[#4d6bff]/85 to-[#9db0ff]/85"
            initial={{ height: 4 }}
            whileInView={{ height: `${v}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {i === BARS.length - 1 ? (
              <motion.span
                aria-hidden
                className="absolute -top-2.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#c93a38] bg-card"
                animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            ) : null}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-ink/50">
        <span>{labelLeft}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c93a38]" />
          {alert}
        </span>
        <span>{labelRight}</span>
      </div>
    </div>
  );
}
