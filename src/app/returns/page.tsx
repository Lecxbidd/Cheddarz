import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & exchanges",
  description: "Returns and exchanges policy for Cheddar Apparel.",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl tracking-tight">Returns &amp; exchanges</h1>
      <div className="text-muted-foreground mt-8 space-y-4 text-sm leading-relaxed">
        <p>
          Outline your return window, condition of items, refund method, and how to start a return label.
          This placeholder is for layout only.
        </p>
        <p>
          Many stores include: final sale items, gift returns, size exchanges, and damaged-in-transit
          procedures.
        </p>
        <p>
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact support
          </Link>{" "}
          to request a return authorization.
        </p>
      </div>
    </div>
  );
}
