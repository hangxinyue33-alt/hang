import React from 'react';
import { PersonalityResult } from '../types';
import { FoodIpIllustration } from './FoodIpIllustration';
import { soundManager } from '../utils/audio';

interface PageResultProps {
  result: PersonalityResult;
  onGenerateCard: () => void;
  onShareResult: () => void;
  onRetake: () => void;
  onOpenGallery: () => void;
}

export const PageResult: React.FC<PageResultProps> = ({
  result,
  onGenerateCard,
  onShareResult,
  onRetake,
  onOpenGallery,
}) => {
  // Line-break preserving description renderer
  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => {
            soundManager.playClick();
            onRetake();
          }}
          className="text-xs font-semibold text-[#666] hover:text-[#2D2D2D] bg-white border border-[#DDD] px-3 py-1 rounded-full shadow-sm"
        >
          🔄 重新测试
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenGallery();
            }}
            className="text-xs font-semibold text-[#FF6321] hover:underline bg-[#FFF1E8] px-2.5 py-1 rounded-full"
          >
            📖 人格图鉴
          </button>
          <span className="text-xs text-[#999] font-medium">PAGE {result.id + 10}</span>
        </div>
      </div>

      {/* Main Result Content */}
      <div className="flex-1 flex flex-col items-center my-3 w-full">
        {/* 顶部：食物IP图片区域 */}
        <div className="my-2">
          <FoodIpIllustration
            emoji={result.emoji}
            personalityId={result.id}
            size="lg"
            animated={true}
          />
        </div>

        {/* 中间：人格名称 */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#2D2D2D] tracking-tight text-center mt-2">
          {result.title}
        </h2>

        {/* 增加：一句反差标签 (Vibrant Orange Tagline Box) */}
        <div className="mt-2.5 bg-[#FF6321] text-white px-4 py-1.5 rounded-lg text-sm sm:text-base font-bold shadow-sm text-center">
          {result.tagline}
        </div>

        {/* 下面：恋爱人格正文 (Card container with badge) */}
        <div className="w-full bg-white border-2 border-[#F2F2F2] rounded-[22px] p-5 mt-4 shadow-sm text-left relative">
          <div className="inline-block px-3.5 py-1 bg-[#FFD54F] text-[#2D2D2D] rounded-full text-xs font-bold mb-2.5 shadow-xs">
            恋爱人格
          </div>
          <p className="text-sm sm:text-base leading-[1.8] text-[#444444] font-normal">
            {renderDescription(result.description)}
          </p>
        </div>

        {/* 下面：TA眼里的你 (Card container with blue badge) */}
        <div className="w-full bg-white border-2 border-[#F2F2F2] rounded-[22px] p-5 mt-3.5 shadow-sm text-left relative">
          <div className="inline-block px-3.5 py-1 bg-[#E3F2FD] text-[#1E88E5] rounded-full text-xs font-bold mb-2.5 shadow-xs">
            TA眼里的你
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {result.taView.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center bg-[#F8F8F8] text-[#333333] border border-[#E8E8E8] px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
              >
                ✦ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 底部按钮 (1:1 Responsive grid as in mockup) */}
      <div className="grid grid-cols-2 gap-3 w-full pt-4 pb-2">
        <button
          onClick={() => {
            soundManager.playClick();
            onGenerateCard();
          }}
          className="btn-primary-vibrant py-3.5 text-base font-bold"
        >
          生成我的人格卡
        </button>
        <button
          onClick={() => {
            soundManager.playClick();
            onShareResult();
          }}
          className="btn-primary-vibrant py-3.5 text-base font-bold !bg-[#222222] !shadow-[0_6px_0_#000000] hover:!bg-[#333333]"
        >
          分享结果
        </button>
      </div>
    </div>
  );
};
