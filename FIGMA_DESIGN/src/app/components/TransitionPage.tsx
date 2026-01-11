import { useEffect } from "react";
import { motion } from "motion/react";
import { ProgressBar } from "./ProgressBar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Star, Heart } from "lucide-react";

interface TransitionPageProps {
  currentQuestion: number;
  totalQuestions: number;
  onContinue: () => void;
}

export function TransitionPage({ 
  currentQuestion, 
  totalQuestions, 
  onContinue 
}: TransitionPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onContinue]);

  const encouragements = [
    { emoji: "🌟", text: "做得很棒！继续加油" },
    { emoji: "💪", text: "你们越来越了解彼此了" },
    { emoji: "✨", text: "保持这个节奏，太棒了" },
    { emoji: "🎉", text: "真是个有默契的情侣" },
    { emoji: "💕", text: "爱的默契正在提升" },
  ];

  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background decorations */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: -50,
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            y: window.innerHeight + 50,
            opacity: [0, 1, 1, 0],
            rotate: 360
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`
          }}
        >
          {i % 3 === 0 ? (
            <Star className="w-6 h-6 text-[#FBBF24] fill-current" />
          ) : i % 3 === 1 ? (
            <Heart className="w-5 h-5 text-[#FF6B9D] fill-current" />
          ) : (
            <Sparkles className="w-5 h-5 text-[#FFA8C5]" />
          )}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-w-md w-full text-center relative z-10"
      >
        {/* Celebration Image */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="relative mb-8"
        >
          <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl mx-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1651399973942-1721a0de0851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMGNvbmZldHRpJTIwcGFydHl8ZW58MXx8fHwxNzY3OTIxMjcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Celebration"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating emojis around image */}
          <motion.div
            className="absolute -top-4 -left-4"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-4xl">⭐</span>
          </motion.div>
          
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            <span className="text-4xl">✨</span>
          </motion.div>
          
          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{ 
              y: [0, -12, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
          >
            <span className="text-4xl">💫</span>
          </motion.div>
          
          <motion.div
            className="absolute -bottom-4 -right-4"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9
            }}
          >
            <span className="text-4xl">🎉</span>
          </motion.div>
        </motion.div>

        {/* Encouragement Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="text-6xl mb-4"
          >
            {randomEncouragement.emoji}
          </motion.div>
          
          <h2 className="text-3xl font-bold text-[#2D2D2D]">
            {randomEncouragement.text}
          </h2>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <p className="text-[#FF6B9D] font-semibold text-lg mb-4">
            已完成 {currentQuestion}/{totalQuestions} 题
          </p>
          <ProgressBar 
            current={currentQuestion} 
            total={totalQuestions}
            showText={false}
          />
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center justify-center gap-2 text-[#717182]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <span className="text-sm">正在准备下一题...</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
