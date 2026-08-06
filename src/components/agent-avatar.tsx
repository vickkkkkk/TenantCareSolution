"use client";

import { useState } from "react";
import Image from "next/image";
import { initials, gradientFor } from "@/lib/agent-visuals";

export function AgentAvatar({
  name,
  photo,
  size = 80,
  className = "",
}: {
  name: string;
  photo?: string | null;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
    return (
      <div
        style={{ width: size, height: size, background: gradientFor(name) }}
        className={`rounded-full text-bone flex items-center justify-center shrink-0 ring-1 ring-black/5 shadow-sm transition-transform duration-300 motion-safe:group-hover:scale-105 ${className}`}
      >
        <span
          className="font-display tracking-wide"
          style={{ fontSize: size * 0.36 }}
        >
          {initials(name)}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full overflow-hidden bg-sand shrink-0 ring-1 ring-sand shadow-sm transition-transform duration-300 motion-safe:group-hover:scale-105 ${className}`}
    >
      <Image
        src={photo}
        alt={name}
        fill
        sizes={`${size}px`}
        className="object-cover object-top"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
