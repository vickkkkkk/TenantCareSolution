import type { Metadata } from "next";
import { MortgagePageTemplate } from "@/components/templates/mortgage-page-template";
import { mortgagePages } from "@/content/mortgage-pages";

const content = mortgagePages.remortgage;

export const metadata: Metadata = {
  title: "Remortgage advice | Mortgage advice",
  description: "Remortgaging before your current rate ends — product transfers, equity release and full remortgages.",
  alternates: { canonical: "/mortgage/remortgage" },
  openGraph: { images: ["/api/og?title=Remortgage+advice"] },
};

export default function RemortgagePage() {
  return <MortgagePageTemplate content={content} />;
}
