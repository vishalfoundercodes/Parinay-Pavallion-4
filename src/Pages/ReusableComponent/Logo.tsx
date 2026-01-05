import React from 'react'
import logo from "../../assets/logo2.png";
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
      <img src={logo} alt="" />
    </div>
    <div className="flex flex-col">
      <span className="text-secondary font-serif font-bold text-lg tracking-wider leading-none">
        PARINAY
      </span>
      <span className="text-white text-[10px] tracking-[0.2em] leading-none">
        PAVALLION
      </span>
      <span className="text-white text-[9px] tracking-[0.2em] leading-none">
        RESORT
      </span>
    </div>
  </div>
);

export default Logo
