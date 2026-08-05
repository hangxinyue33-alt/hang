import React from 'react';
import { soundManager } from '../utils/audio';

interface PageIntroProps {
  onStartQuiz: () => void;
  onBack: () => void;
}

export const PageIntro: React.FC<PageIntroProps> = ({ onStartQuiz, onBack }) => {
  const handleStart = () => {
    soundManager.playClick();
    onStartQuiz();
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="text-sm font-medium text-[#666] hover:text-[#2D2D2D] flex items-center gap-1"
        >
          <span>← 返回首页</span>
        </button>
        <span className="text-xs text-[#999] font-medium">PAGE 2 · 说明</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center my-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FFF1E8] text-[#FF6321] flex items-center justify-center text-3xl mb-4 shadow-sm">
          💡
        </div>

        <h2 className="text-2xl font-extrabold text-[#2D2D2D] mb-6 tracking-tight text-center">
          测试说明
        </h2>

        {/* 说明文字容器 */}
        <div className="w-full bg-white border-2 border-[#F2F2F2] rounded-[24px] p-6 shadow-sm">
          <p className="text-base sm:text-lg leading-[1.9] text-[#444444] text-center font-normal">
            接下来将回答6道趣味选择题。
            <br />
            <br />
            选择最符合你的答案，
            <br />
            看看你是哪一种恋爱饭搭子。
          </p>
        </div>

        {/* 提示小贴士 */}
        <div className="mt-6 flex items-center gap-1.5 text-xs text-[#888] bg-[#FFF9F2] px-3.5 py-1.5 rounded-full border border-[#FF6321]/20">
          <span>✨ 建议根据第一直觉快速选择哦</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full pt-3 pb-2">
        <button
          onClick={handleStart}
          className="btn-primary-vibrant w-full py-4 text-lg font-bold"
        >
          开始第一题
        </button>
      </div>
    </div>
  );
};
