import type { Metadata } from "next";
import Image from "next/image";
import { CatalogueClient } from "@/app/catalogue/catalogue-client";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { CLOTHING_CATEGORIES } from "@/data/mock-products";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Browse all Cheddar Apparel products with category filters and search.",
};

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category: categoryParam, q: queryParam } = await searchParams;
  const clothingProducts = MOCK_PRODUCTS.filter((product) =>
    CLOTHING_CATEGORIES.includes(product.category)
  );

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border bg-muted/35 dark:bg-muted/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(180,140,90,0.08),transparent_55%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[min(52%,520px)] lg:block">
          <Image
            src="/assets/ladies-wear/448e4a48-1a17-40af-9c11-7c1ceefe694f.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="520px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent dark:from-background dark:via-background/80" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="lux-eyebrow text-lux-accent">Catalogue</p>
          <h1 className="font-heading mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl">
            The complete collection
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Filter by department or search by name — every piece uses the same calm, editorial presentation.
          </p>
        </div>
      </section>

      <section className="flex-1 bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <CatalogueClient
              products={clothingProducts}
              initialCategory={categoryParam}
              initialQuery={queryParam ?? ""}
            />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
