import React, { useState } from 'react';
import { Project } from '../types';
import { X, Check, Copy, Cpu, Wrench, Layers, Terminal, Sparkles, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  isDarkMode
}) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.9),0_0_32px_rgba(0,240,255,0.15)] text-right my-auto max-h-[92vh] overflow-y-auto ${
          isDarkMode ? 'glass-panel-elevated' : 'glass-panel-elevated-light'
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#00f0ff] uppercase">{project.category} SPECIFICATION</span>
                {project.highlightMetric && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#65f2b5]/15 text-[#65f2b5] border border-[#65f2b5]/30">
                    {project.highlightMetric.label}: {project.highlightMetric.value}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Visual Image Banner */}
        <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 border border-white/10 shadow-2xl group">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent" />
          
          {/* HUD Overlay Badges */}
          <div className="absolute bottom-3 right-4 left-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span>HARDWARE STATE: TESTED & OPERATIONAL</span>
            </div>
            {project.team && (
              <div className="text-xs font-mono text-[#65f2b5] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                {project.team}
              </div>
            )}
          </div>
        </div>

        {/* 1. Goal (هدف پروژه) */}
        <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-xs font-mono text-[#00f0ff] uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>هدف و ماموریت مهندسی پروژه</span>
          </span>
          <p className="text-sm text-[#dfe2ef] leading-relaxed">
            {project.goal}
          </p>
        </div>

        {/* 2. Hardware & Software Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hardware List */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#7df4ff]">
              <Cpu className="w-4 h-4 text-[#00f0ff]" />
              <span>اجزای سخت‌افزار (Hardware)</span>
            </div>
            <ul className="space-y-2 text-xs text-[#b9cacb]">
              {project.hardware.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Software List */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#d0bcff]">
              <Terminal className="w-4 h-4 text-[#a855f7]" />
              <span>لایه نرم‌افزار و فریم‌ورک (Software)</span>
            </div>
            <ul className="space-y-2 text-xs text-[#b9cacb]">
              {project.software.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Architecture & PCB Details */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Layers className="w-4 h-4 text-[#65f2b5]" />
              <span>معماری سیستم و الگوریتم (Architecture)</span>
            </div>
            <p className="text-xs text-[#b9cacb] leading-relaxed">
              {project.architecture}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Wrench className="w-4 h-4 text-[#00f0ff]" />
              <span>طراحی برد مدارچاپی (PCB Design & Engineering)</span>
            </div>
            <p className="text-xs text-[#b9cacb] leading-relaxed">
              {project.pcbDetails}
            </p>
          </div>
        </div>

        {/* 4. Code Snippet Viewer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#00f0ff] flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              <span>سورس‌کد مهندسی ({project.codeLang.toUpperCase()})</span>
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#65f2b5]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'کپی شد' : 'کپی کد'}</span>
            </button>
          </div>
          <div className="rounded-2xl bg-[#090d16] p-4 border border-white/15 overflow-x-auto text-left font-mono text-xs text-[#7df4ff] leading-relaxed">
            <pre dir="ltr">{project.codeSnippet}</pre>
          </div>
        </div>

        {/* 5. Challenges & Future Development */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-xs font-bold text-[#ffb4ab] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>چالش‌های مهندسی و راهکارها (Challenges)</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#b9cacb]">
              {project.challenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#ffb4ab]">▪</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-xs font-bold text-[#65f2b5] flex items-center gap-1.5">
              <ArrowRight className="w-4 h-4" />
              <span>افق توسعه و فاز بعدی (Future Roadmap)</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#b9cacb]">
              {project.futureDevelopment.map((f, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#65f2b5]">▪</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technology Stack Tags */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[#849495] ml-2">STACK:</span>
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
