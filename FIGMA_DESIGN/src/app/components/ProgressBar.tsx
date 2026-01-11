import { motion } from "motion/react";

interface ProgressBarProps {
  current: number;
  total: number;
  showText?: boolean;
}

export function ProgressBar({ current, total, showText = true }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      {showText && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-[#FF6B9D]">
            {current}/{total}
          </span>
          <span className="text-sm font-semibold text-[#FF6B9D]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className="w-full h-3 bg-[#FFE5EE] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
