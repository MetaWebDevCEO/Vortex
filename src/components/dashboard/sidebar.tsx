"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  GitBranch,
  Settings,
  Plug,
  Activity,
  LineChart,
  Database,
  Table,
  HardDrive,
  EyeOff,
  Server,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
  ChevronsLeft,
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
      title: "PROJECT",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Branches", icon: GitBranch, href: "/dashboard/branches" },
        { label: "Integrations", icon: Plug, href: "/dashboard/integrations" },
        { label: "Settings", icon: Settings, href: "/dashboard/settings" },
      ]
    },
    {
      title: "BRANCH",
      extra: "production",
      items: [
        { label: "Overview", icon: Activity, href: "/dashboard/overview" },
        { label: "Monitoring", icon: LineChart, href: "/dashboard/monitoring" },
        { label: "SQL Editor", icon: Database, href: "/dashboard/sql-editor" },
        { label: "Tables", icon: Table, href: "/dashboard/tables" },
        { label: "Backup & Restore", icon: HardDrive, href: "/dashboard/backup" },
        { label: "Data Masking", icon: EyeOff, href: "/dashboard/masking", badge: "BETA" },
      ]
    },
    {
      title: "APP BACKEND",
      items: [
        { label: "Data API", icon: Server, href: "/dashboard/api" },
        { label: "Auth", icon: ShieldCheck, href: "/dashboard/auth" },
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
                                <GitBranch className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
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
                        "flex items-center w-full h-8 px-2 text-sm font-medium rounded-md transition-colors mb-0.5",
                        pathname === item.href 
                            ? "bg-secondary text-secondary-foreground" 
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                            <span className="ml-auto text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded font-medium">
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
      
      {/* Bottom Actions */}
      <div className="absolute bottom-4 px-6 w-64 space-y-1">
        <Button variant="ghost" className="w-full justify-start h-8 px-2 text-muted-foreground hover:text-foreground">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
        </Button>
        <Button variant="ghost" className="w-full justify-start h-8 px-2 text-muted-foreground hover:text-foreground">
            <ChevronsLeft className="mr-2 h-4 w-4" />
            Collapse menu
        </Button>
      </div>
    </div>
  );
}
