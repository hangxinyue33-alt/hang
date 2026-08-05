import React from 'react';
import { soundManager } from '../utils/audio';

interface PageHomeProps {
  onStart: () => void;
  onOpenGallery: () => void;
}

export const PageHome: React.FC<PageHomeProps> = ({ onStart, onOpenGallery }) => {
  const handleStart = () => {
    soundManager.playClick();
    onStart();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 text-center select-none overflow-y-auto">
      {/* Top bar / status */}
      <div className="w-full flex justify-between items-center text-xs text-[#999]">
        <span className="font-medium">PAGE 1 · 首页</span>
        <button
          onClick={onOpenGallery}
          className="text-[#FF6321] hover:underline font-semibold flex items-center gap-1 bg-[#FFF1E8] px-2.5 py-1 rounded-full transition-colors"
          title="查看全部6种恋爱人格图鉴"
        >
          <span>📖 人格图鉴</span>
        </button>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 w-full">
        {/* Animated Food IP Illustration */}
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-[32px] bg-gradient-to-br from-[#FFF1E8] to-[#FFE0D0] border-2 border-[#FFD8C0] flex items-center justify-center shadow-inner text-6xl animate-bounce">
            🍱
          </div>
          <span className="absolute -top-2 -right-2 bg-[#FFD54F] text-[#2D2D2D] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            H5测验
          </span>
        </div>

        {/* 页面标题 */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2D2D] tracking-tight leading-snug my-2">
          《恋爱饭搭子人格测试》
        </h1>

        {/* 副标题 */}
        <p className="text-base text-[#666666] leading-relaxed mt-1">
          今天这一顿饭，
          <br />
          暴露你的恋爱人格。
        </p>

        {/* 测试说明卡片 (Dashed primary border in Vibrant Palette) */}
        <div className="w-full mt-6 bg-white p-5 rounded-[24px] border-2 border-dashed border-[#FF6321] shadow-sm text-left">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-[#FF6321]">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FF6321]/15 text-[#FF6321] text-xs">
                1
              </span>
              <span>6道趣味选择题</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-semibold text-[#FF6321]">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FF6321]/15 text-[#FF6321] text-xs">
                2
              </span>
              <span>解锁你的恋爱饭搭子人格</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-semibold text-[#FF6321]">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FF6321]/15 text-[#FF6321] text-xs">
                3
              </span>
              <span>生成专属结果卡</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full pt-3 pb-2">
        <button
          onClick={handleStart}
          className="btn-primary-vibrant w-full py-4 text-lg font-bold"
        >
          开始测试
        </button>
      </div>
    </div>
  );
};
