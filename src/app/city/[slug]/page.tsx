import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AreaPageTemplate } from "@/components/templates/area-page-template";
import type { PropertyCardData } from "@/components/property-card";
import { cityPageContent } from "@/content/city-pages";

async function getCity(slug: string) {
  const city = await prisma.city.findUnique({ where: { slug } });
  if (!city) return null;

  const listings = await prisma.property.findMany({
    where: { cityId: city.id, published: true },
    orderBy: { createdAt: "desc" },
    take: 9,
    include: { area: true, category: true, status: true, images: { where: { isPrimary: true }, take: 1 } },
  });

  const agg = await prisma.property.aggregate({
    where: { cityId: city.id, published: true },
    _min: { price: true },
    _max: { price: true },
    _avg: { price: true },
  });

  return { city, listings, agg };
}

export async function generateStaticParams() {
  const cities = await prisma.city.findMany({ select: { slug: true } });
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = await prisma.city.findUnique({ where: { slug } });
  if (!city) return {};
  return {
    title: `Rentals in ${city.name} | Tenant Care Solution`,
    description: `${city.listingCount} live rental listings in ${city.name}, searchable by postcode, price and features.`,
    alternates: { canonical: `/city/${slug}` },
    openGraph: { images: [`/api/og?title=Rentals+in+${encodeURIComponent(city.name)}`] },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCity(slug);
  if (!data) notFound();

  const { city, listings, agg } = data;
  const content = cityPageContent[slug] ?? {
    intro: [`Live listings in ${city.name}, pulled directly from the database and updated as agents change them.`],
    whyUs: [],
    faqs: [],
  };

  const cards: PropertyCardData[] = listings.map((p) => ({
    slug: p.slug,
    title: p.title,
    postcode: p.postcode,
    price: Number(p.price),
    pricePeriod: p.pricePeriod,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    categoryName: p.category.name,
    areaName: p.area?.name,
    cityName: city.name,
    statusName: p.status.name,
    imageUrl: p.images[0]?.url,
  }));

  const stats = [
    { value: String(city.listingCount), label: "Live listings" },
    { value: agg._min.price ? `£${Number(agg._min.price).toLocaleString("en-GB")}` : "—", label: "Lowest current rent" },
    { value: agg._max.price ? `£${Number(agg._max.price).toLocaleString("en-GB")}` : "—", label: "Highest current rent" },
    { value: agg._avg.price ? `£${Math.round(Number(agg._avg.price)).toLocaleString("en-GB")}` : "—", label: "Average rent (PCM)" },
  ];

  return (
    <AreaPageTemplate
      content={{
        breadcrumb: [{ label: "Home", href: "/" }, { label: city.name }],
        areaName: city.name,
        region: "City",
        heroImageSeed: city.name.length * 37,
        intro: content.intro,
        stats,
        whyUs: content.whyUs,
        faqs: content.faqs,
        listings: cards,
        listingCount: city.listingCount,
      }}
    />
  );
}
