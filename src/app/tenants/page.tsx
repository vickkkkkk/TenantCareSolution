import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { tenantHub } from "@/content/tenant-services";

export const metadata: Metadata = {
  title: "Tenant services | Tenant Care Solution",
  description: "Search rentals by postcode, register for alerts, and find shared or student accommodation.",
  alternates: { canonical: "/tenants" },
  openGraph: { images: ["/api/og?title=Tenant+services"] },
};

export default function TenantsPage() {
  return <ServicePageTemplate content={tenantHub} />;
}
