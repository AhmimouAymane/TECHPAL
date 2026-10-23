"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import type { Dict } from "@/content/fr";
import { routes } from "@/content/site";
import { type Locale, locales, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { GradientButton } from "../motion/GradientButton";

export function Header({ locale, nav }: { locale: Locale; nav: Dict["nav"] }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 360);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [open]);

  const links = routes.map((r) => ({
    href: `/${locale}/${r.path}`,
    label: nav[r.key],
    path: `/${locale}/${r.path}`,
  }));

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const DARK_HERO_PATHS = ["ia", "projets", "expertise", "staffing", "a-propos", "contact", "produits"];
  const onDark = DARK_HERO_PATHS.some((p) => pathname === `/${locale}/${p}`) && !scrolled && !open;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" as never }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-[transform,background-color,border-color,backdrop-filter] duration-500",
          scrolled && !open
            ? "border-b border-line bg-paper/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6 md:h-[72px] md:px-10">
          <Link href={`/${locale}`} aria-label="TECHPAL" className="relative z-10 flex items-center">
            <Image
              src="/logo-techpal.webp"
              alt="TECHPAL"
              width={211}
              height={45}
              priority
              className={cn("h-8 w-auto md:h-9", onDark && "brightness-0 invert")}
            />
          </Link>

          <nav aria-label="Navigation" className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                transitionTypes={[isActive(l.path) ? "nav-back" : "nav-forward"]}
                className={cn(
                  "link-line text-sm font-medium transition-colors",
                  isActive(l.path)
                    ? onDark
                      ? "text-paper"
                      : "text-ink"
                    : onDark
                      ? "text-paper/60 hover:text-paper"
                      : "text-muted hover:text-ink"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div
              className={cn(
                "flex items-center overflow-hidden rounded-full border",
                onDark ? "border-paper/25" : "border-line"
              )}
              role="group"
              aria-label={nav.language}
            >
              {locales.map((l) => (
                <Link
                  key={l}
                  href={withLocale(pathname, l)}
                  aria-current={l === locale ? "true" : undefined}
                  className={cn(
                    "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                    l === locale
                      ? onDark
                        ? "bg-paper text-ink"
                        : "bg-ink text-paper"
                      : onDark
                        ? "text-paper/60 hover:text-paper"
                        : "text-muted hover:text-ink"
                  )}
                >
                  {l}
                </Link>
              ))}
            </div>
            <GradientButton href={`/${locale}/contact`} variant="solid" transitionTypes={["nav-forward"]}>
              {nav.cta}
            </GradientButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? nav.close : nav.menu}
            className={cn(
              "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
              onDark ? "border-paper/30 bg-transparent" : "border-line bg-paper/60"
            )}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-px w-5 transition-all duration-300",
                  onDark ? "bg-paper" : "bg-ink",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-5 transition-all duration-300",
                  onDark ? "bg-paper" : "bg-ink",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[75] flex flex-col bg-ink text-paper lg:hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-28">
              <nav aria-label={nav.menu} className="flex flex-col">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display display-lg block border-b border-paper/15 py-4"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-10 flex items-center gap-4">
                <span className="label text-paper/50">{nav.language}</span>
                <div className="flex items-center overflow-hidden rounded-full border border-paper/25">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={withLocale(pathname, l)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "px-4 py-2 text-xs font-semibold uppercase tracking-wider",
                        l === locale ? "bg-paper text-ink" : "text-paper/70"
                      )}
                    >
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
