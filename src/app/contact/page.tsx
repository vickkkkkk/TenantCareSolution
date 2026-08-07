import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { EnquiryForm } from "@/components/enquiry-form";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact us | Tenant Care Solution",
  description: "Phone, email, WhatsApp and office details for Tenant Care Solution.",
  alternates: { canonical: "/contact" },
  openGraph: { images: ["/api/og?title=Contact+us"] },
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl mb-6">Get in touch</h1>
          <div className="flex flex-col gap-5 mb-10">
            <a href="tel:+447428409407" className="flex items-center gap-3 text-ink hover:text-evergreen">
              <Phone className="size-5 text-evergreen" /> +44 7428409407
            </a>
            <a href="mailto:info@tenantcaresolutions.co.uk" className="flex items-center gap-3 text-ink hover:text-evergreen">
              <Mail className="size-5 text-evergreen" /> info@tenantcaresolutions.co.uk
            </a>
            <a href="https://wa.me/447428409407" className="flex items-center gap-3 text-ink hover:text-evergreen">
              <MessageCircle className="size-5 text-evergreen" /> WhatsApp: +44 7428409407
            </a>
            <span className="flex items-center gap-3 text-ink">
              <MapPin className="size-5 text-evergreen" /> 1 Evergreen Court, London, EC1A 1AA
            </span>
            <span className="flex items-center gap-3 text-ink">
              <Clock className="size-5 text-evergreen" /> Mon–Fri, 9am–6pm
            </span>
          </div>
          <div className="rounded-lg border border-sand bg-sand/40 h-64 flex items-center justify-center text-moss text-sm">
            Map placeholder — 1 Evergreen Court, London
          </div>
        </div>
        <EnquiryForm source="CONTACT_FORM" heading="Send a message" subheading="We reply within one working day." />
      </section>
    </main>
  );
}
