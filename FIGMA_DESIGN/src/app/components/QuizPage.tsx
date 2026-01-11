import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";
import { ChoiceButton } from "./ChoiceButton";
import { Input } from "./Input";
import { ProgressBar } from "./ProgressBar";
import { Card } from "./Card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Question } from "../data/questions";
import { CheckCircle2, Heart } from "lucide-react";

interface QuizPageProps {
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
}

export function QuizPage({ 
  question, 
  currentQuestionNumber, 
  totalQuestions, 
  onAnswer 
}: QuizPageProps) {
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [textAnswer, setTextAnswer] = useState<string>("");
  const [showComparison, setShowComparison] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string>("");

  const handleSubmit = () => {
    const answer = question.type === 'choice' ? selectedChoice : textAnswer;
    if (!answer.trim()) return;
    
    setUserAnswer(answer);
    setShowComparison(true);
    
    // Auto advance after showing comparison
    setTimeout(() => {
      onAnswer(answer);
    }, 3000);
  };

  const isAnswerMatch = userAnswer === question.bobAnswer;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Photo Banner */}
      {question.photoUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-48 overflow-hidden"
        >
          <ImageWithFallback
            src={question.photoUrl}
            alt="Question banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-2xl mx-auto w-full">
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

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white font-bold flex-shrink-0">
                {currentQuestionNumber}
              </div>
              <h2 className="text-xl font-semibold text-[#2D2D2D] flex-1 pt-1">
                {question.question}
              </h2>
            </div>

            {!showComparison && (
              <div className="space-y-4">
                {question.type === 'choice' && question.choices ? (
                  <>
                    {question.choices.map((choice, index) => (
                      <ChoiceButton
                        key={index}
                        letter={String.fromCharCode(65 + index)} // A, B, C, D
                        text={choice}
                        selected={selectedChoice === choice}
                        onClick={() => setSelectedChoice(choice)}
                      />
                    ))}
                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedChoice}
                      className="w-full mt-4"
                    >
                      提交答案
                    </Button>
                  </>
                ) : (
                  <>
                    <Input
                      placeholder="请输入你的答案..."
                      value={textAnswer}
                      onChange={(e) => setTextAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && textAnswer.trim()) {
                          handleSubmit();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={!textAnswer.trim()}
                      className="w-full"
                    >
                      提交答案
                    </Button>
                  </>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Answer Comparison */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {isAnswerMatch && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center mb-4"
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
                    className="text-6xl mb-2"
                  >
                    💕
                  </motion.div>
                  <p className="text-lg font-semibold text-[#4ADE80]">
                    答案一致！你们真默契！
                  </p>
                </motion.div>
              )}

              <Card className="p-6">
                <div className="space-y-4">
                  {/* Lulu's Answer */}
                  <div className="bg-gradient-to-r from-[#FFF0F5] to-[#FFE5EE] rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] flex items-center justify-center text-white text-sm font-bold">
                        L
                      </div>
                      <span className="font-semibold text-[#FF6B9D]">Lulu 的答案</span>
                      {isAnswerMatch && (
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80] ml-auto" />
                      )}
                    </div>
                    <p className="text-[#2D2D2D] pl-10">{userAnswer}</p>
                  </div>

                  {/* Bob's Answer */}
                  <div className="bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2196F3] to-[#64B5F6] flex items-center justify-center text-white text-sm font-bold">
                        B
                      </div>
                      <span className="font-semibold text-[#2196F3]">Bob 的答案</span>
                      {isAnswerMatch && (
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80] ml-auto" />
                      )}
                    </div>
                    <p className="text-[#2D2D2D] pl-10">{question.bobAnswer}</p>
                  </div>
                </div>

                {!isAnswerMatch && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-4 text-sm text-[#717182]"
                  >
                    没关系，继续了解彼此吧 ❤️
                  </motion.p>
                )}
              </Card>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-4 text-sm text-[#717182]"
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
