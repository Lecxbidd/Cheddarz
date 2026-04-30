import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to Cheddar Apparel using email/password or Google.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string; error?: string }>;
}) {
  const sp = await searchParams;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="bg-card ring-border w-full max-w-md rounded-3xl p-8 shadow-lg ring-1 sm:p-10">
        <div className="mb-8 space-y-2 text-center">
          <Link href="/" className="text-muted-foreground hover:text-foreground text-sm">
            ← Back home
          </Link>
          <h1 className="font-heading text-3xl tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-sm">
            Sign in with email or Google to manage your profile and orders.
          </p>
          {sp.registered === "1" ? (
            <p className="rounded-lg bg-muted px-3 py-2 text-sm">
              Account created — check your email to confirm, then sign in.
            </p>
          ) : null}
          {sp.error ? (
            <p className="text-destructive text-sm" role="alert">
              {decodeURIComponent(sp.error)}
            </p>
          ) : null}
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
