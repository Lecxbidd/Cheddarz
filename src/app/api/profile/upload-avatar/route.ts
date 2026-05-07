import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 4 * 1024 * 1024;

function extensionFor(mime: string, originalName: string): string {
  const fromName = path.extname(originalName).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp"].includes(fromName)) return fromName;
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  return ".jpg";
}

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing avatar file" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG, or WebP are allowed." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Max avatar file size is 4 MB." }, { status: 400 });
    }

    const ext = extensionFor(file.type, file.name);
    const filename = `${user.id}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}${ext}`;
    const uploadsDir = path.join(process.cwd(), "public", "assets", "uploads", "avatars");
    await mkdir(uploadsDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadsDir, filename), buffer);

    return NextResponse.json({ url: `/assets/uploads/avatars/${filename}` });
  } catch (error) {
    console.error("[profile/upload-avatar]", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
