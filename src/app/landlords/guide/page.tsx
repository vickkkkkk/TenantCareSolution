import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { EnquiryForm } from "@/components/enquiry-form";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Landlord guide | Free download",
  description: "A free guide covering compliance, tax basics and the letting process for UK landlords, start to finish.",
  alternates: { canonical: "/landlords/guide" },
  openGraph: { images: ["/api/og?title=Landlord+guide"] },
};

const chapters = [
  "Choosing between tenant find, letting agency and full management",
  "Compliance essentials: gas safety, EICR, EPC and deposit protection",
  "HMO licensing thresholds and how to check if your property needs one",
  "What to expect from referencing and right-to-rent checks",
  "Tax basics: allowable expenses, the mortgage interest relief restriction, and record-keeping",
  "Ending a tenancy correctly: Section 21 and Section 8 explained in plain terms",
];

export default function LandlordGuidePage() {
  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Landlords", href: "/landlords" }, { label: "Guide" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl mb-4">The landlord guide</h1>
          <p className="text-lg text-moss mb-8 max-w-[60ch]">
            Everything a new landlord needs before letting a property for the first
            time — compliance, tax basics and how to end a tenancy correctly, in
            one free download. Enter your details and it lands in your inbox.
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
