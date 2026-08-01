import type { Metadata } from "next";
import { MortgagePageTemplate } from "@/components/templates/mortgage-page-template";
import { mortgagePages } from "@/content/mortgage-pages";

const content = mortgagePages.commercial;

export const metadata: Metadata = {
  title: "Commercial mortgages | Mortgage advice",
  description: "Mortgage advice for mixed-use property, large HMOs and owner-occupied commercial premises.",
  alternates: { canonical: "/mortgage/commercial" },
  openGraph: { images: ["/api/og?title=Commercial+mortgages"] },
};

export default function CommercialMortgagePage() {
  return <MortgagePageTemplate content={content} />;
}
