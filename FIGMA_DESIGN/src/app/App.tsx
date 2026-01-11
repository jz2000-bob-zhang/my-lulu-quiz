import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WelcomePage } from "./components/WelcomePage";
import { QuizPage } from "./components/QuizPage";
import { TransitionPage } from "./components/TransitionPage";
import { QuestionSubmissionPage } from "./components/QuestionSubmissionPage";
import { ResultsPage } from "./components/ResultsPage";
import { questions } from "./data/questions";

type PageType = 'welcome' | 'quiz' | 'transition' | 'submission' | 'results';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [luluQuestions, setLuluQuestions] = useState<string[]>([]);

  const handleStart = () => {
    setCurrentPage('quiz');
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    
    const nextIndex = currentQuestionIndex + 1;
    
    // Show transition page every 6 questions (after Q6, Q12, Q18, Q24)
    if (nextIndex < questions.length && nextIndex % 6 === 0) {
      setCurrentPage('transition');
    } else if (nextIndex >= questions.length) {
      // All questions completed
      setCurrentPage('submission');
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleContinueFromTransition = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setCurrentPage('quiz');
  };

  const handleSubmitQuestions = (questions: string[]) => {
    setLuluQuestions(questions);
    setCurrentPage('results');
  };

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "spring",
    stiffness: 200,
    damping: 30
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <motion.div
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <WelcomePage 
              onStart={handleStart}
              totalQuestions={questions.length}
            />
          </motion.div>
        )}

        {currentPage === 'quiz' && (
          <motion.div
            key={`quiz-${currentQuestionIndex}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <QuizPage
              question={questions[currentQuestionIndex]}
              currentQuestionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}

        {currentPage === 'transition' && (
          <motion.div
            key="transition"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <TransitionPage
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onContinue={handleContinueFromTransition}
            />
          </motion.div>
        )}

        {currentPage === 'submission' && (
          <motion.div
            key="submission"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <QuestionSubmissionPage
              onComplete={handleSubmitQuestions}
            />
          </motion.div>
        )}

        {currentPage === 'results' && (
          <motion.div
            key="results"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ResultsPage
              questions={questions}
              userAnswers={userAnswers}
              luluQuestions={luluQuestions}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
