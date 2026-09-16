import React from 'react';
import { Sun, Moon, Volume2, VolumeX, MessageSquare, Terminal, Activity } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  activeSection,
  onNavigate,
  soundEnabled,
  onToggleSound
}) => {
  const navItems = [
    { id: 'hero', label: 'خانه' },
    { id: 'projects', label: 'پروژه‌ها' },
    { id: 'skills', label: 'مهارت‌ها' },
    { id: 'dyno-ecu', label: 'شبیه‌ساز و دیاگ' },
    { id: 'lab', label: 'آزمایشگاه' },
    { id: 'about', label: 'درباره من' },
    { id: 'contact', label: 'ارتباط' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 safe-top">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-2 pb-2">
        <div className={`h-16 rounded-2xl px-4 flex items-center justify-between gap-4 transition-all duration-300 ${
          isDarkMode ? 'glass-panel-elevated' : 'glass-panel-elevated-light'
        }`}>
          {/* Brand Logo & Name */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 sm:gap-3 text-right group transition-transform hover:scale-[1.02] shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#090d16] p-1 border border-[#00f0ff]/40 shadow-[0_0_16px_rgba(0,240,255,0.3)] flex items-center justify-center overflow-hidden shrink-0">
              <img src="/icon.svg" alt="AMIRREZA Logo" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-[#00f0ff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5 font-sans leading-tight">
                مهندس امیررضا
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">OS 2.4</span>
              </span>
              <span className="hidden sm:block font-mono text-[10px] text-[#b9cacb] tracking-wider uppercase">
                Mechatronics & Software Engineer
              </span>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-black/20 border border-white/5 backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : isDarkMode
                      ? 'text-[#b9cacb] hover:text-white hover:bg-white/5'
                      : 'text-gray-700 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Live Availability Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#65f2b5] animate-pulse shadow-[0_0_8px_#65f2b5]" />
              <span className="text-[#65f2b5] text-[11px] font-sans">آماده همکاری و پروژه‌های نوآورانه</span>
            </div>

            {/* PWA Install Button */}
            <PWAInstallButton isDarkMode={isDarkMode} />

            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#b9cacb] hover:text-white border border-white/10 transition-colors"
              title={soundEnabled ? 'صدا فعال است' : 'صدا غیرفعال است'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00f0ff]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#b9cacb] hover:text-white border border-white/10 transition-colors"
              title={isDarkMode ? 'تغییر به حالت روشن شیشه‌ای' : 'تغییر به حالت تیره پرمیوم'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#ffd700]" /> : <Moon className="w-4 h-4 text-[#00f0ff]" />}
            </button>

            {/* Direct Contact Button */}
            <button
              onClick={() => onNavigate('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-all hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>گفتگو با امیررضا</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
