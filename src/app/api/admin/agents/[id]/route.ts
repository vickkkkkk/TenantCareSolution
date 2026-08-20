import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const existing = await prisma.agent.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const propertyCount = await prisma.property.count({ where: { agentId: id } });
  if (propertyCount > 0) {
    return NextResponse.json(
      { error: `Reassign this agent's ${propertyCount} propert${propertyCount === 1 ? "y" : "ies"} to another agent before deleting` },
      { status: 400 },
    );
  }

  await prisma.agent.delete({ where: { id } });
  await prisma.user.delete({ where: { id: existing.userId } });

  return NextResponse.json({ ok: true });
}

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
