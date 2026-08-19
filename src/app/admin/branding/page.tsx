import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";
import { LogoUploader } from "@/components/logo-uploader";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminBrandingPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Admin" }, { label: "Branding" }]} />
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        <h1 className="text-3xl mb-2">Site branding</h1>
        <p className="text-moss mb-10">Upload the logo shown in the header — no file access needed, just pick it from your device.</p>
        <LogoUploader currentLogoUrl={settings?.logoUrl ?? null} />
      </section>
    </main>
  );
}
