import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { PropertyForm, type PropertyFormInitial } from "@/components/property-form";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [property, cities, categories, statuses, agents, features] = await Promise.all([
    prisma.property.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } }, features: true },
    }),
    prisma.city.findMany({ include: { areas: true }, orderBy: { name: "asc" } }),
    prisma.category.findMany({ where: { parentId: { not: null } }, orderBy: { name: "asc" } }),
    prisma.status.findMany({ orderBy: { name: "asc" } }),
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
    prisma.feature.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!property) notFound();

  const initial: PropertyFormInitial = {
    id: property.id,
    title: property.title,
    description: property.description,
    excerpt: property.excerpt,
    price: Number(property.price),
    pricePeriod: property.pricePeriod,
    deposit: property.deposit ? Number(property.deposit) : null,
    billsIncluded: property.billsIncluded,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    receptions: property.receptions,
    sizeSqft: property.sizeSqft,
    furnishing: property.furnishing,
    epcRating: property.epcRating,
    councilTaxBand: property.councilTaxBand,
    availableFrom: property.availableFrom?.toISOString() ?? null,
    addressLine1: property.addressLine1,
    addressLine2: property.addressLine2,
    postcode: property.postcode,
    cityId: property.cityId,
    areaId: property.areaId,
    categoryId: property.categoryId,
    statusId: property.statusId,
    agentId: property.agentId ?? "",
    featureIds: property.features.map((f) => f.id),
    imageUrls: property.images.map((img) => img.url),
    published: property.published,
    featured: property.featured,
  };

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Admin" }, { label: "Properties", href: "/admin/properties" }, { label: property.title }]} />
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        <h1 className="text-3xl mb-10">Edit property</h1>
        <PropertyForm options={{ cities, categories, statuses, agents, features }} initial={initial} />
      </section>
    </main>
  );
}
