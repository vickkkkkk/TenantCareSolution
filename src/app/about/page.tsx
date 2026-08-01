import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { ShieldCheck, Users, Building2, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About us | Tenant Care Solution",
  description: "How Tenant Care Solution started, what we stand for, and the accreditations we hold.",
  alternates: { canonical: "/about" },
  openGraph: { images: ["/api/og?title=About+us"] },
};

const timeline = [
  { year: "2014", event: "Started as a single-office lettings agency handling a few dozen properties." },
  { year: "2017", event: "Expanded into full residential management as landlords asked for more than tenant-finding." },
  { year: "2019", event: "Opened dedicated coverage in Manchester and Birmingham." },
  { year: "2022", event: "Added HMO licensing and compliance as a standalone specialism." },
  { year: "2026", event: "Rebuilt the whole platform around postcode-level search and self-serve landlord tools." },
];

const values = [
  { icon: ShieldCheck, title: "Say what we'll do, then do it", body: "No vague promises about 'excellent service' — specific commitments on response times and rent dates, held to." },
  { icon: Users, title: "One point of contact", body: "Landlords and tenants get a named person, not a rotating support queue." },
  { icon: Building2, title: "Compliance isn't optional", body: "Licensing, safety certificates and deposit protection handled properly, every time, not just when it's convenient." },
];

const stats = [
  { value: "1,200+", label: "Landlords" },
  { value: "3,400+", label: "Verified tenants" },
  { value: "5", label: "Cities covered" },
  { value: "22", label: "Agents" },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <section className="bg-evergreen text-bone">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl max-w-2xl mb-4">
            Built by people who got tired of vague lettings agencies
          </h1>
          <p className="text-bone/80 text-lg max-w-xl">
            We started as a single office frustrated with how little landlords and tenants were actually told. Everything since has been about making that information available directly, without a phone call.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl mb-12 md:mb-16">How we got here</h2>
        <div className="flex flex-col gap-8 max-w-2xl">
          {timeline.map((t) => (
            <div key={t.year} className="flex gap-6">
              <span className="font-data text-xl text-zest w-16 shrink-0">{t.year}</span>
              <p className="text-ink/90">{t.event}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-3">
              <v.icon className="size-6 text-evergreen" />
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="text-sm text-moss">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-evergreen text-bone">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-data text-4xl text-zest">{s.value}</p>
              <p className="text-sm text-bone/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl mb-8 flex items-center gap-3">
          <Award className="size-7 text-evergreen" /> Accreditations
        </h2>
        <div className="flex flex-wrap gap-4 text-sm font-data">
          {["PRS registered", "TDS deposit scheme member", "ICO registered", "Client money protection (CMP)"].map((a) => (
            <span key={a} className="border border-sand rounded-[var(--radius-card)] px-4 py-2">{a}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
