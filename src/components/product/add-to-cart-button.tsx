"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types/product";

export function AddToCartButton({
  product,
  size = "default",
}: {
  product: Product;
  size?: React.ComponentProps<typeof Button>["size"];
}) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button
      type="button"
      size={size}
      className="gap-2"
      onClick={() => {
        addItem(product, 1);
        toast.success("Added to bag", { description: product.name });
      }}
    >
      <ShoppingBag />
      Add to cart
    </Button>
  );
}
