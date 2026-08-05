import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

interface PhoneFrameProps {
  children: React.ReactNode;
  onOpenGallery: () => void;
  onReset: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  onOpenGallery,
  onReset,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted());
  const [isPhoneMode, setIsPhoneMode] = useState<boolean>(true);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playClick();
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#E8E4E0] p-2 sm:p-6 select-none font-sans">
      {/* Top Floating Control Bar (Outside the phone screen) */}
      <div className="flex items-center gap-2 mb-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white text-xs font-semibold text-[#2D2D2D] z-10">
        <button
          onClick={() => {
            soundManager.playClick();
            onReset();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF1E8] text-[#FF6321] hover:bg-[#FFE8D8] transition-colors"
          title="重置回首页"
        >
          <span>🏠 首页</span>
        </button>

        <span className="text-[#DDD]">|</span>

        <button
          onClick={onOpenGallery}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF9F2] text-[#2D2D2D] hover:bg-[#FFF2E2] transition-colors"
          title="全6种恋爱饭搭子图鉴"
        >
          <span>📖 全6种结果图鉴</span>
        </button>

        <span className="text-[#DDD]">|</span>

        <button
          onClick={toggleSound}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F2F2F2] text-[#666] hover:bg-[#EAEAEA] transition-colors"
          title={isMuted ? '点击开启音效' : '点击关闭音效'}
        >
          <span>{isMuted ? '🔇 静音' : '🔊 音效'}</span>
        </button>

        <span className="text-[#DDD] hidden sm:inline">|</span>

        <button
          onClick={() => {
            soundManager.playClick();
            setIsPhoneMode(!isPhoneMode);
          }}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F2F2F2] text-[#666] hover:bg-[#EAEAEA] transition-colors"
          title="切换手机边框视图或全屏视图"
        >
          <span>{isPhoneMode ? '📱 手机框模式' : '🖥️ 全屏模式'}</span>
        </button>
      </div>

      {/* The Phone Container / Screen (375 × 812 px mobile H5 standard) */}
      <div
        className={`relative bg-[#FFF9F2] overflow-hidden transition-all duration-300 flex flex-col ${
          isPhoneMode
            ? 'w-full max-w-[375px] h-[780px] sm:h-[812px] rounded-[44px] sm:rounded-[48px] border-[10px] sm:border-[12px] border-[#222222] shadow-[0_30px_90px_rgba(0,0,0,0.18)]'
            : 'w-full max-w-lg h-[84vh] rounded-[32px] border-4 border-[#222222] shadow-xl'
        }`}
      >
        {/* Phone Speaker / Camera Notch Bezel */}
        <div className="w-full flex justify-center pt-2 pb-1 bg-transparent shrink-0">
          <div className="w-24 h-4 bg-[#222222] rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111111] border border-[#333333]" />
          </div>
        </div>

        {/* Screen Content Wrapper */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>

        {/* Bottom Home Bar */}
        <div className="w-full flex justify-center py-2 shrink-0">
          <div className="w-32 h-1.5 bg-[#D5D0CC] rounded-full" />
        </div>
      </div>

      {/* Bottom watermark / credit hint */}
      <div className="mt-3 text-center text-xs text-[#888]">
        <span>《恋爱饭搭子人格测试》H5原型复现 · 移动端 375×812 适配</span>
      </div>
    </div>
  );
};
