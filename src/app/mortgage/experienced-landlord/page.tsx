import type { Metadata } from "next";
import { MortgagePageTemplate } from "@/components/templates/mortgage-page-template";
import { mortgagePages } from "@/content/mortgage-pages";

const content = mortgagePages["experienced-landlord"];

export const metadata: Metadata = {
  title: "Experienced landlord mortgages | Mortgage advice",
  description: "Lending that reflects an established letting track record, with access to a wider lender panel.",
  alternates: { canonical: "/mortgage/experienced-landlord" },
  openGraph: { images: ["/api/og?title=Experienced+landlord+mortgages"] },
};

export default function ExperiencedLandlordMortgagePage() {
  return <MortgagePageTemplate content={content} />;
}
