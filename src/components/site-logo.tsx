"use client";

import { useState } from "react";
import Image from "next/image";

export function SiteLogo({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`font-display text-xl font-extrabold text-evergreen ${className}`}>
        Tenant Care Solution
      </span>
    );
  }

  return (
    <span className={`relative block h-10 w-40 ${className}`}>
      <Image
        src="/logo.png"
        alt="Tenant Care Solutions"
        fill
        priority
        sizes="160px"
        className="object-contain object-left"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
