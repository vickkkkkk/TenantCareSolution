import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { EnquirySource } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message, source, propertyId } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const sourceEnum = Object.values(EnquirySource).includes(source)
    ? (source as EnquirySource)
    : EnquirySource.CONTACT_FORM;

  const enquiry = await prisma.enquiry.create({
    data: {
      name,
      email,
      phone: phone || null,
      message,
      source: sourceEnum,
      propertyId: propertyId || null,
    },
  });

  return NextResponse.json({ id: enquiry.id }, { status: 201 });
}
