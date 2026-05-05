"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { MockProduct } from "@/data/mock-products";

export function FeaturedProductsSection({ products }: { products: MockProduct[] }) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, 2600);
    return () => window.clearInterval(id);
  }, [api]);

  return (
    <section className="border-y border-border bg-gradient-to-b from-white/45 to-muted/20 py-16 sm:py-20 dark:from-black/15">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-white/45 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Featured products
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
            Premium picks from Cheddar Apparel
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Curated essentials across kids, boys, girls, ladies, men, adult, street, and professional
            wear.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border bg-background/70 px-3 py-1">Flash Sale</span>
            <span className="rounded-full border bg-background/70 px-3 py-1">Official Store</span>
            <span className="rounded-full border bg-background/70 px-3 py-1">Pay on Delivery</span>
            <span className="rounded-full border bg-background/70 px-3 py-1">Easy Return</span>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="relative px-10 md:px-14"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
              <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 md:left-1" />
          <CarouselNext className="right-0 md:right-1" />
        </Carousel>
      </div>
    </section>
  );
}

