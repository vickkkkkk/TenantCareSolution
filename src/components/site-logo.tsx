"use client";

import { useState } from "react";
import Image from "next/image";

export function SiteLogo({ src, className = "" }: { src?: string | null; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className={`font-display text-xl font-extrabold text-evergreen ${className}`}>
        Tenant Care Solution
      </span>
    );
  }

  return (
    <span className={`relative block h-14 w-52 sm:h-16 sm:w-60 ${className}`}>
      <Image
        src={src}
        alt="Tenant Care Solutions"
        fill
        priority
        sizes="240px"
        unoptimized
        className="object-contain object-left"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
