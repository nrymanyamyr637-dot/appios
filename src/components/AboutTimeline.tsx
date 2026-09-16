import React from 'react';
import { timelineMilestones } from '../data/timelineData';
import { User, Route, CheckCircle2, Shield, Sparkles, Cpu, Layers } from 'lucide-react';

interface AboutTimelineProps {
  isDarkMode: boolean;
}

export const AboutTimeline: React.FC<AboutTimelineProps> = ({ isDarkMode }) => {
  return (
    <section id="about" className="w-full space-y-8 pt-8">
      {/* Narrative Card & 3D Engineering Identity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* About Bio Card */}
        <div
          className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 border border-white/15 relative overflow-hidden ${
            isDarkMode ? 'glass-panel-elevated' : 'glass-panel-elevated-light'
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00f0ff]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest">
                PERSONAL IDENTITY &amp; CORE PHILOSOPHY
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              درباره مهندس امیررضا
            </h2>

            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 text-sm text-[#dfe2ef] leading-relaxed space-y-3 font-sans">
              <p>
                «من امیررضا هستم و در مسیر یادگیری و ساخت پروژه‌های مختلف در حوزه مکاترونیک، رباتیک، الکترونیک و برنامه‌نویسی فعالیت می‌کنم. بخش بزرگی از مسیر من با ساختن پروژه‌های واقعی، آزمون و خطا، طراحی مدار، برنامه‌نویسی و شرکت در مسابقات شکل گرفته است.»
              </p>
              <p className="text-[#00f0ff] font-medium">
                «برای من یادگیری زمانی ارزشمند است که بتوانم چیزی را از صفر طراحی کنم و در نهایت آن را به یک سیستم واقعی و قابل استفاده تبدیل کنم.»
              </p>
            </div>
          </div>

          {/* Telemetry Signature Block */}
          <div className="pt-4 border-t border-white/10 space-y-3 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono text-[#b9cacb]">
              <span>CORE DISCIPLINE:</span>
              <span className="text-[#00f0ff] font-bold">HARDWARE-SOFTWARE CO-DESIGN</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-[#849495]">
                <span>پایداری سیستم‌های امبدد و فیدبک سنسورها</span>
                <span className="text-[#65f2b5]">99.8% READY</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-l from-[#00f0ff] via-[#38bdf8] to-[#a855f7] w-[96%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* 3D Glass Milestone Roadmap */}
        <div
          className={`lg:col-span-7 p-4 sm:p-8 rounded-3xl space-y-6 border border-white/15 relative ${
            isDarkMode ? 'glass-panel-elevated' : 'glass-panel-elevated-light'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Route className="w-5 h-5 text-[#00f0ff]" />
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                مسیر رشد و گاه‌شمار مهندسی
              </h3>
            </div>
            <span className="text-xs font-mono text-[#65f2b5] px-2.5 py-1 rounded-full bg-[#65f2b5]/10 border border-[#65f2b5]/20">
              ۸ گام پیشرفت
            </span>
          </div>

          <div className="space-y-4 relative pr-7 sm:pr-8">
            {/* Timeline Vertical Light Line */}
            <div className="absolute right-[9px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00f0ff] via-[#a855f7] to-[#65f2b5] opacity-50" />

            {timelineMilestones.map((m) => (
              <div key={m.step} className="relative flex items-start gap-4 group">
                {/* Milestone Node */}
                <div className="absolute right-0 top-3 -translate-y-1/2 w-5 h-5 rounded-full bg-[#090d16] border-2 border-[#00f0ff] flex items-center justify-center group-hover:scale-125 group-hover:bg-[#00f0ff] transition-all duration-300 shadow-[0_0_10px_#00f0ff] z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Milestone Card */}
                <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#00f0ff]">
                        گام {m.step}
                      </span>
                      <h4 className="font-bold text-sm text-white">
                        {m.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-[#a855f7] px-2 py-0.5 rounded bg-[#a855f7]/10">
                      {m.enTitle}
                    </span>
                  </div>

                  <p className="text-xs text-[#b9cacb] leading-relaxed">
                    {m.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#65f2b5] font-mono">
                    {m.achievements.map((ach, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#65f2b5]" />
                        <span>{ach}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
