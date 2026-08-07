"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Phone, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/nav";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bone/95 backdrop-blur supports-backdrop-filter:bg-bone/80 border-b border-sand">
      <div className="hidden md:flex items-center justify-end gap-6 px-8 py-1.5 text-xs bg-evergreen text-bone font-data">
        <a href="tel:+447428409407" className="flex items-center gap-1.5 hover:text-zest">
          <Phone className="size-3.5" /> +44 7428409407
        </a>
        <a href="mailto:info@tenantcaresolutions.co.uk" className="flex items-center gap-1.5 hover:text-zest">
          <Mail className="size-3.5" /> info@tenantcaresolutions.co.uk
        </a>
      </div>

      <div className="flex items-center justify-between px-6 md:px-8 h-16">
        <Link href="/" className="font-display text-xl font-extrabold text-evergreen">
          Tenant Care Solution
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {mainNav.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink hover:text-evergreen transition-colors">
                    {item.label}
                    <ChevronDown className="size-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-56">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link href={child.href}>{child.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-ink hover:text-evergreen transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" className="hidden sm:inline-flex bg-evergreen hover:bg-moss" asChild>
            <Link href="/register">Register</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-display text-evergreen">Tenant Care Solution</SheetTitle>
              </SheetHeader>
              <Accordion type="single" collapsible className="px-4 pb-4">
                {mainNav.map((item) =>
                  item.children ? (
                    <AccordionItem key={item.label} value={item.label}>
                      <AccordionTrigger className="text-sm font-medium">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-sm text-moss hover:text-evergreen py-1"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-sm font-medium border-b border-sand"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </Accordion>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button variant="outline" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button className="bg-evergreen hover:bg-moss" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
