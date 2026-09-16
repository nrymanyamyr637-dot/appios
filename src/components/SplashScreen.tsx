import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Cpu, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const bootLogs = [
  'INITIALIZING MECHATRONICS HARDWARE KERNEL...',
  'CALIBRATING ARM CORTEX-M3 PID CONTROLLER (1.2 kHz)...',
  'ESTABLISHING CAN-BUS & K-LINE OBD TELEMETRY...',
  'MOUNTING SENSORY MATRICES & REVERSE KINEMATICS...',
  'DEPLOYING LIQUID OBSIDIAN SPATIAL OS...'
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [logIndex, setLogIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const idx = Math.min(Math.floor((progress / 100) * bootLogs.length), bootLogs.length - 1);
    setLogIndex(idx);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-[#05080f] text-[#dfe2ef] select-none overflow-hidden"
    >
      {/* Background Cyber Grid & Vignette */}
      <div className="absolute inset-0 pcb-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] bg-[#a855f7]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="w-full max-w-4xl flex items-center justify-between text-xs font-mono text-[#849495] pt-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span>SYS_BOOT: REV 2.4.0</span>
        </div>
        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[#00f0ff] hover:text-white transition-all text-xs border border-white/10"
        >
          <span>ورود سریع</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center 3D Glass Orb & Logotype */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10 my-auto">
        {/* Central 3D Glass Orb with Holographic Loading Rings */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f0ff]/30 to-[#a855f7]/30 blur-2xl animate-pulse" />

          {/* SVG Rotating Hologram Rings */}
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              strokeDasharray="14 10 4 8"
              opacity="0.6"
            />
          </svg>

          <svg className="absolute inset-2 w-[184px] h-[184px] animate-spin" style={{ animationDuration: '7s', animationDirection: 'reverse' }} viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeDasharray="30 20"
              opacity="0.7"
            />
          </svg>

          {/* Progress Circular Arc */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="72"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="4"
            />
            <circle
              cx="100"
              cy="100"
              r="72"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 72}
              strokeDashoffset={2 * Math.PI * 72 * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-100 ease-out"
            />
          </svg>

          {/* The Optical Glass Orb */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-white/20 via-[#00f0ff]/10 to-[#a855f7]/20 backdrop-blur-2xl border border-white/30 shadow-[inset_0_4px_20px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,240,255,0.3)] flex items-center justify-center overflow-hidden">
            {/* Inner Core Shimmer */}
            <div className="absolute w-12 h-12 rounded-full bg-[#00f0ff] blur-md opacity-70 animate-ping" />
            <img
              src="/icon.svg"
              alt="AMIRREZA Emblem"
              className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_0_12px_#00f0ff]"
            />
          </div>
        </div>

        {/* 3D Logotype "AMIRREZA" */}
        <div className="space-y-1.5 px-2 max-w-full">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] sm:tracking-[0.2em] font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-[#dbfcff] to-[#7df4ff] drop-shadow-[0_0_24px_rgba(0,240,255,0.5)]">
            AMIRREZA
          </h1>
          <p className="text-base sm:text-xl font-bold text-[#00f0ff] tracking-wide font-sans">
            مهندس امیررضا
          </p>
          <p className="text-[11px] sm:text-xs font-mono text-[#b9cacb] tracking-wider uppercase opacity-80 max-w-xs mx-auto">
            Personal Technology OS • Mechatronics & Software Architect
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress & Boot Console */}
      <div className="w-full max-w-md space-y-3 relative z-10 pb-4">
        {/* Log Text */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#00f0ff] truncate max-w-[80%]">
            &gt; {bootLogs[logIndex]}
          </span>
          <span className="text-white font-bold">{progress}%</span>
        </div>

        {/* Glass Loading Bar */}
        <div className="w-full h-2 rounded-full bg-white/5 border border-white/10 p-0.5 overflow-hidden backdrop-blur-md">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#a855f7] shadow-[0_0_12px_#00f0ff]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#849495]">
          <span>HARDWARE ACCELERATED</span>
          <span>EST. 2025</span>
        </div>
      </div>
    </motion.div>
  );
};
