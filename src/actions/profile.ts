"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Profile } from "@/types/product";

export type ProfileActionState = {
  error?: string;
  success?: boolean;
};

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Profile;
}

export async function upsertProfile(
  _prev: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const payload = {
    id: user.id,
    email: user.email ?? null,
    full_name: String(formData.get("full_name") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    gender: String(formData.get("gender") ?? "").trim() || null,
    avatar_url: String(formData.get("avatar_url") ?? "").trim() || null,
    address_line1: String(formData.get("address_line1") ?? "").trim() || null,
    city: String(formData.get("city") ?? "").trim() || null,
    country: String(formData.get("country") ?? "").trim() || null,
    postal_code: String(formData.get("postal_code") ?? "").trim() || null,
  };

  const { error } = await supabase.from("profiles").upsert(payload, {
    onConflict: "id",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: true };
}

export async function deleteProfile(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await supabase.from("profiles").delete().eq("id", user.id);
  await supabase.auth.signOut();
  redirect("/");
}
