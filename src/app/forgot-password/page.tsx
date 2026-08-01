import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Forgot password | Tenant Care Solution",
  description: "Reset your Tenant Care Solution account password.",
  alternates: { canonical: "/forgot-password" },
  robots: { index: false, follow: true },
  openGraph: { images: ["/api/og?title=Forgot+password"] },
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Forgot password" }]} />
        <div className="rounded-lg border border-sand bg-white p-6 mt-8">
          <h1 className="text-2xl mb-1">Reset your password</h1>
          <p className="text-sm text-moss mb-6">
            Enter the email on your account and we&apos;ll send a link to reset your password.
          </p>
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full bg-evergreen hover:bg-moss">Send reset link</Button>
          </form>
          <p className="text-sm text-moss mt-6 text-center">
            <Link href="/login" className="text-evergreen hover:underline">Back to log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
