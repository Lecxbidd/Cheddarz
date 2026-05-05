import type { Metadata } from "next";
import { WishlistClient } from "@/app/wishlist/wishlist-client";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Saved items at Cheddar Apparel.",
};

export default function WishlistPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-border bg-muted/30 border-b py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl tracking-tight">Wishlist</h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm">
            Items you save on this device sync here for quick checkout later.
          </p>
        </div>
      </section>
      <section className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <WishlistClient />
        </div>
      </section>
    </div>
  );
}
