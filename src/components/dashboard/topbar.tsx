"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, HelpCircle, User, ChevronDown, Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export function Topbar() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen((open) => !open);
  };

  const goToProfile = () => {
    setIsProfileOpen(false);
    router.push("/dashboard/profile");
  };

  const goToSettings = () => {
    setIsProfileOpen(false);
    router.push("/dashboard/settings");
  };

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await supabase.auth.signOut();
    router.push("/login");
  };

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

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant="secondary"
          className="h-8 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Upgrade
        </Button>

        <div className="relative ml-1">
          <button
            type="button"
            onClick={toggleProfile}
            className="flex items-center gap-2 h-8 rounded-full bg-emerald-100 text-emerald-700 px-2.5 text-xs font-medium hover:bg-emerald-200 transition-colors"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
              M
            </span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 bg-white shadow-xl py-2 text-sm z-50">
              <div className="px-3 pb-2 border-b border-zinc-100 text-left">
                <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                  Perfil
                </p>
                <p className="text-sm font-medium text-zinc-900">
                  MetaWeb Dev
                </p>
                <p className="text-xs text-zinc-500">
                  user@vortex.app
                </p>
              </div>

              <button
                type="button"
                onClick={goToProfile}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-zinc-700 hover:bg-zinc-50"
              >
                <User className="h-4 w-4 text-zinc-500" />
                <span>Ver perfil</span>
              </button>

              <button
                type="button"
                onClick={goToSettings}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-zinc-700 hover:bg-zinc-50"
              >
                <ChevronDown className="h-4 w-4 rotate-90 text-zinc-500" />
                <span>Preferencias</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-red-50"
              >
                <span className="h-4 w-4 rounded-full border border-red-500 flex items-center justify-center text-[9px] leading-none">
                  ⎋
                </span>
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
