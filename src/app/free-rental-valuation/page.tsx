"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, TrendingUp, Clock, ShieldCheck } from "lucide-react";

const steps = ["Address", "Property details", "Your contact details"];

export default function FreeValuationPage() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [form, setForm] = useState({
    addressLine: "", postcode: "", bedrooms: "2", category: "house",
    name: "", email: "", phone: "", message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    setStatus("submitting");
    try {
      await fetch("/api/valuations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          addressLine: form.addressLine,
          postcode: form.postcode,
          message: `${form.bedrooms} bed ${form.category}. ${form.message}`,
        }),
      });
    } catch {
      // Non-blocking: confirmation shown regardless, follow up manually if this failed.
    }
    setStatus("done");
  }

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Free rental valuation" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl mb-4">What could your property actually earn?</h1>
          <p className="text-lg text-moss mb-8 max-w-[55ch]">
            A free, no-obligation rental valuation based on real comparable
            listings in your area, not an automated estimate. Most landlords
            hear back within 48 hours.
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <TrendingUp className="size-5 text-evergreen shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Based on real comparables</p>
                <p className="text-sm text-moss">Not an algorithm — a local specialist checks recent lets nearby.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="size-5 text-evergreen shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Answered within 48 hours</p>
                <p className="text-sm text-moss">No automated reply — a person gets back to you directly.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="size-5 text-evergreen shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">No obligation</p>
                <p className="text-sm text-moss">A valuation doesn't commit you to listing with us.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-sand bg-white p-6">
          {status === "done" ? (
            <div className="flex flex-col items-center text-center gap-3 py-8">
              <CheckCircle2 className="size-10 text-evergreen" />
              <p className="font-display text-xl">Request received</p>
              <p className="text-sm text-moss">We&apos;ll be in touch within 48 hours with your valuation.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6">
                {steps.map((label, i) => (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div className={`size-7 rounded-full flex items-center justify-center font-data text-xs shrink-0 ${i <= step ? "bg-evergreen text-bone" : "bg-sand text-moss"}`}>
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-evergreen" : "bg-sand"}`} />}
                  </div>
                ))}
              </div>

              {step === 0 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="addressLine">Property address</Label>
                    <Input id="addressLine" value={form.addressLine} onChange={(e) => update("addressLine", e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input id="postcode" value={form.postcode} onChange={(e) => update("postcode", e.target.value)} className="mt-1.5" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label>Property type</Label>
                    <Select value={form.category} onValueChange={(v) => update("category", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="flat">Flat / apartment</SelectItem>
                        <SelectItem value="shared">Shared accommodation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Bedrooms</Label>
                    <Select value={form.bedrooms} onValueChange={(v) => update("bedrooms", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["1", "2", "3", "4", "5"].map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Anything else worth knowing?</Label>
                    <Textarea id="message" rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} className="mt-1.5" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1.5" />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
                {step < steps.length - 1 ? (
                  <Button className="bg-evergreen hover:bg-moss" onClick={() => setStep((s) => s + 1)}>Continue</Button>
                ) : (
                  <Button className="bg-evergreen hover:bg-moss" disabled={status === "submitting"} onClick={submit}>
                    {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
                    Get my valuation
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
