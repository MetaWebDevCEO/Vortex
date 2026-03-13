import Link from "next/link";
import { ArrowRight, Box, Map, Route, Search, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductosPage() {
  const modules = [
    {
      title: "TMS y Despacho",
      href: "/productos/tms",
      desc: "Planifica, despacha y administra tus órdenes y viajes.",
      icon: Box,
    },
    {
      title: "Tracking en Vivo",
      href: "/productos/tracking",
      desc: "Visibilidad en tiempo real y alertas operativas.",
      icon: Map,
      badge: "Nuevo",
    },
    {
      title: "Ruteo y Optimización",
      href: "/productos/routing",
      desc: "Optimiza rutas, costos y tiempos de entrega.",
      icon: Route,
    },
    {
      title: "Búsqueda y Consultas",
      href: "/productos/search",
      desc: "Encuentra órdenes, eventos y documentos en segundos.",
      icon: Search,
    },
    {
      title: "Analítica de Costos",
      href: "/productos/analytics",
      desc: "KPIs, control de gasto y decisiones basadas en datos.",
      icon: Zap,
    },
  ];

  const toc = [
    { label: "Visión general", href: "#vision-general" },
    { label: "Módulos", href: "#modulos" },
    { label: "TMS y Despacho", href: "#tms" },
    { label: "Tracking en Vivo", href: "#tracking" },
    { label: "Ruteo y Optimización", href: "#routing" },
    { label: "Búsqueda y Consultas", href: "#search" },
    { label: "Analítica de Costos", href: "#analytics" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="relative">
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

        <div className="container mx-auto px-4 pt-16 pb-12 max-w-7xl">
          <div className="grid grid-cols-12 gap-8">
            <div className="hidden lg:block col-span-3 xl:col-span-2"></div>

            <div className="col-span-12 lg:col-span-9 xl:col-span-8">
              <div className="space-y-10">
                <header className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground">
                      Inicio
                    </Link>{" "}
                    <span className="px-1">/</span>
                    <span className="text-foreground">Productos</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight">Productos</h1>
                  <p className="text-muted-foreground max-w-2xl">
                    Módulos listos para escalar tu operación logística: planeación, ejecución y control de punta a punta.
                  </p>
                </header>

                <section id="vision-general" className="scroll-mt-32 space-y-4">
                  <h2 className="text-2xl font-semibold tracking-tight">Visión general</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="gap-1">
                        <CardTitle className="text-base">Diseñado para operación real</CardTitle>
                        <CardDescription>
                          Flujos claros, visibilidad y control para equipos de logística.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 text-sm text-muted-foreground">
                        Consolida órdenes, ejecuta viajes, monitorea eventos y mide desempeño.
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="gap-1">
                        <CardTitle className="text-base">Listo para crecer</CardTitle>
                        <CardDescription>
                          Módulos independientes que se integran entre sí.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 text-sm text-muted-foreground">
                        Empieza con un módulo y expande sin rehacer tu operación.
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <section id="modulos" className="scroll-mt-32 space-y-4">
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Módulos</h2>
                    <Link
                      href="/funcionalidades"
                      className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
                    >
                      Ver funcionalidades
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {modules.map((m) => (
                      <Link key={m.title} href={m.href} className="block">
                        <Card className="h-full hover:bg-muted/20 transition-colors">
                          <CardHeader className="gap-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              <m.icon className="h-4 w-4 text-muted-foreground" />
                              <span>{m.title}</span>
                              {m.badge ? (
                                <span className="ml-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold text-foreground/80">
                                  {m.badge}
                                </span>
                              ) : null}
                            </CardTitle>
                            <CardDescription>{m.desc}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <span className="text-sm inline-flex items-center gap-2 text-foreground">
                              Explorar
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>

                <section id="tms" className="scroll-mt-32 space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight">TMS y Despacho</h2>
                  <p className="text-muted-foreground">
                    Centraliza órdenes, planea viajes, asigna recursos y controla el cumplimiento.
                  </p>
                  <div className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
                        Ejemplo
                      </div>
                      <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="rounded-full border px-2 py-0.5">HTTP</span>
                        <span className="rounded-full border px-2 py-0.5">JSON</span>
                      </div>
                    </div>
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-muted/40 p-4 text-xs leading-relaxed">
                      <code>{`POST /api/tms/orders
{
  \"reference\": \"MX-000123\",
  \"origin\": \"CDMX\",
  \"destination\": \"GDL\",
  \"service\": \"FTL\",
  \"stops\": 2
}`}</code>
                    </pre>
                  </div>
                </section>

                <section id="tracking" className="scroll-mt-32 space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight">Tracking en Vivo</h2>
                  <p className="text-muted-foreground">
                    Eventos operativos, alertas y visibilidad para clientes y operación en un mismo lugar.
                  </p>
                  <div className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
                        Ejemplo
                      </div>
                      <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="rounded-full border px-2 py-0.5">Webhook</span>
                        <span className="rounded-full border px-2 py-0.5">JSON</span>
                      </div>
                    </div>
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-muted/40 p-4 text-xs leading-relaxed">
                      <code>{`POST /webhooks/tracking
{
  \"shipmentId\": \"SHP_9K2\",
  \"event\": \"ARRIVED_AT_STOP\",
  \"timestamp\": \"2026-03-12T10:35:21Z\",
  \"location\": { \"lat\": 19.4326, \"lng\": -99.1332 }
}`}</code>
                    </pre>
                  </div>
                </section>

                <section id="routing" className="scroll-mt-32 space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight">Ruteo y Optimización</h2>
                  <p className="text-muted-foreground">
                    Optimiza rutas por costo, tiempo, ventanas de entrega y restricciones operativas.
                  </p>
                  <div className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
                        Ejemplo
                      </div>
                      <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="rounded-full border px-2 py-0.5">TypeScript</span>
                      </div>
                    </div>
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-muted/40 p-4 text-xs leading-relaxed">
                      <code>{`const plan = await vortex.routing.optimize({
  depot: \"CDMX\",
  stops: 18,
  constraints: { maxHours: 9, capacityKg: 3500 }
});`}</code>
                    </pre>
                  </div>
                </section>

                <section id="search" className="scroll-mt-32 space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight">Búsqueda y Consultas</h2>
                  <p className="text-muted-foreground">
                    Unifica órdenes, eventos, documentos y evidencia en una sola búsqueda.
                  </p>
                  <div className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
                        Ejemplo
                      </div>
                      <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="rounded-full border px-2 py-0.5">Query</span>
                      </div>
                    </div>
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-muted/40 p-4 text-xs leading-relaxed">
                      <code>{`q=MX-000123 status:in_transit date:>=2026-03-01`}</code>
                    </pre>
                  </div>
                </section>

                <section id="analytics" className="scroll-mt-32 space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight">Analítica de Costos</h2>
                  <p className="text-muted-foreground">
                    KPIs, control de gasto y reportes para decisiones rápidas y trazables.
                  </p>
                  <div className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
                        Ejemplo
                      </div>
                      <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="rounded-full border px-2 py-0.5">SQL</span>
                      </div>
                    </div>
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-muted/40 p-4 text-xs leading-relaxed">
                      <code>{`select month, carrier, sum(cost) as total_cost
from shipments
where status = 'delivered'
group by 1, 2
order by 1 desc;`}</code>
                    </pre>
                  </div>
                </section>
              </div>
            </div>

            <div className="hidden xl:block col-span-2"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
