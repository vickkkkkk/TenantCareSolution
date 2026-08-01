import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Tenant Care Solution",
  description: "Create a tenant, landlord or agent account.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: true },
  openGraph: { images: ["/api/og?title=Register"] },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
