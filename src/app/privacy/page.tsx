import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/templates/legal-page-template";
import { legalPages } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy | Tenant Care Solution",
  description: "How Tenant Care Solution collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy" },
  openGraph: { images: ["/api/og?title=Privacy+policy"] },
};

export default function PrivacyPage() {
  return <LegalPageTemplate content={legalPages.privacy} />;
}
