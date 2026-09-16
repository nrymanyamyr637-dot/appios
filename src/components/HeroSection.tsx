import React from 'react';
import { Hero3DScene } from './Hero3DScene';
import { ArrowDown, Cpu, Activity, MessageSquare, Sparkles, Download, Layers, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  isDarkMode: boolean;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isDarkMode, onNavigate }) => {
  return (
    <section id="hero" className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-center pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Right Column: Narrative & Call to Action (Persian RTL) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-right z-10">
          {/* OS Badge & Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-[11px] sm:text-xs font-mono text-[#00f0ff] tracking-wider uppercase">
              AMIRREZA PERSONAL TECHNOLOGY OS v2.4
            </span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] font-sans">
              سیستم‌عامل فناوری شخصی{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-[#00f0ff] via-[#7df4ff] to-[#a855f7] drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                مهندس امیررضا
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#dfe2ef] font-medium leading-relaxed max-w-xl">
              طراح و توسعه‌دهنده سیستم‌های مکاترونیک، اینترنت اشیا (IoT)، نرم‌افزارهای شبیه‌سازی و مهندسی معکوس پروتکل‌های خودرویی.
            </p>
          </div>

          {/* Identity Philosophy Quote */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 border-r-2 border-[#00f0ff] border-white/10 text-xs text-[#b9cacb] leading-relaxed max-w-xl">
            «تلفیق مستقیم سخت‌افزار و نرم‌افزار: طراحی مدار چاپی فرکانس بالا، کدنویسی درایور میکروکنترلرها، و توسعه اپلیکیشن‌های بصری با عملکرد پایدار.»
          </div>

          {/* Action Button Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
            <button
              onClick={() => onNavigate('projects')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#00f0ff] to-[#00a3ff] text-[#002022] font-bold text-xs sm:text-sm shadow-[0_0_24px_rgba(0,240,255,0.5)] hover:shadow-[0_0_36px_rgba(0,240,255,0.7)] transition-all hover:scale-105 flex items-center justify-center gap-2 group min-h-[44px]"
            >
              <Layers className="w-4 h-4" />
              <span>مشاهده پروژه‌های مهندسی</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('dyno-ecu')}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 backdrop-blur-xl transition-all hover:scale-105 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Activity className="w-4 h-4 text-[#00f0ff]" />
              <span>شبیه‌ساز داینو و دیاگ</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-[#b9cacb] hover:text-white text-xs sm:text-sm border border-white/10 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ارتباط مستقیم</span>
            </button>
          </div>

          {/* Live Telemetry Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/10">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[9px] sm:text-[10px] font-mono text-[#849495] block truncate">میکروکنترلر و هسته</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#00f0ff] block truncate">ARM Cortex-M3</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[9px] sm:text-[10px] font-mono text-[#849495] block truncate">پروتکل‌های تست‌شده</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#65f2b5] block truncate">CAN &amp; K-Line</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[9px] sm:text-[10px] font-mono text-[#849495] block truncate">حلقه کنترل PID</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#d0bcff] block truncate">1.2 kHz Ultra</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[9px] sm:text-[10px] font-mono text-[#849495] block truncate">طراحی صنعتی PCB</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-white block truncate">IPC Standard</span>
            </div>
          </div>
        </div>

        {/* Left Column: 3D CAD/Hardware Model Scene */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Ambient Glow Disk Behind 3D Model */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/15 via-transparent to-[#a855f7]/15 rounded-3xl blur-3xl pointer-events-none" />

          {/* 3D Scene Wrapper */}
          <div className="w-full rounded-3xl overflow-hidden border border-white/10 relative shadow-[0_20px_60px_rgba(0,0,0,0.7)] bg-[#070b14]/50 backdrop-blur-md">
            <Hero3DScene isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </section>
  );
};
