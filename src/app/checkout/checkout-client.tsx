"use client";

import { useMemo, useState } from "react";
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
import { cartTotals, useCartStore } from "@/stores/cart-store";

export function CheckoutClient() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const { subtotal, count } = cartTotals(lines);
  const [busy, setBusy] = useState(false);

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
    window.sessionStorage.setItem(
      "cheddarLastDemoOrder",
      JSON.stringify({
        id: orderId,
        email: email.trim(),
        totalCents: subtotal,
        at: new Date().toISOString(),
        items: count,
        paymentMethod: methodLabel,
      })
    );
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
            <StripeCheckoutSection
              lines={lines}
              shipping={shippingSnapshot}
              disabled={busy || !shippingComplete}
              onPaid={handleStripePaid}
            />

            <div className="relative py-6">
              <div className="absolute inset-x-0 top-1/2 border-t border-border" />
              <span className="relative mx-auto flex w-fit bg-card px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Or pay later
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-base">Pay on delivery</h3>
              <p className="text-muted-foreground text-sm">
                No card needed — confirm your details and we&apos;ll hold the order for cash or POS on delivery (demo
                flow).
              </p>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3">
                <input type="radio" name="pay-demo" defaultChecked className="size-4" />
                <span className="text-sm">Pay on delivery — simulated confirmation</span>
              </label>
            </div>

            <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={busy}>
              {busy ? "Placing order…" : "Place order (pay on delivery)"}
            </Button>
          </div>
        </form>
      </div>

      <aside className="h-fit space-y-4 rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-24">
        <h3 className="font-heading text-lg">Your bag</h3>
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
