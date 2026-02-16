"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight, Search, Map, Route, Box, Zap, ExternalLink, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const navLinks = [
    { label: "Productos", href: "/productos", hasDropdown: true },
    { label: "Funcionalidades", href: "/funcionalidades" },
    { label: "Documentación", href: "/docs" },
    { label: "Precios", href: "/pricing" },
    { label: "Integraciones", href: "/integrations", hasDropdown: true },
    { label: "Blog", href: "/blog" },
    { label: "Recursos", href: "/resources", hasDropdown: true },
  ];

  const mega: any = {
    Productos: {
      leftTitle: "Módulos",
      left: [
        { label: "TMS y Despacho", href: "/productos/tms", icon: Box },
        { label: "Tracking en Vivo", href: "/productos/tracking", icon: Map, badge: "Nuevo" },
        { label: "Ruteo y Optimización", href: "/productos/routing", icon: Route },
        { label: "Búsqueda y Consultas", href: "/productos/search", icon: Search },
        { label: "Analítica de Costos", href: "/productos/analytics", icon: Zap },
      ],
      midTitle: "Casos de uso",
      mid: [
        { label: "Capacidades Multiplataforma", href: "/use-cases/platforms" },
        { label: "Lead Enrichment", href: "/use-cases/leads" },
        { label: "Análisis a Escala", href: "/use-cases/scale" },
        { label: "Operación en Tiempo Real", href: "/use-cases/realtime" },
        { label: "Ver más", href: "/use-cases", icon: ArrowRight },
      ],
      rightTitle: "Historias de clientes",
      right: {
        title: "Cómo empresas optimizan logística con Vortex",
        cta: { label: "Customer stories", href: "/customers", ext: true },
      },
    },
    Integraciones: {
      leftTitle: "Integraciones",
      left: [
        {
          label: "Workflow Automation",
          href: "/integrations/workflow",
          icon: Box,
          desc: "Zapier, n8n, Make y más",
        },
        {
          label: "LLM SDKs & Frameworks",
          href: "/integrations/llm",
          icon: Zap,
          desc: "LangChain, OpenAI y otros",
        },
        {
          label: "AI App Builders",
          href: "/integrations/app-builders",
          icon: ExternalLink,
          desc: "Conecta plataformas low‑code",
        },
      ],
      midTitle: "Conectores",
      mid: [
        {
          label: "Model Context Protocol",
          href: "/integrations/mcp",
          icon: Box,
          desc: "Claude Code, Cursor y más",
        },
        {
          label: "Vortex Skill",
          href: "/integrations/skill",
          icon: Zap,
          desc: "Acceso a datos logísticos en tiempo real",
        },
        {
          label: "Ver todas las integraciones",
          href: "/integrations",
          icon: ArrowRight,
          desc: "Explora todo el catálogo",
        },
      ],
    },
    Recursos: {
      leftTitle: "Recursos",
      left: [
        { label: "Guías y Tutoriales", href: "/resources/guides", icon: Search },
        { label: "API Reference", href: "/docs/api", icon: ExternalLink },
        { label: "Status", href: "/status", icon: Zap },
      ],
      midTitle: "Para equipos",
      mid: [
        { label: "Ingeniería", href: "/resources/engineering" },
        { label: "Operaciones", href: "/resources/ops" },
        { label: "Ver más", href: "/resources", icon: ArrowRight },
      ],
      rightTitle: "Historias de clientes",
      right: {
        title: "Aprende de implementaciones reales",
        cta: { label: "Explorar recursos", href: "/resources", ext: false },
      },
    },
  };

  return (
    <div className="fixed top-0 z-50 w-full flex flex-col">
      {/* Announcement Banner */}
      <div className="w-full bg-black py-2.5 px-4 flex items-center justify-center gap-2 group cursor-pointer transition-colors hover:bg-[#111111]">
        <p className="text-[11px] sm:text-xs text-white font-medium tracking-wide flex items-center">
          <span className="opacity-70 mr-2">Nuevo:</span>
          Vortex una plataforma de logistica y transporte
          <Link href="/blog/global-express" className="ml-2 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">
            Documentación
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
                src="/Vortex_logo.svg" 
                alt="Vortex Logo" 
                width={128} 
                height={128} 
                className="absolute top-1/2 left-0 -translate-y-1/2 h-40 w-40 max-w-none opacity-90"
              />
            </Link>
          </div>

          {/* Desktop Navigation with Dropdowns */}
          <NavigationMenu className="hidden xl:flex">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  {link.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-[14px] font-medium text-[#444444] hover:text-black">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {link.label === "Integraciones" ? (
                          <div className="min-w-[720px] grid grid-cols-2 gap-8 p-4 bg-white">
                            {/* Columna izquierda (como la referencia) */}
                            <div className="border-r border-[#f0f0f0] pr-6">
                              <div className="text-[11px] tracking-widest uppercase text-[#888888]">
                                {mega[link.label]?.leftTitle}
                              </div>
                              <ul className="mt-3 space-y-3">
                                {(mega[link.label]?.left || []).map((item: any) => (
                                  <li key={item.label}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={item.href}
                                        className="flex items-start gap-3 hover:bg-[#f7f7f7] rounded-md px-3 py-2 transition-colors"
                                      >
                                        {item.icon ? (
                                          <item.icon className="mt-0.5 h-4 w-4 text-[#888888]" />
                                        ) : null}
                                        <div className="flex flex-col text-left">
                                          <span className="text-sm font-medium text-black">
                                            {item.label}
                                          </span>
                                          {item.desc && (
                                            <span className="text-xs text-[#888888]">
                                              {item.desc}
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Columna derecha (segunda columna de la referencia) */}
                            <div>
                              <div className="text-[11px] tracking-widest uppercase text-[#888888]">
                                {mega[link.label]?.midTitle}
                              </div>
                              <ul className="mt-3 space-y-3">
                                {(mega[link.label]?.mid || []).map((item: any) => (
                                  <li key={item.label}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={item.href}
                                        className="flex items-start gap-3 hover:bg-[#f7f7f7] rounded-md px-3 py-2 transition-colors"
                                      >
                                        {item.icon ? (
                                          <item.icon className="mt-0.5 h-4 w-4 text-[#888888]" />
                                        ) : null}
                                        <div className="flex flex-col text-left">
                                          <span className="text-sm font-medium text-black">
                                            {item.label}
                                          </span>
                                          {item.desc && (
                                            <span className="text-xs text-[#888888]">
                                              {item.desc}
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="min-w-[960px] grid grid-cols-3 gap-4 p-3 bg-white">
                            {/* Columna izquierda: módulos */}
                            <div className="col-span-1">
                              <div className="rounded-md border border-[#eeeeee] overflow-hidden bg-white">
                                <div className="px-3 py-2 text-[11px] tracking-widest uppercase text-[#888888] border-b border-[#f0f0f0]">
                                  {mega[link.label]?.leftTitle}
                                </div>
                                <ul className="divide-y divide-[#f0f0f0]">
                                  {(mega[link.label]?.left || []).map((item: any) => (
                                    <li key={item.label}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={item.href}
                                          className="flex items-center gap-2 px-3 py-2 hover:bg-[#f7f7f7] transition-colors"
                                        >
                                          {item.icon ? (
                                            <item.icon className="h-4 w-4 text-[#888888]" />
                                          ) : null}
                                          <span className="text-sm font-medium text-black">
                                            {item.label}
                                          </span>
                                          {item.badge ? (
                                            <span className="ml-auto text-[10px] bg-black text-white px-1.5 py-0.5 rounded-full">
                                              {item.badge}
                                            </span>
                                          ) : null}
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Columna central: casos de uso */}
                            <div className="col-span-1">
                              <div className="rounded-md border border-[#eeeeee] overflow-hidden bg-white">
                                <div className="px-3 py-2 text-[11px] tracking-widest uppercase text-[#888888] border-b border-[#f0f0f0]">
                                  {mega[link.label]?.midTitle}
                                </div>
                                <ul className="divide-y divide-[#f0f0f0]">
                                  {(mega[link.label]?.mid || []).map((item: any) => (
                                    <li key={item.label}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={item.href}
                                          className="flex items-center gap-2 px-3 py-2 hover:bg-[#f7f7f7] transition-colors"
                                        >
                                          {item.icon ? (
                                            <item.icon className="h-3.5 w-3.5 text-[#888888]" />
                                          ) : null}
                                          <span className="text-sm text-black">{item.label}</span>
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Columna derecha: tarjeta historias */}
                            <div className="col-span-1">
                              <div className="rounded-md border border-[#eeeeee] bg-white p-3 h-full flex flex-col justify-between">
                                <div>
                                  <div className="text-[11px] tracking-widest uppercase text-[#888888] mb-2">
                                    {mega[link.label]?.rightTitle}
                                  </div>
                                  <div className="text-[11px] inline-flex items-center px-2 py-0.5 rounded-full border border-black/10 text-black/80 mb-2">
                                    Historia de cliente
                                  </div>
                                  <div className="text-sm font-semibold leading-snug text-black">
                                    {mega[link.label]?.right?.title}
                                  </div>
                                </div>
                                <Link
                                  href={mega[link.label]?.right?.cta?.href || "#"}
                                  className="mt-3 inline-flex items-center text-xs text-black hover:underline"
                                >
                                  {mega[link.label]?.right?.cta?.label}
                                  {mega[link.label]?.right?.cta?.ext ? (
                                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                                  ) : (
                                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                  )}
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href={link.href} className="px-2 py-1.5 text-[14px] font-medium text-[#444444] hover:text-black">
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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
