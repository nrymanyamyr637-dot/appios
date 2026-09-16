import React, { useState } from 'react';
import { skillsData } from '../data/skillsData';
import { Code, Terminal, Smartphone, Cpu, Wrench, Wifi, Radio, Server, Gamepad2, Layers, Flame, Activity, CircuitBoard, Box, Sparkles, Search } from 'lucide-react';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

const skillIconMap: Record<string, React.ElementType> = {
  Code,
  Terminal,
  Smartphone,
  Cpu,
  Wrench,
  Wifi,
  Radio,
  Server,
  Gamepad2,
  Layers,
  Flame,
  Activity,
  CircuitBoard,
  Box,
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'همه ۱۶ مهارت' },
    { id: 'embedded', label: 'میکروکنترلر و IoT' },
    { id: 'software', label: 'برنامه‌نویسی و نرم‌افزار' },
    { id: 'hardware', label: 'طراحی مدار و CAD' },
    { id: 'robotics', label: 'رباتیک و فیزیک' },
  ];

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = selectedFilter === 'all' || skill.category === selectedFilter;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="w-full space-y-6 pt-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY MATRIX</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ماتریس مهارت‌ها و ابزارهای تخصصی
          </h2>
          <p className="text-sm text-[#b9cacb] mt-1">
            تسلط بر زنجیره کامل مهندسی از طراحی شماتیک و فیبر مدارچاپی تا کدهای سطح سخت‌افزار و موتورهای شبیه‌سازی.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="جستجوی مهارت یا ابزار..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pr-9 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-[#849495] focus:outline-none focus:border-[#00f0ff] font-sans"
          />
          <Search className="w-4 h-4 text-[#849495] absolute top-2.5 right-3" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar whitespace-nowrap max-w-full">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
              selectedFilter === tab.id
                ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-[#b9cacb] hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills 3D Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredSkills.map((skill) => {
          const IconComponent = skillIconMap[skill.iconName] || Cpu;
          const radius = 24;
          const circumference = 2 * Math.PI * radius;
          const strokeOffset = circumference - (skill.level / 100) * circumference;

          return (
            <div
              key={skill.id}
              className={`group p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-3.5 transition-all duration-300 hover:-translate-y-1.5 border border-white/10 relative overflow-hidden ${
                isDarkMode ? 'glass-panel hover:glass-panel-elevated' : 'glass-panel-light hover:glass-panel-elevated-light'
              }`}
            >
              {/* Top Row: Icon + Level Ring */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/25 flex items-center justify-center text-[#00f0ff] group-hover:scale-110 group-hover:bg-[#00f0ff] group-hover:text-[#002022] transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Circular Level Ring */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                    <circle
                      cx="30"
                      cy="30"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r={radius}
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <span className="absolute text-xs font-mono font-bold text-white">
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Title & Level Label */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white tracking-tight">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#65f2b5] px-2 py-0.5 rounded bg-[#65f2b5]/10 border border-[#65f2b5]/20">
                    {skill.levelLabel}
                  </span>
                </div>
                <p className="text-xs text-[#b9cacb] leading-relaxed line-clamp-2">
                  {skill.shortDesc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-white/10">
                {skill.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#7df4ff] border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
