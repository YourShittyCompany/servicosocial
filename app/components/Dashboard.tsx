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
      className="h-screen m-0 overflow-hidden relative select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="black h-1/2 bg-[#22c55e] p-0 relative">
        <div className="coming_soon w-[85%] ml-[5%] absolute bottom-[-40px] text-white font-['Josefin_Slab'] text-[160px] md:text-[160px] sm:text-[72px] sm:bottom-[-18px] z-10">
          BREVE
        </div>
      </div>

      <div className="white h-1/2 bg-white p-0 relative">
        <div className="coming_soon w-[85%] ml-[5%] absolute top-[-8px] text-[#0d9488] font-['Josefin_Slab'] text-[160px] md:text-[160px] sm:text-[72px] sm:top-[-4px] z-10">
          MENTEE
          {blinkingDots}
        </div>
      </div>

      <div className="absolute bottom-4 w-full text-center text-sm text-gray-500">
        Copyright © {year} Serviço Social. Todos os direitos reservados.
      </div>
    </div>
  );
}
