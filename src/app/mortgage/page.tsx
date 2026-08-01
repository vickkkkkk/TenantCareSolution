import type { Metadata } from "next";
import { MortgagePageTemplate } from "@/components/templates/mortgage-page-template";
import { mortgageHub } from "@/content/mortgage-pages";

export const metadata: Metadata = {
  title: "Mortgage advice | Tenant Care Solution",
  description: "Buy-to-let mortgage advice for first-time landlords, portfolio landlords, and everything in between.",
  alternates: { canonical: "/mortgage" },
  openGraph: { images: ["/api/og?title=Mortgage+advice"] },
};

export default function MortgagePage() {
  return <MortgagePageTemplate content={mortgageHub} />;
}
