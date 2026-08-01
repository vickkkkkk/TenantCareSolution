import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, moveInDate, budgetMin, budgetMax, preferences } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const registration = await prisma.tenantRegistration.create({
    data: {
      name,
      email,
      phone: phone || null,
      moveInDate: moveInDate ? new Date(moveInDate) : null,
      budgetMin: budgetMin ? Number(budgetMin) : null,
      budgetMax: budgetMax ? Number(budgetMax) : null,
      preferences: preferences ?? null,
    },
  });

  return NextResponse.json({ id: registration.id }, { status: 201 });
}
