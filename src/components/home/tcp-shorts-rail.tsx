"use client";

import * as React from "react";
import type { MockProduct } from "@/data/mock-products";
import { ProductCard } from "@/components/product/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function TcpShortsRail({
  title,
  products,
}: {
  title: string;
  products: MockProduct[];
}) {
  const [api, setApi] = React.useState<CarouselApi | undefined>();
  const [pauseHover, setPauseHover] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (!api || reduceMotion || pauseHover || products.length <= 1) return;
    const id = window.setInterval(() => api.scrollNext(), 5200);
    return () => window.clearInterval(id);
  }, [api, pauseHover, products.length, reduceMotion]);

  if (products.length === 0) return null;

  return (
    <section className="border-b border-border bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-10">
          <p className="lux-eyebrow text-lux-accent">Curated rail</p>
          <h2 className="lux-heading-xl mt-3 text-2xl font-medium md:text-3xl">{title}</h2>
        </div>

        <Carousel
          opts={{
            loop: products.length >= 5,
            align: "start",
            slidesToScroll: 1,
            skipSnaps: false,
            dragFree: false,
            duration: reduceMotion ? 0 : 38,
          }}
          className="relative w-full"
          setApi={setApi}
        >
          <div
            className="relative rounded-2xl ring-1 ring-border/60 transition-shadow duration-300 ease-out [--carousel-arrow-offset:0.75rem] hover:shadow-[0_20px_48px_-28px_rgba(0,0,0,0.2)] sm:[--carousel-arrow-offset:1rem] md:[--carousel-arrow-offset:1.25rem] dark:hover:shadow-[0_24px_52px_-26px_rgba(0,0,0,0.65)]"
            onMouseEnter={() => setPauseHover(true)}
            onMouseLeave={() => setPauseHover(false)}
            onFocusCapture={() => setPauseHover(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setPauseHover(false);
            }}
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {products.map((product, index) => (
                <CarouselItem
                  key={product.id}
                  id={`shorts-rail-slide-${index}`}
                  className="min-w-0 basis-[88%] pl-3 sm:basis-[48%] sm:pl-4 md:basis-[34%] lg:basis-1/4 xl:basis-[22.5%]"
                >
                  <div className="px-0.5 pb-1 transition-[transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.01] motion-reduce:transform-none motion-reduce:hover:transform-none">
                    <ProductCard product={product} variant="rail" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              variant="outline"
              size="icon-sm"
              className="left-[var(--carousel-arrow-offset)] top-1/2 z-10 size-11 -translate-y-1/2 border-border bg-background/95 shadow-md backdrop-blur-sm transition-[opacity,transform,background-color] duration-200 hover:bg-muted disabled:opacity-35 motion-reduce:transition-none sm:size-12"
            />
            <CarouselNext
              variant="outline"
              size="icon-sm"
              className="right-[var(--carousel-arrow-offset)] top-1/2 z-10 size-11 -translate-y-1/2 border-border bg-background/95 shadow-md backdrop-blur-sm transition-[opacity,transform,background-color] duration-200 hover:bg-muted disabled:opacity-35 motion-reduce:transition-none sm:size-12"
            />

            <CarouselDots className="pb-1" />
          </div>

          {!reduceMotion && (
            <p className="sr-only" aria-live="polite">
              Carousel autoplay pauses while hovered or focused.
            </p>
          )}
        </Carousel>
      </div>
    </section>
  );
}
