import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, PlusSquare, X } from 'lucide-react';

interface PWAInstallButtonProps {
  isDarkMode: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ isDarkMode }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running standalone, hide
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {isInstallable && (
        <button
          onClick={install}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#00a3ff] text-[#002022] font-semibold text-xs shadow-[0_0_16px_rgba(0,240,255,0.4)] hover:shadow-[0_0_24px_rgba(0,240,255,0.6)] transition-all hover:scale-105"
        >
          <Download className="w-3.5 h-3.5" />
          <span>نصب اپلیکیشن</span>
        </button>
      )}

      {isIOS && (
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#00f0ff] border border-white/15 text-xs font-mono transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>نصب در iOS</span>
        </button>
      )}

      {/* iOS Safari Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl p-4">
          <div className="w-full max-w-sm rounded-3xl p-6 glass-panel-elevated text-right space-y-4 relative border border-white/20">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <img src="/icon.svg" alt="App Icon" className="w-12 h-12 rounded-xl bg-[#090d16] p-1.5 border border-[#00f0ff]/40" />
              <div>
                <h3 className="font-bold text-base text-white">نصب روی آیفون / آیپد</h3>
                <p className="text-xs text-[#b9cacb] font-mono">Progressive Web App</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#dfe2ef] pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <Share2 className="w-5 h-5 text-[#00f0ff] shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  ۱. در نوار پایین مرورگر Safari، دکمه <strong>اشتراک‌گذاری (Share)</strong> را لمس کنید.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <PlusSquare className="w-5 h-5 text-[#a855f7] shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  ۲. صفحه را پایین بکشید و گزینه <strong>Add to Home Screen (افزودن به صفحه اصلی)</strong> را انتخاب نمایید.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#00f0ff] text-[#002022] font-bold text-xs shadow-lg"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
};
