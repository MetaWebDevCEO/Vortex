"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const navLinks = [
    { label: "Products", href: "/products", hasDropdown: true },
    { label: "Playground", href: "/playground" },
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations", hasDropdown: true },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources", hasDropdown: true },
  ];

  return (
    <div className="fixed top-0 z-50 w-full flex flex-col">
      {/* Announcement Banner */}
      <div className="w-full bg-black py-2.5 px-4 flex items-center justify-center gap-2 group cursor-pointer transition-colors hover:bg-[#111111]">
        <p className="text-[11px] sm:text-xs text-white font-medium tracking-wide flex items-center">
          <span className="opacity-70 mr-2">New:</span>
          Vortex Global Express is now live in 40+ countries.
          <Link href="/blog/global-express" className="ml-2 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">
            Learn more
          </Link>
          <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>

      {/* Main Navbar */}
      <header className="w-full bg-white/50 backdrop-blur-md border-b border-[#eeeeee] transition-all duration-300">
        <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-6 sm:px-10 lg:px-12">
          {/* Logo */}
          <div className="relative flex h-full items-center w-32">
            <Link href="/" className="relative flex items-center w-full h-full grayscale">
              <Image 
                src="/vortex.svg" 
                alt="Vortex Logo" 
                width={128} 
                height={128} 
                className="absolute top-1/2 left-0 -translate-y-1/2 h-32 w-32 max-w-none opacity-90"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="group flex items-center gap-1 text-[14px] font-medium text-[#444444] hover:text-black transition-colors"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full px-6 text-sm font-bold text-[#666666] hover:text-black hover:bg-transparent">
                Access
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-black text-white hover:bg-[#222222] rounded-full px-6 text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.05)]">
                Initialize
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="xl:hidden flex items-center gap-4">
            <div className="hidden md:block h-8 w-px bg-[#eeeeee]" />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black hover:bg-transparent">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">System Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white border-[#eeeeee] text-black">
                <div className="flex flex-col gap-6 mt-12 text-sm font-medium">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.label}
                      href={link.href} 
                      className="flex items-center justify-between text-[#666666] hover:text-black py-2 border-b border-[#f5f5f5]"
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown className="h-4 w-4 opacity-50" />}
                    </Link>
                  ))}
                  <div className="h-px bg-[#eeeeee] my-4" />
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-[#dddddd] rounded-full text-sm font-bold">Access</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-black text-white hover:bg-[#222222] rounded-full text-sm font-bold">Initialize</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}
