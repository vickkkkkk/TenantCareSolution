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
    <span className={`relative block h-10 w-40 ${className}`}>
      <Image
        src={src}
        alt="Tenant Care Solutions"
        fill
        priority
        sizes="160px"
        unoptimized
        className="object-contain object-left"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
