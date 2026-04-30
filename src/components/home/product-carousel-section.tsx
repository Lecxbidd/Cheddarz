"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/constants";

function ProductRail({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="bg-muted/30 rounded-2xl border border-dashed py-16 text-center text-sm text-muted-foreground">
        No products yet.
      </div>
    );
  }

  return (
    <Carousel opts={{ align: "start", loop: true }} className="relative px-10 sm:px-14">
      <CarouselContent className="-ml-3">
        {products.map((p) => (
          <CarouselItem key={p.id} className="pl-3 md:basis-1/2 lg:basis-1/3">
            <Link
              href={`/products/${p.slug}`}
              className="group bg-card ring-border hover:ring-primary/30 block overflow-hidden rounded-2xl shadow-sm ring-1 transition"
            >
              <div className="relative aspect-[4/5] bg-muted">
                <Image
                  src={p.image_url}
                  alt={p.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 85vw, 33vw"
                />
              </div>
              <div className="space-y-1 p-5">
                <p className="font-heading group-hover:text-primary text-lg tracking-tight transition">
                  {p.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {formatPrice(p.price_cents, p.currency)}
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 md:left-1" />
      <CarouselNext className="right-0 md:right-1" />
    </Carousel>
  );
}

export function ProductCarouselSection({
  featured,
  newArrivals,
  bestSellers,
}: {
  featured: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}) {
  if (featured.length + newArrivals.length + bestSellers.length === 0) return null;

  return (
    <section className="border-border bg-muted/20 border-y py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
              Product carousel
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-tight sm:text-4xl">
              Featured · New arrivals · Best sellers
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="text-muted-foreground hover:text-foreground text-sm font-medium underline-offset-4 transition hover:underline"
          >
            View catalogue
          </Link>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="new">New arrivals</TabsTrigger>
            <TabsTrigger value="best">Best sellers</TabsTrigger>
          </TabsList>
          <TabsContent value="featured">
            <ProductRail products={featured} />
          </TabsContent>
          <TabsContent value="new">
            <ProductRail products={newArrivals} />
          </TabsContent>
          <TabsContent value="best">
            <ProductRail products={bestSellers} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
