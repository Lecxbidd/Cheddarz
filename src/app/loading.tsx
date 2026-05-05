import { Skeleton } from "@/components/ui/skeleton";
import { ProductSkeletonGrid } from "@/components/product/product-card-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-12 w-[min(100%,480px)]" />
        <Skeleton className="h-24 max-w-xl rounded-2xl" />
      </div>
      <ProductSkeletonGrid count={6} />
    </div>
  );
}
