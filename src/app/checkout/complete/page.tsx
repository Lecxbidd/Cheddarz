"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

function CheckoutCompleteInner() {
  const params = useSearchParams();
  const clear = useCartStore((s) => s.clear);
  const [phase, setPhase] = useState<"idle" | "loading" | "ok" | "fail">("idle");

  useEffect(() => {
    const pi = params.get("payment_intent");
    const redirectStatus = params.get("redirect_status");

    if (!pi) {
      setPhase("idle");
      return;
    }

    if (redirectStatus === "succeeded") {
      clear();
      setPhase("ok");
      return;
    }
    if (redirectStatus === "failed") {
      setPhase("fail");
      return;
    }

    setPhase("loading");
    fetch(`/api/checkout/payment-status?payment_intent=${encodeURIComponent(pi)}`)
      .then((r) => r.json())
      .then((data: { status?: string }) => {
        if (data.status === "succeeded" || data.status === "processing") {
          clear();
          setPhase("ok");
        } else {
          setPhase("fail");
        }
      })
      .catch(() => setPhase("fail"));
  }, [params, clear]);

  if (phase === "idle" && !params.get("payment_intent")) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="font-heading text-xl">Nothing to confirm</p>
        <p className="text-muted-foreground mt-2 text-sm">Return to checkout to finish paying.</p>
        <Link href="/checkout" className={cn(buttonVariants(), "mt-8 inline-flex")}>
          Back to checkout
        </Link>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="font-heading text-xl">Confirming payment…</p>
        <p className="text-muted-foreground mt-2 text-sm">This takes just a moment.</p>
      </div>
    );
  }

  if (phase === "ok") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="font-heading text-xl text-green-700 dark:text-green-400">Payment received</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Thanks for shopping with us. Your bag has been cleared.
        </p>
        <Link href="/catalogue" className={cn(buttonVariants(), "mt-8 inline-flex")}>
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="font-heading text-xl">Payment didn&apos;t finish</p>
      <p className="text-muted-foreground mt-2 text-sm">
        Try again from checkout or contact support if money left your account.
      </p>
      <Link href="/checkout" className={cn(buttonVariants(), "mt-8 inline-flex")}>
        Try again
      </Link>
    </div>
  );
}

export default function CheckoutCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-20 text-center text-muted-foreground text-sm">Loading…</div>
      }
    >
      <CheckoutCompleteInner />
    </Suspense>
  );
}
