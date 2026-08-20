import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { AgentEditor } from "@/components/agent-editor";
import { NewAgentForm } from "@/components/new-agent-form";
import { byAgentSeniority } from "@/lib/agent-rank";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminAgentsPage() {
  const agents = byAgentSeniority(await prisma.agent.findMany());

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Admin" }, { label: "Agent photos" }]} />
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        <h1 className="text-3xl mb-2">Agents</h1>
        <p className="text-moss mb-10">
          Add or edit team members — name, job title, bio and photo all save straight to the site, no file system
          access needed.
        </p>
        <div className="flex flex-col gap-4">
          {agents.map((agent) => (
            <AgentEditor
              key={agent.id}
              agentId={agent.id}
              name={agent.name}
              jobTitle={agent.jobTitle}
              bio={agent.bio}
              photo={agent.photo}
            />
          ))}
          <NewAgentForm />
        </div>
      </section>
    </main>
  );
}
