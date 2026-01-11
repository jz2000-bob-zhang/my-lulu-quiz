'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Button from '@/components/Button';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    // Navigate directly to the first question, skipping the quiz welcome page.
    router.push('/quiz/test/questions?q=0');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#FEF7F5]">
      {/* Decorative background elements from the quiz theme */}
      <motion.div
        className="absolute top-20 left-10 text-pink-300"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-8 h-8 fill-current" />
      </motion.div>
      <motion.div
        className="absolute top-32 right-16 text-pink-200"
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20 text-pink-300"
        animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkles className="w-7 h-7" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 right-12 text-pink-200"
        animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center relative z-10"
      >
        {/* Main Image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
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
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-5xl">💕</span>
          </motion.div>
        </motion.div>

        {/* User's Custom Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b36b75]">
            A QUIZ FOR LULU
          </p>
          <h1 className="text-4xl font-bold text-[#2D2D2D] font-display">
            Bob为Lulu定制的问卷
          </h1>
          <p className="text-lg text-[#6f5560]">
            只能真实回答，不能骗人
          </p>
          
          {/* Info boxes styled like the quiz page */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-3 text-left">
            <p className="text-sm text-[#717182] flex items-center gap-3">
              <span className="text-pink-400 text-lg">✓</span>
              <span>30道精心准备的题目</span>
            </p>
             <p className="text-sm text-[#717182] flex items-center gap-3">
              <span className="text-pink-400 text-lg">✨</span>
              <span>答完一题，就能看到 Bob 的答案</span>
            </p>
            <p className="text-sm text-[#717182] flex items-center gap-3">
               <span className="text-pink-400 text-lg">💬</span>
              <span>最后，你可以留下你想问的问题</span>
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
            开始探索 →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}