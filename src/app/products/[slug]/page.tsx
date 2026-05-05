import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { CATEGORY_LABELS, formatPrice } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { WishlistToggleButton } from "@/components/product/wishlist-toggle-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description ?? `${product.name} at Cheddar Apparel.`,
    openGraph: {
      images: [product.image_url],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-14">
        <Link
          href="/catalogue"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm lg:hidden"
        >
          <ArrowLeft className="size-4" />
          Back to catalogue
        </Link>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-muted lg:max-w-md lg:flex-1">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
          {product.stock <= 5 && product.stock > 0 ? (
            <Badge className="absolute left-4 top-4 rounded-full bg-background/90 backdrop-blur">
              Only {product.stock} left
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:max-w-lg">
          <Link
            href="/catalogue"
            className="text-muted-foreground hover:text-foreground hidden items-center gap-2 text-sm lg:inline-flex"
          >
            <ArrowLeft className="size-4" />
            Back to catalogue
          </Link>

          <div className="space-y-2">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
              {CATEGORY_LABELS[product.category]}
            </p>
            <h1 className="font-heading text-4xl tracking-tight">{product.name}</h1>
            <p className="text-2xl font-medium tracking-tight">
              {formatPrice(product.price_cents, product.currency)}
            </p>
          </div>

          <Separator />

          {product.description ? (
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          ) : null}

          {product.sizes && product.sizes.length > 0 ? (
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                Sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="text-muted-foreground flex flex-wrap gap-6 text-sm">
            <span>
              SKU · <span className="text-foreground font-medium">{product.slug}</span>
            </span>
            <span>
              Stock ·{" "}
              <span className="text-foreground font-medium">
                {product.stock > 0 ? `${product.stock} available` : "Sold out"}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <WishlistToggleButton product={product} size="sm" />
            {product.stock > 0 ? (
              <AddToCartButton product={product} size="lg" className="min-w-[200px] flex-1" />
            ) : (
              <p className="text-muted-foreground text-sm">This piece is currently unavailable.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
