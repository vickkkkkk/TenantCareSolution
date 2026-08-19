import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyDeleteButton } from "@/components/property-delete-button";
import { Plus, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { city: true, status: true, agent: true, images: { where: { isPrimary: true }, take: 1 } },
  });

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Admin" }, { label: "Properties" }]} />
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl mb-1">Properties</h1>
            <p className="text-moss text-sm">{properties.length} total, {properties.filter((p) => p.published).length} published</p>
          </div>
          <Button className="bg-evergreen hover:bg-moss" asChild>
            <Link href="/admin/properties/new"><Plus className="size-4" /> New property</Link>
          </Button>
        </div>

        <div className="rounded-lg border border-sand bg-white overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/60 font-data uppercase text-xs">
              <tr>
                <th className="p-3">Property</th>
                <th className="p-3">City</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Live</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-t border-sand">
                  <td className="p-3 max-w-[240px]">
                    <p className="font-medium line-clamp-1">{p.title}</p>
                    <p className="text-xs text-moss font-data">{p.postcode}</p>
                  </td>
                  <td className="p-3">{p.city.name}</td>
                  <td className="p-3 font-data">£{Number(p.price).toLocaleString("en-GB")} {p.pricePeriod}</td>
                  <td className="p-3">{p.status.name}</td>
                  <td className="p-3">{p.agent?.name ?? "—"}</td>
                  <td className="p-3">
                    <Badge className={p.published ? "bg-available text-bone" : "bg-sand text-ink/70"}>
                      {p.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/admin/properties/${p.id}/edit`}><Pencil className="size-3.5" /></Link>
                      </Button>
                      <PropertyDeleteButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-moss">No properties yet — add your first one.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
