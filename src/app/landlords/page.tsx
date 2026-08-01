import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { landlordHub } from "@/content/landlord-services";

export const metadata: Metadata = {
  title: "Landlord services | Tenant Care Solution",
  description:
    "Tenant find, letting agency, full management, HMO and maintenance services for landlords across the UK.",
  alternates: { canonical: "/landlords" },
  openGraph: { images: ["/api/og?title=Landlord+services"] },
};

export default function LandlordsPage() {
  return <ServicePageTemplate content={landlordHub} />;
}
