import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/constants";
import { CATEGORY_LABELS, type MockProduct } from "@/data/mock-products";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import type { Product } from "@/types/product";

function toStoreProduct(product: MockProduct): Product {
  const categoryMap = {
    children: "children_wears",
    boys: "boys_wears",
    guys: "adult_wears",
    ladies: "casual_wears",
    adults: "adult_wears",
    streetwear: "streetwear",
    casualwear: "casual_wears",
    accessories: "accessories",
  } as const;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price_cents: Math.round(product.price * 100),
    currency: "USD",
    category: categoryMap[product.category],
    sizes: null,
    image_url: product.imageUrl,
    featured: product.isFeatured,
    is_new_arrival: false,
    is_best_seller: false,
    stock: 100,
  };
}

export function ProductCard({
  product,
}: {
  product: MockProduct;
}) {
  const storeProduct = toStoreProduct(product);
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <Card className="group overflow-hidden border-white/40 bg-white/75 py-0 shadow-sm backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-black/35">
      <CardHeader className="relative p-0">
        <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/22 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        </Link>
        {product.isFeatured && (
          <Badge className="absolute left-3 top-3 rounded-full bg-background/85 px-3 backdrop-blur-md">
            Featured
          </Badge>
        )}
        {discount ? (
          <Badge className="absolute right-3 top-3 rounded-full bg-primary px-3 text-primary-foreground">
            -{discount}%
          </Badge>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-2 p-5">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">
          {CATEGORY_LABELS[product.category]}
        </p>
        <Link href={`/products/${product.slug}`} className="inline-block">
          <h3 className="font-heading text-lg leading-snug tracking-tight transition group-hover:text-primary hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {product.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {product.rating ? (
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-primary text-primary" />
              {product.rating.toFixed(1)}
            </span>
          ) : null}
          {product.unitsSold ? <span>{product.unitsSold}+ sold</span> : null}
          {product.officialStore ? <span>Official Store</span> : null}
          {product.payOnDelivery ? <span>Pay on Delivery</span> : null}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-white/55 px-5 py-4 dark:bg-black/20">
        <div className="flex flex-col">
          <span className="font-medium tracking-tight">
            {formatPrice(Math.round(product.price * 100), "USD")}
          </span>
          {product.oldPrice ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(Math.round(product.oldPrice * 100), "USD")}
            </span>
          ) : null}
        </div>
        <AddToCartButton product={storeProduct} size="sm" />
      </CardFooter>
    </Card>
  );
}
