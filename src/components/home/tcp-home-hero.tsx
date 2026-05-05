"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

/** Kept for `hero-showcase-slides.ts` and any legacy catalogue usage */
export type TcpHeroSlide = {
  src: string;
  alt: string;
  headline: string;
  sub?: string;
};

const MODEL_LEFT = {
  src: "/assets/hero/slide-mens-navy-studio.png",
  alt: "Male model in a tailored white shirt against a deep navy studio backdrop",
};

const MODEL_RIGHT = {
  src: "/assets/hero/slide-mens-blazer.png",
  alt: "Male model in a black blazer and white tee — sharp smart-casual styling",
};

export function TcpHomeHero() {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-neutral-950 text-white"
      aria-labelledby="hero-heading"
    >
      {/* Dual model grid — full-width, stacked on narrow screens */}
      <div className="grid min-h-[min(100svh,920px)] grid-cols-2 md:min-h-[min(92vh,960px)]">
        <div className="relative min-h-[260px] md:min-h-0">
          <Image
            src={MODEL_LEFT.src}
            alt={MODEL_LEFT.alt}
            fill
            priority
            className="animate-hero-ken object-cover object-[center_22%] md:object-[center_28%]"
            sizes="(max-width:768px) 50vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent md:from-black/35" />
        </div>
        <div className="relative min-h-[260px] border-l border-white/[0.08] md:min-h-0">
          <Image
            src={MODEL_RIGHT.src}
            alt={MODEL_RIGHT.alt}
            fill
            className="animate-hero-ken object-cover object-[center_25%] md:object-center [animation-delay:-7s]"
            sizes="(max-width:768px) 50vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/35 via-transparent to-transparent md:from-transparent" />
        </div>
      </div>

      {/* Readability overlays */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35 md:bg-gradient-to-r md:from-black/[0.88] md:via-black/45 md:to-black/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_120%,rgba(0,0,0,0.55),transparent_55%)] md:bg-[radial-gradient(ellipse_70%_90%_at_12%_50%,rgba(0,0,0,0.35),transparent_58%)]"
        aria-hidden
      />

      {/* Copy + CTAs */}
      <div className="absolute inset-0 flex flex-col justify-end px-5 pb-14 pt-24 sm:px-8 md:justify-center md:px-12 md:pb-0 md:pt-0 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-3xl md:mx-0 md:max-w-xl lg:max-w-2xl">
          <p className="hero-confidence-reveal hero-confidence-reveal-1 mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72">
            {SITE_NAME}
          </p>
          <h1
            id="hero-heading"
            className="hero-confidence-reveal hero-confidence-reveal-2 font-heading text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance"
          >
            Wear Confidence.
            <span className="block sm:inline sm:before:content-['_']">Own Your Style.</span>
          </h1>
          <p className="hero-confidence-reveal hero-confidence-reveal-3 mt-6 max-w-[34rem] text-base leading-relaxed text-white/82 md:text-lg">
            Elevated essentials and tailored calm—pieces built to move with you from studio shoots to street days.
          </p>
          <div className="hero-confidence-reveal hero-confidence-reveal-4 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/catalogue?category=men_wear"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-10 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-950 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-0.5 hover:bg-lux-accent-muted hover:shadow-xl active:translate-y-0"
            >
              Shop now
            </Link>
            <Link
              href="/catalogue"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/45 bg-white/[0.07] px-10 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition duration-300 hover:border-white/75 hover:bg-white/14 active:translate-y-0"
            >
              View catalogue
            </Link>
          </div>
          <p className="hero-confidence-reveal hero-confidence-reveal-5 mt-10 hidden text-[10px] uppercase tracking-[0.22em] text-white/45 md:block">
            Menswear · Tailoring · Everyday polish
          </p>
        </div>
      </div>
    </section>
  );
}
