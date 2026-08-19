import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  if (typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const agent = await prisma.agent.update({
    where: { id },
    data: {
      name: body.name,
      jobTitle: body.jobTitle || null,
      bio: body.bio || null,
    },
  });

  return NextResponse.json({ agent });
}
