"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Force le scroll en haut à chaque changement de page (y compris retour
 * navigateur), sauf navigation par ancre (#hash) qui ne change pas le pathname.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, opts?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
