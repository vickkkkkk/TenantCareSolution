import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { landlordServices } from "@/content/landlord-services";

const content = landlordServices["vacant-property-management"];

export const metadata: Metadata = {
  title: "Vacant property management | Landlord services",
  description: "Regular inspections and security checks for empty properties between tenancies or awaiting sale.",
  alternates: { canonical: "/landlords/vacant-property-management" },
  openGraph: { images: ["/api/og?title=Vacant+property+management"] },
};

export default function VacantPropertyManagementPage() {
  return <ServicePageTemplate content={content} />;
}
