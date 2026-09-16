import React from 'react';
import { Home, Layers, Cpu, Activity, User, MessageSquare } from 'lucide-react';

interface MobileNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isDarkMode: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeSection,
  onNavigate,
  isDarkMode
}) => {
  const items = [
    { id: 'hero', label: 'خانه', icon: Home },
    { id: 'projects', label: 'پروژه‌ها', icon: Layers },
    { id: 'skills', label: 'مهارت‌ها', icon: Cpu },
    { id: 'dyno-ecu', label: 'دیاگ', icon: Activity },
    { id: 'about', label: 'درباره من', icon: User },
    { id: 'contact', label: 'ارتباط', icon: MessageSquare },
  ];

  return (
    <div className="xl:hidden fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none safe-bottom">
      <nav className="pointer-events-auto w-full max-w-[370px] flex items-center justify-between p-1.5 rounded-full bg-[#090d16]/90 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_16px_rgba(0,240,255,0.2)]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex-1 max-w-[54px] min-h-[44px] py-1 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-tr from-[#00f0ff] to-[#00a3ff] text-[#002022] font-bold shadow-[0_0_14px_rgba(0,240,255,0.7)] scale-105'
                  : 'text-[#b9cacb] hover:text-white hover:bg-white/5'
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="text-[9px] font-medium tracking-tight mt-0.5 leading-none">{item.label}</span>
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
