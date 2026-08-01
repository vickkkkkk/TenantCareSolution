"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";

const steps = ["Your details", "What you're looking for", "Confirm"];

export default function TenantRegisterPage() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", moveInDate: "",
    budgetMin: "", budgetMax: "", preferences: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    setStatus("submitting");
    try {
      await fetch("/api/tenant-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budgetMin: form.budgetMin || undefined,
          budgetMax: form.budgetMax || undefined,
          preferences: form.preferences ? { notes: form.preferences } : undefined,
        }),
      });
    } catch {
      // Non-blocking: confirmation still shown, follow up manually if this failed.
    }
    setStatus("done");
  }

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tenants", href: "/tenants" }, { label: "Register" }]} />
      <section className="max-w-xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <h1 className="text-3xl mb-2">Register your details</h1>
        <p className="text-moss mb-8">
          Tell us once what you&apos;re looking for and we&apos;ll alert you before matching properties go public.
        </p>

        {status === "done" ? (
          <div className="rounded-lg border border-sand bg-white p-8 flex flex-col items-center text-center gap-3">
            <CheckCircle2 className="size-10 text-evergreen" />
            <p className="font-display text-xl">You&apos;re registered</p>
            <p className="text-sm text-moss">We&apos;ll be in touch as soon as something matches what you&apos;re after.</p>
          </div>
        ) : (
          <div className="rounded-lg border border-sand bg-white p-6">
            <div className="flex items-center gap-2 mb-6">
              {steps.map((label, i) => (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div
                    className={`size-7 rounded-full flex items-center justify-center font-data text-xs shrink-0 ${
                      i <= step ? "bg-evergreen text-bone" : "bg-sand text-moss"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-evergreen" : "bg-sand"}`} />}
                </div>
              ))}
            </div>

            {step === 0 && (
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

            {step === 1 && (
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="moveIn">Ideal move-in date</Label>
                  <Input id="moveIn" type="date" value={form.moveInDate} onChange={(e) => update("moveInDate", e.target.value)} className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budgetMin">Min budget (PCM)</Label>
                    <Input id="budgetMin" type="number" value={form.budgetMin} onChange={(e) => update("budgetMin", e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="budgetMax">Max budget (PCM)</Label>
                    <Input id="budgetMax" type="number" value={form.budgetMax} onChange={(e) => update("budgetMax", e.target.value)} className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="preferences">Anything else we should know?</Label>
                  <Textarea id="preferences" rows={3} value={form.preferences} onChange={(e) => update("preferences", e.target.value)} className="mt-1.5" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-2 text-sm">
                <p><span className="text-moss">Name: </span>{form.name || "—"}</p>
                <p><span className="text-moss">Email: </span>{form.email || "—"}</p>
                <p><span className="text-moss">Phone: </span>{form.phone || "—"}</p>
                <p><span className="text-moss">Move-in: </span>{form.moveInDate || "Flexible"}</p>
                <p><span className="text-moss">Budget: </span>
                  {form.budgetMin || form.budgetMax ? `£${form.budgetMin || "0"}–£${form.budgetMax || "any"} PCM` : "Flexible"}
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button className="bg-evergreen hover:bg-moss" onClick={() => setStep((s) => s + 1)}>
                  Continue
                </Button>
              ) : (
                <Button className="bg-evergreen hover:bg-moss" disabled={status === "submitting"} onClick={submit}>
                  {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
                  Submit registration
                </Button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
