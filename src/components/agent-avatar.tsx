"use client";

import { useState } from "react";
import Image from "next/image";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Deterministic pair of brand colours per name, so a grid of initials
// avatars doesn't read as one flat repeated block of green.
const gradients = [
  ["#10453A", "#2F6F5E"], // evergreen -> moss
  ["#0B1F1A", "#10453A"], // ink -> evergreen
  ["#2F6F5E", "#0B1F1A"], // moss -> ink
];

function gradientFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const [from, to] = gradients[hash % gradients.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}

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
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
