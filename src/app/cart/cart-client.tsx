"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/constants";
import { cartTotals, useCartStore } from "@/stores/cart-store";

export function CartClient() {
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const { subtotal, count } = cartTotals(lines);

  if (lines.length === 0) {
    return (
      <div className="bg-muted/40 mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed px-8 py-20 text-center">
        <p className="font-heading text-xl">Your bag is empty</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Explore the catalogue and add pieces you love.
        </p>
        <Link href="/catalogue" className={cn(buttonVariants(), "mt-8")}>
          Browse catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_360px] lg:gap-14 lg:px-8 lg:py-16">
      <div className="space-y-6">
        <h2 className="font-heading text-2xl">Items ({count})</h2>
        <ul className="divide-border divide-y rounded-2xl border bg-card shadow-sm">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 p-5 sm:gap-6">
              <Link
                href={`/products/${product.slug}`}
                className="relative size-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-32"
              >
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-heading hover:text-primary text-lg leading-tight transition"
                    >
                      {product.name}
                    </Link>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {formatPrice(product.price_cents, product.currency)} each
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground shrink-0"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => removeItem(product.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center rounded-full border">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(product.id, quantity - 1)}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="min-w-[2rem] text-center text-sm tabular-nums">{quantity}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full"
                      aria-label="Increase quantity"
                      disabled={quantity >= product.stock}
                      onClick={() => setQuantity(product.id, quantity + 1)}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <span className="font-medium tabular-nums">
                    {formatPrice(product.price_cents * quantity, product.currency)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="bg-card ring-border h-fit rounded-2xl p-6 shadow-sm ring-1 lg:sticky lg:top-24">
        <h3 className="font-heading text-lg">Order summary</h3>
        <Separator className="my-4" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
          Shipping and taxes calculated at checkout. This demo cart persists in your browser via
          Zustand.
        </p>
        <Button type="button" className="mt-6 w-full" disabled>
          Checkout (demo)
        </Button>
        <Button
          type="button"
          variant="outline"
          className="mt-3 w-full"
          onClick={() => clear()}
        >
          Clear cart
        </Button>
      </aside>
    </div>
  );
}
