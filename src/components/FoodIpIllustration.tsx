import React from 'react';

interface FoodIpProps {
  emoji: string;
  personalityId: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const FoodIpIllustration: React.FC<FoodIpProps> = ({
  emoji,
  personalityId,
  size = 'lg',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-3xl',
    md: 'w-24 h-24 text-5xl',
    lg: 'w-36 h-36 text-6xl',
    xl: 'w-44 h-44 text-7xl',
  }[size];

  // Colors per personality
  const bgColors = [
    'from-[#FFF1E8] to-[#FFE0D0] border-[#FFD8C0]', // 🍟 0 薯条
    'from-[#FFE8C8] to-[#FFD580] border-[#FFCA60]', // 🍜 1 火锅
    'from-[#FFF8D0] to-[#FFF0B0] border-[#FFE490]', // 🥟 2 饺子
    'from-[#FFDFD0] to-[#FFC8B8] border-[#FFB4A0]', // 🍗 3 守护肉
    'from-[#FFE8D0] to-[#FFD4B0] border-[#FFC490]', // 🧋 4 奶茶
    'from-[#FFF3E0] to-[#FFE0C0] border-[#FFD0A0]', // 🍚 5 白饭
  ];

  const colorClass = bgColors[personalityId % bgColors.length] || bgColors[0];

  return (
    <div
      className={`relative rounded-[32px] bg-gradient-to-br ${colorClass} border-2 flex items-center justify-center shadow-inner ${
        sizeClasses
      } ${animated ? 'hover:scale-105 transition-transform duration-300' : ''}`}
    >
      {/* Decorative sparkles around IP */}
      <div className="absolute top-2 left-3 text-amber-500/40 text-xs font-bold select-none">
        ✦
      </div>
      <div className="absolute bottom-2 right-3 text-orange-500/40 text-xs font-bold select-none">
        ✦
      </div>
      {/* Emoji / Food Character */}
      <span
        className={`select-none transform ${
          animated ? 'animate-bounce-subtle' : ''
        } filter drop-shadow-sm`}
        style={{ animationDuration: '2.5s' }}
      >
        {emoji}
      </span>
      {/* Small cute plate/base oval */}
      <div className="absolute bottom-2 w-3/5 h-2 bg-black/10 rounded-full blur-[2px]" />
    </div>
  );
};
