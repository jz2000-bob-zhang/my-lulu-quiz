'use client';

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Sparkles, PartyPopper } from "lucide-react";

import Button from "@/components/Button";
import { TextArea } from "@/components/Input";
import Card from "@/components/Card";

export default function AskBobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id: quizId } = params;

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);

  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      setQuestions([...questions, currentQuestion.trim()]);
      setCurrentQuestion("");
    }
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleComplete = async () => {
    setIsSaving(true);
    
    // In a real app, this is an API call
    if (typeof window !== 'undefined') {
      // Save Lulu's new questions to sessionStorage for the results page
      sessionStorage.setItem(`lulu_questions_${quizId}`, JSON.stringify(questions));

      // Retrieve Lulu's answers from the quiz
      const savedAnswers = sessionStorage.getItem(`quiz_answers_${quizId}`);
      const answers = savedAnswers ? JSON.parse(savedAnswers) : {};

      try {
        const response = await fetch('/api/save-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quizId,
            answers,
            luluQuestions: questions,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save data');
        }

        // The data is saved, now we can proceed to the results page
        router.push(`/quiz/${quizId}/results`);

      } catch (error) {
        console.error("Error saving quiz:", error);
        // Optionally, show an error message to the user
        alert("保存您的结果时出错，请稍后重试。");
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-[#FEF7F5]">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 text-yellow-400"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-16 text-pink-300"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <PartyPopper className="w-8 h-8" />
      </motion.div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="text-7xl mb-4"
          >
            🎉
          </motion.div>
          
          <h1 className="text-3xl font-bold text-[#2D2D2D] mb-3">
            恭喜完成所有题目！
          </h1>
          
          <p className="text-lg text-[#717182]">
            现在轮到你来提问了 ✨
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-r from-[#FFF0F5] to-[#FFE5EE]">
            <div className="flex items-start gap-3">
              <div className="text-3xl">💭</div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  给 Bob 提问
                </h3>
                <p className="text-sm text-[#717182]">
                  想问 Bob 什么问题呢？添加你想问的问题，这些问题会在结果页展示给 Bob
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Add Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 mb-6">
            <h3 className="font-semibold text-[#2D2D2D] mb-4">
              添加新问题
            </h3>
            
            <TextArea
              placeholder="可以是任何问题"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              rows={3}
              className="mb-4"
            />
            
            <Button
              onClick={handleAddQuestion}
              disabled={!currentQuestion.trim()}
              variant="secondary"
              className="w-full"
            >
              <Plus className="w-5 h-5" />
              添加问题
            </Button>
          </Card>
        </motion.div>

        {/* Questions List */}
        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 mb-6">
              <h3 className="font-semibold text-[#2D2D2D] mb-4">
                你的问题列表 ({questions.length})
              </h3>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {questions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3 p-4 bg-[#FFF0F5] rounded-2xl group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      
                      <p className="flex-1 text-[#2D2D2D] pt-1 break-words">
                        {question}
                      </p>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveQuestion(index)}
                        className="p-2 text-[#EF4444] opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Complete Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleComplete}
            size="lg"
            className="w-full shadow-2xl"
            disabled={isSaving}
          >
            {isSaving
              ? '正在保存...'
              : questions.length > 0 
                ? `完成并查看结果 (${questions.length} 个问题)` 
                : '跳过并查看结果'
            }
          </Button>
          
          {questions.length === 0 && (
            <p className="text-center mt-3 text-sm text-[#717182]">
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}