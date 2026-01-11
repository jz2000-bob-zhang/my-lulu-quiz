'use client';

import { useState } from 'react';

interface ChoiceQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export default function ChoiceQuestion({
  question,
  options,
  onAnswer,
  disabled = false,
}: ChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (disabled) return;
    setSelected(option);
    onAnswer(option);
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-8 text-center leading-relaxed">
        {question}
      </h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={disabled}
            className={`
              w-full p-5 rounded-2xl text-left font-medium transition-all duration-300
              ${
                selected === option
                  ? 'bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] text-white shadow-xl scale-105'
                  : 'bg-white text-[#2D2D2D] border-2 border-gray-200 hover:border-[#FF6B9D] hover:shadow-md active:scale-95'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="flex items-center">
              <span className={`
                w-10 h-10 rounded-full flex items-center justify-center mr-4 text-sm font-bold
                ${selected === option ? 'bg-white/20' : 'bg-[#FFE5EE]'}
              `}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg">{option}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
