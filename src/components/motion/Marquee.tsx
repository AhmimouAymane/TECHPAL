import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  className,
  itemClassName,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className={cn("marquee", reverse && "flex-row-reverse")} style={reverse ? { animationDirection: "reverse" } : undefined}>
        <div className={cn("flex shrink-0 items-center", itemClassName)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", itemClassName)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
