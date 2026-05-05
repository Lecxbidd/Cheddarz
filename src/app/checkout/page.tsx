import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CheckoutClient } from "@/app/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Cheddar Apparel order.",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-border bg-muted/30 border-b py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/cart"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="size-4" />
            Back to bag
          </Link>
          <h1 className="font-heading mt-4 text-3xl tracking-tight sm:text-4xl">Checkout</h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm">
            Review your bag, enter shipping, then pay with Google Pay / Apple Pay / card via Stripe when configured, or
            choose pay on delivery for the demo flow.
          </p>
        </div>
      </section>
      <section className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CheckoutClient />
        </div>
      </section>
    </div>
  );
}
