import type { Metadata } from "next";
import { CatalogueClient } from "@/app/catalogue/catalogue-client";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Browse all Cheddar Apparel products with category filters and search.",
};

export default function CataloguePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-border bg-muted/30 border-b py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
            Catalogue
          </p>
          <h1 className="font-heading mt-3 text-4xl tracking-tight">Shop all collections</h1>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Explore children, boys, adults, streetwear, and accessories edits.
          </p>
        </div>
      </section>

      <section className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CatalogueClient products={MOCK_PRODUCTS} />
        </div>
      </section>
    </div>
  );
}
