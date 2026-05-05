"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlist-store";

export function WishlistBadgeLink() {
  const count = useWishlistStore((s) => s.items.length);

  return (
    <Link
      href="/wishlist"
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}
      aria-label={`Wishlist${count ? `, ${count} items` : ""}`}
    >
      <span className="relative inline-flex">
        <Heart className="size-[22px] stroke-[1.75] text-neutral-800" />
        {count > 0 ? (
          <span className="bg-primary text-primary-foreground absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full text-[10px] font-semibold">
            {count > 99 ? "99+" : count}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
