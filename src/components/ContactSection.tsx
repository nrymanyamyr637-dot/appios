import React, { useState } from 'react';
import { Mail, Send, Terminal, Phone, MapPin, CheckCircle2, ShieldCheck, Sparkles, MessageSquare, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  isDarkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    projectType: 'مکاترونیک و رباتیک',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Mini Interactive Terminal
  const [cmdInput, setCmdInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; res: string }>>([
    { cmd: 'whoami', res: 'AMIRREZA: Mechatronics & Software Architect (HW/SW Co-Design)' },
    { cmd: 'sysinfo', res: 'Architecture: ARM Cortex + ESP32 + ROS + Unity 3D | Kernel: v2.4.0 Online' }
  ]);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#a855f7', '#65f2b5']
    });
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = cmdInput.trim().toLowerCase();
    if (!clean) return;

    let reply = '';
    if (clean === 'help') {
      reply = 'دستورات پشتیبانی‌شده: whoami, status, skills, ping, clear, contact, date';
    } else if (clean === 'status') {
      reply = 'وضعیت: آماده دریافت پروژه‌های جدید، مشاوره و همکاری فنی (Active & Open for Collab)';
    } else if (clean === 'skills') {
      reply = 'C++, C#, STM32 ARM, ESP32, Python, Unity, Android Studio, Altium Designer, CAN-Bus';
    } else if (clean === 'ping') {
      reply = 'PONG: 0.12 ms (Direct Hardware Interconnect OK)';
    } else if (clean === 'contact') {
      reply = 'Email: amirreza.eng@outlook.com | Telegram: @Amirreza_Eng | Tehran, Iran';
    } else if (clean === 'date') {
      reply = new Date().toLocaleString('fa-IR');
    } else if (clean === 'clear') {
      setTerminalHistory([]);
      setCmdInput('');
      return;
    } else {
      reply = `فرمان ناشناخته: "${clean}". برای مشاهده دستورات تایپ کنید: help`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: clean, res: reply }]);
    setCmdInput('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('amirreza.eng@outlook.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="w-full space-y-8 pt-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMUNICATION GATEWAY</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            پل ارتباطی و سفارش پروژه
          </h2>
          <p className="text-sm text-[#b9cacb] mt-1">
            آماده هم‌فکری، طراحی مدارهای الکترونیکی، توسعه نرم‌افزار، پروژه‌های رباتیک و سیستم‌های خودرویی.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Contact Form */}
        <div
          className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 ${
            isDarkMode ? 'glass-panel-elevated' : 'glass-panel-elevated-light'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#00f0ff]" />
              <h3 className="text-lg font-bold text-white">ارسال پیام مستقیم به مهندس امیررضا</h3>
            </div>
            <span className="text-[11px] font-mono text-[#65f2b5] px-2.5 py-0.5 rounded-full bg-[#65f2b5]/10 border border-[#65f2b5]/20">
              پاسخگویی سریع
            </span>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#65f2b5]/10 border border-[#65f2b5]/30 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#65f2b5]/20 text-[#65f2b5] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">پیام شما با موفقیت ثبت و ارسال شد</h4>
              <p className="text-xs text-[#b9cacb] max-w-md mx-auto leading-relaxed">
                از ارتباط شما سپاسگزارم. مهندس امیررضا پیام شما را بررسی کرده و در اولین فرصت از طریق اطلاعات تماس با شما ارتباط برقرار خواهد کرد.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#b9cacb]">نام و نام خانوادگی / شرکت</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: دکتر حسینی / شرکت پرتو الکترونیک"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-[#849495] focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#b9cacb]">شماره تماس یا ایمیل</label>
                  <input
                    type="text"
                    required
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    placeholder="0912... یا email@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-[#849495] focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#b9cacb]">موضوع یا حوزه پروژه</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="مکاترونیک و رباتیک">طراحی و ساخت ربات / مکاترونیک</option>
                  <option value="طراحی مدار چاپی و سخت‌افزار">طراحی فیبر مدارچاپی (Altium Designer) و میکروکنترلر</option>
                  <option value="شبیه‌سازی خودرو و دیاگ">پروژه‌های خودرویی، دیاگ، پروتکل‌های CAN-Bus و KWP2000</option>
                  <option value="اپلیکیشن اندروید و IoT">توسعه اپلیکیشن اندروید و اینترنت اشیا (ESP32/MQTT)</option>
                  <option value="شبیه‌سازی یونیتی">شبیه‌سازی فیزیک و مدل‌سازی در یونیتی (Unity 3D)</option>
                  <option value="مشاوره و همکاری دیگر">مشاوره فنی و همکاری در مسابقات</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#b9cacb]">شرح نیازمندی‌ها یا پیام شما</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="مشخصات کلی پروژه، زمان‌بندی و اهداف فنی خود را بیان بفرمایید..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-[#849495] focus:outline-none focus:border-[#00f0ff] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#00a3ff] text-[#002022] font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال درخواست پیام مستقیم</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Fast Terminal & Direct Contacts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Card */}
          <div
            className={`p-6 rounded-3xl border border-white/15 space-y-4 ${
              isDarkMode ? 'glass-panel-elevated' : 'glass-panel-elevated-light'
            }`}
          >
            <h3 className="text-base font-bold text-white">اطلاعات دسترسی مستقیم</h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#dfe2ef]">
                  <Mail className="w-4 h-4 text-[#00f0ff]" />
                  <span>amirreza.eng@outlook.com</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="کپی آدرس ایمیل"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#65f2b5]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-[#dfe2ef]">
                <MapPin className="w-4 h-4 text-[#a855f7]" />
                <span className="font-sans">تهران، ایران • آماده همکاری ریموت و حضوری</span>
              </div>
            </div>
          </div>

          {/* Interactive Shell / Terminal */}
          <div className="p-5 rounded-3xl bg-[#090d16] border border-white/15 space-y-3 font-mono shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-[#849495]">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <Terminal className="w-4 h-4" />
                <span>AMIRREZA_SHELL v1.0.4</span>
              </div>
              <span className="text-[10px] text-[#65f2b5]">TTY / BASH READY</span>
            </div>

            {/* Terminal History */}
            <div className="space-y-1.5 text-xs max-h-44 overflow-y-auto text-left" dir="ltr">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[#00f0ff]">
                    <span>$ </span>{item.cmd}
                  </div>
                  <div className="text-[#b9cacb] pl-3 text-[11px] leading-relaxed">
                    {item.res}
                  </div>
                </div>
              ))}
            </div>

            {/* Command Input Form */}
            <form onSubmit={handleRunCommand} className="pt-2 flex items-center gap-2" dir="ltr">
              <span className="text-[#00f0ff] font-bold text-xs">$</span>
              <input
                type="text"
                placeholder="type 'help' or 'status'..."
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-[#849495] focus:outline-none font-mono"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
