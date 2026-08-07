"use client";

import { useState } from "react";
import Image from "next/image";

export function SiteLogo({ src, className = "" }: { src?: string | null; className?: string }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {showImage && (
        <span className="relative block size-11 sm:size-12 shrink-0">
          <Image
            src={src as string}
            alt="Tenant Care Solutions logo mark"
            fill
            priority
            sizes="48px"
            unoptimized
            className="object-contain"
            onError={() => setFailed(true)}
          />
        </span>
      )}
      <span className="font-display text-lg sm:text-xl font-extrabold text-evergreen leading-tight whitespace-nowrap">
        Tenant Care Solution
      </span>
    </span>
  );
}
