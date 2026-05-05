"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/constants";
import { cartTotals, useCartStore } from "@/stores/cart-store";

function QtyStepper({
  quantity,
  max,
  onDecrease,
  onIncrease,
  productName,
}: {
  quantity: number;
  max: number;
  onDecrease: () => void;
  onIncrease: () => void;
  productName: string;
}) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-background p-0.5 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)]"
      role="group"
      aria-label={`Quantity for ${productName}`}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="size-9 shrink-0 rounded-full"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={onDecrease}
      >
        <Minus className="size-4" />
      </Button>
      <span className="min-w-[2.25rem] text-center text-sm font-medium tabular-nums text-foreground">
        {quantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="size-9 shrink-0 rounded-full"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={onIncrease}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}

export function CartClient() {
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const { subtotal, count } = cartTotals(lines);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Card className="rounded-3xl border-dashed py-12 text-center shadow-none ring-2 ring-border/80">
          <CardContent className="px-8">
            <p className="font-heading text-xl text-foreground">Your bag is empty</p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Browse the catalogue and add pieces you love. Your selections will appear here.
            </p>
            <Link href="/catalogue" className={cn(buttonVariants(), "mt-8 inline-flex")}>
              Continue shopping
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-12 lg:px-8 lg:py-14">
      {/* Line items */}
      <div className="min-w-0 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="lux-eyebrow text-lux-accent">Bag</p>
            <h2 className="font-heading mt-1 text-2xl font-medium tracking-tight sm:text-[1.65rem]">
              {count} {count === 1 ? "item" : "items"}
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="text-muted-foreground hover:text-foreground text-sm font-medium underline-offset-4 transition-colors hover:underline"
          >
            Continue shopping
          </Link>
        </div>

        <ul className="flex flex-col gap-4">
          {lines.map(({ product, quantity }) => {
            const lineTotal = product.price_cents * quantity;
            const unitLabel = formatPrice(product.price_cents, product.currency);

            return (
              <li key={product.id}>
                <Card className="rounded-2xl border-border/90 py-0 shadow-[0_20px_44px_-36px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.04] dark:shadow-[0_24px_48px_-32px_rgba(0,0,0,0.65)] dark:ring-white/[0.06]">
                  <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6 sm:p-6">
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative mx-auto aspect-square w-full max-w-[140px] shrink-0 overflow-hidden rounded-xl bg-muted sm:mx-0 sm:size-[124px] sm:max-w-none"
                    >
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 40vw, 124px"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col gap-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <Link
                            href={`/products/${product.slug}`}
                            className="font-heading text-lg font-medium leading-snug tracking-tight text-foreground transition-colors hover:text-lux-accent"
                          >
                            {product.name}
                          </Link>
                          <p className="text-muted-foreground text-sm tabular-nums">
                            {unitLabel}{" "}
                            <span className="text-muted-foreground/80">· each</span>
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-destructive -mr-2 -mt-1 shrink-0 gap-2 px-3 font-normal sm:-mr-3"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => removeItem(product.id)}
                        >
                          <Trash2 className="size-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-4 sm:border-0 sm:pt-0">
                        <QtyStepper
                          quantity={quantity}
                          max={Math.max(product.stock, 1)}
                          productName={product.name}
                          onDecrease={() => setQuantity(product.id, quantity - 1)}
                          onIncrease={() => setQuantity(product.id, quantity + 1)}
                        />
                        <div className="text-right">
                          <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
                            Line total
                          </p>
                          <p className="font-heading mt-0.5 text-lg font-medium tabular-nums">
                            {formatPrice(lineTotal, product.currency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-[calc(6rem+env(safe-area-inset-top))]">
        <Card className="rounded-2xl border-border/90 py-0 shadow-[0_24px_48px_-32px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.04] dark:shadow-[0_28px_56px_-28px_rgba(0,0,0,0.75)] dark:ring-white/[0.06]">
          <CardHeader className="border-b border-border/70 px-6 py-5">
            <CardTitle className="font-heading text-xl font-medium tracking-tight">
              Order summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pt-6 pb-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-muted-foreground text-right text-xs leading-snug">
                Calculated at checkout
              </span>
            </div>
            <Separator />
            <div className="flex items-baseline justify-between gap-4 pt-1">
              <span className="font-heading text-base font-medium">Total</span>
              <span className="font-heading text-2xl font-medium tabular-nums tracking-tight">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-muted-foreground pb-2 text-xs leading-relaxed">
              Taxes may apply based on your region. Bag syncs in this browser via local storage.
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-3 border-border/70 bg-muted/35 px-6 py-5 dark:bg-muted/20">
            <Link href="/checkout" className={cn(buttonVariants({ size: "lg" }), "h-12 w-full text-[11px] font-semibold uppercase tracking-[0.2em]")}>
              Checkout
            </Link>
            <Button type="button" variant="outline" className="w-full" onClick={() => clear()}>
              Clear bag
            </Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
}
