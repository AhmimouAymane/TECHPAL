"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dict } from "@/content/fr";
import { routes, site, socials } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { Container } from "../ui/Container";
import { GradientButton } from "../motion/GradientButton";
import { SplitText } from "../motion/SplitText";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [copied, setCopied] = useState(false);

  const order = [
    { path: "", label: locale === "fr" ? "Accueil" : "Home" },
    ...routes.map((r) => ({ path: r.path, label: dict.nav[r.key] })),
  ];
  const clean = pathname.split("/")[2] ?? "";
  const idx = order.findIndex((o) => o.path === clean);
  const next = order[(Math.max(idx, 0) + 1) % order.length];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="label text-paper/50">{dict.cta.kicker}</span>
            <SplitText as="h2" text={dict.cta.title} className="display display-lg text-gradient-paper mt-5 max-w-[14ch]" />
            <div className="mt-8">
              <GradientButton href={`/${locale}/contact`} variant="light" transitionTypes={["nav-forward"]}>
                {dict.cta.button}
              </GradientButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="label text-paper/40">{dict.footer.pagesTitle}</h3>
              <ul className="mt-5 space-y-3">
                {order.map((o, i) => (
                  <li key={o.path} className="flex items-baseline gap-2">
                    <span className="font-mono text-[11px] text-paper/35">[{String(i + 1).padStart(2, "0")}]</span>
                    <Link href={o.path ? `/${locale}/${o.path}` : `/${locale}`} className="link-line text-sm text-paper/80 hover:text-paper">
                      {o.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="label text-paper/40">{dict.footer.socialTitle}</h3>
              <ul className="mt-5 space-y-3">
                {socials.map((s, i) => (
                  <li key={s.label} className="flex items-baseline gap-2">
                    <span className="font-mono text-[11px] text-paper/35">[{String(i + 1).padStart(2, "0")}]</span>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line text-sm text-paper/80 hover:text-paper">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="label text-paper/40">{dict.footer.contactTitle}</h3>
              <ul className="mt-5 space-y-3 text-sm text-paper/80">
                <li>
                  <button type="button" onClick={copyEmail} className="link-line text-left">
                    {site.email}
                  </button>
                  <span className="ml-2 font-mono text-[11px] text-paper/40">{copied ? "copied" : "copy"}</span>
                </li>
                <li>
                  <a href={site.phoneHref} className="link-line">
                    {site.phone}
                  </a>
                </li>
                <li className="text-paper/60">{site.address}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-paper/50">
            <span>© 2022–{new Date().getFullYear()} {site.fullName}. {dict.footer.rights}</span>
            <Link href={`/${locale}/mentions-legales`} className="link-line hover:text-paper">
              {dict.footer.legal}
            </Link>
            <Link href={`/${locale}/confidentialite`} className="link-line hover:text-paper">
              {dict.footer.privacy}
            </Link>
          </div>
          <Link href={next.path ? `/${locale}/${next.path}` : `/${locale}`} className="group flex items-center gap-3 text-xs text-paper/60 hover:text-paper">
            <span className="label">[ {dict.footer.next} ]</span>
            <span className="display display-md leading-none">{next.label}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
