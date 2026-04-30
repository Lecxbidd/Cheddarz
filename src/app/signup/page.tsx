import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Cheddar Apparel account to save profile and cart.",
};

export default function SignupPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="bg-card ring-border w-full max-w-md rounded-3xl p-8 shadow-lg ring-1 sm:p-10">
        <div className="mb-8 space-y-2 text-center">
          <Link href="/" className="text-muted-foreground hover:text-foreground text-sm">
            ← Back home
          </Link>
          <h1 className="font-heading text-3xl tracking-tight">Create your account</h1>
          <p className="text-muted-foreground text-sm">
            Join Cheddar Apparel for faster checkout and saved profiles.
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
