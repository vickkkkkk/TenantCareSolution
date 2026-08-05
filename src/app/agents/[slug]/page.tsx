import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { PropertyCard, type PropertyCardData } from "@/components/property-card";
import { AgentAvatar } from "@/components/agent-avatar";
import { Phone, Mail } from "lucide-react";

async function getAgent(slug: string) {
  return prisma.agent.findUnique({
    where: { slug },
    include: {
      properties: {
        where: { published: true },
        include: { city: true, area: true, category: true, status: true, images: { where: { isPrimary: true }, take: 1 } },
      },
    },
  });
}

export async function generateStaticParams() {
  const agents = await prisma.agent.findMany({ select: { slug: true } });
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgent(slug);
  if (!agent) return {};
  return {
    title: `${agent.name} | Agents`,
    description: agent.bio ?? `Listings managed by ${agent.name}.`,
    alternates: { canonical: `/agents/${slug}` },
    openGraph: { images: [`/api/og?title=${encodeURIComponent(agent.name)}`] },
  };
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = await getAgent(slug);
  if (!agent) notFound();

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Agents", href: "/agents" }, { label: agent.name }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-[240px_1fr] gap-10">
        <div className="flex flex-col items-center text-center gap-3">
          <AgentAvatar name={agent.name} photo={agent.photo} size={128} />
          <h1 className="text-2xl">{agent.name}</h1>
          {agent.jobTitle && <p className="text-sm text-evergreen font-medium">{agent.jobTitle}</p>}
          {agent.licence && <p className="text-xs font-data text-moss">Licence {agent.licence}</p>}
          {agent.phone && (
            <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="text-sm flex items-center gap-1.5 text-evergreen">
              <Phone className="size-3.5" /> {agent.phone}
            </a>
          )}
          {agent.email && (
            <a href={`mailto:${agent.email}`} className="text-sm flex items-center gap-1.5 text-evergreen">
              <Mail className="size-3.5" /> {agent.email}
            </a>
          )}
        </div>

        <div>
          {agent.bio && <p className="text-ink/90 max-w-[68ch] mb-10">{agent.bio}</p>}
          <h2 className="text-xl font-semibold mb-4">Live listings from {agent.name}</h2>
          {agent.properties.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {agent.properties.map((p) => (
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
          ) : (
            <p className="text-moss">No live listings from this agent right now.</p>
          )}
        </div>
      </section>
    </main>
  );
}
