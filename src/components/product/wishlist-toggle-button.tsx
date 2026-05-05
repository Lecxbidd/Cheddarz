"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { useWishlistStore } from "@/stores/wishlist-store";

export function WishlistToggleButton({
  product,
  size = "sm",
  className,
}: {
  product: Product;
  size?: "sm" | "default";
  className?: string;
}) {
  const toggle = useWishlistStore((s) => s.toggle);
  const active = useWishlistStore((s) => s.has(product.id));

  return (
    <Button
      type="button"
      variant="outline"
      size={size === "default" ? "default" : "icon-sm"}
      className={cn(
        "shrink-0 motion-safe:transition-[transform,colors] motion-safe:duration-200 motion-safe:active:scale-[0.94]",
        active && "border-primary/40 text-primary",
        className,
      )}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => {
        const wasActive = active;
        toggle(product);
        if (!wasActive) {
          toast.success("Saved to wishlist", {
            description: product.name,
            duration: 2600,
          });
        } else {
          toast.message("Removed from wishlist", {
            description: product.name,
            duration: 2200,
          });
        }
      }}
    >
      <Heart className={cn("size-4", active && "fill-current")} />
    </Button>
  );
}
