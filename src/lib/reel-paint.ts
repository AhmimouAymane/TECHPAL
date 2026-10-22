/**
 * Synthetic showreel renderer — a deterministic 6-shot sequence painted on
 * a 2D canvas, scrubbed by scroll progress (t in [0, 1]). Pure module,
 * used by <ScrollReel /> (client).
 */

export type Fonts = { mono: string; serif: string };

const PAPER = "#f4f4fb";
const INK = "#0a0a14";
const BRAND = "#03118a";
const ACCENT = "#c93a38";
const SOFT = "#e5e7ff";
const NAVY = "#020b52";

export const SHOT_RANGES: Array<[number, number]> = [
  [0, 0.16],
  [0.16, 0.34],
  [0.34, 0.52],
  [0.52, 0.7],
  [0.7, 0.88],
  [0.88, 1],
];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const eoc = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const frac = (x: number) => x - Math.floor(x);
const rnd = (i: number) => frac(Math.sin(i * 127.1 + 311.7) * 43758.5453);

export function shotIndex(t: number) {
  for (let i = 0; i < SHOT_RANGES.length; i++) if (t < SHOT_RANGES[i][1]) return i;
  return SHOT_RANGES.length - 1;
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, alpha: number, off: number, color = SOFT) {
  const s = Math.max(26, Math.min(w, 1600) / 34);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = s - (off % s) - s; x < w; x += s) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = s - ((off * 0.6) % s) - s; y < h; y += s) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
  ctx.restore();
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha = 1) {
  if (r <= 0 || alpha <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSpaced(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, spacing: number) {
  const chars = [...text];
  let total = 0;
  for (const c of chars) total += ctx.measureText(c).width + spacing;
  total -= spacing;
  let x = cx - total / 2;
  for (const c of chars) {
    ctx.fillText(c, x, y);
    x += ctx.measureText(c).width + spacing;
  }
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

function paintIntro(ctx: CanvasRenderingContext2D, lp: number, w: number, h: number, f: Fonts) {
  const m = Math.min(w, h);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h, 0.07 + eoc(lp) * 0.05, lp * 80);

  const cy = h * 0.47;
  const label = "TECHPAL";
  const chars = Math.max(1, Math.round(label.length * eoc(lp * 1.7)));
  ctx.fillStyle = PAPER;
  ctx.font = `500 ${Math.round(m * 0.07)}px ${f.mono}`;
  ctx.textAlign = "left";
  drawSpaced(ctx, label.slice(0, chars), w / 2, cy, m * 0.028);

  const barW = m * 0.44;
  ctx.fillStyle = ACCENT;
  ctx.fillRect(w / 2 - barW / 2, cy + m * 0.06, barW * eoc(clamp01((lp - 0.2) / 0.8)), 2);
  dot(ctx, w / 2 - barW / 2 - m * 0.02, cy + m * 0.06 + 1, m * 0.006, BRAND, eoc(lp));
  dot(ctx, w / 2 + barW / 2 + m * 0.02, cy + m * 0.06 + 1, m * 0.006, ACCENT, eoc(clamp01(lp * 1.2 - 0.1)));

  ctx.font = `500 ${Math.round(m * 0.024)}px ${f.mono}`;
  ctx.fillStyle = "rgba(244,244,251,0.55)";
  ctx.textAlign = "left";
  ctx.fillText("SCROLL-DRIVEN · REALTIME", w * 0.06, h * 0.86);
  ctx.textAlign = "right";
  ctx.fillText("01", w * 0.94, h * 0.86);
  ctx.textAlign = "left";
}

function paintNetwork(ctx: CanvasRenderingContext2D, lp: number, w: number, h: number, f: Fonts) {
  const m = Math.min(w, h);
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h, 0.05, lp * 50);

  const cx = w / 2;
  const cy = h / 2;
  const N = 16;
  const spread = Math.max(w, h) * 0.3;
  const px: number[] = [];
  const py: number[] = [];
  const a: number[] = [];
  for (let i = 0; i < N; i++) {
    px.push(cx + (rnd(i) - 0.5) * 2 * spread);
    py.push(cy + (rnd(i * 7 + 2) - 0.5) * 2 * spread);
    a.push(eoc(clamp01(lp * 2.2 - i * 0.09)));
  }
  for (let i = 0; i < N; i++) {
    dot(ctx, px[i], py[i], m * 0.006 * (0.6 + rnd(i + 11) * 0.8), i % 4 === 0 ? ACCENT : SOFT, a[i] * 0.9);
  }
  for (let i = 1; i < N; i++) {
    const al = 0.28 * Math.min(a[i], a[i - 1]);
    if (al < 0.02) continue;
    ctx.save();
    ctx.globalAlpha = al;
    ctx.strokeStyle = SOFT;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px[i], py[i]);
    ctx.lineTo(px[i - 1], py[i - 1]);
    ctx.stroke();
    ctx.restore();
    if (lp > 0.35) {
      const p = frac(lp * 2.4 + i * 0.117);
      dot(ctx, lerp(px[i], px[i - 1], p), lerp(py[i], py[i - 1], p), m * 0.004, PAPER, 0.9);
    }
  }

  const pulse = frac(lp * 1.1);
  dot(ctx, cx, cy, m * 0.03 + eoc(lp) * m * 0.012, BRAND);
  dot(ctx, cx, cy, m * 0.014, PAPER, eoc(lp));
  ctx.save();
  ctx.globalAlpha = (1 - pulse) * 0.55 * eoc(lp);
  ctx.strokeStyle = PAPER;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, m * (0.045 + pulse * 0.3), 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.font = `500 ${Math.round(m * 0.026)}px ${f.mono}`;
  ctx.fillStyle = "rgba(244,244,251,0.8)";
  ctx.textAlign = "center";
  ctx.fillText("CASABLANCA · 33.5°N 7.6°W", cx, cy + m * 0.16);
  ctx.fillStyle = "rgba(244,244,251,0.5)";
  ctx.textAlign = "left";
  ctx.fillText("02 — NETWORK MESH", w * 0.06, h * 0.12);
  ctx.textAlign = "left";
}

function paintCode(ctx: CanvasRenderingContext2D, lp: number, w: number, h: number, f: Fonts) {
  const m = Math.min(w, h);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);

  const bw = Math.min(w * 0.8, m * 1.5);
  const bh = bw * 0.46;
  const bx = (w - bw) / 2;
  const by = h * 0.48 - bh * 0.58;
  roundRectPath(ctx, bx, by, bw, bh, Math.min(18, bw * 0.035));
  ctx.fillStyle = "#060d3d";
  ctx.fill();
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = SOFT;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  const hy = by + bh * 0.09;
  dot(ctx, bx + bw * 0.035, hy, bw * 0.008, ACCENT);
  dot(ctx, bx + bw * 0.06, hy, bw * 0.008, SOFT, 0.8);
  dot(ctx, bx + bw * 0.085, hy, bw * 0.008, "#6d7bff");

  const widths = [0.62, 0.44, 0.72, 0.3, 0.55, 0.38, 0.66, 0.26];
  for (let i = 0; i < widths.length; i++) {
    const a = eoc(clamp01(lp * 11 - i * 1.4));
    if (a < 0.02) continue;
    const ly = by + bh * (0.24 + i * 0.082);
    const lw = widths[i] * bw * 0.6;
    ctx.save();
    ctx.globalAlpha = (0.28 + (i % 3 === 0 ? 0.25 : 0)) * a;
    ctx.fillStyle = i === 3 ? ACCENT : SOFT;
    ctx.fillRect(bx + bw * 0.05, ly, lw, bh * 0.018);
    ctx.restore();
    if (i === widths.length - 1 && frac(lp * 24) < 0.6) {
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = PAPER;
      ctx.fillRect(bx + bw * 0.05 + lw + m * 0.008, ly - bh * 0.012, bw * 0.014, bh * 0.042);
      ctx.restore();
    }
  }

  ctx.fillStyle = ACCENT;
  ctx.fillRect(bx, by + bh + m * 0.02, bw * eoc(lp), 2);

  const reveal = eoc(clamp01((lp - 0.15) / 0.85));
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, w * reveal, h);
  ctx.clip();
  ctx.fillStyle = PAPER;
  ctx.font = `${Math.round(m * 0.17)}px ${f.serif}`;
  ctx.fillText("code.", w / 2 - m * 0.06, h * 0.9);
  ctx.restore();

  ctx.font = `500 ${Math.round(m * 0.024)}px ${f.mono}`;
  ctx.fillStyle = "rgba(244,244,251,0.5)";
  ctx.fillText("03 — API & APPS", w * 0.06, h * 0.12);
  ctx.textAlign = "left";
}

function paintType(ctx: CanvasRenderingContext2D, lp: number, w: number, h: number, f: Fonts) {
  const m = Math.min(w, h);
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h, 0.5, lp * 60, "#ececf5");

  const word = "production.";
  let size = Math.round(m * 0.24);
  ctx.font = `${size}px ${f.serif}`;
  const tw0 = ctx.measureText(word).width;
  const maxW = w * 0.92;
  if (tw0 > maxW) {
    size = Math.round(size * (maxW / tw0));
    ctx.font = `${size}px ${f.serif}`;
  }
  const tw = ctx.measureText(word).width;
  const x0 = w / 2 - tw / 2;
  const baseY = h * 0.52;
  const reveal = eoc(lp);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, x0 + tw * reveal, h);
  ctx.clip();
  ctx.fillStyle = INK;
  ctx.fillText(word, x0, baseY);
  ctx.restore();

  ctx.fillStyle = ACCENT;
  ctx.fillRect(x0, baseY + size * 0.18, tw * reveal, Math.max(2, size * 0.02));

  ctx.font = `500 ${Math.round(m * 0.026)}px ${f.mono}`;
  ctx.fillStyle = "rgba(10,10,20,0.55)";
  ctx.textAlign = "right";
  ctx.fillText(`${String(Math.round(reveal * 100)).padStart(3, "0")}% SHIPPED`, w * 0.94, h * 0.86);
  ctx.textAlign = "left";
}

function paintCloud(ctx: CanvasRenderingContext2D, lp: number, w: number, h: number, f: Fonts) {
  const m = Math.min(w, h);
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h, 0.05, lp * 40);

  const cx = w * 0.38;
  const cy = h * 0.5;
  for (let i = 0; i < 3; i++) {
    const sweep = eoc(clamp01(lp * 1.4 - i * 0.18)) * Math.PI * 2;
    ctx.save();
    ctx.globalAlpha = 0.5 - i * 0.13;
    ctx.strokeStyle = SOFT;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, m * (0.1 + i * 0.09), -Math.PI / 2, -Math.PI / 2 + sweep);
    ctx.stroke();
    ctx.restore();
  }
  dot(ctx, cx, cy, m * 0.02, PAPER);

  for (let i = 0; i < 3; i++) {
    if (frac(lp * 3 - i * 0.33) < 0.5) {
      ctx.save();
      ctx.globalAlpha = 0.75;
      ctx.strokeStyle = SOFT;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(w * 0.38, cy, m * (0.05 + i * 0.028), -Math.PI * 0.78, -Math.PI * 0.22);
      ctx.stroke();
      ctx.restore();
    }
  }

  const pct = (99 + clamp01((lp - 0.3) / 0.55) * 0.9).toFixed(1);
  const shown = eoc(clamp01((lp - 0.35) / 0.45));
  ctx.save();
  ctx.globalAlpha = shown;
  ctx.fillStyle = PAPER;
  ctx.font = `500 ${Math.round(m * 0.085)}px ${f.mono}`;
  ctx.textAlign = "right";
  ctx.fillText(`${pct}%`, w * 0.94, h * 0.44);
  ctx.font = `500 ${Math.round(m * 0.024)}px ${f.mono}`;
  ctx.fillStyle = "rgba(244,244,251,0.55)";
  ctx.fillText("SLA · SUPERVISION 24/7", w * 0.94, h * 0.49);
  ctx.restore();

  ctx.fillStyle = "rgba(244,244,251,0.5)";
  ctx.font = `500 ${Math.round(m * 0.024)}px ${f.mono}`;
  ctx.textAlign = "left";
  ctx.fillText("04 — CLOUD & INFRA", w * 0.06, h * 0.12);
  ctx.textAlign = "left";
}

function paintBrand(ctx: CanvasRenderingContext2D, lp: number, w: number, h: number, f: Fonts) {
  const m = Math.min(w, h);
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h, 0.6, lp * 30, "#ececf5");

  const e = eoc(lp);
  let size = Math.round(m * 0.24);
  ctx.font = `${size}px ${f.serif}`;
  const word = "TECHPAL";
  const tw0 = ctx.measureText(word).width;
  const maxW = w * 0.88;
  if (tw0 > maxW) {
    size = Math.round(size * (maxW / tw0));
    ctx.font = `${size}px ${f.serif}`;
  }
  const tw = ctx.measureText(word).width;
  const rx = Math.min(tw * 0.58, w * 0.44);
  const cx = w / 2;
  const wy = h * 0.5 + size * 0.34;

  ctx.save();
  ctx.globalAlpha = e;
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.fillText(word, cx, wy);

  ctx.strokeStyle = "#c8cbe6";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, wy, rx, m * 0.22, 0, 0, Math.PI * 2);
  ctx.stroke();

  const ang = lp * Math.PI * 2;
  dot(ctx, cx + rx * Math.cos(ang), wy + m * 0.22 * Math.sin(ang), m * 0.014, BRAND);
  dot(ctx, cx + rx * Math.cos(ang + Math.PI), wy + m * 0.22 * Math.sin(ang + Math.PI), m * 0.014, ACCENT);

  ctx.font = `500 ${Math.round(m * 0.026)}px ${f.mono}`;
  ctx.fillStyle = "rgba(10,10,20,0.6)";
  ctx.fillText("TECHPAL · CASABLANCA · EST. 2022", cx, h * 0.88);
  ctx.restore();
}

const PAINTERS = [paintIntro, paintNetwork, paintCode, paintType, paintCloud, paintBrand];

export function paintReel(ctx: CanvasRenderingContext2D, t: number, w: number, h: number, f: Fonts) {
  const i = shotIndex(t);
  const [s0, s1] = SHOT_RANGES[i];
  PAINTERS[i](ctx, clamp01((t - s0) / (s1 - s0)), w, h, f);
}
