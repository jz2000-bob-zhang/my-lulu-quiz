'use client';

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  className = "",
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-[#FFF0F5] text-[#FF6B9D] hover:bg-[#FFE5EE]",
    outline: "border-2 border-[#FF6B9D] text-[#FF6B9D] hover:bg-[#FFF0F5]"
  };
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]"
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], disabledStyles, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
