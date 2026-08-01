import type { Metadata } from "next";
import { MortgagePageTemplate } from "@/components/templates/mortgage-page-template";
import { mortgagePages } from "@/content/mortgage-pages";

const content = mortgagePages.portfolio;

export const metadata: Metadata = {
  title: "Portfolio landlord mortgages | Mortgage advice",
  description: "Financing structured across four or more mortgaged buy-to-let properties, including limited company lending.",
  alternates: { canonical: "/mortgage/portfolio" },
  openGraph: { images: ["/api/og?title=Portfolio+mortgages"] },
};

export default function PortfolioMortgagePage() {
  return <MortgagePageTemplate content={content} />;
}
