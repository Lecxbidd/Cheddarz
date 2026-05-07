import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, HeartHandshake, Leaf, Shirt } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn the story, values, and mission behind Cheddar Apparel.",
};

const VALUES = [
  {
    icon: Shirt,
    title: "Quality first",
    copy: "We design for repeat wear: durable stitching, reliable fit, and fabrics that keep shape.",
  },
  {
    icon: Leaf,
    title: "Thoughtful sourcing",
    copy: "We prioritize responsible partners and practical production choices over hype cycles.",
  },
  {
    icon: HeartHandshake,
    title: "Customer care",
    copy: "Support is human, fast, and honest. If something is wrong, we make it right.",
  },
] as const;

const PROMISES = [
  "Clear sizing guidance and fit notes.",
  "Straightforward returns and exchange support.",
  "Timely shipping updates and transparent communication.",
  "Collections curated for daily life, not just trends.",
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border bg-muted/35 dark:bg-muted/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_80%_-15%,rgba(180,140,90,0.16),transparent_58%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="lux-eyebrow text-lux-accent">About us</p>
          <h1 className="font-heading mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl">
            We build everyday apparel that feels elevated.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Cheddar Apparel started with a simple idea: clothes should look sharp, feel comfortable,
            and fit real routines. We focus on clean design, practical quality, and support that
            treats customers with respect.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <article
                key={value.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[0_20px_44px_-34px_rgba(0,0,0,0.28)]"
              >
                <div className="mb-4 inline-flex rounded-full border border-border bg-background p-2.5">
                  <Icon className="size-5 text-lux-accent" />
                </div>
                <h2 className="font-heading text-xl font-medium tracking-tight">{value.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="lux-eyebrow text-lux-accent">Our story</p>
              <h2 className="font-heading mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                From small curated drops to a full wardrobe platform.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                We began by curating dependable essentials for men and women, then expanded into kids,
                streetwear, and occasion-ready pieces. Today, our catalogue balances timeless staples
                with modern edits, so customers can build outfits that work across work, weekends, and
                travel.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-semibold text-foreground">What customers can expect</p>
              <ul className="mt-4 space-y-3">
                {PROMISES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lux-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card px-6 py-10 text-center sm:px-10 lg:px-12">
          <p className="lux-eyebrow text-lux-accent">Need help?</p>
          <h2 className="font-heading mt-4 text-3xl font-medium tracking-tight md:text-4xl">
            Our team is here for sizing, orders, and support.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Reach out anytime for product recommendations, shipping questions, or return guidance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/catalogue"
              className="inline-flex rounded-full bg-primary px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-primary/90"
            >
              Shop catalogue
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-border bg-background px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition hover:bg-muted"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
