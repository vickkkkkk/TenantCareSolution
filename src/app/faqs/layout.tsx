import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Tenant Care Solution",
  description: "Common questions from tenants and landlords, searchable and grouped by category.",
  alternates: { canonical: "/faqs" },
  openGraph: { images: ["/api/og?title=FAQs"] },
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
