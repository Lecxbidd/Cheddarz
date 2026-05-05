"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types/product";

const ADDED_MS = 950;

export function AddToCartButton({
  product,
  size = "default",
  className,
  hideIcon = false,
}: {
  product: Product;
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  /** Useful on dense overlays (e.g. product cards). */
  hideIcon?: boolean;
}) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [phase, setPhase] = useState<"idle" | "added">("idle");

  const handleAdd = useCallback(() => {
    if (phase !== "idle") return;
    addItem(product, 1);

    toast.success("Added to bag", {
      description: product.name,
      duration: 4200,
      action: {
        label: "View bag",
        onClick: () => router.push("/cart"),
      },
    });

    setPhase("added");
    window.setTimeout(() => setPhase("idle"), ADDED_MS);
  }, [addItem, phase, product, router]);

  const showCheck = phase === "added";

  return (
    <Button
      type="button"
      size={size}
      disabled={phase !== "idle"}
      aria-busy={phase !== "idle"}
      className={cn(
        !hideIcon && "gap-2",
        "motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-safe:ease-out",
        showCheck && "motion-safe:scale-[0.99]",
        className,
      )}
      onClick={handleAdd}
    >
      {showCheck ? (
        <Check
          className="size-4 shrink-0 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-200"
          aria-hidden
        />
      ) : !hideIcon ? (
        <ShoppingBag className="shrink-0" aria-hidden />
      ) : null}
      {showCheck ? "Added" : "Add to cart"}
    </Button>
  );
}
