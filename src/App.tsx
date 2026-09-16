import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { MobileNavigation } from './components/MobileNavigation';
import { HeroSection } from './components/HeroSection';
import { QuickTechCards } from './components/QuickTechCards';
import { ProjectShowcase } from './components/ProjectShowcase';
import { SkillsSection } from './components/SkillsSection';
import { EcuDiagnosticLab } from './components/EcuDiagnosticLab';
import { LabWorkshop } from './components/LabWorkshop';
import { AchievementsSection } from './components/AchievementsSection';
import { AboutTimeline } from './components/AboutTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { playCyberClick } from './utils/soundEffects';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync HTML theme class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    if (soundEnabled) playCyberClick();
    setIsDarkMode((prev) => !prev);
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleNavigate = (sectionId: string) => {
    if (soundEnabled) playCyberClick();
    setActiveSection(sectionId);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickCardSelect = (categoryRef: string) => {
    if (soundEnabled) playCyberClick();
    setSelectedCategory(categoryRef);
    handleNavigate('projects');
  };

  const handleScrollToTop = () => {
    if (soundEnabled) playCyberClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('hero');
  };

  return (
    <div className={`min-h-screen relative font-sans text-right transition-colors duration-500 overflow-x-hidden ${
      isDarkMode ? 'bg-[#05080f] text-[#dfe2ef]' : 'bg-[#f0f4f9] text-[#1c2230]'
    }`}>
      {/* 1. Splash Screen on Initial Load */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* 2. WebGL Dynamic Cybernetic Background */}
      <CyberBackground isDarkMode={isDarkMode} />

      {/* 3. Top Navigation Bar */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 4. Mobile Floating Glass Dock */}
      <MobileNavigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
      />

      {/* 5. Main Content Container */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 space-y-12 sm:space-y-16 lg:space-y-24">
        {/* Hero Section with 3D Scene */}
        <HeroSection
          isDarkMode={isDarkMode}
          onNavigate={handleNavigate}
        />

        {/* Quick Tech Cards */}
        <QuickTechCards
          onSelectCategory={handleQuickCardSelect}
          isDarkMode={isDarkMode}
        />

        {/* Projects Showcase */}
        <ProjectShowcase
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          isDarkMode={isDarkMode}
        />

        {/* Skills Matrix */}
        <SkillsSection
          isDarkMode={isDarkMode}
        />

        {/* Interactive Dyno & ECU Diagnostic Bench */}
        <EcuDiagnosticLab
          isDarkMode={isDarkMode}
          soundEnabled={soundEnabled}
        />

        {/* Digital Lab / R&D Workshop */}
        <LabWorkshop
          isDarkMode={isDarkMode}
        />

        {/* Verified Achievements & Challenges */}
        <AchievementsSection
          isDarkMode={isDarkMode}
        />

        {/* About & 3D Engineering Timeline */}
        <AboutTimeline
          isDarkMode={isDarkMode}
        />

        {/* Contact & Interactive Shell Terminal */}
        <ContactSection
          isDarkMode={isDarkMode}
        />
      </main>

      {/* 6. Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
