"use client";

import { useState, useMemo } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories } from "@/content/faqs";
import { Search } from "lucide-react";

export default function FaqsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return faqCategories;
    const q = query.toLowerCase();
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl mb-6">Frequently asked questions</h1>
        <div className="relative max-w-md mb-12 md:mb-16">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-moss" />
          <Input
            placeholder="Search questions"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-moss">No questions match &quot;{query}&quot;.</p>
        ) : (
          <div className="flex flex-col gap-12">
            {filtered.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-xl font-semibold mb-4">{cat.category}</h2>
                <Accordion type="single" collapsible className="max-w-3xl">
                  {cat.items.map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-moss">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
