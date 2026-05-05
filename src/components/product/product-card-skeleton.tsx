import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton({ variant = "default" }: { variant?: "default" | "rail" }) {
  const aspectClass = variant === "rail" ? "aspect-[3/4]" : "aspect-[4/5]";
  const pad = variant === "rail" ? "p-3 sm:p-4" : "p-4 sm:p-5";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card py-0 shadow-[0_14px_36px_-26px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.05] dark:ring-white/[0.06]",
        variant === "rail" && "min-w-0",
      )}
      aria-hidden
    >
      <Skeleton className={cn(aspectClass, "w-full shrink-0 rounded-none rounded-t-2xl")} />
      <div className={cn("flex flex-1 flex-col gap-2", pad)}>
        <Skeleton className="h-3 w-28 rounded-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[72%]" />
        {variant === "default" ? (
          <>
            <Skeleton className="mt-1 h-3 w-full" />
            <Skeleton className="h-3 w-[88%]" />
          </>
        ) : null}
        <div className="mt-auto flex gap-2 border-border/60 pt-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
