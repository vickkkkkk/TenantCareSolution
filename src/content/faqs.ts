export type FaqCategory = {
  category: string;
  items: { question: string; answer: string }[];
};

export const faqCategories: FaqCategory[] = [
  {
    category: "For tenants",
    items: [
      { question: "Do I need to pay a fee to register?", answer: "No, searching and registering for alerts is free for tenants. Any deposit and first month's rent go to the landlord, not to us as a fee." },
      { question: "How do I book a viewing?", answer: "Use the enquiry form on any listing — it goes directly to the managing agent, who will offer available viewing times." },
      { question: "What documents do I need to apply for a tenancy?", answer: "Typically photo ID, proof of income or employment, and a reference from a previous landlord. See the tenant guide for a full breakdown." },
      { question: "Is my deposit protected?", answer: "Yes, deposits on every tenancy arranged through the platform are registered with a government-approved protection scheme." },
    ],
  },
  {
    category: "For landlords",
    items: [
      { question: "How much does letting my property cost?", answer: "It depends on which service you choose — tenant find is a one-off fee, while ongoing services like letting agency and full management are charged as a percentage of rent collected." },
      { question: "How quickly can you find a tenant?", answer: "Most well-priced properties in the cities we cover generate viewings within the first week of listing." },
      { question: "Can I switch from another agency?", answer: "Yes — we handle the handover directly with your outgoing agent and there's no fee for switching." },
      { question: "Do you handle HMO licensing?", answer: "Yes, our HMO management service covers licence applications, renewals and the additional compliance shared housing requires." },
    ],
  },
  {
    category: "Mortgages",
    items: [
      { question: "Do you charge for mortgage advice?", answer: "The initial conversation and agreement in principle are free. Any broker fee for a full application is confirmed upfront." },
      { question: "Can first-time landlords get a buy-to-let mortgage?", answer: "Yes, though the lender pool is smaller and criteria stricter than for experienced landlords — see the first-time landlord mortgage page for details." },
      { question: "How long does a mortgage application take?", answer: "From agreement in principle to formal offer typically takes three to six weeks." },
    ],
  },
  {
    category: "Using the site",
    items: [
      { question: "How current are the listings?", answer: "Agents are expected to update availability status promptly, and we periodically re-verify listings to catch anything that's slipped out of date." },
      { question: "Can I compare properties side by side?", answer: "Yes — the compare tool lets you view up to four properties together on price, size and features." },
      { question: "How do saved searches work?", answer: "Set your criteria once and choose an alert frequency — instant, daily or weekly — and we'll email you when something matching goes live." },
    ],
  },
];
