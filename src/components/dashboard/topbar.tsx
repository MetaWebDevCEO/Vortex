"use client";

import { Bell, CheckCircle2, ChevronRight, HelpCircle, User, ChevronDown, Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Topbar() {
  return (
    <div className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {/* Logo */}
        <div className="flex items-center">
            <Image 
                src="/isotipo.svg" 
                alt="Logo" 
                width={24} 
                height={24} 
                className="h-6 w-auto text-emerald-500"
            />
        </div>

        <Slash className="h-4 w-4 text-muted-foreground/40 -rotate-12" />

        {/* Project Selector */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
            <span className="font-medium text-foreground">MetaWeb Dev</span>
            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full border">Free</span>
            <ChevronDown className="h-3 w-3" />
        </div>

        <Slash className="h-4 w-4 text-muted-foreground/40 -rotate-12" />

        {/* Current Context */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
            <span className="font-medium">metavortex</span>
            <ChevronDown className="h-3 w-3" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full mr-2">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>All OK</span>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <HelpCircle className="h-4 w-4" />
        </Button>

        <Button size="sm" variant="secondary" className="h-8 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Upgrade
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full ml-1 bg-emerald-100 text-emerald-700">
            <span className="text-xs font-bold">M</span>
        </Button>
      </div>
    </div>
  );
}
