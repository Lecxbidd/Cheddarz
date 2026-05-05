import type { Metadata } from "next";
import { Suspense } from "react";
import { TrackOrderClient } from "@/app/track-order/track-order-client";

export const metadata: Metadata = {
  title: "Track order",
  description: "Track your Cheddar Apparel order status.",
};

export default function TrackOrderPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-border bg-muted/30 border-b py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl tracking-tight">Track order</h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm">
            Look up a recent demo order by reference. Real stores connect this to shipment APIs.
          </p>
        </div>
      </section>
      <section className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<p className="text-muted-foreground text-sm">Loading…</p>}>
            <TrackOrderClient />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
