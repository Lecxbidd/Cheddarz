import { MOCK_PRODUCTS } from "@/data/mock-products";
import { productFromMock } from "@/lib/product-from-mock";
import { createClient } from "@/lib/supabase/server";
import {
  normalizePromoCode,
  welcome70DiscountCents,
  welcome70TotalCents,
  WELCOME70_PROMO_CODE,
} from "@/lib/promo/welcome70";

export type CartItemInput = { id: string; quantity: number };

export type PricedCart = {
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  promoCode: string | null;
};

export async function computeCartTotalCents(
  items: CartItemInput[],
  options?: { promoCode?: string | null }
): Promise<{ ok: true } & PricedCart | { ok: false; error: string }> {
  if (!items.length) {
    return { ok: false, error: "Cart is empty" };
  }

  let totalCents = 0;

  for (const line of items) {
    const qtyRequested = Math.max(1, Math.floor(Number(line.quantity) || 1));

    const mock = MOCK_PRODUCTS.find((m) => m.id === line.id);
    if (mock) {
      const p = productFromMock(mock);
      const qty = Math.min(qtyRequested, Math.max(p.stock, 1));
      totalCents += p.price_cents * qty;
      continue;
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("products")
          .select("price_cents,stock")
          .eq("id", line.id)
          .maybeSingle();

        if (!error && data && typeof data.price_cents === "number") {
          const stock =
            typeof data.stock === "number" && Number.isFinite(data.stock) ? data.stock : 100;
          const qty = Math.min(qtyRequested, Math.max(stock, 1));
          totalCents += data.price_cents * qty;
          continue;
        }
      } catch {
        /* ignore */
      }
    }

    return { ok: false, error: `Unknown product: ${line.id}` };
  }

  const subtotalCents = totalCents;
  const promoRaw = options?.promoCode?.trim();
  const promoNorm = promoRaw ? normalizePromoCode(promoRaw) : "";
  const promoActive = promoNorm === WELCOME70_PROMO_CODE;
  const discountCents = promoActive ? welcome70DiscountCents(subtotalCents) : 0;
  totalCents = welcome70TotalCents(subtotalCents);

  if (totalCents < 50) {
    return {
      ok: false,
      error: promoActive
        ? "After the welcome discount, the card total is below $0.50 USD. Add another item or use Pay on delivery."
        : "Card payments require a total of at least $0.50 USD. Add another item or use Pay on delivery.",
    };
  }

  return {
    ok: true,
    subtotalCents,
    discountCents,
    totalCents,
    promoCode: promoActive ? WELCOME70_PROMO_CODE : null,
  };
}
