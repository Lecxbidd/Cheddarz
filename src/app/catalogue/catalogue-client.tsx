"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import type { MockCategory, MockProduct } from "@/data/mock-products";
import { CATEGORY_LABELS } from "@/data/mock-products";
import { CLOTHING_CATEGORIES } from "@/data/mock-products";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const filters: Array<{ key: "all" | MockCategory; label: string }> = [
  { key: "all", label: "All" },
  ...(CLOTHING_CATEGORIES.map((category) => ({
    key: category,
    label: CATEGORY_LABELS[category],
  })) as Array<{ key: MockCategory; label: string }>),
];

function parseCategory(param: string | undefined): "all" | MockCategory {
  if (!param) return "all";
  if (CLOTHING_CATEGORIES.includes(param as MockCategory)) {
    return param as MockCategory;
  }
  return "all";
}

export function CatalogueClient({
  products,
  initialCategory,
  initialQuery = "",
}: {
  products: MockProduct[];
  initialCategory?: string;
  initialQuery?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<"all" | MockCategory>(() =>
    parseCategory(initialCategory)
  );
  const [search, setSearch] = useState(initialQuery);

  useEffect(() => {
    setActiveCategory(parseCategory(initialCategory));
    setSearch(initialQuery ?? "");
  }, [initialCategory, initialQuery]);

  const syncUrl = useCallback(
    (category: "all" | MockCategory, q: string) => {
      const params = new URLSearchParams();
      if (category !== "all") params.set("category", category);
      if (q.trim()) params.set("q", q.trim());
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((p) => {
      const categoryMatch = activeCategory === "all" ? true : p.category === activeCategory;
      const searchMatch = query ? p.name.toLowerCase().includes(query) : true;
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, products, search]);

  return (
    <div id="browse" className="scroll-mt-[calc(7rem+env(safe-area-inset-top))] space-y-8">
      <div className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[0_20px_44px_-32px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_44px_-32px_rgba(0,0,0,0.55)]">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={() => syncUrl(activeCategory, search)}
            onKeyDown={(e) => {
              if (e.key === "Enter") syncUrl(activeCategory, search);
            }}
            placeholder="Search by product name..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                setActiveCategory(f.key);
                syncUrl(f.key, search);
              }}
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
          Showing <span className="font-medium text-foreground">{filtered.length}</span> premium
          pieces
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
