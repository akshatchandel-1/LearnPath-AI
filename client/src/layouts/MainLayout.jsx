import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

<<<<<<< Updated upstream
=======
/**
 * Main Application Layout
 * Applies the global Obsidian + Ivory + Coral theme:
 * - Navbar: Obsidian Dark (#111214)
 * - Sidebar: Obsidian (#191A1C)
 * - Main Canvas: Warm Ivory (#F6F2EA / linear-gradient(135deg, #FAF7F0 0%, #F6F2EA 55%, #F1ECE3 100%))
 * - Typography: Deep Obsidian (#202124)
 * - Accent: Coral (#E05A47)
 */
>>>>>>> Stashed changes
export default function MainLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen flex flex-col bg-[#F4F7FE] text-slate-800 selection:bg-indigo-500 selection:text-white">
=======
    <div className="min-h-screen flex flex-col bg-[#111214] text-[#202124] selection:bg-[#E05A47] selection:text-white">
>>>>>>> Stashed changes
      {/* Top Shared Navbar */}
      <Navbar
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

<<<<<<< Updated upstream
      {/* Main Layout Container */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
=======
      {/* Main Layout Container (Full viewport width with Sidebar on left) */}
      <div className="flex-1 flex w-full min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
>>>>>>> Stashed changes
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
<<<<<<< Updated upstream
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
=======

        {/* Dynamic Page Content: Full-bleed Warm Ivory canvas */}
        <main className="flex-1 min-w-0 w-full overflow-y-auto bg-gradient-to-br from-[#FAF7F0] via-[#F6F2EA] to-[#F1ECE3] text-[#202124]">
          <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in duration-200">
            {children}
          </div>
>>>>>>> Stashed changes
        </main>
      </div>

      {/* Global Minimal Footer */}
<<<<<<< Updated upstream
      <footer className="w-full border-t border-slate-200 bg-white/60 py-4 px-6 text-center text-xs text-slate-500 mt-auto">
=======
      <footer className="w-full border-t border-white/[0.08] bg-[#111214] py-4 px-6 text-center text-xs text-[#8A8F98] z-10">
>>>>>>> Stashed changes
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 LearnPath AI — AI-Powered Personalized Learning Path Recommender</span>
          <span className="font-mono text-[11px] text-[#8A8F98]">Foundation Ready for 4-Developer Team</span>
        </div>
      </footer>
    </div>
  );
}
