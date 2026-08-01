import type { MortgagePageContent } from "@/components/templates/mortgage-page-template";

export const mortgageHub: MortgagePageContent = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Mortgage" }],
  title: "Mortgage advice for every stage of being a landlord",
  subhead:
    "From a first buy-to-let to refinancing a twenty-property portfolio, arranged through a panel of FCA-authorised brokers who specialise in landlord lending.",
  whoItsFor: [
    "First-time landlords buying their first rental property",
    "Existing landlords remortgaging onto a better rate",
    "Portfolio landlords structuring finance across multiple properties",
    "Landlords converting a residential mortgage to buy-to-let (let-to-buy)",
    "Commercial property investors, including mixed-use and HMOs",
  ],
  eligibility: [
    "Minimum deposit typically 20-25% of property value for buy-to-let",
    "Rental income usually needs to cover 125-145% of the mortgage payment",
    "Most lenders require a minimum personal income, often around £25,000",
    "Portfolio landlords (4+ properties) go through specialist portfolio underwriting",
  ],
  rateTable: [
    { product: "2-year fixed buy-to-let", rate: "from 5.1%", term: "2 years" },
    { product: "5-year fixed buy-to-let", rate: "from 5.4%", term: "5 years" },
    { product: "Tracker buy-to-let", rate: "from 5.6%", term: "2 years" },
    { product: "Portfolio fixed", rate: "from 5.7%", term: "5 years" },
  ],
  applicationSteps: [
    { title: "Initial conversation", body: "A broker reviews your circumstances and the property, no cost or obligation." },
    { title: "Agreement in principle", body: "A soft-search AIP confirms roughly how much you could borrow." },
    { title: "Full application", body: "Documents submitted and the lender's underwriting begins." },
    { title: "Offer and completion", body: "Formal mortgage offer issued, then completion alongside your solicitor." },
  ],
  documents: [
    "Proof of ID (passport or driving licence)",
    "Proof of address, dated within 3 months",
    "Last 3 months' bank statements",
    "Evidence of deposit source",
    "SA302 or accountant's certificate if self-employed",
    "Existing mortgage statements, if remortgaging",
  ],
  faqs: [
    { question: "Do you charge a broker fee?", answer: "The initial conversation and agreement in principle are free. Any broker fee for a full application is confirmed upfront before you commit to anything." },
    { question: "Can I get a mortgage as a first-time landlord?", answer: "Yes — see the first-time landlord page for lender criteria specific to buying your first rental property." },
    { question: "What's the difference between a residential and buy-to-let mortgage?", answer: "Buy-to-let lending is assessed primarily on the rental income the property will generate, not your personal salary, though most lenders still require a minimum personal income." },
    { question: "How long does an application take?", answer: "From agreement in principle to formal offer typically takes three to six weeks, depending on the lender and how quickly documents are provided." },
    { question: "Can you help with more than five properties?", answer: "Yes — see the portfolio landlord page for how lending is structured once you're managing a larger number of properties." },
  ],
};

export const mortgagePages: Record<string, MortgagePageContent> = {
  commercial: {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Mortgage", href: "/mortgage" }, { label: "Commercial" }],
    title: "Commercial mortgages for mixed-use and non-standard property",
    subhead:
      "Shops with flats above, offices, HMOs beyond standard licensing thresholds, and other property that doesn't fit a standard residential buy-to-let product.",
    whoItsFor: [
      "Investors buying mixed-use property (retail with residential above)",
      "Landlords with large HMOs (7+ bedrooms) that exceed standard buy-to-let criteria",
      "Businesses purchasing their own trading premises",
      "Investors diversifying into commercial units",
    ],
    eligibility: [
      "Deposit typically 30-40% for commercial-use property",
      "Lending assessed on rental yield and covenant strength of any tenant business",
      "Larger HMOs assessed under specialist semi-commercial criteria",
      "A trading history or business plan required for owner-occupier commercial purchases",
    ],
    rateTable: [
      { product: "Semi-commercial (mixed-use)", rate: "from 6.2%", term: "Up to 25 years" },
      { product: "Large HMO (7+ beds)", rate: "from 5.9%", term: "Up to 25 years" },
      { product: "Owner-occupier commercial", rate: "from 6.5%", term: "Up to 20 years" },
    ],
    applicationSteps: [
      { title: "Property assessment", body: "The lender's surveyor evaluates the commercial element and any residential component separately." },
      { title: "Financial review", body: "Business accounts, rental schedules or covenant strength assessed depending on use." },
      { title: "Underwriting", body: "Specialist commercial underwriters review the application, typically slower than residential buy-to-let." },
      { title: "Completion", body: "Legal work often involves a specialist commercial solicitor alongside your usual conveyancer." },
    ],
    documents: [
      "Business accounts (last 2-3 years) if applicable",
      "Existing tenancy or lease agreements for any commercial tenants",
      "Schedule of accommodation for mixed-use property",
      "Proof of ID and address",
      "Deposit source evidence",
    ],
    faqs: [
      { question: "What counts as a commercial mortgage?", answer: "Any property that isn't a standard residential buy-to-let — mixed-use buildings, large HMOs beyond typical criteria, and owner-occupied trading premises all fall under commercial lending." },
      { question: "Are commercial mortgage rates higher?", answer: "Generally yes, reflecting the higher perceived risk and often smaller lender pool compared to standard residential buy-to-let." },
      { question: "How long does a commercial mortgage take?", answer: "Longer than residential — six to twelve weeks is typical given the additional valuation and underwriting steps." },
      { question: "Can I get commercial finance for a shop with a flat above?", answer: "Yes, this is one of the most common semi-commercial scenarios, assessed on both the commercial rent and residential rental value." },
    ],
  },

  "first-time-landlord": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Mortgage", href: "/mortgage" }, { label: "First-time landlord" }],
    title: "Your first buy-to-let, without the lender criteria catching you out",
    subhead:
      "First-time landlord lending has its own set of rules — different minimum income, stricter rental cover requirements, and fewer lenders willing to consider you.",
    whoItsFor: [
      "Anyone who has never held a buy-to-let mortgage before",
      "Homeowners buying their first rental property alongside their main residence",
      "First-time buyers considering buy-to-let instead of a residential purchase",
    ],
    eligibility: [
      "Most first-time landlord lenders require you to already own your own home",
      "Minimum personal income requirement, typically £25,000+",
      "Deposit usually 25% minimum, sometimes higher than for experienced landlords",
      "Rental income must typically cover at least 145% of the mortgage payment, a higher bar than standard buy-to-let",
    ],
    rateTable: [
      { product: "First-time landlord 2-year fixed", rate: "from 5.3%", term: "2 years" },
      { product: "First-time landlord 5-year fixed", rate: "from 5.6%", term: "5 years" },
    ],
    applicationSteps: [
      { title: "Eligibility check", body: "We confirm which lenders will consider a first-time landlord application before you commit to a property." },
      { title: "Agreement in principle", body: "A soft-search AIP based on your income and the expected rental figure." },
      { title: "Property and application", body: "Once you've found a property, the full application and valuation proceed together." },
      { title: "Offer and completion", body: "Formal offer issued, then completion with your solicitor." },
    ],
    documents: [
      "Proof of ID and address",
      "Last 3 months' payslips or 2 years' accounts if self-employed",
      "Evidence you own your current residential property (if applicable)",
      "Deposit source evidence",
    ],
    faqs: [
      { question: "Can I get a buy-to-let mortgage without owning a home already?", answer: "It's possible but the lender pool shrinks considerably — most first-time landlord products require you to be a homeowner first." },
      { question: "Why is the rental cover requirement higher for first-time landlords?", answer: "Lenders treat first-time landlords as a slightly higher risk category, so they typically require rental income to cover a larger multiple of the mortgage payment." },
      { question: "Can I use projected rent from an estate agent?", answer: "Yes — a rental valuation from a letting agent is standard evidence for the lender's rental cover calculation." },
      { question: "Is it harder to get approved as a first-time landlord?", answer: "It's more restrictive, not impossible — fewer lenders, slightly higher rates typically, but a straightforward process once you're matched to the right lender." },
    ],
  },

  residential: {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Mortgage", href: "/mortgage" }, { label: "Residential" }],
    title: "Residential mortgage advice alongside your letting business",
    subhead:
      "For landlords who also need advice on their own home — a purchase, a remortgage, or moving while retaining a previous property to let.",
    whoItsFor: [
      "Landlords buying or moving their own residential home",
      "Homeowners remortgaging their main residence",
      "Anyone converting a former home into a rental (let-to-buy)",
    ],
    eligibility: [
      "Assessed on personal income and existing financial commitments, including any buy-to-let mortgages held",
      "Standard residential deposit requirements, typically from 5-10%",
      "Let-to-buy applications require the departing property to meet buy-to-let rental cover criteria",
    ],
    rateTable: [
      { product: "2-year fixed residential", rate: "from 4.6%", term: "2 years" },
      { product: "5-year fixed residential", rate: "from 4.4%", term: "5 years" },
      { product: "Let-to-buy", rate: "from 5.2%", term: "2-5 years" },
    ],
    applicationSteps: [
      { title: "Affordability review", body: "Income, outgoings and any existing mortgages assessed together." },
      { title: "Agreement in principle", body: "Confirms your likely borrowing before you make an offer." },
      { title: "Full application", body: "Documents submitted, valuation instructed." },
      { title: "Offer and completion", body: "Formal offer, then completion alongside your solicitor." },
    ],
    documents: [
      "Proof of ID and address",
      "Last 3 months' payslips or accounts",
      "Last 3 months' bank statements",
      "Details of existing mortgages, including any buy-to-let lending",
    ],
    faqs: [
      { question: "What is let-to-buy?", answer: "Converting your existing home into a rental property while buying a new residential home, typically requiring a buy-to-let remortgage on the departing property alongside a new residential mortgage." },
      { question: "Does having buy-to-let mortgages affect my residential application?", answer: "Lenders factor in existing mortgage commitments, but rental income from let properties is usually treated separately rather than counted against personal affordability." },
      { question: "Can I use rental income to help me buy my own home?", answer: "Generally no — residential mortgage affordability is based on personal income, not rental income from other properties, though strong overall financial standing helps." },
    ],
  },

  portfolio: {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Mortgage", href: "/mortgage" }, { label: "Portfolio" }],
    title: "Structuring finance across a growing portfolio",
    subhead:
      "Once you hold four or more mortgaged buy-to-let properties, lenders assess you differently — portfolio-wide, not property by property.",
    whoItsFor: [
      "Landlords with four or more mortgaged buy-to-let properties",
      "Landlords looking to refinance a portfolio to release equity for further purchases",
      "Investors considering moving personally-held properties into a limited company structure",
    ],
    eligibility: [
      "Portfolio-wide loan-to-value and rental cover assessed across all properties, not just the one being financed",
      "Detailed portfolio schedule required: property values, outstanding mortgages, rental income per property",
      "Limited company (SPV) lending assessed on the company's structure and directors' experience",
    ],
    rateTable: [
      { product: "Portfolio 5-year fixed", rate: "from 5.7%", term: "5 years" },
      { product: "Limited company (SPV) buy-to-let", rate: "from 5.9%", term: "2-5 years" },
    ],
    applicationSteps: [
      { title: "Portfolio review", body: "We build a full schedule of your existing properties, mortgages and rental income." },
      { title: "Lender matching", body: "Portfolio applications go to specialist lenders comfortable underwriting the whole book, not just one property." },
      { title: "Underwriting", body: "The lender assesses portfolio-wide metrics alongside the specific property being financed." },
      { title: "Offer and completion", body: "Formal offer, then completion, often coordinated across several properties at once." },
    ],
    documents: [
      "Full portfolio schedule (values, mortgages, rents)",
      "3 years' accounts if trading through a limited company",
      "Proof of ID and address for all directors or individuals on the mortgage",
      "Existing lender statements for each mortgaged property",
    ],
    faqs: [
      { question: "At how many properties am I classed as a portfolio landlord?", answer: "Most lenders apply portfolio underwriting from four or more mortgaged buy-to-let properties, regardless of which lender holds each mortgage." },
      { question: "Should I hold my portfolio personally or through a limited company?", answer: "It depends on your tax position and long-term plans — this is a decision worth taking alongside an accountant, and we can coordinate lending around either structure." },
      { question: "Can I release equity from an existing portfolio to buy another property?", answer: "Yes — refinancing part of a portfolio to release equity for a further purchase is one of the most common reasons portfolio landlords come to us." },
    ],
  },

  remortgage: {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Mortgage", href: "/mortgage" }, { label: "Remortgage" }],
    title: "Remortgaging before your current rate ends",
    subhead:
      "Whether you're coming off a fixed rate, releasing equity, or consolidating several mortgages, timing a remortgage right protects you from reverting to a lender's standard variable rate.",
    whoItsFor: [
      "Landlords whose current fixed or tracker rate is ending within 6 months",
      "Anyone currently on a lender's standard variable rate",
      "Landlords wanting to release equity for another purchase or renovation",
    ],
    eligibility: [
      "Most lenders allow rate applications up to 6 months before the current deal ends",
      "Rental income must still meet the new lender's cover requirements at current rates",
      "Property value reassessed — equity released depends on current market value, not original purchase price",
    ],
    rateTable: [
      { product: "2-year fixed remortgage", rate: "from 5.1%", term: "2 years" },
      { product: "5-year fixed remortgage", rate: "from 5.4%", term: "5 years" },
      { product: "Product transfer (same lender)", rate: "from 5.2%", term: "2-5 years" },
    ],
    applicationSteps: [
      { title: "Rate review", body: "We check your current deal's end date and compare product transfer versus switching lender." },
      { title: "Valuation", body: "The property is revalued to confirm current loan-to-value and any equity available." },
      { title: "Application", body: "New lender application submitted, or a product transfer arranged with your existing lender." },
      { title: "Completion", body: "New rate begins the day your existing deal ends, with no gap or reversion to standard variable rate." },
    ],
    documents: [
      "Current mortgage statement",
      "Proof of ID and address",
      "Latest tenancy agreement or rental schedule",
      "Bank statements, last 3 months",
    ],
    faqs: [
      { question: "How early should I start a remortgage?", answer: "Around six months before your current deal ends, so a new rate can complete the same day the old one expires with no reversion period." },
      { question: "What's the difference between a product transfer and a full remortgage?", answer: "A product transfer stays with your existing lender and is usually simpler and faster; a full remortgage switches lender and can access better rates or release more equity, but takes longer." },
      { question: "Can I release equity when I remortgage?", answer: "Yes, subject to the property's current valuation and the new lender's maximum loan-to-value — commonly used to fund a deposit on another property." },
    ],
  },

  "experienced-landlord": {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Mortgage", href: "/mortgage" }, { label: "Experienced landlord" }],
    title: "Lending that reflects an established letting track record",
    subhead:
      "Experienced landlords get access to a wider lender panel, better rental cover ratios and faster underwriting — this is how to make sure your application reflects that.",
    whoItsFor: [
      "Landlords with 2+ years of letting experience and an existing buy-to-let mortgage",
      "Landlords looking to expand a small portfolio into a larger one",
      "Anyone whose current broker isn't presenting the full range of available lenders",
    ],
    eligibility: [
      "Track record demonstrated through existing mortgage statements and tenancy history",
      "Lower rental cover thresholds than first-time landlord products, typically 125%",
      "Wider lender panel available, including specialist and portfolio lenders",
    ],
    rateTable: [
      { product: "Experienced landlord 2-year fixed", rate: "from 5.0%", term: "2 years" },
      { product: "Experienced landlord 5-year fixed", rate: "from 5.3%", term: "5 years" },
    ],
    applicationSteps: [
      { title: "Track record review", body: "Existing mortgages and rental history reviewed to establish the strongest lender match." },
      { title: "Agreement in principle", body: "Soft-search AIP based on the new property and existing portfolio if relevant." },
      { title: "Full application", body: "Submitted with supporting documents and rental valuation." },
      { title: "Offer and completion", body: "Formal offer, then completion with your solicitor." },
    ],
    documents: [
      "Existing buy-to-let mortgage statements",
      "Tenancy agreements or rent schedule for current properties",
      "Proof of ID and address",
      "Deposit source evidence",
    ],
    faqs: [
      { question: "What counts as an experienced landlord?", answer: "Most lenders define this as holding at least one buy-to-let mortgage for 12 months or more, though specific criteria vary by lender." },
      { question: "Do experienced landlords get better rates?", answer: "Often yes — a demonstrated track record widens the lender pool and can improve both rate and rental cover terms compared to a first-time landlord application." },
      { question: "Can I move from experienced landlord into portfolio lending?", answer: "Yes — once you reach four or more mortgaged properties, applications shift to portfolio underwriting, which we handle as a natural next step." },
    ],
  },
};
