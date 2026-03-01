 "use client";

 import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/dashboard/profile";

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col w-full">
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
