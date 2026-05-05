"use client";

import { Scissors } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function BrandWordmark({
  className,
  withScissorsBehind = true,
}: {
  className?: string;
  /** Scissors sit behind letters; off for footer / drawer where it’s noisy */
  withScissorsBehind?: boolean;
}) {
  const chars = SITE_NAME.split("");

  return (
    <span className={cn("relative inline-flex items-baseline", className)}>
      {withScissorsBehind ? (
        <span
          className="pointer-events-none absolute top-[55%] left-[51%] z-0 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <span className="brand-banner-cut-line absolute top-1/2 left-1/2 h-[2px] w-[min(9.5rem,70vw)] max-w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-lux-accent/35 to-transparent" />
          <Scissors
            className="hero-brand-cut-scissors relative z-[1] size-[2.1em] text-lux-accent opacity-[0.28] md:opacity-[0.2]"
            strokeWidth={2.15}
          />
        </span>
      ) : null}
      <span
        className={cn(
          "brand-wordmark relative z-[1] inline-flex flex-wrap items-baseline gap-0 font-black uppercase tracking-tight"
        )}
        aria-label={SITE_NAME}
      >
        {chars.map((char, i) =>
          char === " " ? (
            <span key={`sp-${i}`} className="inline-block w-[0.28em]" aria-hidden />
          ) : (
            <span
              key={`${char}-${i}`}
              className="brand-letter-rainbow inline-block min-w-[0.05em]"
              style={{
                animationDelay: `${(i % 14) * 0.09}s`,
              }}
            >
              {char}
            </span>
          )
        )}
      </span>
    </span>
  );
}
