"use client";

import { ProductCard } from "@/components/product/product-card";
import { ProductSkeletonGrid } from "@/components/product/product-card-skeleton";
import type { MockProduct } from "@/data/mock-products";

export function ProductGrid({
  products,
  loading,
  emptyTitle = "No products found",
  emptyDescription = "Try a different category or search term.",
}: {
  products: MockProduct[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  if (loading) {
    return <ProductSkeletonGrid count={8} />;
  }

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed bg-muted/30 py-20 text-center">
        <p className="font-heading text-2xl">{emptyTitle}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

