import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Tenant services",
  description: "Register your rental criteria and get alerted before matching properties go public.",
  alternates: { canonical: "/tenants/register" },
  openGraph: { images: ["/api/og?title=Register"] },
};

export default function TenantRegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
