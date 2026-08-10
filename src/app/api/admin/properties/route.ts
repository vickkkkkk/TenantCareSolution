import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Furnishing, PricePeriod } from "@prisma/client";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  const body = await request.json();

  const agent = await prisma.agent.findUnique({ where: { id: body.agentId } });
  if (!agent) {
    return NextResponse.json({ error: "Select a valid agent" }, { status: 400 });
  }
  const city = await prisma.city.findUnique({ where: { id: body.cityId } });
  if (!city) {
    return NextResponse.json({ error: "Select a valid city" }, { status: 400 });
  }

  const baseSlug = slugify(`${body.title}-${body.postcode}`);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  const property = await prisma.property.create({
    data: {
      slug,
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
      stateId: city.stateId,
      categoryId: body.categoryId,
      statusId: body.statusId,
      agentId: body.agentId,
      ownerId: agent.userId,
      published: Boolean(body.published),
      featured: Boolean(body.featured),
      features: body.featureIds?.length ? { connect: body.featureIds.map((id: string) => ({ id })) } : undefined,
      images: {
        create: (body.imageUrls as string[] || []).map((url, i) => ({
          url,
          alt: body.title,
          order: i,
          isPrimary: i === 0,
        })),
      },
    },
  });

  if (property.published) {
    const count = await prisma.property.count({ where: { cityId: city.id, published: true } });
    await prisma.city.update({ where: { id: city.id }, data: { listingCount: count } });
  }

  return NextResponse.json({ id: property.id, slug: property.slug }, { status: 201 });
}
