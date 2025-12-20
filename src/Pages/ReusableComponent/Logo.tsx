import React from 'react'
import logo from "../../assets/Logo-bg-remove.png";
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#0f3d2e] font-bold text-xl">
      <img src={logo} alt="" />
    </div>
    <div className="flex flex-col">
      <span className="text-[#d4af37] font-serif font-bold text-lg tracking-wider leading-none">
        PARINAY
      </span>
      <span className="text-white text-[10px] tracking-[0.2em] leading-none">
        PAVALLION
      </span>
    </div>
  </div>
);

export default Logo
