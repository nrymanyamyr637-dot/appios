import React from 'react';
import { quickTechCards } from '../data/timelineData';
import { Bot, Zap, Code, Wrench, Cpu, Smartphone, Gamepad2, Layers } from 'lucide-react';

interface QuickTechCardsProps {
  onSelectCategory: (category: string) => void;
  isDarkMode: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Zap,
  Code,
  Wrench,
  Cpu,
  Smartphone,
  Gamepad2,
  Layers,
};

export const QuickTechCards: React.FC<QuickTechCardsProps> = ({
  onSelectCategory,
  isDarkMode
}) => {
  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-[11px] text-[#00f0ff] uppercase tracking-widest block">
            CORE ENGINEERING DOMAINS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            کارت‌های معرفی سریع تخصص‌ها
          </h2>
        </div>
        <span className="text-xs font-mono text-[#849495] hidden sm:block">
          8 DOMAINS MOUNTED
        </span>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
        {quickTechCards.map((card) => {
          const IconComponent = iconMap[card.icon] || Bot;
          return (
            <button
              key={card.id}
              onClick={() => onSelectCategory(card.categoryRef)}
              className={`group p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center gap-1.5 sm:gap-2 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden ${
                isDarkMode ? 'glass-panel hover:glass-panel-elevated' : 'glass-panel-light hover:glass-panel-elevated-light'
              }`}
            >
              {/* Dynamic Glow Spotlight */}
              <div
                className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${card.accentColor}25 0%, transparent 70%)` }}
              />

              {/* Icon Container with 3D Neumorphic Bevel */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-inner relative z-10"
                style={{
                  backgroundColor: `${card.accentColor}15`,
                  color: card.accentColor,
                  border: `1px solid ${card.accentColor}35`
                }}
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Title & Tech Slug */}
              <div className="relative z-10 space-y-0.5 w-full">
                <span className="font-bold text-xs sm:text-sm text-white block tracking-tight truncate">
                  {card.title}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#b9cacb] block opacity-80 truncate">
                  {card.enTitle}
                </span>
              </div>

              {/* Bottom Subtle Indicator Beam */}
              <div
                className="w-6 sm:w-8 h-0.5 rounded-full opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:w-12"
                style={{ backgroundColor: card.accentColor }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};
