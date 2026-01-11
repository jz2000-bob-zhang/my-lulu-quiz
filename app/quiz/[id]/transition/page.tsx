'use client';

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Star, Heart } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import ImageWithFallback from "@/components/ImageWithFallback";
import rawQuestions from "@/data/questions.json";

function TransitionContent({ quizId }: { quizId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const nextIndex = parseInt(searchParams.get('next') || '0', 10);
  const totalQuestions = rawQuestions.length;
  const completedCount = nextIndex;

  // --- Sequential & Dynamic Content ---
  const transitionIndex = (nextIndex / 5) - 1;

  const transitionImages = [
    "/images/transition1.jpg",
    "/images/transition2.jpg",
    "/images/transition3.jpg",
    "/images/transition4.jpg",
    "/images/transition5.jpg",
  ];
  const imageUrl = transitionImages[transitionIndex] || transitionImages[transitionImages.length - 1];

  const encouragements = [
    { emoji: "🌟", text: "谢谢你愿意回答，请继续" },
    { emoji: "💪", text: "还剩25道题" },
    { emoji: "✨", text: "快过半了" },
    { emoji: "🎉", text: "马上就好咯" },
    { emoji: "💕", text: "答完所有题目你就能填写我想问我的问题" },
  ];
  const encouragement = encouragements[transitionIndex] || encouragements[encouragements.length - 1];

  // Automatically navigate after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
        router.push(`/quiz/${quizId}/questions?q=${nextIndex}`);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router, quizId, nextIndex]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#FEF7F5]">
      {/* Animated background decorations */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 300),
            y: -50, opacity: 0, rotate: 0
          }}
          animate={{ 
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
            opacity: [0, 1, 1, 0], rotate: 360
          }}
          transition={{
            duration: 3 + Math.random() * 2, delay: Math.random() * 2,
            repeat: Infinity, ease: "linear"
          }}
          style={{ left: `${Math.random() * 100}%` }}
        >
          {i % 3 === 0 ? <Star className="w-6 h-6 text-[#FBBF24] fill-current" />
           : i % 3 === 1 ? <Heart className="w-5 h-5 text-[#FF6B9D] fill-current" />
           : <Sparkles className="w-5 h-5 text-[#FFA8C5]" />}
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
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mb-8"
        >
          <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl mx-auto relative">
            <ImageWithFallback src={imageUrl} alt="Celebration" fill className="object-cover" />
          </div>
          <motion.div className="absolute -top-4 -left-4" animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <span className="text-4xl">⭐</span>
          </motion.div>
          <motion.div className="absolute -top-4 -right-4" animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
            <span className="text-4xl">✨</span>
          </motion.div>
          <motion.div className="absolute -bottom-4 -left-4" animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
            <span className="text-4xl">💫</span>
          </motion.div>
          <motion.div className="absolute -bottom-4 -right-4" animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}>
            <span className="text-4xl">🎉</span>
          </motion.div>
        </motion.div>

        {/* Sequential Encouragement */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4 mb-6">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }} className="text-6xl mb-4">
            {encouragement.emoji}
          </motion.div>
          <h2 className="text-3xl font-bold text-[#2D2D2D]">{encouragement.text}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <p className="text-[#FF6B9D] font-semibold text-lg mb-4">已完成 {completedCount}/{totalQuestions} 题</p>
          <ProgressBar current={completedCount} total={totalQuestions} showText={false} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6 flex items-center justify-center gap-2 text-[#717182]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <span className="text-sm">正在准备下一题...</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function TransitionPage({ params }: { params: { id: string } }) {
  const { id: quizId } = params;

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FEF7F5]" />}>
      <TransitionContent quizId={quizId} />
    </Suspense>
  );
