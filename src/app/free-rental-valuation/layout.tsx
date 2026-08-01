import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free rental valuation | Tenant Care Solution",
  description: "A free, no-obligation rental valuation based on real comparable listings in your area.",
  alternates: { canonical: "/free-rental-valuation" },
  openGraph: { images: ["/api/og?title=Free+rental+valuation"] },
};

export default function FreeValuationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
