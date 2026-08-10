import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Furnishing, PricePeriod } from "@prisma/client";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.property.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  let stateId = existing.stateId;
  if (body.cityId && body.cityId !== existing.cityId) {
    const city = await prisma.city.findUnique({ where: { id: body.cityId } });
    if (!city) return NextResponse.json({ error: "Select a valid city" }, { status: 400 });
    stateId = city.stateId;
  }

  let ownerId = existing.ownerId;
  if (body.agentId && body.agentId !== existing.agentId) {
    const agent = await prisma.agent.findUnique({ where: { id: body.agentId } });
    if (!agent) return NextResponse.json({ error: "Select a valid agent" }, { status: 400 });
    ownerId = agent.userId;
  }

  await prisma.property.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
      excerpt: body.excerpt || null,
      price: Number(body.price),
      pricePeriod: body.pricePeriod as PricePeriod,
      deposit: body.deposit ? Number(body.deposit) : null,
      billsIncluded: Boolean(body.billsIncluded),
      bedrooms: Number(body.bedrooms) || 0,
      bathrooms: Number(body.bathrooms) || 0,
      receptions: Number(body.receptions) || 0,
      sizeSqft: body.sizeSqft ? Number(body.sizeSqft) : null,
      furnishing: body.furnishing ? (body.furnishing as Furnishing) : null,
      epcRating: body.epcRating || null,
      councilTaxBand: body.councilTaxBand || null,
      availableFrom: body.availableFrom ? new Date(body.availableFrom) : null,
      addressLine1: body.addressLine1,
      addressLine2: body.addressLine2 || null,
      postcode: body.postcode,
      cityId: body.cityId,
      areaId: body.areaId || null,
      stateId,
      categoryId: body.categoryId,
      statusId: body.statusId,
      agentId: body.agentId,
      ownerId,
      published: Boolean(body.published),
      featured: Boolean(body.featured),
      features: { set: (body.featureIds ?? []).map((fid: string) => ({ id: fid })) },
      ...(body.imageUrls
        ? {
            images: {
              deleteMany: {},
              create: (body.imageUrls as string[]).map((url, i) => ({
                url,
                alt: body.title,
                order: i,
                isPrimary: i === 0,
              })),
            },
          }
        : {}),
    },
  });

  for (const cityId of new Set([existing.cityId, body.cityId].filter(Boolean))) {
    const count = await prisma.property.count({ where: { cityId, published: true } });
    await prisma.city.update({ where: { id: cityId }, data: { listingCount: count } });
  }

  return NextResponse.json({ id });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const existing = await prisma.property.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  await prisma.property.delete({ where: { id } });

  const count = await prisma.property.count({ where: { cityId: existing.cityId, published: true } });
  await prisma.city.update({ where: { id: existing.cityId }, data: { listingCount: count } });

  return NextResponse.json({ ok: true });
}
