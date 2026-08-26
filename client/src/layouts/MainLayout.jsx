import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

/**
 * Main Application Layout
 * Combines standard Navbar, responsive Sidebar with drawer, and consistent content area.
 * Individual feature pages should NOT re-create the layout elements.
 */
export default function MainLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-text selection:bg-primary selection:text-white">
      {/* Top Shared Navbar */}
      <Navbar
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Minimal Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-background/60 py-4 px-6 text-center text-xs text-text-subtle">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 LearnPath AI — AI-Powered Personalized Learning Path Recommender</span>
          <span className="font-mono text-[11px] text-slate-400">Foundation Ready for 4-Developer Team</span>
        </div>
      </footer>
    </div>
  );
}
