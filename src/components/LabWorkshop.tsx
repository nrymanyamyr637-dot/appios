import React from 'react';
import { Camera, Radio, Cpu, Gamepad2, Sparkles, CheckCircle2, Clock, Wrench } from 'lucide-react';

interface LabWorkshopProps {
  isDarkMode: boolean;
}

export const LabWorkshop: React.FC<LabWorkshopProps> = ({ isDarkMode }) => {
  const labItems = [
    {
      id: 'lab-1',
      title: 'استریم ویدئو و پردازش لبه با ESP32-CAM',
      tag: 'تکمیل‌شده',
      tagColor: 'text-[#65f2b5] bg-[#65f2b5]/10 border-[#65f2b5]/30',
      desc: 'انتقال ویدئوی فشرده‌شده MJPEG روی شبکه محلی Wi-Fi با نرخ ۲۰ فریم بر ثانیه و تشخیص ساده خطوط سیاه مسیر با فیلتر سوبل.',
      tech: 'ESP-IDF / C++ / OpenCV',
      icon: Camera,
    },
    {
      id: 'lab-2',
      title: 'نود پایش محیطی اینترنت اشیا (MQTT Node)',
      tag: 'در حال توسعه',
      tagColor: 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/30',
      desc: 'پایش بلادرنگ دما، رطوبت و فشار اتمسفری با سنسور BME280 و همگام‌سازی ابری با قابلیت ذخیره آفلاین در حافظه Flash.',
      tech: 'ESP8266 / MQTT / SPIFFS',
      icon: Radio,
    },
    {
      id: 'lab-3',
      title: 'بازوی رباتیک ۴ درجه آزادی (4-DOF Arm)',
      tag: 'تحقیق و R&D',
      tagColor: 'text-[#d0bcff] bg-[#a855f7]/15 border-[#a855f7]/30',
      desc: 'شبیه‌سازی سینماتیک معکوس (Inverse Kinematics) برای محاسبه زوایای سروو موتورهای فلزی MG996R در محیط مختصات دکارتی.',
      tech: 'STM32 / Kinematics C++',
      icon: Wrench,
    },
    {
      id: 'lab-4',
      title: 'کنترلر بی‌سیم هوشمند اندروید (RC Link)',
      tag: 'ایده و طرح اولیه',
      tagColor: 'text-[#b9cacb] bg-white/10 border-white/20',
      desc: 'اینترفیس لمسی اختصاصی برای کنترل ماشین‌های رادیوکنترلی با فیدبک هپتیک و ارسال جوی‌استیک از طریق پروتکل UDP Low-Latency.',
      tech: 'Android Jetpack Compose / UDP',
      icon: Gamepad2,
    },
  ];

  return (
    <section id="lab" className="w-full space-y-6 pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>R&amp;D INNOVATION BENCH</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            آزمایشگاه و کارگاه نوآوری دیجیتال
          </h2>
          <p className="text-sm text-[#b9cacb] mt-1">
            مجموعه ایده‌ها، تحقیقات تجربی و پروتوتایپ‌های در دست تولید مهندس امیررضا.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {labItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1.5 border border-white/10 ${
                isDarkMode ? 'glass-panel hover:glass-panel-elevated' : 'glass-panel-light hover:glass-panel-elevated-light'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <Icon className="w-5 h-5 text-[#00f0ff]" />
                </div>

                <h3 className="font-bold text-base text-white tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#b9cacb] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#00f0ff]">
                <span>{item.tech}</span>
                <span className="text-[10px] text-[#849495]">LAB-RND</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
