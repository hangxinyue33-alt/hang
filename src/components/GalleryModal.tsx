import React, { useState } from 'react';
import { PERSONALITY_RESULTS } from '../data/quizData';
import { PersonalityResult } from '../types';
import { soundManager } from '../utils/audio';
import { FoodIpIllustration } from './FoodIpIllustration';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPersonality: (result: PersonalityResult) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectPersonality,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!isOpen) return null;

  const currentResult = PERSONALITY_RESULTS[activeTab];

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FFF9F2] w-full max-w-sm max-h-[92%] rounded-[32px] border-4 border-[#222] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#F2F2F2]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h3 className="text-base font-extrabold text-[#2D2D2D]">
              全6种恋爱饭搭子人格图鉴
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#F2F2F2] hover:bg-[#E0E0E0] text-[#2D2D2D] font-bold flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Top Pills to switch between the 6 personalities */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-3 bg-white border-b border-[#F2F2F2] custom-scrollbar">
          {PERSONALITY_RESULTS.map((res, idx) => (
            <button
              key={res.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(idx);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === idx
                  ? 'bg-[#FF6321] text-white shadow-sm scale-105'
                  : 'bg-[#F2F2F2] text-[#666] hover:bg-[#EAEAEA]'
              }`}
            >
              <span>{res.emoji}</span>
              <span>{res.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Result Preview Box */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-left custom-scrollbar">
          {/* IP & Title */}
          <div className="flex flex-col items-center text-center">
            <FoodIpIllustration
              emoji={currentResult.emoji}
              personalityId={currentResult.id}
              size="md"
              animated={false}
            />
            <h4 className="text-xl font-black text-[#2D2D2D] mt-2">
              {currentResult.title}
            </h4>
            <div className="inline-block bg-[#FF6321] text-white px-3 py-1 rounded-md text-xs font-bold mt-1.5">
              {currentResult.tagline}
            </div>
          </div>

          {/* Personality Description */}
          <div className="bg-white border border-[#EBEBEB] rounded-2xl p-4 shadow-2xs">
            <span className="inline-block px-2.5 py-0.5 bg-[#FFD54F] text-[#2D2D2D] rounded-full text-xs font-bold mb-2">
              恋爱人格
            </span>
            <p className="text-xs sm:text-sm text-[#444] leading-relaxed whitespace-pre-line">
              {currentResult.description}
            </p>
          </div>

          {/* TA's view */}
          <div className="bg-white border border-[#EBEBEB] rounded-2xl p-4 shadow-2xs">
            <span className="inline-block px-2.5 py-0.5 bg-[#E3F2FD] text-[#1E88E5] rounded-full text-xs font-bold mb-2">
              TA眼里的你
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentResult.taView.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#F8F8F8] text-[#333] border border-[#E8E8E8] px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-[#F2F2F2] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectPersonality(currentResult);
              onClose();
            }}
            className="flex-1 btn-primary-vibrant py-3 text-sm font-bold"
          >
            查看并分享该结果
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-3 bg-[#F2F2F2] text-[#555] rounded-full text-sm font-bold hover:bg-[#E5E5E5]"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
