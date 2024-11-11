'use client'

import { useState } from 'react';

export default function Dashboard() {
  const [year] = useState<string>(new Date().getFullYear().toString());

  const blinkingDots = (
    <span className="blinking-dots inline-block">
      <span className="dot opacity-0 animate-[blink_1.5s_infinite_0.3s]">.</span>
      <span className="dot opacity-0 animate-[blink_1.5s_infinite_0.6s]">.</span>
      <span className="dot opacity-0 animate-[blink_1.5s_infinite_0.9s]">.</span>
    </span>
  );

  return (
    <div 
      className="min-h-screen w-full overflow-hidden relative select-none flex flex-col"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex-1 bg-[#22c55e] relative flex items-end justify-center pb-4">
        <div className="text-white font-['Josefin_Slab'] text-4xl sm:text-6xl md:text-7xl lg:text-9xl">
          BREVE
        </div>
      </div>

      <div className="flex-1 bg-white relative flex items-start justify-center pt-4">
        <div className="text-[#0d9488] font-['Josefin_Slab'] text-4xl sm:text-6xl md:text-7xl lg:text-9xl">
          MENTE
          {blinkingDots}
        </div>
      </div>

      <div className="absolute bottom-4 w-full text-center text-xs sm:text-sm text-gray-500">
        Copyright © {year} Serviço Social. Todos os direitos reservados.
      </div>
    </div>
  );
}
