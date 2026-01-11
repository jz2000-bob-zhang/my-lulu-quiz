'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Button from '@/components/Button';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function QuizWelcomePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id: quizId } = params;

  const handleStart = () => {
    router.push(`/quiz/${quizId}/questions`);
  };

  const totalQuestions = 30; // As per README plan

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#FEF7F5]">
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 text-pink-300"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="w-8 h-8 fill-current" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-16 text-pink-200"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-20 text-pink-300"
        animate={{ 
          y: [0, -12, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Sparkles className="w-7 h-7" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 right-12 text-pink-200"
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center relative z-10"
      >
        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="relative inline-block mb-8"
        >
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto relative">
            <ImageWithFallback
              src="/images/lulu-welcome.png"
              alt="Lulu"
              fill
              className="object-cover"
            />
          </div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-5xl">💕</span>
          </motion.div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <h1 className="text-4xl font-bold text-[#2D2D2D] font-display">
            嗨，Lulu！
          </h1>
          
          <p className="text-lg text-[#2D2D2D]">
            Bob 为你准备了一份特别的问卷 ✨
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <p className="text-[#FF6B9D] font-semibold text-xl mb-2">
              一共有 {totalQuestions} 道题目
            </p>
            <p className="text-sm text-[#717182]">
              回答每个问题后，你就能看到 Bob 的答案 💭
            </p>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            size="lg" 
            onClick={handleStart}
            className="w-full shadow-2xl"
          >
            开始答题 →
          </Button>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-sm text-[#717182]"
        >
          准备好了解 Bob 有多了解你了吗？ 😊
        </motion.p>
      </motion.div>
    </div>
  );
}