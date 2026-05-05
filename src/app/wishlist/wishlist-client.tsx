"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/constants";
import { useWishlistStore } from "@/stores/wishlist-store";
import { AddToCartButton } from "@/components/product/add-to-cart-button";

export function WishlistClient() {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);

  if (items.length === 0) {
    return (
      <div className="bg-muted/40 mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed px-8 py-20 text-center">
        <p className="font-heading text-xl">Your wishlist is empty</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Save pieces you love from the catalogue — they will show up here.
        </p>
        <Link href="/catalogue" className={cn(buttonVariants(), "mt-8")}>
          Browse catalogue
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-border mx-auto max-w-3xl divide-y rounded-2xl border bg-card shadow-sm">
      {items.map((product) => (
        <li key={product.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href={`/products/${product.slug}`}
            className="relative mx-auto aspect-[4/5] w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl bg-muted sm:mx-0"
          >
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="200px"
            />
          </Link>
          <div className="min-w-0 flex-1 space-y-2">
            <Link href={`/products/${product.slug}`} className="font-heading text-lg hover:text-primary">
              {product.name}
            </Link>
            <p className="font-medium tabular-nums">{formatPrice(product.price_cents, product.currency)}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:flex-col">
            <AddToCartButton product={product} size="sm" className="w-full sm:w-auto" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => remove(product.id)}
            >
              <Trash2 className="mr-1 size-4" />
              Remove
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
