import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { AgentAvatar } from "@/components/agent-avatar";

export const metadata: Metadata = {
  title: "Our agents | Tenant Care Solution",
  description: "Meet the agents managing listings and tenancies across every city we cover.",
  alternates: { canonical: "/agents" },
  openGraph: { images: ["/api/og?title=Our+agents"] },
};

export default async function AgentsPage() {
  const agents = await prisma.agent.findMany();

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Agents" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl mb-4">Our agents</h1>
        <p className="text-moss max-w-[60ch] mb-12 md:mb-16">
          Every listing is managed by a named agent, not a shared inbox. Here&apos;s who you&apos;ll actually be speaking to.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.slug}`}
              className="group relative overflow-hidden rounded-lg border border-sand bg-white p-6 flex flex-col items-center text-center gap-1.5 transition-all duration-300 hover:border-evergreen hover:-translate-y-1 hover:shadow-[0_12px_28px_-16px_rgba(11,31,26,0.25)]"
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-zest transition-transform duration-300 group-hover:scale-x-100" />
              <AgentAvatar name={agent.name} photo={agent.photo} size={92} className="mb-1" />
              <p className="font-display text-lg">{agent.name}</p>
              {agent.jobTitle && (
                <p className="text-xs font-data uppercase tracking-wide text-moss">{agent.jobTitle}</p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
