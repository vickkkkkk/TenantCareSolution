import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { landlordServices } from "@/content/landlord-services";

const content = landlordServices["residential-management"];

export const metadata: Metadata = {
  title: "Residential management | Landlord services",
  description: "Full property management — rent, repairs, inspections and compliance handled end to end.",
  alternates: { canonical: "/landlords/residential-management" },
  openGraph: { images: ["/api/og?title=Residential+management"] },
};

export default function ResidentialManagementPage() {
  return <ServicePageTemplate content={content} />;
}
