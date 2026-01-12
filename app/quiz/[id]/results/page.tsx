'use client';

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, RefreshCw } from "lucide-react";

import Card from "@/components/Card";
import Button from "@/components/Button";
import rawQuestions from "@/data/questions.json";

interface Question {
  id: number;
  type: 'choice' | 'text';
  question: string;
  choices?: string[];
  bobAnswer: string;
  photoUrl?: string;
}

const questions = rawQuestions as Question[];

export default function ResultsPage({ params }: { params: { id: string } }) {
  const { id: quizId } = params;
  const router = useRouter();

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [luluQuestions, setLuluQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRetake = async () => {
    // Clear database
    try {
      await fetch('/api/clear-all-quiz', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to clear database:', error);
    }

    // Clear session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(`quiz_answers_${quizId}`);
      sessionStorage.removeItem(`lulu_questions_${quizId}`);
      sessionStorage.clear();
      localStorage.clear();
    }

    // Redirect to home page
    router.push('/');
  };

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        // First try sessionStorage
        const savedAnswers = sessionStorage.getItem(`quiz_answers_${quizId}`);
        const savedQuestions = sessionStorage.getItem(`lulu_questions_${quizId}`);

        if (savedAnswers) {
          setUserAnswers(JSON.parse(savedAnswers));
        }

        if (savedQuestions) {
          setLuluQuestions(JSON.parse(savedQuestions));
        }

        // If no data in sessionStorage, try to load from database
        if (!savedAnswers) {
          try {
            const response = await fetch(`/api/get-quiz?quizId=${quizId}`);
            if (response.ok) {
              const data = await response.json();
              if (data.answers && Object.keys(data.answers).length > 0) {
                setUserAnswers(data.answers);
                // Save to sessionStorage for future use
                sessionStorage.setItem(`quiz_answers_${quizId}`, JSON.stringify(data.answers));
              }
              if (data.questions && data.questions.length > 0) {
                setLuluQuestions(data.questions);
                sessionStorage.setItem(`lulu_questions_${quizId}`, JSON.stringify(data.questions));
              }
            }
          } catch (error) {
            console.error('Failed to load data from database:', error);
          }
        }

        setIsLoading(false);
      }
    };

    loadData();
  }, [quizId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEF7F5]">
        <Sparkles className="w-8 h-8 text-[#FF6B9D] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pb-12 bg-[#FEF7F5]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-6xl mb-4 inline-block"
          >
            💌
          </motion.div>
          
          <h1 className="text-3xl font-bold text-[#2D2D2D]">
            答题回顾
          </h1>
           <p className="text-gray-500 mt-2">看看我们的答案吧</p>
        </motion.div>

        {/* Questions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-4">
            {questions.map((question, index) => {
              const luluAnswer = userAnswers[question.id] || "";
              const isMatch = luluAnswer.trim().toLowerCase() === question.bobAnswer.trim().toLowerCase();

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Card className="p-4 bg-white shadow-sm overflow-hidden">
                    {/* Question Title */}
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-9 h-9 mt-1 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="flex-1 font-medium text-[#2D2D2D] text-lg leading-relaxed">
                        {question.question}
                      </p>
                    </div>
                    
                    {/* Answers */}
                    <div className="mt-4 pt-4 border-t border-pink-100 space-y-3">
                      {/* Lulu's Answer */}
                      <div className="bg-gradient-to-r from-[#FFF0F5] to-[#FFE5EE] rounded-2xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white text-sm font-bold">
                            L
                          </div>
                          <span className="text-sm font-semibold text-[#FF6B9D]">Lulu 的答案</span>
                          {isMatch && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />}
                        </div>
                        <p className="text-[#2D2D2D] pl-9">
                          {luluAnswer || <span className="text-gray-400 italic">未回答</span>}
                        </p>
                      </div>
                      
                      {/* Bob's Answer */}
                      <div className="bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] rounded-2xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#2196F3] to-[#64B5F6] flex items-center justify-center text-white text-sm font-bold">
                            B
                          </div>
                          <span className="text-sm font-semibold text-[#2196F3]">Bob 的答案</span>
                           {isMatch && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />}
                        </div>
                        <p className="text-[#2D2D2D] pl-9">{question.bobAnswer}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Lulu's Questions Section */}
        {luluQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-[#2D2D2D] mb-4">
              给 Bob 的提问
            </h2>

            <Card className="p-6">
              <div className="space-y-4">
                {luluQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-[#FFF0F5] rounded-2xl"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#2D2D2D]">{question}</p>
                      <p className="text-xs text-[#717182] mt-1">待 Bob 回答</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Retake Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <Button
            size="lg"
            onClick={handleRetake}
            className="gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            重新答题
          </Button>
        </motion.div>
      </div>
    </div>
  );
}