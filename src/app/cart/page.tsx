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
      <section className="relative overflow-hidden border-b border-border bg-muted/35 dark:bg-muted/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_80%_-30%,rgba(180,140,90,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="lux-eyebrow text-lux-accent">Cart</p>
          <h1 className="font-heading mt-3 text-balance text-4xl font-medium tracking-tight md:text-[2.65rem] md:leading-[1.08]">
            Shopping bag
          </h1>
          <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed">
            Review items, adjust quantities, then continue to checkout when you&apos;re ready.
          </p>
        </div>
      </section>
      <CartSync />
      <CartClient />
    </div>
  );
}
