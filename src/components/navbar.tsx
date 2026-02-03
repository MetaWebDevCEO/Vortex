"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/company", label: "Company" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Support" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-6 sm:px-10 lg:px-12">
        <div className="relative flex h-full items-center ml-10 w-32">
          <Link href="/" className="relative flex items-center w-full h-full transition-opacity hover:opacity-80">
            <Image 
              src="/vortex.svg" 
              alt="Vortex Logo" 
              width={128} 
              height={128} 
              className="absolute top-[40%] left-0 -translate-y-1/2 h-32 w-32 max-w-none"
            />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-primary/10 data-[active]:bg-primary/10 h-10 px-5 text-base font-medium`}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="rounded-full px-6 font-semibold text-base hover:bg-primary/10">
            Log in
          </Button>
          <Button className="rounded-full px-6 shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 font-semibold text-base">
            Sign In
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-full h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-bold flex items-center gap-2 text-xl">
                  <Image 
                    src="/vortex.svg" 
                    alt="Vortex Logo" 
                    width={48} 
                    height={48} 
                    className="h-12 w-12"
                  /> 
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-10">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium py-2 px-4 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary block"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-6">
                  <Button variant="ghost" className="w-full rounded-full text-base font-semibold">
                    Log in
                  </Button>
                  <Button className="w-full rounded-full text-base font-semibold shadow-md">
                    Sign In
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
