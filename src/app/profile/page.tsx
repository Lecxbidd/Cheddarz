import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile, deleteProfile } from "@/actions/profile";
import { ProfileForm } from "@/components/profile/profile-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { isAdminEmail } from "@/lib/auth/roles";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Cheddar Apparel profile details with full CRUD.",
};

export default async function ProfilePage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect(
      "/login?error=" +
        encodeURIComponent(
          "Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
        )
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile();
  const isAdmin = isAdminEmail(user.email);

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-border bg-muted/30 border-b py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Account</p>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-heading text-4xl tracking-tight">Your profile</h1>
            <Badge variant={isAdmin ? "default" : "secondary"}>{isAdmin ? "Admin" : "User"}</Badge>
          </div>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm">
            Create, view, update, or delete your saved details. Changes sync with Supabase{" "}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">profiles</code>.
          </p>
          <Link
            href="/catalogue"
            className="text-primary mt-6 inline-block text-sm font-medium underline underline-offset-4"
          >
            Continue shopping
          </Link>
        </div>
      </section>

      <section className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card ring-border rounded-3xl p-8 shadow-sm ring-1 sm:p-10">
            <h2 className="font-heading text-xl">Contact & shipping</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Full CRUD: profile rows are created at signup; update fields anytime; delete removes
              your profile row and signs you out.
            </p>
            <Separator className="my-8" />
            <ProfileForm profile={profile} />
            <Separator className="my-10" />
            <div className="space-y-4">
              <h3 className="font-medium text-destructive">Danger zone</h3>
              <p className="text-muted-foreground text-sm">
                Deletes your profile record and signs you out. Your auth account may still exist in
                Supabase Auth until removed there.
              </p>
              <form action={deleteProfile}>
                <Button type="submit" variant="destructive">
                  Delete profile & sign out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
