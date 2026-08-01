import { Breadcrumb, type Crumb } from "@/components/breadcrumb";
import { EnquiryForm } from "@/components/enquiry-form";
import { PropertyCard, type PropertyCardData } from "@/components/property-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";
import { propertyImage, streetTags } from "@/lib/property-image";

export type AreaPageContent = {
  breadcrumb: Crumb[];
  areaName: string;
  region: string;
  heroImageSeed: number;
  intro: string[];
  stats: { value: string; label: string }[];
  whyUs: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  listings: PropertyCardData[];
  listingCount: number;
};

const whyUsIcons = [TrendingUp, Users, ShieldCheck];

export function AreaPageTemplate({ content }: { content: AreaPageContent }) {
  const { breadcrumb, areaName, region, heroImageSeed, intro, stats, whyUs, faqs, listings, listingCount } = content;

  return (
    <main className="flex-1">
      <Breadcrumb items={breadcrumb} />

      <section className="relative bg-evergreen text-bone">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <p className="font-data text-xs uppercase tracking-wide text-zest mb-3">{region}</p>
          <h1 className="text-3xl md:text-5xl mb-4">Rentals in {areaName}</h1>
          <p className="text-bone/80 text-lg max-w-xl">
            {listingCount} live listings in {areaName}, checked and re-verified weekly.
          </p>
        </div>
        <div className="aspect-21/9 md:aspect-32/9">
          <img
            src={propertyImage(heroImageSeed, streetTags, 1600, 450)}
            alt={`${areaName} streetscape`}
            className="size-full object-cover"
          />
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-[68ch] flex flex-col gap-5 text-ink/90 text-lg mb-12 md:mb-16">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-data text-3xl text-evergreen">{s.value}</p>
              <p className="text-sm text-moss mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl mb-12 md:mb-16">
          Live listings in {areaName}
        </h2>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {listings.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        ) : (
          <p className="text-moss">
            Nothing published in {areaName} right now — save a search and we&apos;ll email you the moment something matches.
          </p>
        )}
      </section>

      <section className="bg-sand/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-3 gap-8">
          {whyUs.map((item, i) => {
            const Icon = whyUsIcons[i % whyUsIcons.length];
            return (
              <div key={item.title} className="flex flex-col gap-2">
                <Icon className="size-6 text-evergreen" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-moss">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl mb-12 md:mb-16">Questions about {areaName}</h2>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-moss">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="bg-sand/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl mb-4">Renting or letting in {areaName}?</h2>
            <p className="text-moss">Tell us what you need and we&apos;ll get back to you within one working day.</p>
          </div>
          <EnquiryForm source="CONTACT_FORM" heading={`Enquire about ${areaName}`} />
        </div>
      </section>
    </main>
  );
}
