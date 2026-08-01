"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb } from "@/components/breadcrumb";
import { Home, Building2, Briefcase, Check } from "lucide-react";

const userTypes = [
  { value: "TENANT", label: "Tenant", body: "Search for a rental and register for alerts.", icon: Home },
  { value: "LANDLORD", label: "Landlord", body: "List a property or manage an existing one.", icon: Building2 },
  { value: "AGENT", label: "Agent", body: "Manage listings on behalf of landlords.", icon: Briefcase },
];

export default function RegisterPage() {
  const [type, setType] = useState<string | null>(null);

  return (
    <main className="flex-1 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Register" }]} />
        <div className="rounded-lg border border-sand bg-white p-6 mt-8">
          <h1 className="text-2xl mb-1">Create an account</h1>
          <p className="text-sm text-moss mb-6">Tell us which you are first — the account is set up differently for each.</p>

          <div className="grid gap-3 mb-6">
            {userTypes.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={`flex items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                  type === t.value ? "border-evergreen bg-evergreen/5" : "border-sand hover:border-moss"
                }`}
              >
                <t.icon className="size-5 text-evergreen shrink-0" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{t.label}</span>
                  <span className="block text-xs text-moss">{t.body}</span>
                </span>
                {type === t.value && <Check className="size-4 text-evergreen" />}
              </button>
            ))}
          </div>

          {type && (
            <form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required className="mt-1.5" />
              </div>
              <Button type="submit" className="w-full bg-evergreen hover:bg-moss">
                Create {type.toLowerCase()} account
              </Button>
            </form>
          )}

          <p className="text-sm text-moss mt-6 text-center">
            Already have an account? <Link href="/login" className="text-evergreen hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
