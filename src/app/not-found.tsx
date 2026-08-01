import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const popularLinks = [
  { label: "Search rentals", href: "/search" },
  { label: "Browse London", href: "/city/london" },
  { label: "Landlord services", href: "/landlords" },
  { label: "Free rental valuation", href: "/free-rental-valuation" },
  { label: "Contact us", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-5 py-24">
      <div className="max-w-lg w-full text-center">
        <p className="font-data text-6xl text-zest mb-2">404</p>
        <h1 className="text-2xl md:text-3xl mb-3">That page has moved or never existed</h1>
        <p className="text-moss mb-8">
          Try searching for what you were after, or jump to one of the pages below.
        </p>

        <form action="/search" className="flex gap-2 mb-10">
          <Input name="q" placeholder="Search postcode, area or keyword" />
          <Button type="submit" className="bg-evergreen hover:bg-moss shrink-0">
            <Search className="size-4" /> Search
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-3">
          {popularLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm px-3 py-1.5 rounded-[var(--radius-card)] border border-sand hover:border-evergreen hover:text-evergreen"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
