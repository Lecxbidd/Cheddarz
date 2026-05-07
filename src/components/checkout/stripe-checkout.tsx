"use client";

import { useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getStripeBrowser } from "@/lib/stripe-browser";
import type { CartLine } from "@/stores/cart-store";

export type ShippingSnapshot = {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

function PayNowButton({
  shipping,
  onSuccess,
}: {
  shipping: ShippingSnapshot;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);

  async function handlePay() {
    if (!stripe || !elements) {
      toast.error("Payment form is still loading.");
      return;
    }

    const country = shipping.country.trim() || "US";
    setBusy(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/checkout/complete`,
          receipt_email: shipping.email.trim(),
          shipping: {
            name: shipping.fullName.trim(),
            phone: shipping.phone.trim() || undefined,
            address: {
              line1: shipping.address.trim(),
              city: shipping.city.trim(),
              postal_code: shipping.postalCode.trim(),
              country,
            },
          },
        },
      });

      if (error) {
        toast.error(error.message ?? "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        onSuccess();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button type="button" className="w-full sm:w-auto" size="lg" disabled={busy} onClick={handlePay}>
      {busy ? "Processing…" : "Pay now"}
    </Button>
  );
}

export function StripeCheckoutSection({
  lines,
  shipping,
  disabled,
  onPaid,
  promoCode,
}: {
  lines: CartLine[];
  shipping: ShippingSnapshot;
  disabled: boolean;
  onPaid: () => void;
  /** Applied welcome code sent to server for PaymentIntent amount */
  promoCode: string | null;
}) {
  const stripePromise = getStripeBrowser();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setClientSecret(null);
    setError(null);
  }, [promoCode]);

  const shippingReady =
    Boolean(shipping.email.trim()) &&
    Boolean(shipping.fullName.trim()) &&
    Boolean(shipping.address.trim());

  async function preparePayment() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({
            id: l.product.id,
            quantity: l.quantity,
          })),
          promoCode: promoCode?.trim() || undefined,
        }),
      });
      const data: { clientSecret?: string; error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start checkout");
      if (!data.clientSecret) throw new Error("Missing payment session");
      setClientSecret(data.clientSecret);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!stripePromise) {
    return (
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-950 dark:text-amber-100">
        Add{" "}
        <code className="rounded bg-background/80 px-1 py-0.5 text-xs">
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        </code>{" "}
        and{" "}
        <code className="rounded bg-background/80 px-1 py-0.5 text-xs">STRIPE_SECRET_KEY</code> in{" "}
        <code className="rounded bg-background/80 px-1 py-0.5 text-xs">.env.local</code> to enable Google Pay and cards.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-heading text-lg">Pay with Google Pay, Apple Pay, or card</h3>
        <p className="text-muted-foreground text-sm">
          Your bag total is calculated on the server before you pay. Google Pay shows automatically when supported (Chrome
          / Android with a wallet set up). Enable wallets in your{" "}
          <a
            href="https://dashboard.stripe.com/settings/payment_methods"
            className="text-primary underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe Dashboard → Payment methods
          </a>
          .
        </p>
      </div>

      {!clientSecret ? (
        <Button
          type="button"
          variant="default"
          className="w-full gap-2 sm:w-auto"
          disabled={disabled || !shippingReady || loading}
          onClick={preparePayment}
        >
          {loading ? "Connecting…" : "Continue to Google Pay & secure checkout"}
        </Button>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }} key={clientSecret}>
          <div className="space-y-4">
            <PaymentElement options={{ layout: "accordion" }} />
            <PayNowButton shipping={shipping} onSuccess={onPaid} />
          </div>
        </Elements>
      )}

      {error ? <p className="text-destructive text-sm">{error}</p> : null}
    </div>
  );
}
