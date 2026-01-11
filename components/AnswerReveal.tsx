'use client';

interface AnswerRevealProps {
  bobAnswer: string;
  luluAnswer: string;
  isMatch: boolean;
}

export default function AnswerReveal({
  bobAnswer,
  luluAnswer,
  isMatch,
}: AnswerRevealProps) {
  return (
    <div className="w-full">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFA8C5] mb-4 shadow-lg">
            <span className="text-4xl">{isMatch ? '💕' : '💭'}</span>
          </div>
          <h3 className="text-2xl font-bold text-[#2D2D2D]">
            {isMatch ? '答案一致！' : 'Bob 的答案'}
          </h3>
        </div>

        <div className="space-y-5">
          <div className="bg-gradient-to-r from-[#FFF0F5] to-[#FFE5EE] rounded-2xl p-5">
            <p className="text-sm text-[#FF6B9D] font-semibold mb-2">
              Lulu 的答案
            </p>
            <p className="text-lg font-medium text-[#2D2D2D]">{luluAnswer}</p>
          </div>

          <div className="bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] rounded-2xl p-5">
            <p className="text-sm text-[#2196F3] font-semibold mb-2">
              Bob 的答案
            </p>
            <p className="text-lg font-medium text-[#2D2D2D]">{bobAnswer}</p>
          </div>
        </div>

        {isMatch && (
          <div className="mt-6 text-center">
            <p className="text-lg text-[#4ADE80] font-semibold">
              你们想到一起去了！✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
