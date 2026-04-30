import Link from "next/link";
import type { MockProduct } from "@/data/mock-products";
import { ProductCard } from "@/components/product/product-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeaturedCatalogue({ products }: { products: MockProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
              Featured catalogue
            </p>
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              Pieces we keep reaching for
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Thoughtful staples across children, boys, adults, and casual edits — unified by fabric
              quality and effortless silhouettes.
            </p>
          </div>
          <Link
            href="/catalogue"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Browse full catalogue
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
