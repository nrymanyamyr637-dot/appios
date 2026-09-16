import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { Bot, Cpu, Smartphone, Gamepad2, Wrench, Eye, ArrowUpLeft, Sparkles } from 'lucide-react';

interface ProjectShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  isDarkMode: boolean;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
  isDarkMode
}) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'همه پروژه‌ها' },
    { id: 'robotics', label: 'پروژه‌های رباتیک (Robot)' },
    { id: 'embedded', label: 'سیستم‌های امبدد (Embedded)' },
    { id: 'unity', label: 'شبیه‌ساز یونیتی (Unity)' },
    { id: 'automotive', label: 'خودرویی و دیاگ (Automotive & ECU)' },
    { id: 'android', label: 'اپلیکیشن اندروید (Android)' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="w-full space-y-6 pt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ویترین پروژه‌های شاخص مهندسی
          </h2>
          <p className="text-sm text-[#b9cacb] mt-1 max-w-2xl">
            تمام پروژه‌ها از صفر توسط مهندس امیررضا طراحی، مداربندی، برنامه‌نویسی و تست عملیاتی شده‌اند.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar whitespace-nowrap max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-[#b9cacb] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`group rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 relative overflow-hidden border border-white/10 ${
              isDarkMode ? 'glass-panel hover:glass-panel-elevated' : 'glass-panel-light hover:glass-panel-elevated-light'
            }`}
          >
            {/* Ambient Corner Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00f0ff]/10 rounded-full blur-2xl group-hover:bg-[#00f0ff]/25 transition-colors pointer-events-none" />

            <div className="space-y-4">
              {/* 3D Image Banner with Overlay Status */}
              <div className="relative rounded-2xl overflow-hidden h-48 border border-white/10 bg-[#090d16]">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent" />

                {/* Metric Badge */}
                {project.highlightMetric && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-[#00f0ff] border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                    <span>{project.highlightMetric.label}: {project.highlightMetric.value}</span>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#00f0ff]/15 text-[#00f0ff] text-[10px] font-mono border border-[#00f0ff]/30">
                  {project.category.toUpperCase()}
                </div>
              </div>

              {/* Title & Short Description */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg text-white group-hover:text-[#00f0ff] transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-[#b9cacb] line-clamp-3 leading-relaxed">
                  {project.shortDesc}
                </p>
              </div>

              {/* Technology Stack Tags */}
              <div className="flex flex-wrap items-center gap-1 pt-1">
                {project.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-[#7df4ff] border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-[10px] font-mono text-[#849495]">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setActiveProject(project)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00f0ff]/20 to-[#00a3ff]/20 hover:from-[#00f0ff] hover:to-[#00a3ff] text-[#00f0ff] hover:text-[#002022] font-semibold text-xs border border-[#00f0ff]/30 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>مشاهده جزئیات کامل مهندسی</span>
                <ArrowUpLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        isDarkMode={isDarkMode}
      />
    </section>
  );
};
