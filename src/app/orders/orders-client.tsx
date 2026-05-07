"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type DemoOrder = {
  id: string;
  email: string;
  totalCents: number;
  at: string;
  items: number;
  paymentMethod: string;
  promoCode?: string;
};

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function OrdersClient() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cheddarz-demo-orders");
      if (!raw) return;
      const parsed = JSON.parse(raw) as DemoOrder[];
      if (Array.isArray(parsed)) {
        setOrders(parsed.slice(-20).reverse());
      }
    } catch {
      // no-op
    }
  }, []);

  const hasOrders = useMemo(() => orders.length > 0, [orders.length]);

  if (!hasOrders) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/25 p-10 text-center">
        <p className="font-heading text-2xl">No orders yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your completed orders will show up here.
        </p>
        <Link
          href="/catalogue"
          className="mt-5 inline-flex rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <article key={order.id} className="rounded-xl border bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Order ref
              </p>
              <p className="font-medium">{order.id}</p>
            </div>
            <Badge variant="secondary">Placed</Badge>
          </div>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <span className="text-muted-foreground">Total:</span> {formatMoney(order.totalCents)}
            </p>
            <p>
              <span className="text-muted-foreground">Items:</span> {order.items}
            </p>
            <p>
              <span className="text-muted-foreground">Payment:</span> {order.paymentMethod}
            </p>
            {order.promoCode ? (
              <p>
                <span className="text-muted-foreground">Promo:</span> {order.promoCode}
              </p>
            ) : null}
            <p>
              <span className="text-muted-foreground">Placed:</span>{" "}
              {new Date(order.at).toLocaleString()}
            </p>
          </div>
          <div className="mt-3">
            <Link
              href={`/track-order?order=${encodeURIComponent(order.id)}`}
              className="text-primary text-sm font-medium underline underline-offset-4"
            >
              Track this order
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
