"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/constants";
import { StripeCheckoutSection } from "@/components/checkout/stripe-checkout";
import { normalizePromoCode, WELCOME70_PROMO_CODE, welcome70DiscountCents } from "@/lib/promo/welcome70";
import {
  isWelcome70AlreadyUsed,
  markWelcome70Used,
  readWelcomeOfferFromStorage,
} from "@/lib/promo/welcome-offer-storage";
import { cartTotals, useCartStore } from "@/stores/cart-store";

export function CheckoutClient() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const { subtotal, count } = cartTotals(lines);
  const [busy, setBusy] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cod">("stripe");
  const [promoInput, setPromoInput] = useState("");
  const [welcomeAlreadyUsed, setWelcomeAlreadyUsed] = useState(false);

  useEffect(() => {
    setWelcomeAlreadyUsed(isWelcome70AlreadyUsed());
    const offer = readWelcomeOfferFromStorage();
    if (offer && !isWelcome70AlreadyUsed()) {
      setPromoInput(WELCOME70_PROMO_CODE);
    }
  }, []);

  const welcomeApplied =
    !welcomeAlreadyUsed && normalizePromoCode(promoInput) === WELCOME70_PROMO_CODE;
  const discountCents = welcomeApplied ? welcome70DiscountCents(subtotal) : 0;
  const payableCents = Math.max(0, subtotal - discountCents);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const shippingSnapshot = useMemo(
    () => ({
      email,
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
    }),
    [email, fullName, phone, address, city, postalCode, country]
  );

  const shippingComplete =
    Boolean(email.trim()) && Boolean(fullName.trim()) && Boolean(address.trim());

  function finalizeDemoOrder(methodLabel: string) {
    const orderId = `CHD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    if (welcomeApplied) {
      markWelcome70Used();
      setWelcomeAlreadyUsed(true);
    }
    const orderRecord = {
      id: orderId,
      email: email.trim(),
      totalCents: payableCents,
      at: new Date().toISOString(),
      items: count,
      paymentMethod: methodLabel,
      promoCode: welcomeApplied ? WELCOME70_PROMO_CODE : undefined,
    };
    window.sessionStorage.setItem("cheddarLastDemoOrder", JSON.stringify(orderRecord));
    try {
      const prev = JSON.parse(localStorage.getItem("cheddarz-demo-orders") ?? "[]") as unknown[];
      const next = Array.isArray(prev) ? [...prev, orderRecord].slice(-30) : [orderRecord];
      localStorage.setItem("cheddarz-demo-orders", JSON.stringify(next));
    } catch {
      // no-op
    }
    clear();
    toast.success("Order placed", {
      description: `Reference ${orderId}`,
    });
    router.push(`/track-order?order=${encodeURIComponent(orderId)}`);
  }

  function handleStripePaid() {
    finalizeDemoOrder("Google Pay / Apple Pay / Card (Stripe)");
  }

  function onSubmitDemo(e: React.FormEvent) {
    e.preventDefault();
    if (lines.length === 0) {
      toast.error("Your bag is empty");
      return;
    }
    if (!shippingComplete) {
      toast.error("Please fill in email, name, and address");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      finalizeDemoOrder("Pay on delivery");
      setBusy(false);
    }, 400);
  }

  if (lines.length === 0) {
    return (
      <div className="bg-muted/40 mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed px-8 py-20 text-center">
        <p className="font-heading text-xl">Nothing to checkout</p>
        <p className="text-muted-foreground mt-2 text-sm">Add items to your bag first.</p>
        <Link href="/catalogue" className={cn(buttonVariants(), "mt-8")}>
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
      <div className="space-y-8">
        <form onSubmit={onSubmitDemo} className="space-y-8">
          <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-lg">Contact &amp; shipping</h2>
            <p className="text-muted-foreground text-sm">
              Same details are used if you continue to Google Pay or card checkout below.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="co-email">Email</Label>
                <Input
                  id="co-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="co-name">Full name</Label>
                <Input
                  id="co-name"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="co-phone">Phone</Label>
                <Input
                  id="co-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="co-address">Address</Label>
                <Input
                  id="co-address"
                  autoComplete="street-address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-city">City</Label>
                <Input id="co-city" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-postal">Postal code</Label>
                <Input id="co-postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="co-country">Country</Label>
                <Input id="co-country" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
            <div className="space-y-3">
              <h3 className="font-heading text-base">Payment method</h3>
              <p className="text-muted-foreground text-sm">
                Choose Google Pay / Apple Pay / Card (Stripe), or Pay on delivery.
              </p>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3">
                <input
                  type="radio"
                  name="payment-method"
                  className="size-4"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                <span className="text-sm">Google Pay / Apple Pay / Card (Stripe)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3">
                <input
                  type="radio"
                  name="payment-method"
                  className="size-4"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="text-sm">Pay on delivery</span>
              </label>
            </div>

            {paymentMethod === "stripe" ? (
              <StripeCheckoutSection
                lines={lines}
                shipping={shippingSnapshot}
                disabled={busy || !shippingComplete}
                onPaid={handleStripePaid}
                promoCode={welcomeApplied ? WELCOME70_PROMO_CODE : null}
              />
            ) : (
              <div className="space-y-3 rounded-xl border border-border/70 bg-muted/30 p-4">
                <h3 className="font-heading text-base">Pay on delivery</h3>
                <p className="text-muted-foreground text-sm">
                  No card needed — confirm your details and we&apos;ll hold your order for cash or POS on delivery.
                </p>
                <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={busy}>
                  {busy ? "Placing order…" : "Place order (pay on delivery)"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>

      <aside className="h-fit space-y-4 rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-24">
        <h3 className="font-heading text-lg">Your bag</h3>
        <div className="space-y-2 rounded-xl border border-dashed bg-muted/20 p-3">
          <Label htmlFor="co-promo" className="text-xs font-medium text-muted-foreground">
            Promo code
          </Label>
          {welcomeAlreadyUsed ? (
            <p className="text-muted-foreground text-xs leading-relaxed">
              The welcome offer was already used on a previous order.
            </p>
          ) : (
            <>
              <Input
                id="co-promo"
                placeholder="e.g. WELCOME70"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                autoComplete="off"
              />
              {readWelcomeOfferFromStorage() ? (
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Your signup offer is active for a limited time — code applied when it matches{" "}
                  <span className="font-medium">{WELCOME70_PROMO_CODE}</span>.
                </p>
              ) : (
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  New accounts: 70% off your first order within 12 hours with{" "}
                  <span className="font-medium">{WELCOME70_PROMO_CODE}</span>.
                </p>
              )}
            </>
          )}
        </div>
        <Separator />
        <ul className="max-h-[320px] space-y-3 overflow-y-auto pr-1">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-3 text-sm">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-medium leading-snug">{product.name}</p>
                <p className="text-muted-foreground mt-1 text-xs">Qty {quantity}</p>
              </div>
              <p className="shrink-0 tabular-nums">
                {formatPrice(product.price_cents * quantity, product.currency)}
              </p>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="flex justify-between text-sm font-medium">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        {welcomeApplied ? (
          <div className="flex justify-between text-sm text-lux-accent">
            <span>Welcome 70% off</span>
            <span className="tabular-nums">−{formatPrice(discountCents)}</span>
          </div>
        ) : null}
        <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(payableCents)}</span>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Items listed here match what&apos;s in your cart (saved in this browser). Stripe verifies the total again on
          the server before charging Google Pay or a card.
        </p>
        <Link href="/cart" className="text-primary inline-block text-xs font-medium underline underline-offset-2">
          Edit bag
        </Link>
      </aside>
    </div>
  );
}
