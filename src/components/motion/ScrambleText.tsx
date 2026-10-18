"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#*+%";

/** Mono label that scrambles into place when it enters the viewport. */
export function ScrambleText({
  text,
  className,
  duration = 850,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    let timer = 0;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const len = text.length;
      const t0 = performance.now();
      timer = window.setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / duration);
        const revealed = Math.floor(p * len);
        let s = "";
        for (let i = 0; i < len; i++) {
          const ch = text[i];
          if (ch === " ") s += " ";
          else if (i < revealed) s += ch;
          else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
        if (p >= 1) {
          window.clearInterval(timer);
          setOut(text);
        }
      }, 34);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      if (timer) window.clearInterval(timer);
    };
  }, [reduce, text, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
