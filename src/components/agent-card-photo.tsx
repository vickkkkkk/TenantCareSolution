"use client";

import { useState } from "react";
import Image from "next/image";
import { initials, gradientFor } from "@/lib/agent-visuals";

export function AgentCardPhoto({
  name,
  photo,
}: {
  name: string;
  photo?: string | null;
}) {
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
    return (
      <div
        style={{ background: gradientFor(name) }}
        className="relative aspect-4/3 flex items-center justify-center text-bone"
      >
        <span className="font-display text-4xl tracking-wide">{initials(name)}</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-4/3 bg-sand overflow-hidden">
      <Image
        src={photo}
        alt={name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
