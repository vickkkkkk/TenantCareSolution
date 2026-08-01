import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Find a rental property | Tenants",
  description: "Search live rentals by postcode, price and features — the fastest way in is the main search page.",
  alternates: { canonical: "/tenants/find-a-rental-property" },
  openGraph: { images: ["/api/og?title=Find+a+rental+property"] },
};

export default function FindARentalPropertyPage() {
  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tenants", href: "/tenants" }, { label: "Find a rental property" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl mb-4">Looking for somewhere to rent?</h1>
          <p className="text-lg text-moss mb-8">
            All live listings sit on one search page with full filtering — this
            page just points you to it. Search by postcode, set a price range,
            and filter down to the bedroom count and features that matter,
            rather than reading through a borough-wide list.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col gap-2">
              <MapPin className="size-5 text-evergreen" />
              <p className="text-sm font-semibold">Search by postcode</p>
              <p className="text-xs text-moss">Not a borough-wide guess.</p>
            </div>
            <div className="flex flex-col gap-2">
              <SlidersHorizontal className="size-5 text-evergreen" />
              <p className="text-sm font-semibold">Every filter available</p>
              <p className="text-xs text-moss">Price, beds, features, status.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Search className="size-5 text-evergreen" />
              <p className="text-sm font-semibold">Save it for later</p>
              <p className="text-xs text-moss">Register and get alerted first.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="bg-evergreen hover:bg-moss" asChild>
              <Link href="/search">Go to search</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tenants/register">Register for alerts instead</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
