"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { Loader2, Upload } from "lucide-react";
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
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (state?.success) toast.success("Profile saved.");
    if (state?.error) toast.error(state.error);
  }, [state]);

  async function onAvatarSelected(file: File | null) {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/profile/upload-avatar", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Avatar upload failed");
      }
      setAvatarUrl(data.url);
      toast.success("Avatar uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-8">
      <div className="rounded-2xl border bg-muted/30 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Avatar
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <div className="relative size-20 overflow-hidden rounded-full border bg-background">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="Profile avatar" fill className="object-cover" sizes="80px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                No image
              </div>
            )}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm transition hover:bg-muted">
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload avatar
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={(event) => onAvatarSelected(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      </div>

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
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
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
