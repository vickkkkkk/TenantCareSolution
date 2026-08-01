import {
  Search, FileCheck, Wallet, Wrench, Building2, ShieldCheck,
  ClipboardList, Users, KeyRound, Clock, Home, Scale,
  HardHat, AlertTriangle, FileText, Camera,
} from "lucide-react";
import type { ServicePageContent } from "@/components/templates/service-page-template";

export const landlordHub = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Landlords" }],
  eyebrow: "For landlords",
  title: "Every landlord service, run by people who answer the phone",
  subhead:
    "Whether you own one flat or a portfolio of forty, pick the level of involvement that suits you — from finding a single tenant to managing the whole thing.",
  primaryCta: { label: "Get a free valuation", href: "/free-rental-valuation" },
  secondaryCta: { label: "Talk to a landlord specialist", href: "/contact" },
  heroImageSeed: 4001,
  intro: [
    "Landlords come to us at different stages: some have just inherited a property and don't know where to start, others have run their own lettings for a decade and are tired of doing it themselves. Both get the same starting conversation — what do you actually want to be responsible for, and what would you rather hand off?",
    "The six services below cover the full range, from a single placement fee to fully managed portfolios. You can mix and match across properties, and move between tiers as your circumstances change without renegotiating from scratch.",
  ],
  features: [
    { icon: Search, title: "Find a tenant", body: "Marketing, viewings and referencing, then you take over — or move to a managed plan." },
    { icon: Building2, title: "Letting agency", body: "Ongoing tenancy administration without full property management." },
    { icon: ShieldCheck, title: "Residential management", body: "Full management: rent collection, maintenance, inspections, compliance." },
    { icon: Home, title: "Vacant property management", body: "Keep an empty property secure, insured and inspected between lets." },
    { icon: Users, title: "HMO management", body: "Licensing, room-by-room compliance and the extra admin HMOs need." },
    { icon: Wrench, title: "Property maintenance", body: "A vetted contractor network for repairs, on call or on a schedule." },
  ],
  faqs: [
    { question: "Can I combine services across different properties?", answer: "Yes. Landlords with several properties often run one on full management and another on let-only, depending on how hands-on they want to be with each." },
    { question: "How quickly can you find a tenant?", answer: "Once a property is photographed and listed, most well-priced properties in the cities we cover generate viewings within the first week." },
    { question: "What does it cost to switch from another agency?", answer: "We handle the handover directly with your outgoing agent. There's no fee for switching, and we won't double-charge you for work already paid for." },
    { question: "Do you work with landlords who live abroad?", answer: "Regularly. Full management is built around not needing you on the ground — statements, approvals and updates all happen remotely." },
    { question: "What if I only have one property?", answer: "Most of our landlords do. The services scale down as easily as they scale up." },
  ],
  relatedLinks: [
    { title: "Free rental valuation", href: "/free-rental-valuation", blurb: "Get a realistic rent estimate for your property in under 48 hours." },
    { title: "Landlord guide", href: "/landlords/guide", blurb: "A free download covering compliance, tax and the letting process end to end." },
    { title: "Mortgages for landlords", href: "/mortgage", blurb: "Buy-to-let and portfolio mortgage advice alongside your letting." },
  ],
};

export const landlordServices: Record<string, ServicePageContent> = {
  "find-a-tenant": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Landlords", href: "/landlords" }, { label: "Find a tenant" }],
    eyebrow: "Tenant find",
    title: "Find a reliable tenant without giving up control of the tenancy",
    subhead:
      "We market the property, run the viewings and reference the applicant. Once they've signed, the tenancy is yours to run — or you can hand it to us at any point.",
    primaryCta: { label: "Get a free valuation", href: "/free-rental-valuation" },
    secondaryCta: { label: "See letting agency instead", href: "/landlords/letting-agency" },
    heroImageSeed: 4002,
    intro: [
      "Tenant find is the right service if you're comfortable running a tenancy day to day but don't want to handle marketing, viewings or referencing yourself — or if you're testing whether self-management suits you before committing to it long term.",
      "We list on the major portals, arrange and accompany viewings, take references and right-to-rent checks, and draft the tenancy agreement. You get a vetted tenant, a signed contract and a deposit registered correctly, then you take it from there.",
    ],
    features: [
      { icon: Search, title: "Portal listing", body: "Professional photos and a listing live on the major portals within 48 hours." },
      { icon: Camera, title: "Accompanied viewings", body: "We show the property so you don't have to take calls during work hours." },
      { icon: FileCheck, title: "Full referencing", body: "Credit checks, employment verification, previous landlord references and right-to-rent." },
      { icon: FileText, title: "Tenancy agreement", body: "A compliant AST drafted and signed, with the deposit registered in a government scheme." },
      { icon: Wallet, title: "First month handled", body: "First month's rent and deposit collected and reconciled before you take over." },
      { icon: KeyRound, title: "Key handover", body: "Move-in inventory and key handover arranged on the day." },
    ],
    processSteps: [
      { title: "Valuation and listing", body: "We agree a rent, take photos, and the listing goes live." },
      { title: "Viewings and applications", body: "We handle enquiries and run viewings, then take applications from interested tenants." },
      { title: "Referencing and contract", body: "The chosen applicant is referenced and the tenancy agreement drafted." },
      { title: "Move-in", body: "Deposit registered, inventory done, keys handed over — the tenancy is now yours to manage." },
    ],
    faqs: [
      { question: "How long does tenant find usually take?", answer: "From listing to a signed tenancy is typically two to four weeks, depending on the property and the season." },
      { question: "What happens after the tenant moves in?", answer: "The tenancy is yours to manage from day one. You can upgrade to residential management at any point if you'd rather not deal with it." },
      { question: "Do you handle the deposit registration?", answer: "Yes, the deposit is registered with a government-approved scheme before the tenant moves in, and you receive the certificate." },
      { question: "Can I meet the tenant before signing off?", answer: "Yes — we send you the reference report and you make the final call before the tenancy agreement is issued." },
      { question: "What if the tenant fails referencing?", answer: "We won't put forward an applicant who fails referencing without flagging it clearly, and we continue marketing until we find someone who passes." },
    ],
    relatedLinks: [
      { title: "Letting agency", href: "/landlords/letting-agency", blurb: "Ongoing rent collection and tenancy admin without full management." },
      { title: "Residential management", href: "/landlords/residential-management", blurb: "Hand over the whole tenancy, including maintenance and inspections." },
      { title: "Landlord guide", href: "/landlords/guide", blurb: "Everything you need to know before letting a property for the first time." },
    ],
  },

  "letting-agency": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Landlords", href: "/landlords" }, { label: "Letting agency" }],
    eyebrow: "Letting agency",
    title: "Rent collected and tenancies administered, without full management",
    subhead:
      "For landlords who want the admin off their plate but are happy to deal with maintenance and tenant relationships directly.",
    primaryCta: { label: "Get a free valuation", href: "/free-rental-valuation" },
    secondaryCta: { label: "Compare with full management", href: "/landlords/residential-management" },
    heroImageSeed: 4003,
    intro: [
      "Letting agency sits between tenant find and full management. We collect the rent, chase late payments, handle renewals and keep your compliance paperwork current — gas safety certificates, EPC renewals, deposit protection — but maintenance calls and day-to-day tenant contact stay with you.",
      "It suits landlords with the time and inclination to deal with tenants directly, who mainly want the financial and legal admin taken care of reliably, every month, without having to track it themselves.",
    ],
    features: [
      { icon: Wallet, title: "Rent collection", body: "Rent collected monthly and paid to you by the 3rd, with a statement that reconciles." },
      { icon: Clock, title: "Arrears chasing", body: "Late payments followed up within 48 hours, before they become a pattern." },
      { icon: FileCheck, title: "Renewal admin", body: "Tenancy renewals drafted and rent reviews handled ahead of the expiry date." },
      { icon: ShieldCheck, title: "Compliance tracking", body: "Gas safety, EPC and deposit protection renewal dates tracked automatically." },
      { icon: FileText, title: "Annual statements", body: "A clear statement for your accountant or self-assessment return." },
      { icon: Scale, title: "Notice handling", body: "Section 21 and Section 8 notices prepared correctly if a tenancy needs to end." },
    ],
    faqs: [
      { question: "Who handles maintenance requests?", answer: "You do — tenants contact you directly for repairs. If that becomes too much, you can move to residential management without re-signing a new tenancy." },
      { question: "What's the difference between this and full management?", answer: "Letting agency covers rent and admin only. Residential management adds maintenance coordination, inspections and being the tenant's main point of contact." },
      { question: "How is rent actually paid to me?", answer: "By bank transfer on a fixed date each month, with a statement itemising any deductions." },
      { question: "Do you handle deposit disputes?", answer: "We support the paperwork and evidence needed, but the dispute is resolved through the deposit scheme's adjudication service." },
      { question: "Can I switch to full management mid-tenancy?", answer: "Yes, at any renewal point or with notice — no need to end the existing tenancy." },
    ],
    relatedLinks: [
      { title: "Residential management", href: "/landlords/residential-management", blurb: "Add maintenance coordination and inspections to the letting agency service." },
      { title: "Find a tenant", href: "/landlords/find-a-tenant", blurb: "For properties that don't have a tenant in place yet." },
      { title: "Property maintenance", href: "/landlords/property-maintenance", blurb: "A vetted contractor network you can use even without full management." },
    ],
  },

  "residential-management": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Landlords", href: "/landlords" }, { label: "Residential management" }],
    eyebrow: "Full management",
    title: "One phone number for everything, and a landlord who doesn't have to pick up",
    subhead:
      "Rent, repairs, inspections, renewals and compliance — all coordinated on your behalf, with a monthly statement that tells you exactly what happened.",
    primaryCta: { label: "Get a free valuation", href: "/free-rental-valuation" },
    secondaryCta: { label: "See what letting agency covers", href: "/landlords/letting-agency" },
    heroImageSeed: 4004,
    intro: [
      "Full management is built for landlords who want the property to run itself. The tenant has one number to call, not two — ours — and every maintenance request, inspection and renewal gets handled without you needing to be involved unless something needs your decision.",
      "It's the service most of our portfolio landlords use, precisely because it removes the daily noise: you get a monthly statement and the occasional call about something that actually needs your input, not a running commentary on the small stuff.",
    ],
    features: [
      { icon: Wrench, title: "Maintenance coordinated", body: "Repairs triaged same-day and booked with a vetted contractor, no chasing required from you." },
      { icon: ClipboardList, title: "Routine inspections", body: "Property visited on a fixed schedule with a written report and photos." },
      { icon: Wallet, title: "Rent and statements", body: "Rent collected, expenses deducted, and a reconciled statement every month." },
      { icon: ShieldCheck, title: "Compliance handled", body: "Gas, electrical and EPC renewals booked before they lapse, not after." },
      { icon: Users, title: "Single tenant contact", body: "Tenants call us, not you — for repairs, questions or renewal discussions." },
      { icon: Scale, title: "End of tenancy handled", body: "Check-out, deposit return and re-marketing coordinated without a gap in income if avoidable." },
    ],
    splitBlocks: [
      {
        heading: "What you actually see each month",
        body: "A statement that lists rent received, any maintenance costs deducted, and the net amount paid to you — not a black box.",
        checklist: [
          "Rent received and net amount transferred",
          "Any maintenance invoices, itemised",
          "Upcoming compliance renewals flagged in advance",
          "A single point of contact for anything unusual",
        ],
        imageSeed: 4104,
      },
    ],
    stats: [
      { value: "24h", label: "Typical maintenance triage time" },
      { value: "3rd", label: "Of the month, rent lands with you" },
      { value: "98%", label: "Tenancy renewal rate on managed properties" },
      { value: "0", label: "Calls you need to take about routine repairs" },
    ],
    faqs: [
      { question: "What do I still need to be involved in?", answer: "Only decisions above an agreed spending threshold, and anything legal that needs a landlord's signature. Everything routine is handled without contacting you." },
      { question: "How often is the property inspected?", answer: "Quarterly as standard, with a written report and photos after each visit, more often if a tenancy has flagged issues." },
      { question: "What happens if a tenant stops paying?", answer: "Arrears are followed up within 48 hours, and if it escalates we handle the formal notice process and keep you informed at each stage." },
      { question: "Is there a setup fee?", answer: "No — the management fee is a percentage of rent collected, with no separate onboarding charge for properties already tenanted." },
      { question: "Can I take back day-to-day control later?", answer: "Yes, with notice at any renewal point, and we'll hand over a full record of the tenancy so nothing is lost in the transition." },
    ],
    relatedLinks: [
      { title: "Vacant property management", href: "/landlords/vacant-property-management", blurb: "For properties between tenancies or awaiting sale." },
      { title: "HMO management", href: "/landlords/hmo-management", blurb: "The extra layer of compliance houses in multiple occupation need." },
      { title: "Landlord guide", href: "/landlords/guide", blurb: "A full download on compliance, tax and the letting process." },
    ],
    ctaHeadline: "See what full management would cost for your property",
  },

  "vacant-property-management": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Landlords", href: "/landlords" }, { label: "Vacant property management" }],
    eyebrow: "Vacant properties",
    title: "An empty property is a liability. We keep it from becoming a problem",
    subhead:
      "Regular inspections, security checks and insurance-compliant upkeep for properties between tenancies, awaiting probate, or on the market for sale.",
    primaryCta: { label: "Get a free valuation", href: "/free-rental-valuation" },
    secondaryCta: { label: "Talk to us about your property", href: "/contact" },
    heroImageSeed: 4005,
    intro: [
      "Empty properties are exposed in ways occupied ones aren't: undetected leaks, squatting, invalidated insurance from prolonged vacancy, and the slow deterioration that comes from nobody noticing a problem for weeks. Most vacant-property insurance policies also require documented periodic inspections to stay valid.",
      "We visit on a schedule that satisfies typical insurer requirements, check for anything that needs attention, and keep the property in a lettable or saleable state so it's ready the moment your circumstances change.",
    ],
    features: [
      { icon: ShieldCheck, title: "Insurer-compliant visits", body: "Inspections logged on a schedule that matches typical vacant-property insurance conditions." },
      { icon: AlertTriangle, title: "Security checks", body: "Locks, windows and alarm systems checked each visit, with issues flagged immediately." },
      { icon: Wrench, title: "Minor upkeep", body: "Small issues fixed before they become expensive ones — a dripping tap doesn't wait for a tenant to report it." },
      { icon: Camera, title: "Photo reporting", body: "Each visit produces a dated photo report you can pass to your insurer if needed." },
      { icon: FileText, title: "Meter readings", body: "Utilities monitored so there are no surprises when the property is re-let or sold." },
      { icon: Home, title: "Ready to re-let", body: "The property stays in a condition that doesn't need a scramble before the next tenancy starts." },
    ],
    faqs: [
      { question: "How often do you visit an empty property?", answer: "Fortnightly as standard, which satisfies most vacant-property insurance policies — we can go weekly for higher-risk properties." },
      { question: "Do you handle the insurance itself?", answer: "No, but we provide the inspection records most insurers require, and can point you to specialist vacant-property cover if your current policy won't extend." },
      { question: "What if you find a problem during a visit?", answer: "We flag it immediately with photos, and for anything urgent we act first and inform you same day rather than waiting for a scheduled report." },
      { question: "Can this convert into full letting once I'm ready?", answer: "Yes — moving from vacant management into tenant find or full management is a simple switch, with no gap in oversight." },
      { question: "Is this suitable for a property in probate?", answer: "It's one of the most common reasons landlords use this service, alongside properties being renovated or marketed for sale." },
    ],
    relatedLinks: [
      { title: "Residential management", href: "/landlords/residential-management", blurb: "For when the property is ready to be let again." },
      { title: "Property maintenance", href: "/landlords/property-maintenance", blurb: "Larger repair or renovation work before re-letting." },
      { title: "Free rental valuation", href: "/free-rental-valuation", blurb: "Find out what the property could earn once it's ready." },
    ],
  },

  "hmo-management": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Landlords", href: "/landlords" }, { label: "HMO management" }],
    eyebrow: "Houses in multiple occupation",
    title: "HMOs come with licensing rules that punish getting it wrong",
    subhead:
      "Room-by-room compliance, licensing renewals and the higher turnover of tenant admin that shared housing brings — managed as a specialism, not an add-on.",
    primaryCta: { label: "Get a free valuation", href: "/free-rental-valuation" },
    secondaryCta: { label: "Read the landlord guide", href: "/landlords/guide" },
    heroImageSeed: 4006,
    intro: [
      "Most councils require a licence for any property let to five or more people from two or more households sharing facilities, and many have added their own additional or selective licensing schemes on top of the mandatory national one. The room sizes, fire safety standards and amenity requirements are all specified in detail, and falling short carries real financial penalties, not just a warning letter.",
      "We manage HMOs as their own category: licence applications and renewals tracked against council-specific deadlines, fire doors and alarms checked on a schedule that satisfies inspection, and the higher tenant turnover that shared housing brings handled without every room change becoming a fire drill.",
    ],
    features: [
      { icon: FileCheck, title: "Licence applications", body: "Mandatory, additional and selective licensing applications handled and tracked to renewal." },
      { icon: ShieldCheck, title: "Fire safety compliance", body: "Fire doors, alarms and escape routes checked against the standard your council's licence requires." },
      { icon: Users, title: "Room-by-room tenancies", body: "Individual agreements per room, each tracked separately for rent, renewals and check-outs." },
      { icon: ClipboardList, title: "Amenity standards", body: "Kitchen and bathroom ratios kept compliant as occupancy changes." },
      { icon: Wrench, title: "Higher-turnover maintenance", body: "Shared spaces see more wear — we budget and respond for that reality, not a single-tenant pace." },
      { icon: Scale, title: "Council liaison", body: "Direct contact with environmental health where an inspection or complaint needs a fast, accurate response." },
    ],
    stats: [
      { value: "5+", label: "Unrelated occupants triggering mandatory licensing" },
      { value: "100%", label: "Of our managed HMOs currently licensed" },
      { value: "12mo", label: "Typical licence renewal cycle we track" },
    ],
    faqs: [
      { question: "Do I need a licence for my property?", answer: "If five or more people from two or more households share facilities, you almost certainly need a mandatory HMO licence — many councils also require licences below that threshold under additional or selective schemes, which we check against your specific address." },
      { question: "What happens if I let an HMO unlicensed?", answer: "Councils can issue unlimited fines and, separately, tenants can apply for a rent repayment order requiring you to refund up to 12 months of rent. It's a real financial exposure, not a formality." },
      { question: "Do you handle individual room tenancies?", answer: "Yes — each room is let and tracked as its own tenancy, with its own start date, rent and renewal, rather than treating the house as one contract." },
      { question: "How often are fire safety checks done?", answer: "In line with your licence conditions, typically annual for alarm and fire door certification, with visual checks at every routine inspection." },
      { question: "Can you take over an existing unlicensed HMO?", answer: "Yes — we run a compliance audit first, flag what needs fixing before an application goes in, and manage the licensing process from there." },
    ],
    relatedLinks: [
      { title: "Residential management", href: "/landlords/residential-management", blurb: "Full management for single-tenancy residential properties." },
      { title: "Property maintenance", href: "/landlords/property-maintenance", blurb: "Compliance-grade repairs for fire doors, alarms and shared amenities." },
      { title: "Landlord guide", href: "/landlords/guide", blurb: "Licensing thresholds and compliance explained in full." },
    ],
  },

  "property-maintenance": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Landlords", href: "/landlords" }, { label: "Property maintenance" }],
    eyebrow: "Maintenance",
    title: "A contractor network that turns up, quotes fairly, and finishes the job",
    subhead:
      "Available on its own or bundled into full management — vetted tradespeople for repairs, compliance certificates and larger refurbishment work.",
    primaryCta: { label: "Get a free valuation", href: "/free-rental-valuation" },
    secondaryCta: { label: "See full management instead", href: "/landlords/residential-management" },
    heroImageSeed: 4007,
    intro: [
      "Finding a plumber who answers the phone, quotes honestly and actually shows up is harder than it should be, and it gets worse when you're managing a property from a distance. Our contractor network is vetted on exactly that: response time, price consistency and follow-through, checked against every job we send them.",
      "You can use this as a standalone service — call it in when something breaks — or have it run automatically as part of full management, where maintenance requests are triaged and booked without you needing to be the one chasing a callback.",
    ],
    features: [
      { icon: Wrench, title: "Vetted contractors", body: "Plumbers, electricians and general tradespeople checked on price, reliability and quality of work." },
      { icon: Clock, title: "Fast response", body: "Urgent issues — no heating, no water, security — triaged the same day." },
      { icon: FileCheck, title: "Compliance certificates", body: "Gas safety, EICR and PAT testing scheduled and certificates filed automatically." },
      { icon: HardHat, title: "Refurbishment work", body: "Larger jobs — kitchens, bathrooms, redecoration between tenancies — quoted and project-managed." },
      { icon: FileText, title: "Itemised invoicing", body: "Every job comes with a clear invoice, no vague lump-sum charges." },
      { icon: ShieldCheck, title: "Warrantied work", body: "Contractors stand behind their work — call-backs for a fault within the warranty period are free." },
    ],
    faqs: [
      { question: "Can I use this without full management?", answer: "Yes — plenty of landlords who self-manage use just the contractor network for repairs and compliance certificates." },
      { question: "How fast is an emergency response?", answer: "No heating, no hot water, or a security issue gets a contractor out the same day wherever possible; routine repairs are typically booked within the week." },
      { question: "Do you mark up contractor invoices?", answer: "No — you see the contractor's rate. If you're on a management plan, the coordination is covered by the management fee, not added to the job cost." },
      { question: "Can tenants contact contractors directly?", answer: "Only for jobs you've explicitly authorised for direct contact; otherwise every request is triaged through us first so nothing gets booked without sign-off." },
      { question: "Do you handle larger renovation projects?", answer: "Yes — kitchen and bathroom refits, full redecoration and similar work is quoted and project-managed from start to finish." },
    ],
    relatedLinks: [
      { title: "Residential management", href: "/landlords/residential-management", blurb: "Have maintenance triaged automatically as part of full management." },
      { title: "HMO management", href: "/landlords/hmo-management", blurb: "Fire safety and amenity compliance for shared housing." },
      { title: "Vacant property management", href: "/landlords/vacant-property-management", blurb: "Upkeep for properties between tenancies." },
    ],
  },
};
