export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* Background Gradient Spotlights */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-zinc-900/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Big Background Text "VORTEX" */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 font-black text-[15rem] leading-none text-zinc-950 select-none pointer-events-none whitespace-nowrap z-0 opacity-50">
        VORTEX
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
        {children}
      </div>
    </div>
  )
}
