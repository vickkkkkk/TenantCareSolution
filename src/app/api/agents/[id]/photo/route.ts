import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { photo } = await request.json();

  if (typeof photo !== "string" || !photo) {
    return NextResponse.json({ error: "Missing photo URL" }, { status: 400 });
  }

  const agent = await prisma.agent.update({ where: { id }, data: { photo } });
  return NextResponse.json({ agent });
}
