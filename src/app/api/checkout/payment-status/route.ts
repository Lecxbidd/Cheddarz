import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const id = new URL(request.url).searchParams.get("payment_intent");
  if (!id || !id.startsWith("pi_")) {
    return NextResponse.json({ error: "Missing payment_intent" }, { status: 400 });
  }

  try {
    const stripe = new Stripe(secret);
    const intent = await stripe.paymentIntents.retrieve(id);
    return NextResponse.json({
      status: intent.status,
      amount: intent.amount,
      currency: intent.currency,
    });
  } catch (err) {
    console.error("[payment-status]", err);
    return NextResponse.json({ error: "Could not verify payment" }, { status: 500 });
  }
}
