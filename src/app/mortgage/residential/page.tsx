import type { Metadata } from "next";
import { MortgagePageTemplate } from "@/components/templates/mortgage-page-template";
import { mortgagePages } from "@/content/mortgage-pages";

const content = mortgagePages.residential;

export const metadata: Metadata = {
  title: "Residential mortgages | Mortgage advice",
  description: "Mortgage advice for landlords buying or remortgaging their own home, including let-to-buy.",
  alternates: { canonical: "/mortgage/residential" },
  openGraph: { images: ["/api/og?title=Residential+mortgages"] },
};

export default function ResidentialMortgagePage() {
  return <MortgagePageTemplate content={content} />;
}
