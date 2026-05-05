"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/constants";
import { CATEGORY_LABELS, type MockProduct } from "@/data/mock-products";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { WishlistToggleButton } from "@/components/product/wishlist-toggle-button";
import { productFromMock } from "@/lib/product-from-mock";
import { cn } from "@/lib/utils";

export type ProductCardVariant = "default" | "rail";

type PromoKind = "sale" | "hot" | "new";

function discountPercent(product: MockProduct): number | null {
  if (!product.oldPrice || product.oldPrice <= product.price) return null;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

function primaryPromoBadge(product: MockProduct): PromoKind | null {
  if (discountPercent(product) != null) return "sale";
  if (product.isFeatured || (product.unitsSold ?? 0) > 280) return "hot";
  let h = 0;
  for (const c of product.id) h += c.charCodeAt(0);
  if (h % 11 < 3) return "new";
  return null;
}

function promoBadgeClass(kind: PromoKind): string {
  switch (kind) {
    case "sale":
      return "border-0 bg-red-600 text-white shadow-sm hover:bg-red-600";
    case "hot":
      return "border-0 bg-orange-600 text-white shadow-sm hover:bg-orange-600";
    case "new":
      return "border-0 bg-lux-accent text-neutral-950 shadow-sm hover:bg-lux-accent";
    default:
      return "";
  }
}

function promoBadgeLabel(kind: PromoKind): string {
  switch (kind) {
    case "sale":
      return "Sale";
    case "hot":
      return "Hot";
    case "new":
      return "New";
    default:
      return "";
  }
}

function ProductRatingStars({ rating }: { rating: number }) {
  const filled = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5 shrink-0",
            i < filled ? "fill-amber-400 text-amber-400" : "fill-muted/25 text-muted/45",
          )}
          aria-hidden
        />
      ))}
      <span className="ml-1 text-xs font-medium tabular-nums text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function ProductCard({
  product,
  variant = "default",
}: {
  product: MockProduct;
  variant?: ProductCardVariant;
}) {
  const storeProduct = productFromMock(product);
  const discount = discountPercent(product);
  const promo = primaryPromoBadge(product);
  const displayRating = product.rating ?? 4.5;
  const aspectClass = variant === "rail" ? "aspect-[3/4]" : "aspect-[4/5]";
  const contentPadding = variant === "rail" ? "p-3 sm:p-4" : "p-4 sm:p-5";
  const descClamp = variant === "rail" ? "line-clamp-1" : "line-clamp-2";

  return (
    <Card
      className={cn(
        "product-card-premium group flex h-full flex-col overflow-hidden rounded-2xl border-border/80 bg-card py-0 shadow-[0_14px_36px_-26px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.05] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-lux-accent/30 hover:shadow-[0_26px_52px_-28px_rgba(0,0,0,0.38)] dark:ring-white/[0.06]",
        variant === "rail" && "min-w-0",
      )}
    >
      <CardHeader className="relative space-y-0 p-0">
        <div className={cn("relative isolate overflow-hidden bg-muted", aspectClass)}>
          <Link
            href={`/products/${product.slug}`}
            className="absolute inset-0 z-0 block outline-none ring-inset ring-transparent focus-visible:ring-2 focus-visible:ring-lux-accent/60"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
              sizes={
                variant === "rail"
                  ? "(max-width:768px) 45vw, 280px"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
            />
          </Link>

          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-transparent to-black/15 opacity-80 transition-opacity duration-300 group-hover:opacity-95 md:opacity-0 md:group-hover:opacity-90" />

          <div className="absolute inset-0 z-[2] flex flex-col justify-between p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="pointer-events-auto min-w-0">
                {promo === "sale" && discount ? (
                  <Badge
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      promoBadgeClass("sale"),
                    )}
                  >
                    Sale · −{discount}%
                  </Badge>
                ) : promo ? (
                  <Badge
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      promoBadgeClass(promo),
                    )}
                  >
                    {promoBadgeLabel(promo)}
                  </Badge>
                ) : null}
              </div>
              <div className="pointer-events-auto shrink-0">
                <WishlistToggleButton
                  product={storeProduct}
                  size="sm"
                  className="size-9 rounded-full border-white/65 bg-white/95 shadow-md backdrop-blur-sm hover:bg-white dark:border-white/25 dark:bg-black/45 dark:hover:bg-black/60"
                />
              </div>
            </div>

            <div
              className={cn(
                "pointer-events-auto mt-auto flex gap-2 pt-8",
                "translate-y-0 opacity-100",
                "md:translate-y-2 md:opacity-0 md:transition-all md:duration-300 md:ease-out",
                "md:group-hover:translate-y-0 md:group-hover:opacity-100",
              )}
            >
              <Link
                href={`/products/${product.slug}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "xs" }),
                  "inline-flex min-h-9 flex-1 items-center justify-center rounded-full border-white/75 bg-white/95 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-950 shadow-md backdrop-blur-sm hover:bg-white",
                )}
              >
                Quick view
              </Link>
              <AddToCartButton
                product={storeProduct}
                size="xs"
                hideIcon
                className="inline-flex min-h-9 flex-1 rounded-full border-0 bg-primary text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-md hover:bg-primary/90"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn("flex flex-1 flex-col gap-2", contentPadding)}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {CATEGORY_LABELS[product.category]}
        </p>
        <Link href={`/products/${product.slug}`} className="min-w-0">
          <h3 className="text-left text-sm font-semibold leading-snug tracking-tight text-foreground transition group-hover:text-lux-accent sm:text-base">
            {product.name}
          </h3>
        </Link>

        <ProductRatingStars rating={displayRating} />

        {variant === "default" ? (
          <p className={cn("text-sm leading-relaxed text-muted-foreground", descClamp)}>
            {product.description}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 border-border/60 pt-2">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {formatPrice(Math.round(product.price * 100), "USD")}
          </span>
          {product.oldPrice && product.oldPrice > product.price ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(Math.round(product.oldPrice * 100), "USD")}
              </span>
              {discount ? (
                <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px] font-semibold text-red-600">
                  Save {discount}%
                </Badge>
              ) : null}
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
