import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Compare listings | Tenant Care Solution",
  description: "Compare up to four properties side by side on price, size and features.",
  alternates: { canonical: "/compare" },
  robots: { index: false, follow: true },
  openGraph: { images: ["/api/og?title=Compare+listings"] },
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const sp = await searchParams;
  const slugs = (sp.ids ?? "").split(",").filter(Boolean).slice(0, 4);

  const properties = slugs.length
    ? await prisma.property.findMany({
        where: { slug: { in: slugs } },
        include: { city: true, area: true, category: true, status: true, features: true, images: { where: { isPrimary: true }, take: 1 } },
      })
    : [];

  const rows: { label: string; render: (p: (typeof properties)[number]) => React.ReactNode }[] = [
    { label: "Price", render: (p) => `£${Number(p.price).toLocaleString("en-GB")} ${p.pricePeriod}` },
    { label: "Postcode", render: (p) => p.postcode },
    { label: "Bedrooms", render: (p) => p.bedrooms },
    { label: "Bathrooms", render: (p) => p.bathrooms },
    { label: "Category", render: (p) => p.category.name },
    { label: "Furnishing", render: (p) => p.furnishing?.replace("_", " ").toLowerCase() ?? "—" },
    { label: "Size", render: (p) => (p.sizeSqft ? `${p.sizeSqft} sqft` : "—") },
    { label: "Status", render: (p) => p.status.name },
    { label: "Features", render: (p) => p.features.map((f) => f.name).join(", ") || "—" },
  ];

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl mb-6">Compare listings</h1>

        {properties.length === 0 ? (
          <p className="text-moss">
            No properties selected yet. Add up to four from the{" "}
            <Link href="/search" className="text-evergreen underline">search page</Link> to compare them here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-3"></th>
                  {properties.map((p) => (
                    <th key={p.id} className="p-3 align-top">
                      <Link href={`/properties/${p.slug}`} className="flex flex-col gap-2">
                        <div className="relative aspect-4/3 rounded-[var(--radius-card)] overflow-hidden bg-sand">
                          {p.images[0] && <Image src={p.images[0].url} alt="" fill className="object-cover" />}
                        </div>
                        <span className="font-display text-sm line-clamp-2">{p.title}</span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-sand">
                    <td className="p-3 font-data text-xs uppercase text-moss">{row.label}</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">{row.render(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
