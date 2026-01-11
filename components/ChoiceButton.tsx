'use client';

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChoiceButtonProps {
  letter: string;
  text: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function ChoiceButton({ letter, text, selected, onClick, disabled }: ChoiceButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3",
        selected 
          ? 'border-[#FF6B9D] bg-gradient-to-r from-[#FF6B9D]/10 to-[#FFA8C5]/10' 
          : 'border-[#FFE5EE] bg-white hover:border-[#FFA8C5]',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
        selected 
          ? 'bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] text-white' 
          : 'bg-[#FFF0F5] text-[#FF6B9D]'
      )}>
        {letter}
      </div>
      <span className="flex-1 font-medium text-[#2D2D2D]">{text}</span>
    </motion.button>
  );
}
