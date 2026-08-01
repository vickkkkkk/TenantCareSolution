import {
  Search, Home, Users, ShieldCheck, Wallet,
  KeyRound, MessageCircle, CheckCircle2, Camera, FileCheck, ClipboardCheck,
} from "lucide-react";
import type { ServicePageContent } from "@/components/templates/service-page-template";

export const tenantHub: ServicePageContent = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Tenants" }],
  eyebrow: "For tenants",
  title: "Rentals that show you the postcode first, not a borough-wide guess",
  subhead:
    "Search by the area you actually want to live in, register once to get alerted first, and reach a person — not a ticket queue — once you've moved in.",
  primaryCta: { label: "Search rentals", href: "/search" },
  secondaryCta: { label: "Register your details", href: "/tenants/register" },
  heroImageSeed: 4008,
  intro: [
    "Most rental searches make you choose a whole borough and then wade through everything in it. We tag every listing down to the postcode district, so a search for one part of a city doesn't surface a property forty minutes away that technically shares the same postal area.",
    "Beyond search, this section covers registering for alerts, how your deposit is protected, the standard every listed property has to meet, and a downloadable guide to renting in the UK if any part of the process is new to you.",
  ],
  features: [
    { icon: Search, title: "Find a rental property", body: "Postcode-level search with real filters, not a borough dropdown." },
    { icon: ShieldCheck, title: "Secure deposit registration", body: "Every deposit registered with a government-approved scheme, with a certificate you can check." },
    { icon: ClipboardCheck, title: "High-quality rental properties", body: "Every listing checked against a minimum standard before it goes live." },
    { icon: FileCheck, title: "Register your details", body: "Tell us what you're after once, get alerted before it's public." },
  ],
  faqs: [
    { question: "Do I need to register to view properties?", answer: "No — search and browsing are open to everyone. Registering just means we can alert you the moment something matching your criteria goes live." },
    { question: "How do I book a viewing?", answer: "Every listing has an enquiry form that goes straight to the managing agent, who will offer viewing times directly." },
    { question: "What documents will I need to apply?", answer: "Typically photo ID, proof of income or employment, and previous landlord references — the tenant guide covers this in full." },
    { question: "Can I save properties to compare later?", answer: "Yes — use the compare tool to view up to four properties side by side on price, size and features." },
    { question: "Is there a fee to register?", answer: "No, registering for alerts and using search is free for tenants." },
  ],
  relatedLinks: [
    { title: "Search rentals", href: "/search", blurb: "Full postcode-level search with every filter available." },
    { title: "Tenant guide", href: "/tenants/guide", blurb: "A free download covering the whole renting process, start to finish." },
    { title: "Secure deposit registration", href: "/tenants/secure-deposit-registration", blurb: "How your deposit is protected, and how to check it yourself." },
  ],
};

export const tenantServices: Record<string, ServicePageContent> = {
  "secure-deposit-registration": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Tenants", href: "/tenants" }, { label: "Secure deposit registration" }],
    eyebrow: "Deposit protection",
    title: "Your deposit, registered and checkable from day one",
    subhead:
      "Every deposit taken on a tenancy arranged through this platform is registered with a government-approved scheme within the legal deadline — here's what that means and how to check it yourself.",
    primaryCta: { label: "Search rentals", href: "/search" },
    secondaryCta: { label: "Register for alerts", href: "/tenants/register" },
    heroImageSeed: 4009,
    intro: [
      "UK law requires any deposit taken on an assured shorthold tenancy to be placed in a government-approved protection scheme within 30 days of receipt. That's not a courtesy — it's a legal obligation on the landlord or agent, and it exists specifically so a deposit can't just be withheld at the end of a tenancy without a proper process.",
      "We treat this as a baseline, not an afterthought: every deposit collected through a tenancy on this platform is registered on time, and you're given the scheme name and certificate reference so you can verify it independently rather than taking our word for it.",
    ],
    features: [
      { icon: ShieldCheck, title: "Registered within 30 days", body: "Every deposit placed in an approved scheme inside the legal deadline, not left until a dispute forces the issue." },
      { icon: FileCheck, title: "Certificate provided", body: "You receive the scheme name and certificate reference directly, not just a verbal assurance." },
      { icon: CheckCircle2, title: "Independently checkable", body: "Verify your deposit's protection status directly with the scheme, using the reference we give you." },
      { icon: ClipboardCheck, title: "Clear deduction process", body: "Any proposed deduction at check-out is itemised against the original inventory, not a flat administrative charge." },
      { icon: MessageCircle, title: "Dispute support", body: "If a deduction is contested, we support the evidence submission through the scheme's official adjudication process." },
      { icon: KeyRound, title: "Prompt return", body: "Uncontested deposits are returned promptly at the end of a tenancy, not held pending unrelated paperwork." },
    ],
    faqs: [
      { question: "How do I check my deposit is actually protected?", answer: "You'll be given the protection scheme's name and a certificate reference — enter these on the scheme's own website to confirm your deposit is registered." },
      { question: "What happens if a deposit isn't protected in time?", answer: "It's a legal requirement, and a landlord who fails to protect a deposit within 30 days can be ordered to pay the tenant compensation on top of returning the deposit." },
      { question: "Can my landlord deduct anything they like from my deposit?", answer: "No — deductions must be justified against the check-in inventory and reasonable wear and tear, and can be formally disputed through the scheme's adjudication service." },
      { question: "How long does it take to get my deposit back?", answer: "Where there's no dispute, deposits are typically returned within 10 days of both parties agreeing the amount at the end of the tenancy." },
      { question: "Which protection scheme is used?", answer: "It varies by managing agent — the specific scheme and certificate reference for your tenancy are provided directly to you once the deposit is registered." },
    ],
    relatedLinks: [
      { title: "High-quality rental properties", href: "/tenants/high-quality-rentals-properties", blurb: "The standard every listing has to meet before it goes live." },
      { title: "Search rentals", href: "/search", blurb: "Full search across every current listing." },
      { title: "Tenant guide", href: "/tenants/guide", blurb: "What to check before signing any tenancy agreement." },
    ],
  },

  "high-quality-rentals-properties": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Tenants", href: "/tenants" }, { label: "High-quality rental properties" }],
    eyebrow: "Listing standards",
    title: "Every listing meets a minimum standard before it goes live",
    subhead:
      "Real photos, an accurate description, and a working set of safety certificates — checked before a property is published, not left to a tenant to discover on moving day.",
    primaryCta: { label: "Search rentals", href: "/search" },
    secondaryCta: { label: "Register for alerts", href: "/tenants/register" },
    heroImageSeed: 4010,
    intro: [
      "A listing that looks good in photos and turns out disappointing in person wastes everyone's time — yours most of all. Before a property goes live on this platform, it's checked against a minimum standard: photos that actually show the rooms being let, a description that matches what's there, and confirmation that the required safety certificates are current.",
      "This isn't a one-time check either. Listings that go quiet without an update get manually re-verified, and any property that stops meeting the standard is pulled until it's brought back into line.",
    ],
    features: [
      { icon: Camera, title: "Real, current photos", body: "Photos of the actual property being let, checked for accuracy before publication." },
      { icon: ClipboardCheck, title: "Accurate descriptions", body: "Listed specs — bedrooms, bathrooms, size, furnishing — verified against the property, not copied from a template." },
      { icon: ShieldCheck, title: "Valid safety certificates", body: "Gas safety, EICR and EPC status confirmed current before a listing goes live." },
      { icon: Home, title: "Condition checked", body: "Properties are expected to be genuinely ready to let, not advertised ahead of outstanding repairs." },
      { icon: CheckCircle2, title: "Ongoing re-verification", body: "Listings that go quiet for a stretch are manually rechecked, not left to age indefinitely." },
      { icon: Users, title: "Agent accountability", body: "Every listing is tied to a named managing agent responsible for keeping it accurate." },
    ],
    faqs: [
      { question: "What happens if a listing turns out to be inaccurate?", answer: "Report it through the enquiry form — inaccurate listings are investigated and corrected or removed, and repeat issues affect whether an agent can keep listing on the platform." },
      { question: "Are all photos genuinely of the property I'd be renting?", answer: "Yes — listings using generic or unrelated photos don't meet the publication standard and are corrected before or after going live." },
      { question: "Do you check safety certificates before listing?", answer: "Yes, gas safety, EICR and EPC status are confirmed current as part of the pre-publication check." },
      { question: "What if a property needs repairs before I move in?", answer: "Properties are expected to be genuinely ready to let when listed — if you find otherwise at viewing, that's worth raising with the agent immediately." },
      { question: "How often are listings rechecked?", answer: "Any listing that's gone quiet without an update for a while is manually reverified rather than left to sit indefinitely." },
    ],
    relatedLinks: [
      { title: "Secure deposit registration", href: "/tenants/secure-deposit-registration", blurb: "How your deposit is protected once you've moved in." },
      { title: "Search rentals", href: "/search", blurb: "Full search across every current listing." },
      { title: "Tenant guide", href: "/tenants/guide", blurb: "What to check at a viewing before you apply." },
    ],
  },
};
