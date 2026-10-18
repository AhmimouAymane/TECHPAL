"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Trailing ring + dot cursor on fine pointers. Morphs into a filled brand disc
 * with a short label over elements marked `data-cursor-label="…"`.
 * Disabled for reduced-motion / touch.
 */
export function MagneticCursor() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    node.style.display = "block";
    const body = document.body;
    body.classList.add("cursor-none");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let labelA = 0;
    let targetLabelA = 0;
    let currentLabel = "";
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      const el = e.target as HTMLElement | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor-label]");
      const text = labelled?.getAttribute("data-cursor-label") ?? "";

      if (text) {
        targetScale = 3.9;
        targetLabelA = 1;
      } else if (el?.closest("a,button,[data-cursor]")) {
        targetScale = 2.2;
        targetLabelA = 0;
      } else {
        targetScale = 1;
        targetLabelA = 0;
      }

      if (text !== currentLabel) {
        currentLabel = text;
        if (label.current) label.current.textContent = text;
      }
      if (ring.current) {
        ring.current.style.mixBlendMode = text ? "normal" : "difference";
        ring.current.style.background = text ? "var(--color-brand)" : "transparent";
        ring.current.style.borderColor = text ? "transparent" : "";
      }
      if (dot.current) dot.current.style.opacity = text ? "0" : "1";
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += (targetScale - scale) * 0.16;
      labelA += (targetLabelA - labelA) * 0.22;
      const t = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `${t} scale(${scale})`;
      if (label.current) {
        label.current.style.transform = t;
        label.current.style.opacity = String(labelA);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      body.classList.remove("cursor-none");
      node.style.display = "none";
    };
  }, [reduce]);

  return (
    <div ref={root} style={{ display: "none" }} aria-hidden="true">
      <div ref={ring} className="cursor-ring h-9 w-9 border border-paper/90" />
      <div ref={label} className="cursor-label" />
      <div ref={dot} className="cursor-dot h-1.5 w-1.5 bg-paper" />
    </div>
  );
}
