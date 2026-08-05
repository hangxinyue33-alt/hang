import React, { useState, useEffect } from 'react';
import { PersonalityResult } from '../types';
import { generatePosterDataUrl, downloadPosterImage } from '../utils/canvasPoster';
import { soundManager } from '../utils/audio';

interface PagePosterProps {
  result: PersonalityResult;
  onRetake: () => void;
  onBackToResult: () => void;
}

export const PagePoster: React.FC<PagePosterProps> = ({
  result,
  onRetake,
  onBackToResult,
}) => {
  const [posterDataUrl, setPosterDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);
    generatePosterDataUrl(result).then((url) => {
      if (isMounted) {
        setPosterDataUrl(url);
        setIsGenerating(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [result]);

  const handleDownload = () => {
    soundManager.playClick();
    if (posterDataUrl) {
      downloadPosterImage(posterDataUrl, `《恋爱饭搭子人格测试》-${result.name}.png`);
    }
  };

  const handleShare = () => {
    soundManager.playClick();
    const shareText = `【恋爱饭搭子人格测试】
我是：${result.title}
${result.tagline}
快来看看你的恋爱饭搭子人格是什么？`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 select-none bg-[#222222] text-white overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToResult();
          }}
          className="text-xs text-[#AAA] hover:text-white flex items-center gap-1"
        >
          <span>← 返回结果</span>
        </button>
        <span className="text-xs text-[#777] font-semibold">PAGE 16 · 结果分享海报</span>
      </div>

      {/* Main Poster Preview Card */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 w-full">
        {isGenerating ? (
          <div className="w-full max-w-[300px] h-[440px] bg-[#FFF9F2] rounded-[28px] flex flex-col items-center justify-center p-6 text-[#2D2D2D] animate-pulse">
            <span className="text-5xl mb-4">🎨</span>
            <span className="text-sm font-bold text-[#FF6321]">
              正在生成专属人格海报卡...
            </span>
          </div>
        ) : (
          <div
            id="poster-card"
            className="w-full max-w-[310px] bg-[#FFF9F2] text-[#2D2D2D] rounded-[28px] p-6 text-center shadow-2xl border-4 border-white/10 relative overflow-hidden"
          >
            {/* Top decorative stripe */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#FF6321]" />

            {/* 食物IP占位区域 */}
            <div className="w-24 h-24 mx-auto rounded-3xl bg-white border-2 border-[#F2F2F2] flex items-center justify-center text-5xl shadow-inner mt-2 mb-3">
              {result.emoji}
            </div>

            {/* 人格名称 */}
            <h2 className="text-2xl font-black tracking-tight text-[#2D2D2D] my-1">
              {result.title}
            </h2>

            {/* 一句话反差标签 */}
            <div className="inline-block bg-[#FF6321] text-white px-3 py-1 rounded-md text-xs font-bold my-1.5 shadow-xs">
              {result.tagline}
            </div>

            {/* 一段描述文案摘要 */}
            <div className="bg-white border border-[#F0ECE8] rounded-xl p-3 my-3 text-left">
              <span className="inline-block px-2 py-0.5 bg-[#FFD54F] text-[#2D2D2D] rounded text-[10px] font-bold mb-1">
                「看起来好说话，其实最会拿捏关系分寸。」
              </span>
              <p className="text-xs text-[#555] leading-relaxed line-clamp-3">
                {result.description.split('\n')[0]} {result.description.split('\n')[1]}
              </p>
            </div>

            <div className="w-full h-px bg-dashed border-t border-dashed border-[#DDD] my-3" />

            {/* 分享引导语 */}
            <p className="text-xs font-bold text-[#FF6321] tracking-wide">
              看看你的恋爱饭搭子人格是什么？
            </p>
            <p className="text-[10px] text-[#999] mt-1">
              长按保存人格卡 · 分享给TA，看你们是不是天生饭搭子
            </p>
          </div>
        )}

        {copied && (
          <div className="mt-3 bg-[#FF6321] text-white text-xs font-bold px-4 py-1.5 rounded-full animate-bounce">
            ✨ 已复制结果与链接，快去粘贴给好友或TA吧！
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5 pt-2 pb-1">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="btn-primary-vibrant py-3 text-sm font-bold flex items-center justify-center gap-1.5 !bg-[#FF6321]"
          >
            <span>📥 保存图片卡片</span>
          </button>
          <button
            onClick={handleShare}
            className="btn-primary-vibrant py-3 text-sm font-bold flex items-center justify-center gap-1.5 !bg-white !text-[#222] !shadow-[0_4px_0_#ccc] hover:!bg-gray-100"
          >
            <span>💬 复制分享文案</span>
          </button>
        </div>
        <button
          onClick={() => {
            soundManager.playClick();
            onRetake();
          }}
          className="w-full py-3 text-sm font-semibold text-[#CCC] hover:text-white underline transition-colors"
        >
          重新测试
        </button>
      </div>
    </div>
  );
};
