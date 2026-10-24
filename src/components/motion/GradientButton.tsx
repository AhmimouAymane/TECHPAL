import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "brand" | "light";

const base =
  "btn-shine group relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 py-3 text-sm font-medium transition-transform duration-300 will-change-transform hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper",
  outline: "stroke-btn bg-transparent text-ink",
  brand: "bg-brand text-white",
  light: "stroke-btn bg-paper text-ink",
};

function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span aria-hidden="true">{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export function GradientButton({
  href,
  children,
  variant = "solid",
  className,
  transitionTypes,
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  transitionTypes?: string[];
  target?: string;
  rel?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      transitionTypes={transitionTypes}
      className={cn(base, variants[variant], className)}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="overflow-hidden">
        <Roll>{children}</Roll>
      </span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
        ↗
      </span>
    </Link>
  );
}
