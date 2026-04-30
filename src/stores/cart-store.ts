"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  setLines: (lines: CartLine[]) => void;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      setLines: (lines) => set({ lines }),
      addItem: (product, qty = 1) => {
        const lines = [...get().lines];
        const idx = lines.findIndex((l) => l.product.id === product.id);
        if (idx >= 0) {
          lines[idx] = {
            ...lines[idx],
            quantity: Math.min(
              lines[idx].quantity + qty,
              Math.max(product.stock, 1)
            ),
          };
        } else {
          lines.push({ product, quantity: Math.min(qty, Math.max(product.stock, 1)) });
        }
        set({ lines });
      },
      removeItem: (productId) =>
        set({
          lines: get().lines.filter((l) => l.product.id !== productId),
        }),
      setQuantity: (productId, quantity) => {
        const q = Math.max(1, Math.floor(quantity));
        set({
          lines: get().lines
            .map((l) =>
              l.product.id === productId
                ? {
                    ...l,
                    quantity: Math.min(q, Math.max(l.product.stock, 1)),
                  }
                : l
            )
            .filter((l) => l.quantity > 0),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    { name: "cheddar-apparel-cart" }
  )
);

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce(
    (acc, l) => acc + l.product.price_cents * l.quantity,
    0
  );
  return { subtotal, count: lines.reduce((a, l) => a + l.quantity, 0) };
}
