import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, addressLine, postcode, message } = body;

  if (!name || !email || !addressLine || !postcode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const valuation = await prisma.valuationRequest.create({
    data: { name, email, phone: phone || null, addressLine, postcode, message: message || null },
  });

  return NextResponse.json({ id: valuation.id }, { status: 201 });
}
