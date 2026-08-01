import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Home } from "lucide-react";

export type PropertyCardData = {
  slug: string;
  title: string;
  postcode: string;
  price: number;
  pricePeriod: string;
  bedrooms: number;
  bathrooms: number;
  categoryName: string;
  areaName?: string | null;
  cityName: string;
  statusName: string;
  imageUrl?: string | null;
};

const statusColor: Record<string, string> = {
  Available: "bg-available",
  "Let Agreed": "bg-let-agreed",
  "Under Offer": "bg-let-agreed",
};

export function PropertyCard({ property }: { property: PropertyCardData }) {
  const district = property.postcode.split(" ")[0];

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col border border-sand rounded-[var(--radius-card)] bg-white overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-[0_2px_0_0_var(--color-sand)]"
    >
      <div className="flex items-center justify-between px-3 pt-3">
        <span className="font-data text-xs border border-zest text-ink px-2 py-1 rounded-[var(--radius-card)]">
          {district}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-data text-moss">
          <span className={`size-2 rounded-full ${statusColor[property.statusName] ?? "bg-available"}`} />
          {property.statusName.toUpperCase()}
        </span>
      </div>

      <p className="font-data text-2xl px-3 pt-1 text-ink">
        £{property.price.toLocaleString("en-GB")} {property.pricePeriod}
      </p>

      <div className="relative aspect-4/3 mt-2 bg-sand">
        {property.imageUrl ? (
          <Image
            src={property.imageUrl}
            alt={`${property.categoryName} at ${property.areaName ?? property.cityName}, ${property.cityName}`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex items-center justify-center size-full text-sand-foreground">
            <Home className="size-8 text-moss/40" />
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="font-display text-base leading-snug line-clamp-2 group-hover:text-evergreen">
          {property.title}
        </h3>
        <p className="text-sm text-moss">
          {property.areaName ? `${property.areaName}, ` : ""}
          {property.cityName}
        </p>
      </div>

      <div className="flex items-center gap-4 px-3 py-2 border-t border-sand font-data text-xs text-ink">
        <span className="flex items-center gap-1">
          <Bed className="size-3.5" /> {property.bedrooms} BD
        </span>
        <span className="flex items-center gap-1">
          <Bath className="size-3.5" /> {property.bathrooms} BA
        </span>
        <span className="ml-auto">{property.categoryName}</span>
      </div>
    </Link>
  );
}
