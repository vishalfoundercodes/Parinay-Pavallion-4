import React from 'react'

interface SectionTitleProps {
    title:String,
    subtitle:String
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h3 className="text-[#d4af37] font-medium tracking-widest uppercase mb-2 text-sm">
      {subtitle}
    </h3>
    <h2 className="text-3xl md:text-4xl font-serif text-[#0f3d2e] font-bold">
      {title}
    </h2>
    <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-4"></div>
  </div>
);


export default SectionTitle;
