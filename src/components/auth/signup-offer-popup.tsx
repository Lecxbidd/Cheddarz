"use client";

import { useEffect, useState } from "react";
import { Gift, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignupOfferPopup({ showInitially }: { showInitially: boolean }) {
  const [open, setOpen] = useState(showInitially);

  useEffect(() => {
    if (!showInitially) return;
    const expiresAt = Date.now() + 12 * 60 * 60 * 1000;
    try {
      localStorage.setItem(
        "cheddarz-signup-offer",
        JSON.stringify({ code: "WELCOME70", expiresAt })
      );
    } catch {
      // no-op
    }
  }, [showInitially]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)]">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex rounded-full border border-lux-accent/35 bg-lux-accent/10 p-2.5">
            <Gift className="size-5 text-lux-accent" />
          </div>
          <button
            type="button"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            onClick={() => setOpen(false)}
            aria-label="Close offer popup"
          >
            <X className="size-4" />
          </button>
        </div>

        <h2 className="font-heading mt-4 text-2xl tracking-tight">Welcome offer</h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          Get a <span className="font-semibold text-lux-accent">70% OFF</span> your first order in
          first 12hrs.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Promo code: <span className="font-semibold">WELCOME70</span>
        </p>

        <Button className="mt-6 w-full" onClick={() => setOpen(false)}>
          Continue
        </Button>
      </div>
    </div>
  );
}
