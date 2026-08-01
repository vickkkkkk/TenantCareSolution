import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { landlordServices } from "@/content/landlord-services";

const content = landlordServices["property-maintenance"];

export const metadata: Metadata = {
  title: "Property maintenance | Landlord services",
  description: "A vetted contractor network for repairs, compliance certificates and larger refurbishment work.",
  alternates: { canonical: "/landlords/property-maintenance" },
  openGraph: { images: ["/api/og?title=Property+maintenance"] },
};

export default function PropertyMaintenancePage() {
  return <ServicePageTemplate content={content} />;
}
