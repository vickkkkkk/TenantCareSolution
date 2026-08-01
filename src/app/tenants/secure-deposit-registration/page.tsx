import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { tenantServices } from "@/content/tenant-services";

const content = tenantServices["secure-deposit-registration"];

export const metadata: Metadata = {
  title: "Secure deposit registration | Tenant services",
  description: "How your tenancy deposit is protected with a government-approved scheme, and how to check it yourself.",
  alternates: { canonical: "/tenants/secure-deposit-registration" },
  openGraph: { images: ["/api/og?title=Secure+deposit+registration"] },
};

export default function SecureDepositRegistrationPage() {
  return <ServicePageTemplate content={content} />;
}
