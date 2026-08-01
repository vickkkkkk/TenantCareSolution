import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { landlordServices } from "@/content/landlord-services";

const content = landlordServices["find-a-tenant"];

export const metadata: Metadata = {
  title: "Find a tenant | Landlord services",
  description: "Marketing, viewings and referencing to find a reliable tenant, without giving up control of the tenancy.",
  alternates: { canonical: "/landlords/find-a-tenant" },
  openGraph: { images: ["/api/og?title=Find+a+tenant"] },
};

export default function FindATenantPage() {
  return <ServicePageTemplate content={content} />;
}
