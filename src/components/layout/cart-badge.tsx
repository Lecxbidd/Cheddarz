"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { cartTotals } from "@/stores/cart-store";

export function CartBadgeLink() {
  const lines = useCartStore((s) => s.lines);
  const { count } = cartTotals(lines);

  return (
    <Link
      href="/cart"
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}
      aria-label={`Shopping cart${count ? `, ${count} items` : ""}`}
    >
      <span className="relative inline-flex">
        <ShoppingBag className="size-5" />
        {count > 0 ? (
          <span className="bg-primary text-primary-foreground absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full text-[10px] font-semibold">
            {count > 99 ? "99+" : count}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
