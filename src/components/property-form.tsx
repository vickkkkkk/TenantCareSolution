"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X, Star } from "lucide-react";

export type PropertyFormOptions = {
  cities: { id: string; name: string; areas: { id: string; name: string }[] }[];
  categories: { id: string; name: string; parentId: string | null }[];
  statuses: { id: string; name: string }[];
  agents: { id: string; name: string }[];
  features: { id: string; name: string }[];
};

export type PropertyFormInitial = {
  id: string;
  title: string;
  description: string;
  excerpt: string | null;
  price: number;
  pricePeriod: string;
  deposit: number | null;
  billsIncluded: boolean;
  bedrooms: number;
  bathrooms: number;
  receptions: number;
  sizeSqft: number | null;
  furnishing: string | null;
  epcRating: string | null;
  councilTaxBand: string | null;
  availableFrom: string | null;
  addressLine1: string;
  addressLine2: string | null;
  postcode: string;
  cityId: string;
  areaId: string | null;
  categoryId: string;
  statusId: string;
  agentId: string;
  featureIds: string[];
  imageUrls: string[];
  published: boolean;
  featured: boolean;
};

export function PropertyForm({
  options,
  initial,
}: {
  options: PropertyFormOptions;
  initial?: PropertyFormInitial;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    excerpt: initial?.excerpt ?? "",
    price: initial?.price?.toString() ?? "",
    pricePeriod: initial?.pricePeriod ?? "PCM",
    deposit: initial?.deposit?.toString() ?? "",
    billsIncluded: initial?.billsIncluded ?? false,
    bedrooms: initial?.bedrooms?.toString() ?? "1",
    bathrooms: initial?.bathrooms?.toString() ?? "1",
    receptions: initial?.receptions?.toString() ?? "0",
    sizeSqft: initial?.sizeSqft?.toString() ?? "",
    furnishing: initial?.furnishing ?? "",
    epcRating: initial?.epcRating ?? "",
    councilTaxBand: initial?.councilTaxBand ?? "",
    availableFrom: initial?.availableFrom?.slice(0, 10) ?? "",
    addressLine1: initial?.addressLine1 ?? "",
    addressLine2: initial?.addressLine2 ?? "",
    postcode: initial?.postcode ?? "",
    cityId: initial?.cityId ?? "",
    areaId: initial?.areaId ?? "",
    categoryId: initial?.categoryId ?? "",
    statusId: initial?.statusId ?? "",
    agentId: initial?.agentId ?? "",
    published: initial?.published ?? false,
    featured: initial?.featured ?? false,
  });
  const [featureIds, setFeatureIds] = useState<string[]>(initial?.featureIds ?? []);
  const [imageUrls, setImageUrls] = useState<string[]>(initial?.imageUrls ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const selectedCity = options.cities.find((c) => c.id === form.cityId);

  async function handleFiles(files: FileList) {
    setUploading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        body.append("folder", "properties");
        const res = await fetch("/api/upload", { method: "POST", body });
        if (!res.ok) throw new Error((await res.json()).error ?? "Image upload failed");
        const { url } = await res.json();
        uploaded.push(url);
      }
      setImageUrls((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, featureIds, imageUrls };
      const res = await fetch(isEdit ? `/api/admin/properties/${initial!.id}` : "/api/admin/properties", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Failed to save property");
      router.push("/admin/properties");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save property");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-3xl">
      {error && <p className="text-sm text-danger bg-danger/10 border border-danger/30 rounded-md p-3">{error}</p>}

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg">Basics</h2>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" required value={form.title} onChange={(e) => update("title", e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="excerpt">Short summary (shown on cards)</Label>
          <Input id="excerpt" value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="description">Full description</Label>
          <Textarea id="description" required rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-1.5" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg">Pricing</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price">Price (£)</Label>
            <Input id="price" type="number" required min={0} value={form.price} onChange={(e) => update("price", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Period</Label>
            <Select value={form.pricePeriod} onValueChange={(v) => update("pricePeriod", v)}>
              <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="PCM">PCM</SelectItem>
                <SelectItem value="PW">PW</SelectItem>
                <SelectItem value="PA">PA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="deposit">Deposit (£)</Label>
            <Input id="deposit" type="number" min={0} value={form.deposit} onChange={(e) => update("deposit", e.target.value)} className="mt-1.5" />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Checkbox id="billsIncluded" checked={form.billsIncluded} onCheckedChange={(v) => update("billsIncluded", Boolean(v))} />
          <Label htmlFor="billsIncluded" className="font-normal">Bills included</Label>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg">Specs</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" type="number" min={0} value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" type="number" min={0} value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="receptions">Receptions</Label>
            <Input id="receptions" type="number" min={0} value={form.receptions} onChange={(e) => update("receptions", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="sizeSqft">Size (sqft)</Label>
            <Input id="sizeSqft" type="number" min={0} value={form.sizeSqft} onChange={(e) => update("sizeSqft", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Furnishing</Label>
            <Select value={form.furnishing || "none"} onValueChange={(v) => update("furnishing", v === "none" ? "" : v)}>
              <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Not specified</SelectItem>
                <SelectItem value="FURNISHED">Furnished</SelectItem>
                <SelectItem value="PART_FURNISHED">Part furnished</SelectItem>
                <SelectItem value="UNFURNISHED">Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="availableFrom">Available from</Label>
            <Input id="availableFrom" type="date" value={form.availableFrom} onChange={(e) => update("availableFrom", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="epcRating">EPC rating</Label>
            <Input id="epcRating" value={form.epcRating} onChange={(e) => update("epcRating", e.target.value)} className="mt-1.5" placeholder="C" />
          </div>
          <div>
            <Label htmlFor="councilTaxBand">Council tax band</Label>
            <Input id="councilTaxBand" value={form.councilTaxBand} onChange={(e) => update("councilTaxBand", e.target.value)} className="mt-1.5" placeholder="B" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg">Location</h2>
        <div>
          <Label htmlFor="addressLine1">Address line 1</Label>
          <Input id="addressLine1" required value={form.addressLine1} onChange={(e) => update("addressLine1", e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="addressLine2">Address line 2</Label>
          <Input id="addressLine2" value={form.addressLine2} onChange={(e) => update("addressLine2", e.target.value)} className="mt-1.5" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="postcode">Postcode</Label>
            <Input id="postcode" required value={form.postcode} onChange={(e) => update("postcode", e.target.value.toUpperCase())} className="mt-1.5" />
          </div>
          <div>
            <Label>City</Label>
            <Select value={form.cityId} onValueChange={(v) => { update("cityId", v); update("areaId", ""); }}>
              <SelectTrigger className="w-full mt-1.5"><SelectValue placeholder="Select a city" /></SelectTrigger>
              <SelectContent>
                {options.cities.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Area</Label>
            <Select value={form.areaId || "none"} onValueChange={(v) => update("areaId", v === "none" ? "" : v)} disabled={!selectedCity}>
              <SelectTrigger className="w-full mt-1.5"><SelectValue placeholder="Select an area" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Not specified</SelectItem>
                {selectedCity?.areas.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg">Category, status &amp; agent</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label>Category</Label>
            <Select value={form.categoryId} onValueChange={(v) => update("categoryId", v)}>
              <SelectTrigger className="w-full mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {options.categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={form.statusId} onValueChange={(v) => update("statusId", v)}>
              <SelectTrigger className="w-full mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {options.statuses.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Managing agent</Label>
            <Select value={form.agentId} onValueChange={(v) => update("agentId", v)}>
              <SelectTrigger className="w-full mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {options.agents.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg">Features</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {options.features.map((f) => (
            <div key={f.id} className="flex items-center gap-2">
              <Checkbox
                id={`feature-${f.id}`}
                checked={featureIds.includes(f.id)}
                onCheckedChange={(v) =>
                  setFeatureIds((prev) => (v ? [...prev, f.id] : prev.filter((id) => id !== f.id)))
                }
              />
              <Label htmlFor={`feature-${f.id}`} className="font-normal text-sm">{f.name}</Label>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg">Photos</h2>
        <p className="text-sm text-moss">First photo is the primary image shown on cards.</p>
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {imageUrls.map((url, i) => (
              <div key={url} className="relative aspect-4/3 rounded-md overflow-hidden bg-sand border border-sand">
                <Image src={url} alt="" fill className="object-cover" unoptimized />
                {i === 0 && (
                  <span className="absolute top-1 left-1 bg-zest text-ink rounded-full p-1"><Star className="size-3" /></span>
                )}
                <button
                  type="button"
                  onClick={() => setImageUrls((prev) => prev.filter((u) => u !== url))}
                  className="absolute top-1 right-1 bg-ink/70 text-bone rounded-full p-1 hover:bg-danger"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <Button type="button" variant="outline" className="w-fit" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? "Uploading…" : "Add photos"}
        </Button>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg">Publish</h2>
        <div className="flex items-center gap-2.5">
          <Checkbox id="published" checked={form.published} onCheckedChange={(v) => update("published", Boolean(v))} />
          <Label htmlFor="published" className="font-normal">Published (visible on the live site)</Label>
        </div>
        <div className="flex items-center gap-2.5">
          <Checkbox id="featured" checked={form.featured} onCheckedChange={(v) => update("featured", Boolean(v))} />
          <Label htmlFor="featured" className="font-normal">Featured</Label>
        </div>
      </section>

      <div className="flex gap-3">
        <Button type="submit" className="bg-evergreen hover:bg-moss" disabled={saving || uploading}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          {isEdit ? "Save changes" : "Create property"}
        </Button>
      </div>
    </form>
  );
}
