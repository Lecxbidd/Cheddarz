import type { Metadata } from "next";
import Link from "next/link";
import { AdminLoginForm } from "@/components/auth/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin-only login for Cheddar Apparel dashboard.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6 space-y-2 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back home
          </Link>
          <h1 className="text-2xl font-semibold">Admin dashboard access</h1>
          <p className="text-sm text-muted-foreground">
            Authorized admin accounts only.
          </p>
          {sp.error ? (
            <p className="text-sm text-destructive">{decodeURIComponent(sp.error)}</p>
          ) : null}
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}

