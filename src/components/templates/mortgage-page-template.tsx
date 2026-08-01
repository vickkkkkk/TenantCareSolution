"use client";

import { useState } from "react";
import { Breadcrumb, type Crumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

export type MortgagePageContent = {
  breadcrumb: Crumb[];
  title: string;
  subhead: string;
  whoItsFor: string[];
  eligibility: string[];
  rateTable: { product: string; rate: string; term: string }[];
  applicationSteps: { title: string; body: string }[];
  documents: string[];
  faqs: { question: string; answer: string }[];
};

function AffordabilityCalculator() {
  const [rent, setRent] = useState(1500);
  const [rate, setRate] = useState(5.5);
  const stressedRate = rate + 2;
  const maxLoan = Math.round(((rent * 12) / (stressedRate / 100)) * 0.8);

  return (
    <div className="rounded-lg border border-sand bg-white p-6">
      <p className="font-display text-lg mb-1">Affordability estimate</p>
      <p className="text-xs text-moss mb-5">
        A rough guide only — your lender will run its own stress test and this is not a mortgage offer.
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="rent">Expected monthly rent (£)</Label>
          <Input id="rent" type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="rate">Indicative rate (%)</Label>
          <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-1.5" />
        </div>
        <div className="rounded-md bg-sand/60 p-4">
          <p className="text-xs text-moss mb-1">Estimated maximum loan</p>
          <p className="font-data text-2xl text-evergreen">£{maxLoan.toLocaleString("en-GB")}</p>
        </div>
      </div>
    </div>
  );
}

export function MortgagePageTemplate({ content }: { content: MortgagePageContent }) {
  const { breadcrumb, title, subhead, whoItsFor, eligibility, rateTable, applicationSteps, documents, faqs } = content;

  return (
    <main className="flex-1">
      <Breadcrumb items={breadcrumb} />

      <section className="bg-evergreen text-bone">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl mb-4 max-w-2xl">{title}</h1>
          <p className="text-bone/80 text-lg max-w-xl mb-8">{subhead}</p>
          <Button size="lg" className="bg-zest text-ink hover:bg-zest/90" asChild>
            <a href="#adviser-callback">Request a callback</a>
          </Button>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl mb-4">Who this is for</h2>
          <ul className="flex flex-col gap-3">
            {whoItsFor.map((item) => (
              <li key={item} className="flex items-start gap-2 text-ink/90">
                <CheckCircle2 className="size-5 text-evergreen shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl mb-4">Eligibility criteria</h2>
          <ul className="flex flex-col gap-2 text-moss">
            {eligibility.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-zest mt-1">&#9679;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <h2 className="text-2xl mb-8">Indicative rates</h2>
          <div className="overflow-x-auto rounded-lg border border-sand bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand/60 font-data uppercase text-xs">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Rate</th>
                  <th className="p-4">Term</th>
                </tr>
              </thead>
              <tbody>
                {rateTable.map((row) => (
                  <tr key={row.product} className="border-t border-sand">
                    <td className="p-4">{row.product}</td>
                    <td className="p-4 font-data">{row.rate}</td>
                    <td className="p-4">{row.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-moss mt-3">
            Rates shown are indicative and change with market conditions. Your actual rate depends on your circumstances and the lender&apos;s criteria at the time you apply.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <AffordabilityCalculator />
      </section>

      <section className="bg-sand/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl mb-12 md:mb-16">The application process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {applicationSteps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-2">
                <span className="font-data text-3xl text-zest">{i + 1}</span>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-moss">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h2 className="text-2xl mb-6">Documents you&apos;ll need</h2>
        <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl">
          {documents.map((doc) => (
            <li key={doc} className="flex items-start gap-2 text-sm text-ink/90 rounded-md border border-sand bg-white p-3">
              <CheckCircle2 className="size-4 text-evergreen shrink-0 mt-0.5" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sand/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl mb-12 md:mb-16">Common questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-moss">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="adviser-callback" className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="rounded-lg border border-sand bg-white p-6 max-w-xl">
          <p className="font-display text-lg mb-1">Request an adviser callback</p>
          <p className="text-sm text-moss mb-5">No obligation, no cost for the initial conversation.</p>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="m-name">Full name</Label>
              <Input id="m-name" name="name" required className="mt-1.5" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="m-phone">Phone</Label>
                <Input id="m-phone" name="phone" type="tel" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="m-email">Email</Label>
                <Input id="m-email" name="email" type="email" required className="mt-1.5" />
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-auto bg-evergreen hover:bg-moss">Request callback</Button>
          </form>
        </div>
      </section>

      <footer className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pb-16">
        <p className="text-xs text-moss border-t border-sand pt-6 max-w-[68ch]">
          Mortgage and protection advice is arranged through a panel of FCA-authorised brokers. Your home may be
          repossessed if you do not keep up repayments on a mortgage or other loan secured against it. The rates,
          criteria and figures on this page are indicative and provided for guidance only — they do not constitute
          financial advice or a mortgage offer.
        </p>
      </footer>
    </main>
  );
}
