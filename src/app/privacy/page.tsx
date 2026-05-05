import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Cheddar Apparel.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl tracking-tight">Privacy policy</h1>
      <div className="text-muted-foreground mt-8 space-y-4 text-sm leading-relaxed">
        <p>
          Describe what personal data you collect (accounts, orders, marketing), how you use it, cookies,
          third parties, and user rights. Have legal counsel review before launch.
        </p>
        <p>
          If you use Supabase Auth, mention authentication data handling and retention in line with your
          jurisdiction (GDPR, CCPA, etc.).
        </p>
      </div>
    </div>
  );
}
