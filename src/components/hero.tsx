"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, BarChart3, ShieldCheck } from "lucide-react";
import { AsciiBackground } from "@/components/ui/ascii-background";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center items-center overflow-hidden pt-20 bg-white text-black">
      <AsciiBackground />
      
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-12 relative z-10">
        
        {/* Monochromatic Logistics Badge */}
        <div className="inline-flex items-center rounded-full border border-[#eeeeee] bg-white/50 px-4 py-1.5 text-xs font-medium text-[#666666] backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-1000">
          <Truck className="mr-2 h-3 w-3" />
          <span className="tracking-widest uppercase">Logistics.Initialize(VORTEX_CORE)</span>
        </div>

        {/* Main Heading - Focused on Logistics Solution */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl xl:text-8xl/none max-w-5xl">
            <span className="text-black">Intelligent</span>{" "}
            <span className="text-[#888888]">Logistics</span>
          </h1>
          <p className="max-w-[750px] mx-auto text-[#444444] md:text-xl font-medium tracking-tight leading-relaxed">
            Solución integral de transporte y cadena de suministro. 
            Vortex optimiza tu operación, resuelve cuellos de botella y 
            conecta cada punto de tu logística con precisión absoluta.
          </p>
        </div>
        
        {/* Action Buttons - Rounded Style with Unified Typography */}
        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Link href="/signup">
            <Button size="lg" className="bg-black text-white hover:bg-[#222222] rounded-full px-10 h-14 text-sm font-bold tracking-widest uppercase transition-all duration-300">
              Comenzar Optimización
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-[#dddddd] text-black hover:bg-black hover:text-white rounded-full px-10 h-14 text-sm font-bold tracking-widest uppercase transition-all duration-300">
            Ver Soluciones
          </Button>
        </div>

        {/* Logistics Solutions Motifs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pt-12 border-t border-[#eeeeee]">
          {[
            { icon: MapPin, label: "Tracking Real-Time", desc: "Visibilidad total de flota" },
            { icon: BarChart3, label: "Analítica Predictiva", desc: "Optimización de rutas" },
            { icon: ShieldCheck, label: "Gestión de Riesgos", desc: "Seguridad en cada entrega" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-500">
              <item.icon className="h-5 w-5 text-black" />
              <span className="text-xs font-bold uppercase tracking-widest text-black">{item.label}</span>
              <span className="text-[10px] font-medium text-[#888888]">{item.desc}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Subtle bottom gradient for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
