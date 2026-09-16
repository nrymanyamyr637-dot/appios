import React, { useState } from 'react';
import { Trophy, ShieldCheck, Award, FileText, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AchievementsSectionProps {
  isDarkMode: boolean;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ isDarkMode }) => {
  const [inquiredId, setInquiredId] = useState<string | null>(null);

  const handleInquire = (id: string) => {
    setInquiredId(id);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#a855f7', '#65f2b5']
    });
    setTimeout(() => setInquiredId(null), 3500);
  };

  const records = [
    {
      id: 'rec-1',
      year: 'دوره ۱۴۰۲ - ۱۴۰۳',
      title: 'مسابقات کشوری ربات‌های تعقیب خط هوشمند',
      team: 'تیم برادران نریمانی (Narimani Brothers)',
      desc: 'حضور با ربات پرسرعت ROBOT TERONIC بر پایه پردازنده ARM STM32. عبور موفق از تمامی موانع پیچیده زاویه تند، لوپ و بریدگی‌های پیست.',
      badge: 'ثبت در مسابقات رسمی • مدارک فنی آرشیو',
      badgeColor: 'text-[#65f2b5] bg-[#65f2b5]/10 border-[#65f2b5]/20',
      icon: Trophy
    },
    {
      id: 'rec-2',
      year: 'رویداد فنی ۱۴۰۲',
      title: 'چالش استانی طراحی بردهای الکترونیکی فرکانس بالا',
      team: 'توسعه انفرادی سخت‌افزار',
      desc: 'ارائه برد چندلایه با چیپ ARM Cortex-M3، تحلیل زمین و فیلترینگ نویز منابع تغذیه سوئیچینگ با استانداردهای طراحی صنعتی IPC.',
      badge: 'تاییدیه تست تداخل الکترومغناطیسی (EMC)',
      badgeColor: 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20',
      icon: Award
    },
    {
      id: 'rec-3',
      year: 'پروژه مهندسی ۱۴۰۳',
      title: 'آزمون میدانی شبیه‌ساز فیزیک خودرو در یونیتی',
      team: 'طراحی شبیه‌ساز و کنسول داینو',
      desc: 'تست پایداری نرخ فریم ۶۰+ FPS روی سخت‌افزارهای مختلف و شبیه‌سازی دقیق دینامیک خودروها در داینو با خطای کمتر از ۱.۵٪.',
      badge: 'تست بتای موفقیت‌آمیز فیزیک RCC',
      badgeColor: 'text-[#d0bcff] bg-[#a855f7]/15 border-[#a855f7]/20',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="achievements" className="w-full space-y-6 pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VERIFIED TRACK RECORD</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            سوابق چالش‌ها و مسابقات فنی
          </h2>
          <p className="text-sm text-[#b9cacb] mt-1">
            تمامی سوابق با مستندات فنی و گزارش‌های آزمون‌های عملیاتی ثبت شده و بدون القاب و رتبه‌های ساختگی ارائه می‌شوند.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {records.map((rec) => {
          const Icon = rec.icon;
          const isInquired = inquiredId === rec.id;
          return (
            <div
              key={rec.id}
              className={`p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 transition-all duration-300 hover:-translate-y-1.5 ${
                isDarkMode ? 'glass-panel hover:glass-panel-elevated' : 'glass-panel-light hover:glass-panel-elevated-light'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00f0ff] font-bold">
                    {rec.year}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00f0ff]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-bold text-lg text-white tracking-tight leading-snug">
                  {rec.title}
                </h3>

                <p className="text-xs text-[#00f0ff] font-mono">
                  {rec.team}
                </p>

                <p className="text-xs text-[#b9cacb] leading-relaxed">
                  {rec.desc}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className={`p-2.5 rounded-xl border text-[11px] font-mono flex items-center gap-2 ${rec.badgeColor}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{rec.badge}</span>
                </div>

                <button
                  onClick={() => handleInquire(rec.id)}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition-all flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <FileText className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>{isInquired ? 'کارنامه فنی و لاگ تایید شد ✔' : 'مشاهده وضعیت تاییدیه'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
