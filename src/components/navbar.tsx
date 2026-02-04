"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  // TODO: Replace with actual auth logic
  const isLoggedIn = false;

  const handleLoginClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/compañia", label: "Compañia" },
    { href: "/precios", label: "Precios" },
    { href: "/soporte", label: "Soporte" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-6 sm:px-10 lg:px-12">
        <div className="relative flex h-full items-center ml-10 w-32">
          <Link href="/" className="relative flex items-center w-full h-full">
            <Image 
              src="/vortex.svg" 
              alt="Vortex Logo" 
              width={128} 
              height={128} 
              className="absolute top-1/2 left-0 -translate-y-1/2 h-32 w-32 max-w-none"
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
                      className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent hover:text-current data-[active]:bg-primary/10 h-10 px-5 text-base font-medium`}
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
          <Link href="/login">
            <Button variant="ghost" className="rounded-full px-6 font-semibold text-base">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="rounded-full px-6 shadow-lg transition-all duration-300 font-semibold text-base">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-transparent hover:text-current">
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
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-full text-base font-semibold"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </Button>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full rounded-full text-base font-semibold shadow-md">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
