import type { Metadata } from "next";
import { MortgagePageTemplate } from "@/components/templates/mortgage-page-template";
import { mortgagePages } from "@/content/mortgage-pages";

const content = mortgagePages["first-time-landlord"];

export const metadata: Metadata = {
  title: "First-time landlord mortgages | Mortgage advice",
  description: "Buy-to-let mortgage criteria and process for landlords buying their first rental property.",
  alternates: { canonical: "/mortgage/first-time-landlord" },
  openGraph: { images: ["/api/og?title=First-time+landlord+mortgages"] },
};

export default function FirstTimeLandlordMortgagePage() {
  return <MortgagePageTemplate content={content} />;
}
