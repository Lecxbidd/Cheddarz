"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownSection() {
  const [startAt] = useState(() => Date.now());
  const [now, setNow] = useState(startAt);
  const endAt = startAt + 5 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = Math.max(0, endAt - now);
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  const units = [
    { label: "Days", value: pad(days) },
    { label: "Hours", value: pad(hours) },
    { label: "Minutes", value: pad(minutes) },
    { label: "Seconds", value: pad(seconds) },
  ];

  return (
    <section
      className="relative isolate overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#142038] via-[#0f172a] to-[#1c1410] py-14 text-white sm:py-16 md:py-20 dark:border-white/15 dark:from-[#0d1424] dark:via-[#0a101f] dark:to-[#15100c]"
      aria-labelledby="countdown-sale-heading"
    >
      {/* Contrasting wash vs light page sections */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_-10%,rgba(200,165,110,0.28),transparent_52%),radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(59,130,246,0.12),transparent_48%)]"
        aria-hidden
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[min(140vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lux-accent/18 blur-[120px] countdown-ambient-glow" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-lux-accent-muted">
          Flash pricing
        </p>

        <h2
          id="countdown-sale-heading"
          className="font-heading mt-4 text-balance text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.35)]"
        >
          Limited Time Offer
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Unlock member pricing on this week&apos;s edit — offer resets when the clock hits zero.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {units.map((u, i) => (
            <div
              key={u.label}
              className="countdown-digit-pulse rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-5 backdrop-blur-md sm:px-4 sm:py-7"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <p className="font-heading text-[clamp(2rem,6vw,3rem)] font-medium tabular-nums tracking-tight text-white">
                {u.value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">{u.label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/catalogue"
          className="countdown-cta-pulse mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-12 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-lux-accent-muted hover:text-neutral-950"
        >
          Shop now
        </Link>

      </div>
    </section>
  );
}
