'use client';

import { useState } from 'react';

interface TextQuestionProps {
  question: string;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export default function TextQuestion({
  question,
  onAnswer,
  disabled = false,
}: TextQuestionProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim() && !disabled) {
      onAnswer(answer.trim());
    }
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-8 text-center leading-relaxed">
        {question}
      </h2>
      <div className="space-y-5">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={disabled}
          placeholder="在这里输入你的答案..."
          className="w-full p-5 rounded-2xl border-2 border-gray-200 focus:border-[#FF6B9D] focus:outline-none resize-none h-40 text-lg text-[#2D2D2D] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          style={{ fontSize: '16px' }}
        />
        <button
          onClick={handleSubmit}
          disabled={!answer.trim() || disabled}
          className={`
            w-full py-5 rounded-2xl font-semibold text-lg text-white transition-all duration-300
            ${
              answer.trim() && !disabled
                ? 'bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] hover:shadow-xl hover:scale-105 active:scale-95'
                : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          提交答案
        </button>
      </div>
    </div>
  );
}
