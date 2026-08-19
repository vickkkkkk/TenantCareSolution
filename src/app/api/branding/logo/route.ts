import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 8MB" }, { status: 400 });
  }

  const ext = file.type.split("/")[1] ?? "png";
  const blob = await put(`branding/logo-${Date.now()}.${ext}`, file, {
    access: "public",
    addRandomSuffix: false,
  });

  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    create: { id: "main", logoUrl: blob.url },
    update: { logoUrl: blob.url },
  });

  return NextResponse.json({ logoUrl: settings.logoUrl }, { status: 201 });
}
