import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/templates/legal-page-template";
import { legalPages } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of use | Tenant Care Solution",
  description: "The terms of use for browsing and using the Tenant Care Solution website.",
  alternates: { canonical: "/terms" },
  openGraph: { images: ["/api/og?title=Terms+of+use"] },
};

export default function TermsPage() {
  return <LegalPageTemplate content={legalPages.terms} />;
}
