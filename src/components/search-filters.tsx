"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export type FilterOptions = {
  cities: { slug: string; name: string }[];
  categories: { slug: string; name: string }[];
  statuses: { slug: string; name: string }[];
};

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "beds_asc", label: "Bedrooms: fewest first" },
  { value: "beds_desc", label: "Bedrooms: most first" },
];

export function SearchFilters({ options }: { options: FilterOptions }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "any") params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const activeEntries = Array.from(searchParams.entries()).filter(([k]) => k !== "sort" && k !== "view");

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setParam("q", (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value);
        }}
      >
        <Input name="q" placeholder="Postcode, area or keyword" defaultValue={searchParams.get("q") ?? ""} />
      </form>

      <div>
        <p className="text-xs font-data uppercase tracking-wide text-moss mb-2">City</p>
        <Select value={searchParams.get("city") ?? "any"} onValueChange={(v) => setParam("city", v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any city</SelectItem>
            {options.cities.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="text-xs font-data uppercase tracking-wide text-moss mb-2">Category</p>
        <Select value={searchParams.get("category") ?? "any"} onValueChange={(v) => setParam("category", v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any category</SelectItem>
            {options.categories.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="text-xs font-data uppercase tracking-wide text-moss mb-2">Status</p>
        <Select value={searchParams.get("status") ?? "any"} onValueChange={(v) => setParam("status", v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any status</SelectItem>
            {options.statuses.map((s) => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-data uppercase tracking-wide text-moss mb-2">Min price</p>
          <Input type="number" defaultValue={searchParams.get("min") ?? ""} onBlur={(e) => setParam("min", e.target.value)} />
        </div>
        <div>
          <p className="text-xs font-data uppercase tracking-wide text-moss mb-2">Max price</p>
          <Input type="number" defaultValue={searchParams.get("max") ?? ""} onBlur={(e) => setParam("max", e.target.value)} />
        </div>
      </div>

      <div>
        <p className="text-xs font-data uppercase tracking-wide text-moss mb-2">Bedrooms</p>
        <div className="flex gap-2 flex-wrap">
          {["any", "1", "2", "3", "4"].map((n) => (
            <Button
              key={n}
              type="button"
              size="sm"
              variant={(searchParams.get("beds") ?? "any") === n ? "default" : "outline"}
              className={(searchParams.get("beds") ?? "any") === n ? "bg-evergreen hover:bg-moss" : ""}
              onClick={() => setParam("beds", n)}
            >
              {n === "any" ? "Any" : n === "4" ? "4+" : n}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-data uppercase tracking-wide text-moss mb-2">Sort</p>
        <Select value={searchParams.get("sort") ?? "default"} onValueChange={(v) => setParam("sort", v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {sortOptions.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {activeEntries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeEntries.map(([key, value]) => (
            <button
              key={key}
              onClick={() => setParam(key, null)}
              className="flex items-center gap-1 text-xs font-data bg-zest/30 border border-zest px-2.5 py-1 rounded-[var(--radius-card)] hover:bg-zest/50"
            >
              {key}: {value}
              <X className="size-3" />
            </button>
          ))}
          <button
            onClick={() => router.push(pathname)}
            className="text-xs text-moss underline hover:text-evergreen"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
