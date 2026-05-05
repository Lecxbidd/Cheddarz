import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function UserDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect("/login?error=" + encodeURIComponent("Supabase is not configured."));
  }

  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b bg-muted/30 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            User Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You are signed in as <span className="font-medium">{user.email}</span>.
          </p>
          {sp.error ? <p className="mt-3 text-sm text-destructive">{decodeURIComponent(sp.error)}</p> : null}
        </div>
      </section>
      <section className="py-10">
        <div className="mx-auto grid max-w-4xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <Link href="/profile" className="rounded-xl border bg-card p-5 transition hover:shadow-sm">
            <p className="text-sm font-semibold">Manage profile</p>
            <p className="mt-1 text-xs text-muted-foreground">Update your personal and shipping details.</p>
          </Link>
          <Link href="/cart" className="rounded-xl border bg-card p-5 transition hover:shadow-sm">
            <p className="text-sm font-semibold">View cart</p>
            <p className="mt-1 text-xs text-muted-foreground">Check selected products and continue checkout.</p>
          </Link>
          <Link href="/catalogue" className="rounded-xl border bg-card p-5 transition hover:shadow-sm">
            <p className="text-sm font-semibold">Shop catalogue</p>
            <p className="mt-1 text-xs text-muted-foreground">Explore the latest products and collections.</p>
          </Link>
          <Link href="/contact" className="rounded-xl border bg-card p-5 transition hover:shadow-sm">
            <p className="text-sm font-semibold">Support center</p>
            <p className="mt-1 text-xs text-muted-foreground">Get help with delivery, returns, and orders.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

