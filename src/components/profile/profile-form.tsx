"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { upsertProfile, type ProfileActionState } from "@/actions/profile";
import type { Profile } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction, pending] = useActionState<ProfileActionState, FormData>(
    upsertProfile,
    {}
  );

  useEffect(() => {
    if (state?.success) toast.success("Profile saved.");
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            name="full_name"
            defaultValue={profile?.full_name ?? ""}
            placeholder="Jordan Lee"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender" defaultValue={profile?.gender ?? ""}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non_binary">Non-binary</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={profile?.phone ?? ""}
            placeholder="+1 555 019 8899"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar_url">Avatar URL</Label>
          <Input
            id="avatar_url"
            name="avatar_url"
            type="url"
            defaultValue={profile?.avatar_url ?? ""}
            placeholder="https://"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address_line1">Address</Label>
          <Input
            id="address_line1"
            name="address_line1"
            defaultValue={profile?.address_line1 ?? ""}
            placeholder="Street and number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={profile?.city ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postal_code">Postal code</Label>
          <Input id="postal_code" name="postal_code" defaultValue={profile?.postal_code ?? ""} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" defaultValue={profile?.country ?? ""} />
        </div>
      </div>

      <div className="border-border rounded-xl border bg-muted/30 p-4">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">Account email</p>
        <p className="mt-1 font-medium">{profile?.email ?? "—"}</p>
        <p className="text-muted-foreground mt-2 text-xs">
          Email changes are managed in Supabase Auth settings.
        </p>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
