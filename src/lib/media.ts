import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Returns the public URL of the background video if one is present in
 * `public/bg/`, otherwise undefined (the CSS fallback is used).
 * Resolved at build/request time on the server — no client-side 404 probes.
 */
export function getBackgroundVideo(): string | undefined {
  const candidates = [
    { url: "/bg/hero.webm", file: "hero.webm" },
    { url: "/bg/hero.mp4", file: "hero.mp4" },
  ];
  for (const { url, file } of candidates) {
    try {
      if (existsSync(join(process.cwd(), "public", "bg", file))) return url;
    } catch {
      /* ignore */
    }
  }
  return undefined;
}
