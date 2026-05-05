import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Shipping information for Cheddar Apparel.",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl tracking-tight">Shipping</h1>
      <div className="text-muted-foreground mt-8 space-y-4 text-sm leading-relaxed">
        <p>
          Standard delivery timelines, carrier partners, and cut-off times would be listed here. Replace
          this copy with your warehouse and fulfillment rules.
        </p>
        <p>
          Typical sections include: processing time, domestic and international rates, duties, PO boxes,
          and signature requirements.
        </p>
        <p>
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact us
          </Link>{" "}
          for questions about a specific order.
        </p>
      </div>
    </div>
  );
}
