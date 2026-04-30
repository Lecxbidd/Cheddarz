"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

const heroImages = [
  {
    src: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Full-length elegant men's styling in tailored smart wear",
  },
  {
    src: "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Full-length men's elegant blazer and formal styling",
  },
  {
    src: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Full-length elegant lady styling in premium formal wear",
  },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="from-muted/40 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-background" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:px-8 lg:py-24">
        <div className="relative z-10 space-y-6">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.25em]">
            New season · {SITE_NAME}
          </p>
          <div className="space-y-2">
            <h1 className="animate-fade-in font-heading text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Style That Speaks Before You Do
            </h1>
            <p className="animate-typewriter font-heading text-2xl tracking-tight text-muted-foreground sm:text-3xl">
              Let Style Your Look And Appearance
            </p>
          </div>
          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
            Discover premium child, boys, and adult wears made for comfort, confidence, and everyday
            style.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalogue?collection=featured"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 hover:bg-primary/85"
              )}
            >
              Shop Collection
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/catalogue"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hover:border-primary hover:text-primary"
              )}
            >
              View Catalogue
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-in-out"
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
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
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
        </div>
      </div>
    </section>
  );
}
