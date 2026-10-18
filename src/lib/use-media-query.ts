"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hydration-safe media query.
 * Returns `false` on the server and on the first client render (so SSR markup
 * matches), then the real match after mount. Use it to gate progressive
 * enhancements that would otherwise cause a hydration mismatch.
 */
export function useMediaQuerySafe(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false),
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
