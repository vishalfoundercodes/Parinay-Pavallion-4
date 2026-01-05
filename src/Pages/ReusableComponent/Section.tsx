import React from 'react'

interface SectionTitleProps {
    title:String,
    subtitle:String
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h3 className="text-secondary font-medium tracking-widest uppercase mb-2 text-sm">
      {subtitle}
    </h3>
    <h2 className="text-3xl md:text-4xl font-serif text-primary font-bold">
      {title}
    </h2>
    <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
  </div>
);


export default SectionTitle;
