import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { landlordServices } from "@/content/landlord-services";

const content = landlordServices["letting-agency"];

export const metadata: Metadata = {
  title: "Letting agency | Landlord services",
  description: "Rent collection, arrears chasing and tenancy admin, without full property management.",
  alternates: { canonical: "/landlords/letting-agency" },
  openGraph: { images: ["/api/og?title=Letting+agency"] },
};

export default function LettingAgencyPage() {
  return <ServicePageTemplate content={content} />;
}
