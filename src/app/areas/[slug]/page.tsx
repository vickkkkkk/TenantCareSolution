import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AreaPageTemplate } from "@/components/templates/area-page-template";
import type { PropertyCardData } from "@/components/property-card";
import { staticAreas } from "@/content/areas";

export const revalidate = 60;

export async function generateStaticParams() {
  return Object.keys(staticAreas).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = staticAreas[slug];
  if (!area) return {};
  return {
    title: `Letting services in ${area.areaName} | Service areas`,
    description: `Local market data and letting services for ${area.areaName}, ${area.region}.`,
    alternates: { canonical: `/areas/${slug}` },
    openGraph: { images: [`/api/og?title=${encodeURIComponent(area.areaName)}`] },
  };
}

export default async function StaticAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = staticAreas[slug];
  if (!area) notFound();

  let cards: PropertyCardData[] = [];
  if (area.citySlugForListings) {
    const city = await prisma.city.findUnique({ where: { slug: area.citySlugForListings } });
    if (city) {
      const listings = await prisma.property.findMany({
        where: { cityId: city.id, published: true },
        orderBy: { createdAt: "desc" },
        take: 6,
        include: { area: true, category: true, status: true, images: { where: { isPrimary: true }, take: 1 } },
      });
      cards = listings.map((p) => ({
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
    }
  }

  return (
    <AreaPageTemplate
      content={{
        breadcrumb: [{ label: "Home", href: "/" }, { label: area.areaName }],
        areaName: area.areaName,
        region: area.region,
        heroImageSeed: area.heroImageSeed,
        intro: area.intro,
        stats: area.stats,
        whyUs: area.whyUs,
        faqs: area.faqs,
        listings: cards,
        listingCount: cards.length,
      }}
    />
  );
}
