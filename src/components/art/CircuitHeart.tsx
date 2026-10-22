"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Marque TechPal : circuit imprimé en segments droits (H / 45°), style PCB.
 * Piste rouge + ligne centrale claire, pastilles aux extrémités, impulsions
 * et onde de sonar. CSS pur, tout coupé par prefers-reduced-motion.
 * Le dessin démarre quand le composant entre dans le viewport (.ch-live).
 */
const P = [
  "M61.8,12.2L73.8,24.2",
  "M90,21L115,46",
  "M32,24L49,41",
  "M73.8,24.2L68,30L55,30",
  "M73.8,24.2L95.2,45.8L115.2,45.8",
  "M18,41L49,41",
  "M48.8,41.2L56.8,41.2L60.2,44.8",
  "M77,41L95,59",
  "M60.2,44.8L52.5,52.5",
  "M60.2,44.8L74.2,58.8",
  "M115,46L138,46",
  "M25,52L36,63",
  "M74,59L65,59L51.5,72.5",
  "M74,59L95,59",
  "M95,59L143,59",
  "M10,62L34.9,62",
  "M34.9,62L41,62L51.5,72.5",
  "M36,63L27.5,71.5",
  "M66,72L147,72",
  "M51.5,72.5L43,81L35,81",
  "M51.5,73L63,84.5L74.5,84.5",
  "M10,81L35,81",
  "M35,81L24.5,91.5",
  "M74.5,84.5L93,84.5",
  "M93,85L143,85",
  "M74.8,84.8L61.2,98.2",
  "M93,85L76.5,101.5",
  "M54,91L61.2,98.2",
  "M99,97L114,97",
  "M99,97L75,121",
  "M114,97L139,97",
  "M61.2,98.2L56.8,102.8L47.8,102.8",
  "M114,97L88.5,122.5",
  "M19,103L48,103",
  "M48,103L31.5,119.5",
  "M56,114L68,114L75,121",
  "M75,121L60.5,135.5",
];

const DOTS: [number, number, number][] = [
  [62, 12, 5.4],
  [90, 21, 5.4],
  [32, 24, 5.4],
  [55, 31, 5.4],
  [18, 41, 5.4],
  [77, 41, 5.4],
  [138, 47, 5.4],
  [25, 52, 5.4],
  [53, 53, 5.4],
  [143, 60, 5.4],
  [10, 62, 5.4],
  [28, 72, 5.4],
  [66, 72, 5.4],
  [147, 72, 5.4],
  [10, 81, 5.4],
  [143, 85, 5.4],
  [54, 91, 5.4],
  [25, 92, 5.4],
  [139, 98, 5.4],
  [78, 103, 5.4],
  [18, 104, 5.4],
  [56, 114, 5.4],
  [32, 120, 5.4],
  [89, 123, 5.4],
  [60, 135, 5.4],
];

const CX = 78.5;
const CY = 73.5;

export function CircuitHeart({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ch-live");
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`ch-root ${className}`}>
      <svg viewBox="-21.5 -26.5 200 200" fill="none" className="tp-glow h-auto w-full" role="presentation">

        {/* 1. Bloom : copie floutée = halo néon */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none" className="tp-bloom">
          {P.map((p, i) => (
            <path key={i} d={p} pathLength="1" className="tp-track" style={{ animationDelay: `${(delay + i * 0.05).toFixed(2)}s` }} />
          ))}
        </g>

        {/* 2. Pistes principales */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {P.map((p, i) => (
            <path key={i} d={p} pathLength="1" className="tp-track" style={{ animationDelay: `${(delay + i * 0.05).toFixed(2)}s` }} />
          ))}
        </g>

        {/* 3. Ligne centrale claire ( cœur de la piste ) */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {P.map((p, i) => (
            <path key={i} d={p} pathLength="1" className="tp-track tp-core" style={{ animationDelay: `${(delay + i * 0.05).toFixed(2)}s` }} />
          ))}
        </g>

        {/* 4. Onde de sonar qui part du centre */}
        <circle cx={CX} cy={CY} r={60} className="tp-ping" />

        {/* 5. Impulsions de données sur les longues pistes */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {P.map((p, i) =>
            i % 7 === 0 ? (
              <path
                key={i}
                d={p}
                pathLength="1"
                className="tp-current"
                style={{ "--d": `${(delay + 1.4 + i * 0.05).toFixed(2)}s` } as CSSProperties}
              />
            ) : null
          )}
        </g>

        {/* 6. Anneaux de pulsation sur les nœuds */}
        <g>
          {DOTS.map((d, i) =>
            i % 3 === 0 ? (
              <circle
                key={`ring-${i}`}
                cx={d[0]}
                cy={d[1]}
                r={d[2] * 0.88}
                className="tp-ring"
                style={{ animationDelay: `${(delay + 1.4 + (i % 8) * 0.45).toFixed(2)}s` }}
              />
            ) : null
          )}
        </g>

        {/* 7. Nœuds */}
        <g fill="#C93A38">
          {DOTS.map((d, i) => (
            <circle key={i} cx={d[0]} cy={d[1]} r={d[2] * 0.88} className="tp-dot" style={{ animationDelay: `${(delay + 0.15 + i * 0.04).toFixed(2)}s` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
