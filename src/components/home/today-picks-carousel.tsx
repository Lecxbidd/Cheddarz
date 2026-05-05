"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MockProduct } from "@/data/mock-products";
import { formatPrice } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function TodayPicksCarousel({ products }: { products: MockProduct[] }) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api || products.length <= 1) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, 3000);
    return () => window.clearInterval(id);
  }, [api, products.length]);

  return (
    <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="px-10 sm:px-12">
      <CarouselContent className="-ml-3">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-3 sm:basis-1/2 lg:basis-1/4">
            <Link
              href={`/products/${product.slug}`}
              className="group block rounded-md border bg-white p-2 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden rounded">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-90"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 23vw"
                />
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-snug text-foreground">{product.name}</p>
              <p className="mt-1 text-sm font-semibold text-primary">
                {formatPrice(Math.round(product.price * 100))}
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1" />
      <CarouselNext className="right-1" />
    </Carousel>
  );
}

