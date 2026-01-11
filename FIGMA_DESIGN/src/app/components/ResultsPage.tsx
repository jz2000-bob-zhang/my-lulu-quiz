import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Question } from "../data/questions";
import { ChevronDown, CheckCircle2, Circle, Share2, Heart, Trophy, Sparkles } from "lucide-react";

interface ResultsPageProps {
  questions: Question[];
  userAnswers: string[];
  luluQuestions: string[];
}

export function ResultsPage({ questions, userAnswers, luluQuestions }: ResultsPageProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  // Calculate compatibility
  const matchCount = questions.filter((q, i) => userAnswers[i] === q.bobAnswer).length;
  const percentage = Math.round((matchCount / questions.length) * 100);

  const toggleQuestion = (id: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const getEmoji = (score: number) => {
    if (score >= 90) return "🎉";
    if (score >= 70) return "💕";
    if (score >= 50) return "😊";
    return "💭";
  };

  const getMessage = (score: number) => {
    if (score >= 90) return "你们简直是天生一对！";
    if (score >= 70) return "你们的默契度很高哦！";
    if (score >= 50) return "你们还在互相了解中";
    return "继续加油，慢慢了解彼此";
  };

  const handleShare = () => {
    const text = `我们的默契度是 ${percentage}%！在 ${questions.length} 道题中有 ${matchCount} 道答案一致 💕`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("结果已复制到剪贴板！");
    }
  };

  return (
    <div className="min-h-screen p-6 pb-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-7xl mb-4"
          >
            {getEmoji(percentage)}
          </motion.div>
          
          <h1 className="text-3xl font-bold text-[#2D2D2D]">
            默契度测试结果
          </h1>
        </motion.div>

        {/* Compatibility Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
        >
          <Card variant="gradient" className="p-8 mb-6 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <motion.div
              className="absolute top-4 left-4"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-6 h-6 text-white/40" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-4 right-4"
              animate={{ 
                rotate: [0, -360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Heart className="w-8 h-8 text-white/40 fill-current" />
            </motion.div>

            <div className="relative z-10">
              <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.4
                }}
                className="text-7xl font-bold mb-4"
              >
                {percentage}%
              </motion.div>
              
              <h2 className="text-2xl font-semibold mb-2">
                {getMessage(percentage)}
              </h2>
              
              <p className="text-white/90 text-lg">
                你们在 {questions.length} 道题中有 {matchCount} 道答案一致
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Questions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
            <span>题目详情</span>
            <span className="text-sm font-normal text-[#717182]">
              (点击展开查看答案)
            </span>
          </h2>
          
          <div className="space-y-3">
            {questions.map((question, index) => {
              const isMatch = userAnswers[index] === question.bobAnswer;
              const isExpanded = expandedQuestions.has(question.id);
              
              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.03 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="w-full p-4 flex items-center gap-3 text-left hover:bg-[#FFF0F5]/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      
                      <p className="flex-1 font-medium text-[#2D2D2D]">
                        {question.question}
                      </p>
                      
                      {isMatch ? (
                        <CheckCircle2 className="w-6 h-6 text-[#4ADE80] flex-shrink-0" />
                      ) : (
                        <Circle className="w-6 h-6 text-[#D1B4C0] flex-shrink-0" />
                      )}
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-[#717182]" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-2 space-y-3 border-t border-[#FFE5EE]">
                            {/* Lulu's Answer */}
                            <div className="bg-gradient-to-r from-[#FFF0F5] to-[#FFE5EE] rounded-2xl p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white text-xs font-bold">
                                  L
                                </div>
                                <span className="text-sm font-semibold text-[#FF6B9D]">Lulu</span>
                                {isMatch && <CheckCircle2 className="w-4 h-4 text-[#4ADE80] ml-auto" />}
                              </div>
                              <p className="text-[#2D2D2D] pl-8 text-sm">{userAnswers[index]}</p>
                            </div>
                            
                            {/* Bob's Answer */}
                            <div className="bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] rounded-2xl p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2196F3] to-[#64B5F6] flex items-center justify-center text-white text-xs font-bold">
                                  B
                                </div>
                                <span className="text-sm font-semibold text-[#2196F3]">Bob</span>
                                {isMatch && <CheckCircle2 className="w-4 h-4 text-[#4ADE80] ml-auto" />}
                              </div>
                              <p className="text-[#2D2D2D] pl-8 text-sm">{question.bobAnswer}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-[#2D2D2D] mb-4">
              Lulu 给 Bob 的提问
            </h2>
            
            <Card className="p-6">
              <div className="space-y-4">
                {luluQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
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

        {/* Share Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Button
            onClick={handleShare}
            size="lg"
            variant="secondary"
            className="w-full"
          >
            <Share2 className="w-5 h-5" />
            分享结果
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
