"use client";

import { useMemo, useState, useEffect } from "react";

export function AsciiBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const characters = ".:-=+X*|/\\\\";
  
  const pattern = useMemo(() => {
    const rows = 40;
    const cols = 80;
    let grid = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        grid += char + " ";
      }
      grid += "\n";
    }
    return grid;
  }, []);

  // Prevenir errores de hidratación renderizando solo en el cliente
  if (!mounted) {
    return <div className="absolute inset-0 -z-10 bg-white" />;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Base Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,245,245,1)_0%,rgba(255,255,255,1)_100%)]" />
      
      {/* Firecrawl-style Grid with Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />
      
      {/* Vertical and Horizontal Lines (Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:160px_160px] opacity-100" />

      {/* Floating UI Elements / Nodes (inspired by image) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Top Left [ 200 OK ] */}
        <div className="absolute top-[20%] left-[10%] text-[10px] font-mono text-[#cccccc] opacity-50 uppercase tracking-[0.2em]">
          [ 200 OK ]
        </div>
        {/* Top Right [ LOGISTICS ] */}
        <div className="absolute top-[25%] right-[12%] text-[10px] font-mono text-[#cccccc] opacity-50 uppercase tracking-[0.2em]">
          [ LOGISTICS ]
        </div>
        {/* Bottom Left [ VORTEX.IO ] */}
        <div className="absolute bottom-[20%] left-[15%] text-[10px] font-mono text-[#cccccc] opacity-50 uppercase tracking-[0.2em]">
          [ VORTEX.IO ]
        </div>
        {/* Bottom Right [ SYNCED ] */}
        <div className="absolute bottom-[25%] right-[10%] text-[10px] font-mono text-[#cccccc] opacity-50 uppercase tracking-[0.2em]">
          [ SYNCED ]
        </div>

        {/* Small Crosses at Grid Intersections */}
        <div className="absolute top-[40%] left-[30%] text-[#dddddd]">+</div>
        <div className="absolute top-[60%] right-[35%] text-[#dddddd]">+</div>
        <div className="absolute top-[20%] right-[25%] text-[#dddddd]">+</div>
        <div className="absolute bottom-[30%] left-[40%] text-[#dddddd]">+</div>
      </div>

      {/* Layered ASCII patterns with subtle movement */}
      <div className="absolute inset-0 opacity-[0.05] select-none pointer-events-none overflow-hidden leading-none whitespace-pre font-mono text-[10px] text-[#cccccc]">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="animate-pulse" 
            style={{ animationDelay: `${i * 1000}ms` } as React.CSSProperties}
          >
            {pattern}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-[0.08] select-none pointer-events-none overflow-hidden leading-none whitespace-pre font-mono text-[12px] text-[#aaaaaa] translate-x-1/4">
        <div className="animate-[scroll_80s_linear_infinite]">
          {pattern}
          {pattern}
        </div>
      </div>

      {/* Central Highlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(240,240,240,0.5)_0%,transparent_70%)] blur-[100px]" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      ` }} />
    </div>
  );
}
