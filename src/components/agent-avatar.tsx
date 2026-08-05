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

export function AgentAvatar({
  name,
  photo,
  size = 80,
}: {
  name: string;
  photo?: string | null;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-evergreen text-bone flex items-center justify-center font-display shrink-0"
      >
        <span style={{ fontSize: size * 0.34 }}>{initials(name)}</span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="relative rounded-full overflow-hidden bg-sand shrink-0"
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
