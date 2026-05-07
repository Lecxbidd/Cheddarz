"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth/roles";

export type AuthActionState = {
  error?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MISSING_SUPABASE_ENV_ERROR =
  "Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.";

export async function signInWithEmail(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { error: "Please provide a valid email address." };
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { error: MISSING_SUPABASE_ENV_ERROR };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signInAdminWithEmail(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const requiredAdminPassword = process.env.ADMIN_LOGIN_PASSWORD ?? "";

  if (!email || !password) return { error: "Email and password are required." };
  if (!EMAIL_REGEX.test(email)) return { error: "Please provide a valid email address." };
  if (!isAdminEmail(email)) return { error: "This account is not allowed for admin access." };
  if (requiredAdminPassword && password !== requiredAdminPassword) {
    return { error: "This account is not allowed for admin access." };
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { error: MISSING_SUPABASE_ENV_ERROR };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/admin");
}

export async function signUpWithEmail(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { error: "Please provide a valid email address." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { error: MISSING_SUPABASE_ENV_ERROR };
  }

  const supabase = await createClient();
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/login?registered=1");
}

export async function signOut() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect("/login?error=" + encodeURIComponent(MISSING_SUPABASE_ENV_ERROR));
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
