import { NextResponse } from "next/server";
import Stripe from "stripe";
import { computeCartTotalCents } from "@/lib/checkout/order-pricing";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const items = (body as { items?: unknown }).items;
  const promoCodeRaw = (body as { promoCode?: unknown }).promoCode;
  const promoCode = typeof promoCodeRaw === "string" ? promoCodeRaw : null;
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Expected items array" }, { status: 400 });
  }

  const normalized = items.map((row: unknown) => {
    const r = row as { id?: unknown; quantity?: unknown };
    return {
      id: String(r.id ?? ""),
      quantity: Number(r.quantity ?? 1),
    };
  });

  const priced = await computeCartTotalCents(normalized, { promoCode });
  if (!priced.ok) {
    return NextResponse.json({ error: priced.error }, { status: 400 });
  }

  try {
    const stripe = new Stripe(secret);
    const intent = await stripe.paymentIntents.create({
      amount: priced.totalCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        item_count: String(normalized.length),
        subtotal_cents: String(priced.subtotalCents),
        discount_cents: String(priced.discountCents),
        promo_code: priced.promoCode ?? "",
      },
    });

    const clientSecret = intent.client_secret;
    if (!clientSecret) {
      return NextResponse.json({ error: "Missing client secret" }, { status: 500 });
    }

    return NextResponse.json({ clientSecret });
  } catch (err) {
    console.error("[create-payment-intent]", err);
    return NextResponse.json({ error: "Could not start payment" }, { status: 500 });
  }
}
