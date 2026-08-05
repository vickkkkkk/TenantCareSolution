import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { AgentPhotoUploader } from "@/components/agent-photo-uploader";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminAgentsPage() {
  const agents = await prisma.agent.findMany({ orderBy: { name: "asc" } });

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Admin" }, { label: "Agent photos" }]} />
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        <h1 className="text-3xl mb-2">Agent photos</h1>
        <p className="text-moss mb-10">
          Upload a headshot for each team member. It saves straight to storage and updates the site immediately —
          no file system access needed.
        </p>
        <div className="flex flex-col gap-4">
          {agents.map((agent) => (
            <AgentPhotoUploader
              key={agent.id}
              agentId={agent.id}
              name={agent.name}
              jobTitle={agent.jobTitle}
              photo={agent.photo}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
