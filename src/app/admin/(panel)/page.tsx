import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export default async function AdminOverviewPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect("/admin/login?error=" + encodeURIComponent("Supabase is not configured."));
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const totalProducts = MOCK_PRODUCTS.length;
  const featuredCount = MOCK_PRODUCTS.filter((product) => product.isFeatured).length;

  return (
    <div className="space-y-4">
      <section className="rounded-xl border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Admin dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage catalogue records, monitor orders, and keep your storefront healthy.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground">Total products</p>
          <p className="mt-2 text-2xl font-semibold">{totalProducts}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground">Featured products</p>
          <p className="mt-2 text-2xl font-semibold">{featuredCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground">Admin email</p>
          <p className="mt-2 truncate text-sm font-medium">{user?.email ?? "N/A"}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground">Store status</p>
          <p className="mt-2 text-2xl font-semibold text-green-600">Live</p>
        </div>
      </section>
    </div>
  );
}

