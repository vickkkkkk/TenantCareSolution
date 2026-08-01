import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { PropertyCard, type PropertyCardData } from "@/components/property-card";
import { EnquiryForm } from "@/components/enquiry-form";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Sofa, Ruler, CalendarDays, MapPin, Phone } from "lucide-react";
import { propertyImage, exteriorTags } from "@/lib/property-image";

async function getProperty(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: {
      city: true, area: true, category: true, status: true, features: true,
      images: { orderBy: { order: "asc" } }, agent: { include: { user: true } },
    },
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return {};
  return {
    title: `${property.title} | ${property.postcode}`,
    description: property.excerpt ?? property.description.slice(0, 160),
    alternates: { canonical: `/properties/${slug}` },
    openGraph: {
      images: property.images[0] ? [property.images[0].url] : [`/api/og?title=${encodeURIComponent(property.title)}`],
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const similar = await prisma.property.findMany({
    where: { cityId: property.cityId, published: true, id: { not: property.id } },
    take: 3,
    include: { city: true, area: true, category: true, status: true, images: { where: { isPrimary: true }, take: 1 } },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.excerpt ?? undefined,
    url: `https://tenant-care-solution.test/properties/${slug}`,
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Search", href: "/search" },
          { label: property.city.name, href: `/city/${property.city.slug}` },
          { label: property.title },
        ]}
      />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-10 grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          {/* Gallery */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-lg overflow-hidden mb-8 h-[420px]">
            {(property.images.length > 0 ? property.images : [{ id: "ph", url: propertyImage(1, exteriorTags) }])
              .slice(0, 5)
              .map((img, i) => (
                <div key={img.id} className={i === 0 ? "col-span-2 row-span-2 relative" : "relative"}>
                  <Image src={img.url} alt={property.title} fill className="object-cover" sizes="50vw" priority={i === 0} />
                </div>
              ))}
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="font-data text-xs border border-zest px-2 py-1 rounded-[var(--radius-card)]">
              {property.postcode}
            </span>
            <Badge className={property.status.name === "Available" ? "bg-available text-bone" : "bg-let-agreed text-bone"}>
              {property.status.name.toUpperCase()}
            </Badge>
          </div>
          <p className="font-data text-3xl mb-1">
            £{Number(property.price).toLocaleString("en-GB")} <span className="text-lg text-moss">{property.pricePeriod}</span>
          </p>
          <h1 className="text-2xl md:text-3xl mb-2">{property.title}</h1>
          <p className="text-moss flex items-center gap-1.5 mb-6">
            <MapPin className="size-4" />
            {property.addressLine1}{property.area ? `, ${property.area.name}` : ""}, {property.city.name}
          </p>

          <div className="flex flex-wrap gap-6 border-y border-sand py-4 mb-8 font-data text-sm">
            <span className="flex items-center gap-1.5"><Bed className="size-4" /> {property.bedrooms} bed</span>
            <span className="flex items-center gap-1.5"><Bath className="size-4" /> {property.bathrooms} bath</span>
            {property.furnishing && (
              <span className="flex items-center gap-1.5"><Sofa className="size-4" /> {property.furnishing.replace("_", " ").toLowerCase()}</span>
            )}
            {property.sizeSqft && <span className="flex items-center gap-1.5"><Ruler className="size-4" /> {property.sizeSqft} sqft</span>}
            {property.availableFrom && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" /> Available {new Date(property.availableFrom).toLocaleDateString("en-GB")}
              </span>
            )}
          </div>

          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-ink/90 max-w-[68ch] mb-8">{property.description}</p>

          {property.features.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {property.features.map((f) => (
                  <span key={f.id} className="text-xs bg-sand px-2.5 py-1 rounded-[var(--radius-card)]">{f.name}</span>
                ))}
              </div>
            </>
          )}

          <h2 className="text-xl font-semibold mb-3">Location</h2>
          <div className="rounded-lg border border-sand bg-sand/40 h-64 flex items-center justify-center text-moss text-sm mb-8">
            Map placeholder — {property.postcode}
          </div>

          {similar.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Similar listings</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {similar.map((p) => (
                  <PropertyCard
                    key={p.slug}
                    property={{
                      slug: p.slug, title: p.title, postcode: p.postcode, price: Number(p.price),
                      pricePeriod: p.pricePeriod, bedrooms: p.bedrooms, bathrooms: p.bathrooms,
                      categoryName: p.category.name, areaName: p.area?.name, cityName: p.city.name,
                      statusName: p.status.name, imageUrl: p.images[0]?.url,
                    } satisfies PropertyCardData}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {property.agent && (
            <div className="rounded-lg border border-sand bg-white p-5 flex flex-col items-center text-center gap-2">
              <div className="size-16 rounded-full bg-sand overflow-hidden" />
              <p className="font-display">{property.agent.name}</p>
              <p className="text-xs text-moss">Managing agent</p>
              {property.agent.phone && (
                <a href={`tel:${property.agent.phone.replace(/\s/g, "")}`} className="text-sm flex items-center gap-1.5 text-evergreen">
                  <Phone className="size-3.5" /> {property.agent.phone}
                </a>
              )}
            </div>
          )}
          <EnquiryForm source="PROPERTY_PAGE" propertyId={property.id} heading="Enquire about this property" />
        </div>
      </div>
    </main>
  );
}
