export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Deterministic pair of brand colours per name, so a grid of placeholder
// avatars/photos doesn't read as one flat repeated block of green.
const gradients = [
  ["#10453A", "#2F6F5E"], // evergreen -> moss
  ["#0B1F1A", "#10453A"], // ink -> evergreen
  ["#2F6F5E", "#0B1F1A"], // moss -> ink
];

export function gradientFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const [from, to] = gradients[hash % gradients.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}
