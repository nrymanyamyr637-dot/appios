import React from 'react';
import { ArrowUp, Terminal, Shield, Cpu } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, isDarkMode }) => {
  return (
    <footer className="w-full border-t border-white/10 pt-10 pb-28 xl:pb-12 text-right relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Identity */}
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#090d16] p-1.5 border border-[#00f0ff]/40 shadow-[0_0_16px_rgba(0,240,255,0.3)] flex items-center justify-center">
              <img src="/icon.svg" alt="Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">مهندس امیررضا</h3>
              <p className="text-xs font-mono text-[#b9cacb]">
                Personal Technology OS • Mechatronics &amp; Software
              </p>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00f0ff] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span>PWA STANDALONE READY</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#65f2b5]">
              OFFLINE READY (SERVICE WORKER)
            </div>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={onScrollToTop}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-105 flex items-center gap-2 text-xs font-mono"
            title="بازگشت به ابتدای صفحه"
          >
            <span>بازگشت به بالا</span>
            <ArrowUp className="w-4 h-4 text-[#00f0ff]" />
          </button>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#849495]">
          <p>© {new Date().getFullYear()} مهندس امیررضا • تمامی حقوق طراحی و توسعه نرم‌افزار محفوظ است.</p>
          <div className="flex items-center gap-4">
            <span>RTL FIRST</span>
            <span>•</span>
            <span>THREE.JS &amp; WEBGL</span>
            <span>•</span>
            <span>TAILWIND CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
