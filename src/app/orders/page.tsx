import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OrdersClient } from "@/app/orders/orders-client";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and manage your Cheddar Apparel orders.",
};

export default async function OrdersPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect("/login?error=" + encodeURIComponent("Supabase is not configured."));
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Orders</p>
          <h1 className="font-heading mt-2 text-4xl tracking-tight">My orders</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track status, payment method, and order references from your account history.
          </p>
        </div>
      </section>
      <section className="flex-1 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <OrdersClient />
        </div>
      </section>
    </div>
  );
}
