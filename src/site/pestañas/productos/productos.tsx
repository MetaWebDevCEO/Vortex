import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

export type ProductosModule = {
  title: string;
  href: string;
  desc: string;
  icon: LucideIcon;
  badge?: string;
};

export type ProductosTocItem = {
  label: string;
  href: string;
};

export function ProductosSidebars({
  modules,
  toc,
}: {
  modules: ProductosModule[];
  toc: ProductosTocItem[];
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden lg:block">
      <div className="h-screen w-screen pt-[8.5rem]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-12 gap-8">
            <aside className="col-span-3 xl:col-span-2 pointer-events-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
                    Productos
                  </div>
                  <nav className="space-y-1">
                    {modules.map((m) => (
                      <Link
                        key={m.title}
                        href={m.href}
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                      >
                        <m.icon className="h-4 w-4" />
                        <span className="font-medium">{m.title}</span>
                        {m.badge ? (
                          <span className="ml-auto text-[10px] rounded-full border px-2 py-0.5 text-foreground/80">
                            {m.badge}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
                    Explorar
                  </div>
                  <nav className="space-y-1">
                    <Link
                      href="/funcionalidades"
                      className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                    >
                      <span className="font-medium">Funcionalidades</span>
                      <ArrowRight className="h-4 w-4 opacity-60" />
                    </Link>
                    <Link
                      href="/integraciones"
                      className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                    >
                      <span className="font-medium">Integraciones</span>
                      <ArrowRight className="h-4 w-4 opacity-60" />
                    </Link>
                    <Link
                      href="/documentacion"
                      className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                    >
                      <span className="font-medium">Documentación</span>
                      <ArrowRight className="h-4 w-4 opacity-60" />
                    </Link>
                  </nav>
                </div>
              </div>
            </aside>

            <div className="hidden lg:block col-span-9 xl:col-span-8"></div>

            <aside className="hidden xl:block col-span-2 pointer-events-auto">
              <div className="space-y-3">
                <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
                  En esta página
                </div>
                <nav className="space-y-1">
                  {toc.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
