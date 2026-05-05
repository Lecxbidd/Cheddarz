"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { signInAdminWithEmail, type AuthActionState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    signInAdminWithEmail,
    {}
  );

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Admin email</Label>
          <Input id="email" name="email" type="email" required placeholder="admin@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {state?.error ? (
          <p className="text-sm text-destructive" role="alert">
            {state.error}
          </p>
        ) : null}
        <Button type="submit" className="w-full gap-2" disabled={pending} aria-busy={pending}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Signing in…
            </>
          ) : (
            "Sign in as admin"
          )}
        </Button>
      </form>
      <p className="text-center text-xs text-muted-foreground">
        Not an admin?{" "}
        <Link href="/login" className="text-primary underline underline-offset-4">
          Use user login
        </Link>
      </p>
    </div>
  );
}

