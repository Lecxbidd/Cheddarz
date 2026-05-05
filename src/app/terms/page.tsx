import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use for Cheddar Apparel.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl tracking-tight">Terms of use</h1>
      <div className="text-muted-foreground mt-8 space-y-4 text-sm leading-relaxed">
        <p>
          Cover acceptable use, intellectual property, limitation of liability, governing law, and dispute
          resolution. Replace with counsel-approved terms before going live.
        </p>
        <p>Pricing, product descriptions, and availability disclaimers are also common in this document.</p>
      </div>
    </div>
  );
}
