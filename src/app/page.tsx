import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyCard, type PropertyCardData } from "@/components/property-card";
import { Search, ShieldCheck, Clock, PhoneCall } from "lucide-react";

export const revalidate = 60;

async function getHomeData() {
  const [cities, listings, testimonials, categories] = await Promise.all([
    prisma.city.findMany({ orderBy: { listingCount: "desc" }, take: 6 }),
    prisma.property.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        city: true,
        area: true,
        category: true,
        status: true,
        images: { where: { isPrimary: true }, take: 1 },
      },
    }),
    prisma.testimonial.findMany({ where: { published: true }, take: 6 }),
    prisma.category.findMany({ where: { parentId: { not: null } }, orderBy: { name: "asc" } }),
  ]);

  return { cities, listings, testimonials, categories };
}

function toCardData(p: Awaited<ReturnType<typeof getHomeData>>["listings"][number]): PropertyCardData {
  return {
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
  };
}

export default async function Home() {
  const { cities, listings, testimonials, categories } = await getHomeData();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-evergreen text-bone">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl max-w-2xl">
            Let your property. Then stop thinking about it.
          </h1>
          <p className="mt-4 max-w-xl text-bone/80 text-lg">
            Hands-on lettings and management for landlords, and a rental
            search that actually narrows down by postcode for tenants.
          </p>

          <form
            action="/search"
            className="mt-8 bg-bone rounded-[var(--radius-card)] p-3 flex flex-col sm:flex-row gap-2 max-w-2xl"
          >
            <Select name="category">
              <SelectTrigger className="sm:w-56 bg-white text-ink">
                <SelectValue placeholder="Any category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="q"
              placeholder="Search by postcode, area or keyword"
              className="bg-white text-ink flex-1"
            />
            <Button type="submit" className="bg-zest text-ink hover:bg-zest/90">
              <Search className="size-4" />
              Search properties
            </Button>
          </form>
        </div>
      </section>

      {/* Browse by city */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
        <h2 className="text-2xl md:text-3xl mb-6">Browse by city</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/city/${city.slug}`}
              className="group relative flex flex-col justify-end h-32 rounded-[var(--radius-card)] border border-sand bg-sand p-4 overflow-hidden hover:border-evergreen transition-colors"
            >
              <span className="font-display text-xl group-hover:text-evergreen">{city.name}</span>
              <span className="font-data text-xs text-moss">{city.listingCount} listings</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newest listings */}
      <section className="bg-white border-y border-sand">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-14">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl">Newest listings</h2>
            <Link href="/search" className="text-sm text-moss hover:text-evergreen font-medium">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {listings.map((property) => (
              <PropertyCard key={property.id} property={toCardData(property)} />
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid md:grid-cols-2 gap-6">
        <div className="rounded-[var(--radius-card)] border border-sand p-8 bg-white">
          <h3 className="text-2xl mb-2">For landlords</h3>
          <p className="text-moss mb-6">
            Full management, let-only, or anything in between — one point of
            contact and a monthly statement that actually reconciles.
          </p>
          <Button variant="outline" asChild>
            <Link href="/landlords">See landlord services</Link>
          </Button>
        </div>
        <div className="rounded-[var(--radius-card)] border border-sand p-8 bg-white">
          <h3 className="text-2xl mb-2">For tenants</h3>
          <p className="text-moss mb-6">
            Filter down to the postcode you actually want to live in, not a
            borough-wide guess. Register once, get alerted first.
          </p>
          <Button variant="outline" asChild>
            <Link href="/tenants/find-a-rental-property">Find a rental</Link>
          </Button>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-sand/40">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <Clock className="size-6 text-evergreen" />
            <h3 className="text-lg font-semibold">Repairs booked before you hear about them</h3>
            <p className="text-sm text-moss">
              Maintenance requests get triaged the same day, with a
              contractor booked before the tenant has to chase.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <PhoneCall className="size-6 text-evergreen" />
            <h3 className="text-lg font-semibold">A person picks up, every time</h3>
            <p className="text-sm text-moss">
              Every account has a named contact, not a ticket queue. Calls
              get returned within one working day.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <ShieldCheck className="size-6 text-evergreen" />
            <h3 className="text-lg font-semibold">Rent that lands on schedule</h3>
            <p className="text-sm text-moss">
              Landlords are paid on the same date every month, with a
              statement that matches it line for line.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
          <h2 className="text-2xl md:text-3xl mb-6">What people say</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-[var(--radius-card)] border border-sand p-6 bg-white">
                <p className="text-ink mb-3">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-data text-moss">{t.authorName}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-evergreen text-bone">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl max-w-md">
            Talk to someone before you commit to an agency.
          </h2>
          <Button size="lg" className="bg-zest text-ink hover:bg-zest/90" asChild>
            <a href="tel:+447428409407">
              <PhoneCall className="size-4" />
              Call +44 7428409407
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
