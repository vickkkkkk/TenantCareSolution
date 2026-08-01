import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/templates/legal-page-template";
import { legalPages } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookie policy | Tenant Care Solution",
  description: "How Tenant Care Solution uses cookies, and how to manage your preferences.",
  alternates: { canonical: "/cookies" },
  openGraph: { images: ["/api/og?title=Cookie+policy"] },
};

export default function CookiesPage() {
  return <LegalPageTemplate content={legalPages.cookies} />;
}
