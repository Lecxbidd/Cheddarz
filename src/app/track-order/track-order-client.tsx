"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/constants";

type StoredOrder = {
  id: string;
  email: string;
  totalCents: number;
  at: string;
  items: number;
};

export function TrackOrderClient() {
  const searchParams = useSearchParams();
  const paramId = searchParams.get("order");
  const [stored, setStored] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("cheddarLastDemoOrder");
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredOrder;
      if (paramId && parsed.id !== paramId) return;
      setStored(parsed);
    } catch {
      /* ignore */
    }
  }, [paramId]);

  const displayId = paramId ?? stored?.id;

  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
      <div>
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Order reference</p>
        <p className="font-heading mt-2 text-2xl tabular-nums">{displayId ?? "—"}</p>
      </div>
      {stored ? (
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>
            <span className="text-foreground font-medium">Email:</span> {stored.email}
          </li>
          <li>
            <span className="text-foreground font-medium">Items:</span> {stored.items}
          </li>
          <li>
            <span className="text-foreground font-medium">Total:</span>{" "}
            {formatPrice(stored.totalCents)}
          </li>
          <li>
            <span className="text-foreground font-medium">Placed:</span>{" "}
            {new Date(stored.at).toLocaleString()}
          </li>
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm">
          Enter the reference from your confirmation email, or complete a demo checkout to see details
          here. This page does not connect to a live carrier API.
        </p>
      )}
      <p className="border-t pt-4 text-xs text-neutral-500">
        Demo only: fulfillment and tracking links would appear here in production.
      </p>
    </div>
  );
}
