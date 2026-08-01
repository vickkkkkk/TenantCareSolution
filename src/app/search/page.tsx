import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { PropertyCard, type PropertyCardData } from "@/components/property-card";
import { SearchFilters } from "@/components/search-filters";
import type { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Search rentals | Tenant Care Solution",
  description: "Search live UK rental listings by postcode, price, bedrooms, category and status.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
  openGraph: { images: ["/api/og?title=Search+rentals"] },
};

type SearchParams = Record<string, string | undefined>;

const sortMap: Record<string, Prisma.PropertyOrderByWithRelationInput> = {
  price_asc: { price: "asc" },
  price_desc: { price: "desc" },
  newest: { createdAt: "desc" },
  oldest: { createdAt: "asc" },
  beds_asc: { bedrooms: "asc" },
  beds_desc: { bedrooms: "desc" },
};

async function getResults(sp: SearchParams) {
  const where: Prisma.PropertyWhereInput = { published: true };

  if (sp.city) where.city = { slug: sp.city };
  if (sp.category) where.category = { slug: sp.category };
  if (sp.status) where.status = { slug: sp.status };
  if (sp.beds && sp.beds !== "any") {
    where.bedrooms = sp.beds === "4" ? { gte: 4 } : Number(sp.beds);
  }
  if (sp.min || sp.max) {
    where.price = {
      ...(sp.min ? { gte: Number(sp.min) } : {}),
      ...(sp.max ? { lte: Number(sp.max) } : {}),
    };
  }
  if (sp.q) {
    where.OR = [
      { title: { contains: sp.q, mode: "insensitive" } },
      { postcode: { contains: sp.q, mode: "insensitive" } },
      { description: { contains: sp.q, mode: "insensitive" } },
    ];
  }

  const orderBy = (sp.sort && sortMap[sp.sort]) || { createdAt: "desc" as const };

  const [listings, cities, categories, statuses] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy,
      take: 24,
      include: { city: true, area: true, category: true, status: true, images: { where: { isPrimary: true }, take: 1 } },
    }),
    prisma.city.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
    prisma.category.findMany({ where: { parentId: { not: null } }, orderBy: { name: "asc" }, select: { slug: true, name: true } }),
    prisma.status.findMany({ select: { slug: true, name: true } }),
  ]);

  return { listings, cities, categories, statuses };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const { listings, cities, categories, statuses } = await getResults(sp);

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
    cityName: p.city.name,
    statusName: p.status.name,
    imageUrl: p.images[0]?.url,
  }));

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-10 grid md:grid-cols-[280px_1fr] gap-10">
        <aside className="md:sticky md:top-20 md:self-start">
          <Suspense>
            <SearchFilters options={{ cities, categories, statuses }} />
          </Suspense>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-moss text-sm">{cards.length} propert{cards.length === 1 ? "y" : "ies"} found</p>
          </div>

          {cards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {cards.map((p) => <PropertyCard key={p.slug} property={p} />)}
            </div>
          ) : (
            <div className="rounded-lg border border-sand bg-white p-8 text-center">
              <p className="font-display text-lg mb-2">Nothing matches those filters right now</p>
              <p className="text-sm text-moss">Try widening your price range, or save this search and we&apos;ll email you when something new fits.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
