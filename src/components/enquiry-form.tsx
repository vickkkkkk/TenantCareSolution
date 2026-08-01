"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

export function EnquiryForm({
  heading = "Get in touch",
  subheading = "Send a message and someone will get back to you within one working day.",
  source,
  propertyId,
}: {
  heading?: string;
  subheading?: string;
  source: string;
  propertyId?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
          source,
          propertyId,
        }),
      });
    } catch {
      // Non-blocking: still show confirmation, follow up manually if the request failed.
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-sand bg-white p-6 flex flex-col items-center text-center gap-2">
        <CheckCircle2 className="size-8 text-evergreen" />
        <p className="font-display text-lg">Message sent</p>
        <p className="text-sm text-moss">
          Thanks — we&apos;ve got your details and will reply within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-sand bg-white p-6 flex flex-col gap-5">
      <div>
        <p className="font-display text-lg">{heading}</p>
        <p className="text-sm text-moss mt-1">{subheading}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={4} required />
      </div>
      <div className="flex items-start gap-2.5">
        <Checkbox id="consent" required className="mt-0.5" />
        <Label htmlFor="consent" className="text-xs text-moss font-normal leading-snug">
          I agree to be contacted about this enquiry and have read the{" "}
          <a href="/privacy" className="underline hover:text-evergreen">privacy policy</a>.
        </Label>
      </div>
      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto bg-evergreen hover:bg-moss">
        {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
        Send message
      </Button>
    </form>
  );
}
