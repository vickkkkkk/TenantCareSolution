// Seniority order for sorting the agent listing. Job title is free text
// (editable in /admin/agents), so this matches known titles case-insensitively
// and falls back to alphabetical for anything it doesn't recognise.
const SENIORITY: string[] = [
  "managing director",
  "director",
  "operations manager",
  "property manager",
  "senior lettings negotiator",
  "lettings negotiator",
  "compliance & maintenance coordinator",
];

function rankFor(jobTitle: string | null) {
  if (!jobTitle) return SENIORITY.length;
  const rank = SENIORITY.indexOf(jobTitle.trim().toLowerCase());
  return rank === -1 ? SENIORITY.length : rank;
}

export function byAgentSeniority<T extends { jobTitle: string | null; name: string }>(agents: T[]) {
  return [...agents].sort((a, b) => {
    const rankDiff = rankFor(a.jobTitle) - rankFor(b.jobTitle);
    return rankDiff !== 0 ? rankDiff : a.name.localeCompare(b.name);
  });
}
