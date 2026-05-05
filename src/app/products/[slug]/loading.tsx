import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-14">
        <Skeleton className="aspect-[4/5] w-full rounded-3xl lg:max-w-md lg:flex-1" />
        <div className="flex flex-1 flex-col gap-6 lg:max-w-lg">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-10 w-[min(100%,420px)]" />
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Skeleton className="h-11 w-40 rounded-lg" />
            <Skeleton className="h-11 w-11 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
