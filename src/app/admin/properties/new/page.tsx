import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { PropertyForm } from "@/components/property-form";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function NewPropertyPage() {
  const [cities, categories, statuses, agents, features] = await Promise.all([
    prisma.city.findMany({ include: { areas: true }, orderBy: { name: "asc" } }),
    prisma.category.findMany({ where: { parentId: { not: null } }, orderBy: { name: "asc" } }),
    prisma.status.findMany({ orderBy: { name: "asc" } }),
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
    prisma.feature.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Admin" }, { label: "Properties", href: "/admin/properties" }, { label: "New" }]} />
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        <h1 className="text-3xl mb-10">New property</h1>
        <PropertyForm options={{ cities, categories, statuses, agents, features }} />
      </section>
    </main>
  );
}
