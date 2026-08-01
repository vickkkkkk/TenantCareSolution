import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { EnquiryForm } from "@/components/enquiry-form";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Tenant guide | Free download",
  description: "A free guide to renting in the UK — documents, deposits, viewings and your rights as a tenant.",
  alternates: { canonical: "/tenants/guide" },
  openGraph: { images: ["/api/og?title=Tenant+guide"] },
};

const chapters = [
  "What documents you'll need before applying for a tenancy",
  "How referencing and right-to-rent checks actually work",
  "Deposit protection: what it means and how to check yours",
  "What to look for at a viewing that photos won't show you",
  "Your rights and your landlord's obligations during a tenancy",
  "How to end a tenancy and get your deposit back in full",
];

export default function TenantGuidePage() {
  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tenants", href: "/tenants" }, { label: "Guide" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl mb-4">The tenant guide</h1>
          <p className="text-lg text-moss mb-8 max-w-[60ch]">
            A free download covering the whole process of renting in the UK,
            from your first search through to getting your deposit back at
            the end of a tenancy. Enter your details and it lands in your inbox.
          </p>
          <ul className="flex flex-col gap-3">
            {chapters.map((c) => (
              <li key={c} className="flex items-start gap-2 text-ink/90">
                <CheckCircle2 className="size-5 text-evergreen shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <EnquiryForm
            source="CONTACT_FORM"
            heading="Get the guide"
            subheading="We'll email it straight over — no obligation, unsubscribe any time."
          />
        </div>
      </section>
    </main>
  );
}
