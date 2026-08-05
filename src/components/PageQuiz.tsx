import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { soundManager } from '../utils/audio';

interface PageQuizProps {
  question: QuizQuestion;
  questionIndex: number; // 0 to 5
  totalQuestions: number; // 6
  onSelectOption: (optionIndex: number, personalityIndex: number) => void;
  onPrevQuestion?: () => void;
  selectedOptionIndex?: number | null;
}

export const PageQuiz: React.FC<PageQuizProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onSelectOption,
  onPrevQuestion,
}) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleOptionClick = (idx: number, personalityIndex: number) => {
    if (activeIdx !== null) return; // prevent double click
    setActiveIdx(idx);
    soundManager.playSelect();

    // Small delay to show visual active feedback before page transition
    setTimeout(() => {
      setActiveIdx(null);
      onSelectOption(idx, personalityIndex);
    }, 220);
  };

  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 select-none overflow-y-auto">
      {/* Top Section: Progress Text & Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#FF6321] text-sm tracking-wide">
              第{questionIndex + 1}题 / 共{totalQuestions}题
            </span>
            {questionIndex > 0 && onPrevQuestion && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onPrevQuestion();
                }}
                className="text-xs text-[#999] hover:text-[#555] underline"
              >
                上一题
              </button>
            )}
          </div>
          <span className="text-xs text-[#999] font-semibold tracking-wider">
            PAGE {questionIndex + 3}
          </span>
        </div>

        {/* 简单进度条 - Vibrant Palette */}
        <div className="w-full h-2 bg-[#F2F2F2] rounded-full overflow-hidden my-3">
          <div
            className="h-full bg-[#FF6321] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Center Section: 问题区域 */}
      <div className="flex-1 flex flex-col justify-center my-4">
        {/* Question card */}
        <div className="bg-white border-2 border-[#F2F2F2] rounded-[24px] p-5 sm:p-6 mb-6 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2D2D2D] leading-snug tracking-tight">
            {question.question}
          </h2>
        </div>

        {/* 四个选项区域 */}
        <div className="flex flex-col gap-3">
          {question.options.map((opt, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx, opt.personalityIndex)}
                className={`option-btn-vibrant w-full text-left flex items-start gap-3 transition-all ${
                  isSelected
                    ? '!border-[#FF6321] !bg-[#FF6321]/10 scale-[0.99] shadow-md'
                    : ''
                }`}
              >
                <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FFF1E8] text-[#FF6321] font-bold text-sm border border-[#FFD8C0]">
                  {opt.label}
                </span>
                <span className="text-base sm:text-lg font-medium text-[#2D2D2D] leading-normal pt-0.5">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Tip */}
      <div className="text-center pb-2">
        <span className="text-[11px] text-[#A09A94] font-medium">
          点击选项即自动记录答案并进入下一题
        </span>
      </div>
    </div>
  );
};
