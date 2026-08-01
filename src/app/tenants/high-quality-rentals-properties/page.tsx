import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { tenantServices } from "@/content/tenant-services";

const content = tenantServices["high-quality-rentals-properties"];

export const metadata: Metadata = {
  title: "High-quality rental properties | Tenant services",
  description: "The minimum standard every property has to meet before it's listed — real photos, accurate details, valid certificates.",
  alternates: { canonical: "/tenants/high-quality-rentals-properties" },
  openGraph: { images: ["/api/og?title=High-quality+rental+properties"] },
};

export default function HighQualityRentalsPropertiesPage() {
  return <ServicePageTemplate content={content} />;
}
