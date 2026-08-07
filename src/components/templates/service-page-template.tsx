import Link from "next/link";
import { Breadcrumb, type Crumb } from "@/components/breadcrumb";
import { EnquiryForm } from "@/components/enquiry-form";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PhoneCall, type LucideIcon } from "lucide-react";
import { propertyImage, exteriorTags, livingRoomTags } from "@/lib/property-image";

export type FeatureItem = { icon: LucideIcon; title: string; body: string };
export type ProcessStep = { title: string; body: string };
export type SplitBlock = { heading: string; body: string; checklist: string[]; imageSeed: number };
export type StatItem = { value: string; label: string };
export type FaqItem = { question: string; answer: string };
export type RelatedLink = { title: string; href: string; blurb: string };

export type ServicePageContent = {
  breadcrumb: Crumb[];
  eyebrow: string;
  title: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  heroImageSeed: number;
  intro: string[];
  features: FeatureItem[];
  processSteps?: ProcessStep[];
  splitBlocks?: SplitBlock[];
  stats?: StatItem[];
  faqs: FaqItem[];
  relatedLinks: RelatedLink[];
  ctaHeadline?: string;
};

export function ServicePageTemplate({ content }: { content: ServicePageContent }) {
  const {
    breadcrumb, eyebrow, title, subhead, primaryCta, secondaryCta,
    heroImageSeed, intro, features, processSteps, splitBlocks, stats,
    faqs, relatedLinks, ctaHeadline,
  } = content;

  return (
    <main className="flex-1">
      <Breadcrumb items={breadcrumb} />

      {/* Hero */}
      <section className="bg-evergreen text-bone">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-data text-xs uppercase tracking-wide text-zest mb-3">{eyebrow}</p>
            <h1 className="text-3xl md:text-5xl mb-4 max-w-xl">{title}</h1>
            <p className="text-bone/80 text-lg max-w-lg mb-8">{subhead}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-zest text-ink hover:bg-zest/90" asChild>
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              {secondaryCta && (
                <Button size="lg" variant="outline" className="border-bone text-bone hover:bg-bone hover:text-evergreen" asChild>
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="rounded-lg overflow-hidden aspect-4/3">
            <img
              src={propertyImage(heroImageSeed, exteriorTags, 900, 700)}
              alt=""
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-[68ch] flex flex-col gap-5 text-ink/90 text-lg">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-sand/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className={`grid gap-8 ${features.length > 3 ? "md:grid-cols-3" : "md:grid-cols-3"}`}>
            {features.map((f) => (
              <div key={f.title} className="flex flex-col gap-3">
                <f.icon className="size-6 text-evergreen" />
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-moss">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      {processSteps && processSteps.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl mb-12 md:mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-2">
                <span className="font-data text-3xl text-zest">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-moss">{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Split blocks */}
      {splitBlocks?.map((block, i) => (
        <section key={block.heading} className={i % 2 === 1 ? "bg-sand/40" : ""}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="rounded-lg overflow-hidden aspect-4/3">
                <img
                  src={propertyImage(block.imageSeed, livingRoomTags, 800, 600)}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <h3 className="text-2xl mb-3">{block.heading}</h3>
              <p className="text-moss mb-5">{block.body}</p>
              <ul className="flex flex-col gap-2">
                {block.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-zest mt-1">&#9679;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Stats */}
      {stats && stats.length > 0 && (
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
      )}

      {/* FAQ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl mb-12 md:mb-16">Common questions</h2>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-moss">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Related links */}
      <section className="bg-sand/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl mb-12 md:mb-16">Related services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-sand bg-white p-6 hover:border-evergreen transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                <p className="text-sm text-moss">{link.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + enquiry form */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl mb-4">{ctaHeadline ?? "Talk to someone before you decide"}</h2>
          <Button size="lg" className="bg-evergreen hover:bg-moss w-fit" asChild>
            <a href="tel:+447428409407">
              <PhoneCall className="size-4" />
              Call +44 7428409407
            </a>
          </Button>
        </div>
        <EnquiryForm source="CONTACT_FORM" heading="Ask about this service" />
      </section>
    </main>
  );
}
