import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  const body = await request.json();

  if (typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const baseSlug = slugify(body.name);
  const existing = await prisma.agent.findUnique({ where: { slug: baseSlug } });
  const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

  const user = await prisma.user.create({
    data: { email: `${slug}@tenant-care-solution.test`, name: body.name, role: Role.AGENT },
  });

  const agent = await prisma.agent.create({
    data: {
      userId: user.id,
      slug,
      name: body.name,
      jobTitle: body.jobTitle || null,
      bio: body.bio || null,
      email: user.email,
    },
  });

  return NextResponse.json({ id: agent.id }, { status: 201 });
}
