import { Skeleton } from "@/components/ui/skeleton";
import { ProductSkeletonGrid } from "@/components/product/product-card-skeleton";

export default function CatalogueLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border bg-muted/35 dark:bg-muted/20">
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="mt-5 h-12 w-[min(100%,420px)]" />
          <Skeleton className="mt-5 h-20 max-w-xl" />
        </div>
      </section>
      <section className="flex-1 bg-background py-12 sm:py-14">
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Skeleton className="h-10 max-w-md rounded-lg" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
          <ProductSkeletonGrid count={8} />
        </div>
      </section>
    </div>
  );
}
