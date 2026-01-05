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
    primary: "bg-secondary text-primary hover:bg-[#c4a030] shadow-lg",
    outline:
      "border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary",
    dark: "bg-primary text-white hover:bg-[#16523e]",
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
