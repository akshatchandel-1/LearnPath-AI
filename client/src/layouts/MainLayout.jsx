import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

/**
 * Shared MainLayout Shell
 * Unified Obsidian + Ivory + Coral Palette across all 8 Modules.
 */
export default function MainLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#0B0D0F';
    document.body.style.color = '#F5F1E8';
    document.documentElement.classList.add('dark');

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#0B0D0F] text-[#F5F1E8] selection:bg-[#FF6B5F] selection:text-white"
      style={{
        backgroundImage:
          'radial-gradient(at 85% 8%, rgba(255, 107, 95, 0.08) 0px, transparent 50%), radial-gradient(at 15% 90%, rgba(232, 226, 214, 0.03) 0px, transparent 50%), linear-gradient(180deg, #0B0D0F 0%, #0E1114 50%, #0B0D0F 100%)',
      }}
    >
      {/* Ambient Subtle Coral & Ivory Glow Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 right-1/4 w-[600px] h-[400px] bg-[#FF6B5F]/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute -bottom-24 right-10 w-[550px] h-[450px] bg-[#FF6B5F]/4 rounded-full blur-[140px]" />
      </div>

      {/* Top Shared Navbar (Obsidian Dark Glass) */}
      <div className="relative z-30">
        <Navbar
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>

      {/* Main Layout Container (Sidebar + Dynamic Module Content) */}
      <div className="flex-1 flex w-full max-w-[1500px] mx-auto relative z-10 px-3 sm:px-5 lg:px-7">
        {/* Sidebar */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-7 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Minimal Footer */}
      <footer className="w-full py-4 px-6 text-center text-xs transition-colors relative z-10 border-t border-white/[0.06] bg-[#0E1114]/80 backdrop-blur-md text-[#8C877D]">
        <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium text-[#C7C2B6]">
            © 2026 LearnPath AI — AI-Powered Personalized Learning Path Recommender
          </span>
          <span className="font-mono text-[11px] text-[#FF6B5F] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B5F] animate-pulse" />
            HCLTech Hackathon Production Build
          </span>
        </div>
      </footer>
    </div>
  );
}
