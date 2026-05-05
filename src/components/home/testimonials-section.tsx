"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** 1–5 */
  rating: number;
  imageUrl: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The boys' denim fits better than anything we've tried from department stores — sturdy without stiffness.",
    name: "Jordan M.",
    role: "Parent · Detroit",
    rating: 5,
    imageUrl: "/assets/boy-wear/dc0d103a-3e15-432b-af1c-9ef4ac70d784.jpg",
  },
  {
    quote:
      "Finally a brand where casual pieces feel elevated enough for client dinners but relaxed on weekends.",
    name: "Alex R.",
    role: "Creative director",
    rating: 5,
    imageUrl: "/assets/guy-wear/bc54de1b-3f8d-49e8-babc-fb9e30fb28a1.jpg",
  },
  {
    quote:
      "Our toddler lived in the knit set all winter — washes beautifully and still holds its shape.",
    name: "Priya K.",
    role: "Mother of two",
    rating: 4.5,
    imageUrl: "/assets/kid-wear/ecff41da-81f5-4805-9af5-c703ae5c4f3d.jpg",
  },
  {
    quote:
      "The quality-to-price ratio is excellent. Fast delivery, clean stitching, and zero surprises.",
    name: "Chinedu O.",
    role: "Verified buyer",
    rating: 5,
    imageUrl: "/assets/adult-wear/61a63c38-93e4-4dca-a0fc-b7169c6f6543.jpg",
  },
  {
    quote:
      "Official store badge gave me confidence to order. The accessories looked even better in person.",
    name: "Sade A.",
    role: "Fashion consultant",
    rating: 4.5,
    imageUrl: "/assets/ladies-wear/c1717ef6-7dc1-4e66-822f-584e8108b585.jpg",
  },
  {
    quote:
      "Customer support was responsive and sizing guidance was accurate. Smooth purchase end-to-end.",
    name: "Tobi E.",
    role: "Returning customer",
    rating: 5,
    imageUrl: "/assets/street-wear/368bed23-5439-4ea3-9ba1-2239fcf1a760.jpg",
  },
];

function RatingStars({ rating }: { rating: number }) {
  const display = rating.toFixed(1);
  const filled = Math.min(5, Math.max(0, Math.floor(rating + 0.4)));

  return (
    <div
      className="flex items-center justify-center gap-0.5 sm:justify-start"
      aria-label={`${display} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4 shrink-0 sm:size-[1.125rem]",
            i < filled ? "fill-amber-400 text-amber-400" : "fill-muted/30 text-muted/45",
          )}
          aria-hidden
        />
      ))}
      <span className="ml-2 text-xs font-medium tabular-nums text-muted-foreground">{display}</span>
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article
      className={cn(
        "flex h-full min-h-[280px] flex-col rounded-3xl border border-border/70 bg-card p-8 text-center shadow-[0_22px_56px_-34px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.04] transition-shadow duration-300 dark:bg-card dark:shadow-[0_26px_60px_-30px_rgba(0,0,0,0.65)] dark:ring-white/[0.06] sm:min-h-[300px] sm:p-10 sm:text-left",
      )}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="relative size-[76px] shrink-0 overflow-hidden rounded-full bg-muted shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] ring-[3px] ring-background ring-offset-2 ring-offset-card dark:ring-offset-card sm:size-[88px]">
          <Image src={item.imageUrl} alt="" fill className="object-cover" sizes="88px" aria-hidden />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <RatingStars rating={item.rating} />
          <div>
            <p className="font-heading text-lg font-semibold tracking-tight text-foreground">{item.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{item.role}</p>
          </div>
        </div>
      </div>

      <blockquote className="mt-6 flex-1 border-t border-border/60 pt-6 text-base leading-relaxed text-muted-foreground sm:mt-8 sm:pt-8 sm:text-[1.05rem] sm:leading-[1.65]">
        <span className="font-heading text-3xl leading-none text-lux-accent/70" aria-hidden>
          “
        </span>
        <span className="ms-1">{item.quote}</span>
        <span className="font-heading text-3xl leading-none text-lux-accent/70" aria-hidden>
          ”
        </span>
      </blockquote>
    </article>
  );
}

export function TestimonialsSection() {
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      className="border-y border-border bg-gradient-to-b from-muted/45 via-background to-muted/35 py-16 md:py-20 dark:from-muted/20 dark:to-muted/10"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center md:mb-14">
          <p className="lux-eyebrow text-lux-accent">Voices</p>
          <h2 id="testimonials-heading" className="font-heading text-balance text-3xl font-medium tracking-tight sm:text-4xl">
            What wearers say
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Real fits, real routines — styled for workdays, weekends, and everything between.
          </p>
        </div>

        <Carousel
          opts={{
            loop: TESTIMONIALS.length >= 3,
            align: "start",
            slidesToScroll: 1,
            skipSnaps: false,
            duration: reduceMotion ? 0 : 36,
          }}
          className="relative w-full [--carousel-arrow-offset:0.5rem] sm:[--carousel-arrow-offset:0.75rem] md:[--carousel-arrow-offset:1rem]"
        >
          <div className="relative rounded-2xl px-10 sm:px-12 md:px-14 lg:px-16">
            <CarouselContent className="-ml-4 md:-ml-5">
              {TESTIMONIALS.map((item) => (
                <CarouselItem
                  key={item.name}
                  className="min-w-0 basis-full pl-4 sm:basis-[88%] md:basis-[70%] md:pl-5 lg:basis-[52%] xl:basis-[48%]"
                >
                  <TestimonialCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              variant="outline"
              size="icon-sm"
              className="left-[var(--carousel-arrow-offset)] top-1/2 z-10 size-11 -translate-y-1/2 border-border bg-background/95 shadow-md backdrop-blur-sm transition-colors hover:bg-muted sm:size-12"
            />
            <CarouselNext
              variant="outline"
              size="icon-sm"
              className="right-[var(--carousel-arrow-offset)] top-1/2 z-10 size-11 -translate-y-1/2 border-border bg-background/95 shadow-md backdrop-blur-sm transition-colors hover:bg-muted sm:size-12"
            />

            <CarouselDots className="pb-0 pt-8" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
