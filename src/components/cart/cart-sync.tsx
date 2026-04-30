"use client";

import { useEffect, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCartStore, type CartLine } from "@/stores/cart-store";
import type { Product } from "@/types/product";

type JoinedCartRow = {
  quantity: number;
  product: Product;
};

function stableKey(lines: CartLine[]) {
  return lines
    .map((l) => `${l.product.id}:${l.quantity}`)
    .sort()
    .join("|");
}

export function CartSync() {
  const setLines = useCartStore((s) => s.setLines);
  const lines = useCartStore((s) => s.lines);

  const supabaseReady = useMemo(
    () =>
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    []
  );

  const lastPushedKey = useRef<string>("");
  const loadOnce = useRef(false);

  // Load saved cart for logged-in users (once)
  useEffect(() => {
    if (!supabaseReady || loadOnce.current) return;
    loadOnce.current = true;

    const supabase = createClient();

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("cart_items")
        .select("quantity, product:products(*)")
        .order("updated_at", { ascending: false });

      if (error || !data) return;

      const joined = data as unknown as JoinedCartRow[];
      const nextLines: CartLine[] = joined
        .filter((r) => Boolean(r.product?.id))
        .map((r) => ({
          product: r.product,
          quantity: Math.max(1, Math.min(r.quantity, Math.max(r.product.stock, 1))),
        }));

      if (nextLines.length > 0) {
        setLines(nextLines);
        lastPushedKey.current = stableKey(nextLines);
      }
    })();
  }, [setLines, supabaseReady]);

  // Push cart changes to Supabase (debounced)
  useEffect(() => {
    if (!supabaseReady) return;

    const key = stableKey(lines);
    if (key === lastPushedKey.current) return;

    const supabase = createClient();
    const id = window.setTimeout(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const desired = lines.map((l) => ({
        user_id: user.id,
        product_id: l.product.id,
        quantity: l.quantity,
      }));

      // Upsert current lines
      if (desired.length > 0) {
        await supabase.from("cart_items").upsert(desired, {
          onConflict: "user_id,product_id",
        });
      }

      // Delete removed lines
      const keepIds = desired.map((d) => d.product_id);
      if (keepIds.length === 0) {
        await supabase.from("cart_items").delete().eq("user_id", user.id);
      } else {
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.id)
          .not("product_id", "in", `(${keepIds.join(",")})`);
      }

      lastPushedKey.current = key;
    }, 500);

    return () => window.clearTimeout(id);
  }, [lines, supabaseReady]);

  return null;
}

