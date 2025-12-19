import React from 'react'


type ButtonVariant = "primary" | "outline" | "dark";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
}

// const Button = ({ children, variant = "primary", onClick, className = "" }) 
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}) => {
  const baseStyle =
    "px-6 py-3 rounded-sm font-medium transition-all duration-300 transform hover:-translate-y-1";
  const variants = {
    primary: "bg-[#d4af37] text-[#0f3d2e] hover:bg-[#c4a030] shadow-lg",
    outline:
      "border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0f3d2e]",
    dark: "bg-[#0f3d2e] text-white hover:bg-[#16523e]",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button
