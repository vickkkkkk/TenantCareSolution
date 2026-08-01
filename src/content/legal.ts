import type { LegalPageContent } from "@/components/templates/legal-page-template";

export const legalPages: Record<"terms" | "privacy" | "cookies", LegalPageContent> = {
  terms: {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Terms" }],
    title: "Terms of use",
    lastUpdated: "1 July 2026",
    sections: [
      {
        id: "acceptance",
        heading: "Acceptance of these terms",
        body: [
          "By browsing this website, registering an account, or submitting an enquiry through any form on it, you agree to these terms of use. If you don't agree with them, please don't use the site.",
          "These terms sit alongside our privacy policy and cookie policy, which together explain how we handle your data and how the site works technically.",
        ],
      },
      {
        id: "use-of-site",
        heading: "Permitted use of the site",
        body: [
          "This site is provided for individuals searching for rental property, landlords researching letting and management services, and their representatives. You may not use automated tools to scrape listings, republish content from this site elsewhere without permission, or attempt to interfere with the site's normal operation.",
          "Property listings are provided by managing agents and landlords using the platform. While we take reasonable steps to verify listing accuracy, we don't guarantee that every detail — availability, price, features — is current at the exact moment you view it. Always confirm details directly with the managing agent before making a decision.",
        ],
      },
      {
        id: "accounts",
        heading: "Accounts and registration",
        body: [
          "Creating an account requires accurate information. You're responsible for keeping your login details secure and for any activity that happens under your account. Tell us immediately if you believe your account has been accessed without authorisation.",
          "We may suspend or close accounts that violate these terms, that are used fraudulently, or that remain inactive for an extended period.",
        ],
      },
      {
        id: "enquiries-and-forms",
        heading: "Enquiries and forms",
        body: [
          "Information you submit through an enquiry, registration or valuation form is passed to the relevant agent or, where applicable, our internal team, in order to respond to your request. Submitting a form doesn't create a tenancy, contract or binding agreement of any kind — it starts a conversation.",
        ],
      },
      {
        id: "liability",
        heading: "Limitation of liability",
        body: [
          "We aren't liable for losses arising from reliance on listing information that later turns out to be inaccurate, for the actions of third-party agents or landlords using the platform, or for interruptions to the site's availability caused by factors outside our reasonable control.",
          "Nothing in these terms limits our liability where it would be unlawful to do so, including for death or personal injury caused by negligence, or for fraud.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to these terms",
        body: [
          "We may update these terms from time to time to reflect changes in how the site works or in relevant law. The date at the top of this page shows when it was last revised. Continued use of the site after a change constitutes acceptance of the updated terms.",
        ],
      },
      {
        id: "contact",
        heading: "Contact",
        body: [
          "Questions about these terms can be sent through the contact page, or by phone during normal business hours.",
        ],
      },
    ],
  },

  privacy: {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Privacy" }],
    title: "Privacy policy",
    lastUpdated: "1 July 2026",
    sections: [
      {
        id: "what-we-collect",
        heading: "What information we collect",
        body: [
          "We collect information you provide directly — your name, email, phone number and message content when you submit an enquiry, register an account, or request a valuation. We also collect basic technical information automatically, such as your IP address and browser type, to keep the site secure and working correctly.",
          "If you register as a landlord or agent, we collect additional details needed to list and manage properties, including property addresses and, where relevant, payment details for rent processing.",
        ],
      },
      {
        id: "how-we-use-it",
        heading: "How we use your information",
        body: [
          "We use your information to respond to enquiries, connect you with the relevant landlord or agent, process tenancy or management applications, send alerts for saved searches you've set up, and meet our legal and regulatory obligations as a lettings business.",
          "We don't sell your personal information to third parties. Where information is shared with a managing agent or landlord, it's shared only to the extent needed to progress your enquiry or application.",
        ],
      },
      {
        id: "legal-basis",
        heading: "Legal basis for processing",
        body: [
          "We process your data under a mix of legal bases depending on context: consent (for marketing communications and non-essential cookies), contract (to provide services you've requested), and legitimate interest (for basic site security and fraud prevention).",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        body: [
          "Enquiry and account data is retained for as long as your account is active, plus a reasonable period afterward to meet legal and accounting obligations. You can request deletion at any time, subject to any records we're legally required to retain.",
        ],
      },
      {
        id: "your-rights",
        heading: "Your rights",
        body: [
          "Under UK GDPR, you have the right to access the personal data we hold about you, request corrections, request deletion, object to certain processing, and request a copy of your data in a portable format. Contact us through the details below to exercise any of these rights.",
        ],
      },
      {
        id: "third-parties",
        heading: "Third-party services",
        body: [
          "We use third-party providers for functions including email delivery, payment processing and mapping. These providers only receive the information necessary to perform their function and are bound by their own data protection obligations.",
        ],
      },
      {
        id: "contact-privacy",
        heading: "Contact",
        body: [
          "For any privacy-related question or request, use the contact page or write to our data protection contact directly — details are available on request.",
        ],
      },
    ],
  },

  cookies: {
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Cookies" }],
    title: "Cookie policy",
    lastUpdated: "1 July 2026",
    sections: [
      {
        id: "what-are-cookies",
        heading: "What cookies are",
        body: [
          "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you logged in, and understand how the site is used so it can be improved.",
        ],
      },
      {
        id: "essential-cookies",
        heading: "Essential cookies",
        body: [
          "These are required for the site to function — keeping you logged in, remembering items in a comparison list, and maintaining basic security. Essential cookies can't be switched off, since the site won't work correctly without them.",
        ],
      },
      {
        id: "analytics-cookies",
        heading: "Analytics cookies",
        body: [
          "These help us understand how visitors use the site — which pages are popular, where people drop off during a search, and whether changes we make actually improve things. Analytics data is aggregated and doesn't identify you individually.",
        ],
      },
      {
        id: "marketing-cookies",
        heading: "Marketing cookies",
        body: [
          "Used to show you relevant listings or offers on other sites based on your activity here. These are optional and only set with your consent through the cookie banner.",
        ],
      },
      {
        id: "managing-cookies",
        heading: "Managing your preferences",
        body: [
          "You can change your cookie preferences at any time using the link in the site footer, or by adjusting settings in your browser. Turning off non-essential cookies won't stop the site working, though some personalisation features may be affected.",
        ],
      },
    ],
  },
};
