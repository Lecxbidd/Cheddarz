import type { Metadata } from "next";
import { CartClient } from "@/app/cart/cart-client";
import { CartSync } from "@/components/cart/cart-sync";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart, adjust quantities, and continue shopping.",
};

export default function CartPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-border bg-muted/30 border-b py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Cart</p>
          <h1 className="font-heading mt-2 text-4xl tracking-tight">Shopping bag</h1>
        </div>
      </section>
      <CartSync />
      <CartClient />
    </div>
  );
}
