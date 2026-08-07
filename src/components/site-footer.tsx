import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerCompanyLinks, footerQuickLinks, footerLegalLinks } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="bg-evergreen text-bone mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <p className="font-display text-lg font-extrabold mb-3">Tenant Care Solution</p>
          <p className="text-sm text-bone/70 max-w-xs mb-4">
            Letting and property management across London and the UK's major
            cities, built around clear numbers and fast responses.
          </p>
          <div className="flex flex-col gap-2 text-sm font-data">
            <a href="tel:+447428409407" className="flex items-center gap-2 hover:text-zest">
              <Phone className="size-4" /> +44 7428409407
            </a>
            <a href="mailto:info@tenantcaresolutions.co.uk" className="flex items-center gap-2 hover:text-zest">
              <Mail className="size-4" /> info@tenantcaresolutions.co.uk
            </a>
            <span className="flex items-center gap-2 text-bone/70">
              <MapPin className="size-4" /> London, United Kingdom
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3 text-zest">Quick links</p>
          <ul className="flex flex-col gap-2">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-bone/80 hover:text-zest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3 text-zest">Company</p>
          <ul className="flex flex-col gap-2">
            {footerCompanyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-bone/80 hover:text-zest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3 text-zest">Legal</p>
          <ul className="flex flex-col gap-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-bone/80 hover:text-zest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-bone/15">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-bone/60">
          <p>&copy; {new Date().getFullYear()} Tenant Care Solution. All rights reserved.</p>
          <p>Member of a client money protection scheme &middot; Redress scheme registered</p>
        </div>
      </div>
    </footer>
  );
}
