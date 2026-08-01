export type NavLink = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavLink[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  {
    label: "Landlords",
    href: "/landlords",
    children: [
      { label: "Find a Tenant", href: "/landlords/find-a-tenant" },
      { label: "Letting Agency", href: "/landlords/letting-agency" },
      { label: "Residential Management", href: "/landlords/residential-management" },
      { label: "Vacant Property Management", href: "/landlords/vacant-property-management" },
      { label: "HMO Management", href: "/landlords/hmo-management" },
      { label: "Property Maintenance", href: "/landlords/property-maintenance" },
      { label: "Landlord Guide", href: "/landlords/guide" },
    ],
  },
  {
    label: "Tenants",
    href: "/tenants",
    children: [
      { label: "Find a Rental Property", href: "/tenants/find-a-rental-property" },
      { label: "Register", href: "/tenants/register" },
      { label: "Secure Deposit Registration", href: "/tenants/secure-deposit-registration" },
      { label: "High-Quality Rentals Properties", href: "/tenants/high-quality-rentals-properties" },
      { label: "Tenant Guide", href: "/tenants/guide" },
    ],
  },
  {
    label: "Mortgage",
    href: "/mortgage",
    children: [
      { label: "Commercial", href: "/mortgage/commercial" },
      { label: "First-Time Landlord", href: "/mortgage/first-time-landlord" },
      { label: "Residential", href: "/mortgage/residential" },
      { label: "Portfolio", href: "/mortgage/portfolio" },
      { label: "Remortgage", href: "/mortgage/remortgage" },
      { label: "Experienced Landlord", href: "/mortgage/experienced-landlord" },
    ],
  },
  { label: "Free Valuation", href: "/free-rental-valuation" },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "Agents", href: "/agents" },
      { label: "FAQs", href: "/faqs" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Service Areas",
    href: "/areas/london",
    children: [
      { label: "London", href: "/areas/london" },
      { label: "Birmingham", href: "/areas/birmingham" },
      { label: "Manchester", href: "/areas/manchester" },
      { label: "Glasgow", href: "/areas/glasgow" },
      { label: "Northampton", href: "/areas/northampton" },
      { label: "Belfast", href: "/areas/belfast" },
      { label: "Liverpool", href: "/areas/liverpool" },
      { label: "Oxford", href: "/areas/oxford" },
      { label: "Leeds", href: "/areas/leeds" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Agents", href: "/agents" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: NavLink[] = [
  { label: "Search rentals", href: "/search" },
  { label: "Free rental valuation", href: "/free-rental-valuation" },
  { label: "Register as a tenant", href: "/tenants/register" },
  { label: "Landlord services", href: "/landlords" },
  { label: "Compare listings", href: "/compare" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
];
