import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { landlordServices } from "@/content/landlord-services";

const content = landlordServices["hmo-management"];

export const metadata: Metadata = {
  title: "HMO management | Landlord services",
  description: "Licensing, fire safety compliance and room-by-room tenancy admin for houses in multiple occupation.",
  alternates: { canonical: "/landlords/hmo-management" },
  openGraph: { images: ["/api/og?title=HMO+management"] },
};

export default function HmoManagementPage() {
  return <ServicePageTemplate content={content} />;
}
