"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const emptySubscribe = () => () => {};
const getMounted = () => true;
const getServerMounted = () => false;

/**
 * Hydration-safe reduced-motion flag.
 * Returns `false` on the server AND on the first client render (so the markup
 * matches), then reflects the real media query after mount. Avoids the
 * "tree hydrated but attributes didn't match" error caused by branching the
 * rendered output on `useReducedMotion()`.
 */
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const mounted = useSyncExternalStore(emptySubscribe, getMounted, getServerMounted);
  return mounted && Boolean(reduce);
}
