export type CityPageContent = {
  intro: string[];
  whyUs: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

// Distinct in angle from /areas/[slug]: this focuses on the live listings feed
// itself (what's actually on the platform right now), not general market editorial.
export const cityPageContent: Record<string, CityPageContent> = {
  london: {
    intro: [
      "Every London listing on this platform is tagged to its postcode district before anything else, which is what the filters below actually search against — not a borough name. That matters most in a city where two streets can sit in the same borough and rent forty percent apart.",
      "Listings here are refreshed as agents update them, and anything that's gone quiet without an update gets manually re-checked. What you see below is what's actually available today, not a cached snapshot from whenever it was first listed.",
    ],
    whyUs: [
      { title: "Postcode-first filtering", body: "Search narrows to the district, not the whole borough." },
      { title: "Re-verified listings", body: "Anything untouched for a while gets manually re-checked before it stays live." },
      { title: "Direct agent contact", body: "Every enquiry reaches the actual managing agent, not a call centre." },
    ],
    faqs: [
      { question: "How current is this listings page?", answer: "It reflects live database records, refreshed automatically — no manual sync delay." },
      { question: "Can I filter by a specific postcode district?", answer: "Yes, the full search page lets you filter by postcode alongside price, bedrooms and features." },
      { question: "What if I don't see anything in my price range right now?", answer: "Save a search from the main search page and you'll get an alert the moment something matches." },
    ],
  },
  manchester: {
    intro: [
      "The Manchester listings below are pulled live from the same database that powers search — nothing here is a static summary written once and left to go stale. Filter by category to separate city-centre apartments from the suburban houses further out.",
      "Availability status updates as agents mark properties let or under offer, so what you're looking at reflects the current state of each listing, not its condition when it was first published.",
    ],
    whyUs: [
      { title: "Live availability", body: "Status badges reflect the current database record, not a cached page." },
      { title: "City and suburb coverage", body: "Filter to separate centre-based lets from suburban family housing." },
      { title: "Fast enquiry routing", body: "Messages go straight to the agent managing that specific listing." },
    ],
    faqs: [
      { question: "Does this page include suburban listings too?", answer: "Yes — use the category filter on the full search page to separate city-centre flats from suburban houses." },
      { question: "How do I know if a listing is still available?", answer: "The status badge on each card reflects the live database record, updated whenever the agent changes it." },
      { question: "Can I get notified about new Manchester listings?", answer: "Yes, register a saved search and choose how often you'd like to be alerted." },
    ],
  },
  birmingham: {
    intro: [
      "Birmingham listings span both the regenerated city centre and established suburbs, and this page pulls both live from the same database — filter by category if you want one or the other specifically.",
      "As with every city page here, what you see reflects the current listing status, not a snapshot taken when the property was first added.",
    ],
    whyUs: [
      { title: "Full category range", body: "From studio flats to family houses, filterable in one place." },
      { title: "Live status tracking", body: "Availability updates as soon as an agent changes it." },
      { title: "Direct enquiries", body: "Your message reaches the agent managing that specific property." },
    ],
    faqs: [
      { question: "Are city-centre and suburban listings mixed together?", answer: "They appear together by default — use the category or area filter to narrow to one or the other." },
      { question: "How do I search a specific Birmingham suburb?", answer: "The full search page lets you filter by area within the city, such as Moseley or Edgbaston." },
      { question: "Can I save this search for later?", answer: "Yes — register and save your criteria to get alerted when something new matches." },
    ],
  },
  nottingham: {
    intro: [
      "Nottingham's listings mix student-friendly lets near the universities with family housing further out — this page pulls both live from the database, so what's marked available is actually available right now.",
      "Use the category and bedroom filters on the full search page to narrow down quickly, especially during the peak student-letting season when listings move fast.",
    ],
    whyUs: [
      { title: "Student and family listings", body: "Both categories covered, clearly distinguished by property type." },
      { title: "Fast-moving stock handled properly", body: "Status updates in real time, not on a delay." },
      { title: "Direct contact with agents", body: "No call centre in between — messages go straight to the managing agent." },
    ],
    faqs: [
      { question: "Is this good for student searches?", answer: "Yes — filter by category to see shared and student-oriented listings specifically." },
      { question: "How fast do Nottingham listings usually move?", answer: "Particularly fast during peak student-letting months — saved search alerts are worth setting up if you're searching in that window." },
      { question: "Can I filter by proximity to the universities?", answer: "Use the area filter on the main search page to narrow to neighbourhoods near each campus." },
    ],
  },
  bradford: {
    intro: [
      "Bradford's listings on this page are pulled live from the same database as the rest of the site — nothing here is a static summary. Filter by price or category to narrow down the mix of terraced houses and converted properties available.",
      "As with every city, availability status reflects the current record, updated whenever the managing agent changes it.",
    ],
    whyUs: [
      { title: "Affordable stock, verified", body: "Listings re-checked to make sure lower prices reflect real availability, not stale entries." },
      { title: "Live status", body: "Availability updates as soon as the agent changes it." },
      { title: "Direct agent contact", body: "Enquiries go straight to whoever manages that specific listing." },
    ],
    faqs: [
      { question: "Are Bradford listings kept up to date?", answer: "Yes, the same live-database approach applies here as on every city page." },
      { question: "What kind of properties are most common?", answer: "A mix of terraced houses and converted properties — filter by category to narrow down." },
      { question: "Can I get alerted about new Bradford listings?", answer: "Yes, register a saved search from the main search page." },
    ],
  },
};
