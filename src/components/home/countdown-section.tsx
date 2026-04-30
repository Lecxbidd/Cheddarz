"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/data/mock-products";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownSection() {
  const [startAt] = useState(() => Date.now());
  const [now, setNow] = useState(startAt);
  const end = startAt + 5 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = Math.max(0, end - now);
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  const blocks = [
    { label: "Days", value: pad(days) },
    { label: "Hours", value: pad(hours) },
    { label: "Minutes", value: pad(minutes) },
    { label: "Seconds", value: pad(seconds) },
  ];
  const categories = Object.values(CATEGORY_LABELS);

  return (
    <section className="border-border bg-gradient-to-br from-muted/60 via-background to-muted/40 border-y py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8">
        <div className="rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/12 to-background/70 p-5 shadow-sm backdrop-blur-md">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
            Shop categories
          </p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {categories.map((category) => (
              <li
                key={category}
                className="rounded-lg border border-transparent px-3 py-2 transition hover:border-primary/30 hover:bg-primary/10"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center lg:text-left">
          <div className="space-y-3">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.25em]">
              Limited drop
            </p>
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              Flash Sale Ends In:
            </h2>
            <p className="text-muted-foreground mx-auto max-w-lg lg:mx-0">
              Extra 15% off curated outerwear when you checkout before the timer hits zero.
            </p>
          </div>
          <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {blocks.map((b) => (
              <div
                key={b.label}
                className="bg-card ring-border rounded-2xl px-4 py-6 shadow-sm ring-1"
              >
                <p className="font-heading text-3xl tabular-nums sm:text-4xl">{b.value}</p>
                <p className="text-muted-foreground mt-2 text-xs uppercase tracking-wide">
                  {b.label}
                </p>
              </div>
            ))}
          </div>
          <Link href="/catalogue" className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
            Shop the edit
          </Link>
        </div>
      </div>
    </section>
  );
}
