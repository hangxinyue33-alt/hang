import React, { useEffect, useState } from 'react';
import { soundManager } from '../utils/audio';

interface PageLoadingProps {
  onLoadingComplete: () => void;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(5);
  const [stepText, setStepText] = useState('分析你的 6 道题答题倾向...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(40);
      setStepText('匹配恋爱频率与饮食习惯...');
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStepText('提取一句话反差标签...');
    }, 1300);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStepText('生成你的恋爱饭搭子专属报告...');
    }, 1900);

    const timerComplete = setTimeout(() => {
      soundManager.playSuccess();
      onLoadingComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerComplete);
    };
  }, [onLoadingComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 select-none">
      {/* Top Header */}
      <div className="w-full flex justify-between items-center text-xs text-[#999]">
        <span>PAGE 9 · 结果生成页</span>
        <span>ANALYZING</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-8 w-full">
        {/* Animated cooking / analyzing emoji */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-[36px] bg-[#FFF1E8] border-2 border-[#FFD8C0] flex items-center justify-center text-6xl animate-bounce shadow-md">
            🍳
          </div>
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-[36px] border-4 border-[#FF6321] animate-ping opacity-25" />
        </div>

        {/* 标题 */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#2D2D2D] mb-3 tracking-tight">
          正在分析你的恋爱饭搭子人格...
        </h3>

        {/* 匹配步长文案 */}
        <p className="text-sm font-semibold text-[#FF6321] h-6 transition-all duration-300">
          {stepText}
        </p>

        {/* 加载进度条 */}
        <div className="w-48 sm:w-56 h-3 bg-[#F2F2F2] rounded-full overflow-hidden mt-6 border border-[#E0E0E0]">
          <div
            className="h-full bg-[#FF6321] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-bold text-[#999] mt-2">
          {progress}%
        </span>
      </div>

      {/* Footer hint */}
      <div className="text-xs text-[#888] pb-3">
        <span>稍等片刻，属于你的恋爱饭搭子卡片即将揭晓...</span>
      </div>
    </div>
  );
};
