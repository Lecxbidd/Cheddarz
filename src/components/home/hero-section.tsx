"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, CATEGORY_ORDER, SITE_NAME } from "@/lib/constants";

const heroImages = [
  {
    src: "/assets/guy-wear/91394e5b-ea6f-4de6-a9d2-d90607e9b240.jpg",
    alt: "Men's wear — sharp casual from Cheddar Apparel",
  },
  {
    src: "/assets/ladies-wear/59eab061-e977-481f-8d8e-f22615ced07d.jpg",
    alt: "Ladies wear — elevated essentials",
  },
  {
    src: "/assets/casual-wear/bdcd6f4d-78a0-4ac6-a4b4-28d9bb7ac9fd.jpg",
    alt: "Casual wear — polished layers",
  },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = CATEGORY_ORDER.map((key) => ({
    href: `/catalogue?category=${key}`,
    label: CATEGORY_LABELS[key],
  }));

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-[#f5f5f5] py-5">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.9fr_2.1fr_1fr] lg:px-8">
        <aside className="hidden rounded-md border bg-white p-3 lg:block">
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.href}>
                <Link
                  href={category.href}
                  className="flex items-center justify-between rounded px-2 py-2 text-sm text-foreground transition hover:bg-muted"
                >
                  {category.label}
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="rounded-md bg-white p-3">
          <div className="relative overflow-hidden rounded-md">
            <div
              className="flex h-[300px] w-full transition-transform duration-700 ease-in-out sm:h-[360px]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {heroImages.map((img) => (
                <div key={img.src} className="relative h-full min-w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 720px"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Official Store</p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Daily Deals at {SITE_NAME}</h1>
              <p className="mt-1 text-sm text-white/90">
                Big savings on fashion, essentials, and trending products.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {heroImages.map((img, index) => (
                <button
                  key={img.alt}
                  type="button"
                  aria-label={`Show hero image ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition",
                    activeIndex === index ? "bg-primary w-7" : "bg-primary/30 hover:bg-primary/50"
                  )}
                />
              ))}
            </div>
            <Link
              href="/catalogue"
              className={cn(buttonVariants({ size: "sm" }), "gap-2")}
            >
              Shop now
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-md border bg-white p-4">
            <p className="text-xs font-semibold uppercase text-primary">Top services</p>
            <div className="mt-3 space-y-2 text-sm">
              <p className="rounded bg-muted px-3 py-2">Fast Delivery</p>
              <p className="rounded bg-muted px-3 py-2">Pay On Delivery</p>
              <p className="rounded bg-muted px-3 py-2">Official Store</p>
            </div>
          </div>
          <div className="rounded-md bg-primary p-4 text-primary-foreground">
            <p className="text-sm font-semibold">Special Offer</p>
            <p className="mt-1 text-xs">Up to 50% off selected products this week.</p>
            <Link href="/catalogue" className="mt-3 inline-flex text-xs underline underline-offset-4">
              Explore deals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
