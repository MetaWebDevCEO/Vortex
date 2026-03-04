"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, User, ChevronDown, Slash, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export function Topbar() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [orgData, setOrgData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
        // 1. Get User
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUserData(user);

            // 2. Get User's Organization (via helper function or direct query)
            // Using RPC or direct select if policies allow
            const { data: members, error } = await supabase
                .from('organization_members')
                .select('organization_id')
                .eq('user_id', user.id)
                .single();
            
            if (members && members.organization_id) {
                const { data: org } = await supabase
                    .from('organizations')
                    .select('*')
                    .eq('id', members.organization_id)
                    .single();
                
                if (org) setOrgData(org);
            }
        }
    };
    fetchData();
  }, []);

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

  const userInitials = userData?.email ? userData.email.substring(0, 2).toUpperCase() : "U";
  const orgName = orgData?.name || "Sin Organización";
  
  // Construct full name safely
  const firstName = userData?.user_metadata?.first_name || "";
  const lastName = userData?.user_metadata?.last_name || "";
  const fullName = firstName && lastName 
    ? `${firstName} ${lastName}` 
    : (firstName || userData?.email?.split('@')[0] || "Usuario");

  return (
    <div className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {/* Logo de la Organización */}
        <div className="flex items-center">
            {orgData?.logo_url ? (
                <div className="relative h-8 w-8 rounded-sm overflow-hidden">
                     <Image
                        src={orgData.logo_url}
                        alt="Org Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                <Building2 className="h-6 w-6 text-emerald-500" />
            )}
        </div>

        <Slash className="h-4 w-4 text-muted-foreground/40 -rotate-12" />

        {/* Nombre Organización */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
          <span className="font-medium text-foreground">{orgName}</span>
          <ChevronDown className="h-3 w-3" />
        </div>

        <Slash className="h-4 w-4 text-muted-foreground/40 -rotate-12" />

        {/* Nombre Usuario */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
          <span className="font-medium">
             {fullName}
          </span>
          <ChevronDown className="h-3 w-3" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mr-2">
          <span>Free</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Button>



        <div className="relative ml-1">
          <button
            type="button"
            onClick={toggleProfile}
            className="flex items-center gap-2 h-8 rounded-full bg-emerald-100 text-emerald-700 px-2.5 text-xs font-medium hover:bg-emerald-200 transition-colors"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
              {userInitials}
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
                  {fullName}
                </p>
                <p className="text-xs text-zinc-500">
                  {userData?.email}
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
