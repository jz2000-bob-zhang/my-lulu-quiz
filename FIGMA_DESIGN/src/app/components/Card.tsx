import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient";
}

export function Card({ children, className = "", variant = "default" }: CardProps) {
  const baseStyles = "rounded-3xl shadow-md";
  
  const variantStyles = {
    default: "bg-white",
    gradient: "bg-gradient-to-br from-[#FF6B9D] to-[#FFA8C5] text-white"
  };
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
