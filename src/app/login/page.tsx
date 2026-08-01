import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Log in | Tenant Care Solution",
  description: "Log in to manage your properties, saved searches and enquiries.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
  openGraph: { images: ["/api/og?title=Log+in"] },
};

export default function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Log in" }]} />
        <div className="rounded-lg border border-sand bg-white p-6 mt-8">
          <h1 className="text-2xl mb-1">Log in</h1>
          <p className="text-sm text-moss mb-6">Access your dashboard, saved searches and enquiries.</p>
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="mt-1.5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-evergreen hover:underline">Forgot it?</Link>
              </div>
              <Input id="password" type="password" required className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full bg-evergreen hover:bg-moss">Log in</Button>
          </form>
          <p className="text-sm text-moss mt-6 text-center">
            No account yet? <Link href="/register" className="text-evergreen hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
