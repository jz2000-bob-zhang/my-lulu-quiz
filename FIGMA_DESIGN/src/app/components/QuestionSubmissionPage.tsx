import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";
import { TextArea } from "./Input";
import { Card } from "./Card";
import { Trash2, Plus, Sparkles, PartyPopper } from "lucide-react";

interface QuestionSubmissionPageProps {
  onComplete: (questions: string[]) => void;
}

export function QuestionSubmissionPage({ onComplete }: QuestionSubmissionPageProps) {
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

  const handleComplete = () => {
    onComplete(questions);
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
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
              placeholder="例如：你最喜欢我的哪一点？"
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
                      
                      <p className="flex-1 text-[#2D2D2D] pt-1">
                        {question}
                      </p>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveQuestion(index)}
                        className="p-2 text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity"
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
          >
            {questions.length > 0 
              ? `完成并查看结果 (${questions.length} 个问题)` 
              : '跳过并查看结果'
            }
          </Button>
          
          {questions.length === 0 && (
            <p className="text-center mt-3 text-sm text-[#717182]">
              你也可以先跳过，直接查看你们的默契度
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
