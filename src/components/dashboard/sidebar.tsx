"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Settings,
  Box,
  Calculator,
  Truck,
  MapPin,
  Route,
  RefreshCw,
  FileCheck,
  AlertTriangle,
  BarChart2,
  Users,
  Shield,
  ChevronDown,
  LucideIcon
} from "lucide-react";

import Image from "next/image";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

type SidebarItem = {
    label: string;
    icon: LucideIcon;
    href: string;
    badge?: string;
};

type SidebarSection = {
    title: string;
    extra?: string;
    items: SidebarItem[];
};

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const sections: SidebarSection[] = [
    {
      title: "PLANEACIÓN",
      items: [
        { label: "Cubicaje y Consolidación", icon: Box, href: "/dashboard/cubicaje" },
        { label: "Cotizaciones Automáticas", icon: Calculator, href: "/dashboard/cotizaciones" },
        { label: "Gestión de Órdenes (TMS)", icon: Truck, href: "/dashboard/ordenes" },
      ]
    },
    {
      title: "CONTROL",
      items: [
        { label: "Tracking en Tiempo Real", icon: MapPin, href: "/dashboard/tracking" },
        { label: "Asignación de Viajes", icon: Route, href: "/dashboard/asignacion" },
        { label: "Marketplace de Retornos", icon: RefreshCw, href: "/dashboard/retornos" },
        { label: "Evidencia Digital (POD)", icon: FileCheck, href: "/dashboard/pod" },
        { label: "Gestión de Incidencias", icon: AlertTriangle, href: "/dashboard/incidencias" },
        { label: "Analítica y KPIs", icon: BarChart2, href: "/dashboard/analitica" },
      ]
    },
    {
      title: "USUARIOS",
      items: [
        { label: "Gestión de Usuarios", icon: Users, href: "/dashboard/users" },
        { label: "Roles y Permisos", icon: Shield, href: "/dashboard/users/roles" },
      ]
    }
  ];

  return (
    <div className={cn("pb-12 min-h-screen w-64 border-r bg-background text-sm", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i} className="px-2">
                <div className="mb-2 px-2">
                    <h4 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                    {section.title}
                    </h4>
                </div>
                
                {section.extra && (
                     <div className="mb-2 px-2">
                        <div className="flex items-center justify-between px-2 py-1.5 border rounded-md bg-background shadow-sm hover:bg-accent cursor-pointer group transition-colors">
                           <div className="flex items-center gap-2">
                                <LayoutDashboard className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                                <span className="text-sm font-medium">{section.extra}</span>
                           </div>
                           <ChevronDown className="h-3 w-3 text-muted-foreground opacity-50 group-hover:opacity-100" />
                        </div>
                     </div>
                )}
                
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={cn("h-4 w-4 transition-colors", pathname === item.href ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                            <span>{item.label}</span>
                        </div>
                        {item.badge && (
                            <span className="ml-auto text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                                {item.badge}
                            </span>
                        )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
