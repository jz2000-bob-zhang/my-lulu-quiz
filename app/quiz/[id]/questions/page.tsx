'use client';

import { use, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import { Input } from '@/components/Input';
import ImageWithFallback from '@/components/ImageWithFallback';

import rawQuestions from '@/data/questions.json';

// Define Question type based on the JSON structure
interface Question {
  id: number;
  type: 'text';
  question: string;
  bobAnswer: string;
  photoUrl?: string;
}

const questions = rawQuestions as Question[];

function QuestionsContent({ quizId }: { quizId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from query param or default to 0
  const initialIndex = parseInt(searchParams.get('q') || '0', 10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex);
  
  // Update state if URL changes (e.g. back/forward navigation)
  useEffect(() => {
    const idx = parseInt(searchParams.get('q') || '0', 10);
    setCurrentQuestionIndex(idx);
  }, [searchParams]);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Restore answers from storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`quiz_answers_${quizId}`);
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    }
  }, [quizId]);

  // Persist answers to storage
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(answers).length > 0) {
      sessionStorage.setItem(`quiz_answers_${quizId}`, JSON.stringify(answers));
    }
  }, [answers, quizId]);

  // Local state for the current interaction
  const [textAnswer, setTextAnswer] = useState<string>("");
  const [showComparison, setShowComparison] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string>("");

  const question = questions[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;

  // Reset local state when question changes
  useEffect(() => {
    setTextAnswer("");
    setShowComparison(false);
    setUserAnswer("");
  }, [currentQuestionIndex]);

  const handleSubmit = () => {
    const answer = textAnswer;
    if (!answer.trim()) return;
    
    setUserAnswer(answer);
    setAnswers(prev => ({ ...prev, [question.id]: answer }));
    setShowComparison(true);
    
    // Auto advance logic
    setTimeout(() => {
      handleNext();
    }, 3000); // 3 seconds delay to read the comparison
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    // Check if we should show transition page every 5 questions
    if (nextIndex < totalQuestions && nextIndex % 5 === 0) {
      router.push(`/quiz/${quizId}/transition?next=${nextIndex}`);
      return;
    }

    if (nextIndex >= totalQuestions) {
      router.push(`/quiz/${quizId}/ask-bob`);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const isAnswerMatch = showComparison && userAnswer.trim().toLowerCase() === question.bobAnswer.trim().toLowerCase();

  return (
    <div className="min-h-screen flex flex-col bg-[#FEF7F5]">
      {/* Photo Banner */}
      {question.photoUrl && (
        <motion.div
          key={`banner-${question.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-48 w-full overflow-hidden shrink-0"
        >
          <ImageWithFallback
            src={question.photoUrl}
            alt="Question banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FEF7F5]/50" />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-2xl mx-auto w-full flex flex-col">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <ProgressBar 
            current={currentQuestionNumber} 
            total={totalQuestions} 
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {!showComparison ? (
            <motion.div
              key={`question-${question.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card className="p-6 mb-6">
                <div className="flex flex-col items-center gap-4 mb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg text-lg">
                    {currentQuestionNumber}
                  </div>
                  <h2 className="text-2xl font-semibold text-[#2D2D2D] leading-snug max-w-lg font-display">
                    {question.question}
                  </h2>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="请输入你的答案..."
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && textAnswer.trim()) {
                        handleSubmit();
                      }
                    }}
                    autoFocus
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={!textAnswer.trim()}
                    className="w-full mt-4"
                  >
                    提交答案
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key={`result-${question.id}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {isAnswerMatch && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center mb-6"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 0.6,
                      repeat: 2
                    }}
                    className="text-6xl mb-2 inline-block"
                  >
                    💕
                  </motion.div>
                  <p className="text-lg font-semibold text-[#4ADE80]">
                  </p>
                </motion.div>
              )}

              <Card className="p-6 shadow-lg">
                <blockquote className="text-center mb-6 border-l-4 border-pink-200 pl-4 italic">
                  <p className="text-xl font-semibold text-gray-700">"{question.question}"</p>
                </blockquote>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-[#FFF0F5] to-[#FFE5EE] rounded-2xl p-4 border border-[#FF6B9D]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        L
                      </div>
                      <span className="font-semibold text-[#FF6B9D]">Lulu 的答案</span>
                      {isAnswerMatch && (
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80] ml-auto" />
                      )}
                    </div>
                    <p className="text-[#2D2D2D] pl-10 text-lg">{userAnswer}</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] rounded-2xl p-4 border border-[#2196F3]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2196F3] to-[#64B5F6] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        B
                      </div>
                      <span className="font-semibold text-[#2196F3]">Bob 的答案</span>
                      {isAnswerMatch && (
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80] ml-auto" />
                      )}
                    </div>
                    <p className="text-[#2D2D2D] pl-10 text-lg">{question.bobAnswer}</p>
                  </div>
                </div>

                {!isAnswerMatch && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-6 text-sm text-[#717182]"
                  >
                  </motion.p>
                )}
              </Card>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8 text-sm text-[#717182] animate-pulse"
              >
                正在跳转到下一题...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function QuestionsPage({ params }: { params: { id: string } }) {
  const { id: quizId } = params;

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FEF7F5]" />}>
      <QuestionsContent quizId={quizId} />
    </Suspense>
  );
}