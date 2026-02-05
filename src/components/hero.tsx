import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background gradients and Patterns */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1.5}
          className={cn(
            "text-neutral-400 [mask-image:none]"
          )}
        />
        <div className="absolute left-0 right-0 top-[-10%] m-auto h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-[100px] animate-blob" />
        <div className="absolute right-[-10%] top-[20%] h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-teal-400 opacity-20 blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute left-[-10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-amber-200 via-orange-300 to-yellow-200 opacity-20 blur-[90px] animate-blob animation-delay-4000" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        
        {/* Badge */}
        <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e6f4ed_0%,#1d6e47_50%,#e6f4ed_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1d6e47] backdrop-blur-3xl">
            Nuevo: Lanzamiento Oficial
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500">
          La plataforma más potente para tu <span className="text-[#1d6e47]">Logística</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-[800px] text-zinc-500 md:text-xl dark:text-zinc-400">
          Gestiona, optimiza y monitorea toda tu operación en un solo lugar. 
          Desbloquea el potencial de tu empresa con nuestra plataforma de siguiente nivel.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center w-full">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 font-semibold px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
              Comenzar Ahora <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="font-semibold px-8 h-12 text-base border-neutral-200 hover:bg-neutral-100 transition-all duration-300">
            Más información <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

      </div>
    </section>
  );
}
