import { cn } from "@/lib/utils"

function Skeleton({
  className,
  shimmer = true,
  ...props
}: React.ComponentProps<"div"> & { shimmer?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-muted animate-pulse",
        shimmer && "skeleton-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
