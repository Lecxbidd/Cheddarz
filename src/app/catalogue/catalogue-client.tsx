"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import type { MockCategory, MockProduct } from "@/data/mock-products";
import { CATEGORY_LABELS } from "@/data/mock-products";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const filters: Array<{ key: "all" | MockCategory; label: string }> = [
  { key: "all", label: "All" },
  ...((Object.keys(CATEGORY_LABELS) as MockCategory[]).map((category) => ({
    key: category,
    label: CATEGORY_LABELS[category],
  })) as Array<{ key: MockCategory; label: string }>),
];

export function CatalogueClient({ products }: { products: MockProduct[] }) {
  const [activeCategory, setActiveCategory] = useState<"all" | MockCategory>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const categoryMatch = activeCategory === "all" ? true : p.category === activeCategory;
      const searchMatch = q ? p.name.toLowerCase().includes(q) : true;
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, products, search]);

  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-2xl border border-white/45 bg-white/60 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveCategory(f.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                activeCategory === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filtered.length}</span> premium pieces
        </p>
      </div>

      <ProductGrid
        products={filtered}
        emptyTitle="No products match your filters"
        emptyDescription="Try another category or search term."
      />
    </div>
  );
}

