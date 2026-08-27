import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AuthLayout — Premium Centered Two-Column Authentication Card Layout
 * Target Desktop Dimensions: max-width 1180–1220px, rounded-24px, balanced 48% / 52% columns.
 * Approved Palette: Obsidian (#191A1C), Dark (#111214), Ivory (#F6F2EA), Cream (#FFFDF8), Coral (#E05A47)
 */
export default function AuthLayout({
  children,
  title,
  subtitle,
  brandPanel,
  backTo = '/',
  backLabel = 'Back to Home'
}) {
  return (
    <div className="min-h-screen bg-[#F6F2EA] flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 text-[#202124] selection:bg-[#E05A47] selection:text-white relative">
      {/* Subtle Warm Ivory Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E05A47]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Floating Navigation Header */}
      <header className="max-w-[1200px] w-full mx-auto flex items-center justify-between z-10 mb-4 sm:mb-6">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5F6368] hover:text-[#202124] transition-all px-3.5 py-2 rounded-xl bg-[#FFFDF8] hover:bg-white border border-[#E6E0D7] hover:border-[#D99A8A] shadow-xs group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{backLabel}</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E6E0D7] text-[11px] font-medium text-[#5F6368] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#E05A47]" />
          <span>LearnPath AI Platform</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CENTERED TWO-COLUMN AUTHENTICATION CARD CONTAINER                         */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="max-w-[1200px] w-full mx-auto my-auto bg-[#FFFDF8] border border-[#E6E0D7] rounded-[24px] shadow-[0_16px_45px_rgba(32,33,36,0.07)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10"
      >
        {/* ======================================================================= */}
        {/* LEFT COLUMN: Obsidian Branded Visual / Benefits Panel (~46-48%)         */}
        {/* ======================================================================= */}
        <aside className="lg:col-span-5 xl:col-span-5 bg-[#191A1C] text-white p-7 sm:p-9 lg:p-11 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08]">
          {/* Subtle Warm Coral Ambient Glow Inside Dark Panel */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E05A47]/[0.08] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D99A8A]/[0.05] rounded-full blur-[90px] pointer-events-none" />

          {/* Top: Brand Identity Header */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E05A47] to-[#D99A8A] flex items-center justify-center shadow-md shadow-[#E05A47]/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white block">
                  LearnPath <span className="text-[#E05A47]">AI</span>
                </span>
                <span className="text-[10px] text-[#8A8F98] tracking-wider uppercase font-semibold">
                  AI-Powered Learning Paths
                </span>
              </div>
            </Link>
          </div>

          {/* Middle: Dynamic Brand Visual Content */}
          <div className="relative z-10 my-6 lg:my-8">
            {brandPanel}
          </div>

          {/* Bottom: Trust & Security Footnote */}
          <div className="relative z-10 pt-5 border-t border-white/[0.08] hidden sm:flex items-center justify-between text-xs text-[#8A8F98]">
            <span>© 2026 LearnPath AI</span>
            <span className="flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3F8F68]" />
              Enterprise Secure
            </span>
          </div>
        </aside>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: Warm Ivory / Cream Form Panel (~52-54%)                   */}
        {/* ======================================================================= */}
        <main className="lg:col-span-7 xl:col-span-7 bg-[#FFFDF8] p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center overflow-y-auto">
          <div className="w-full max-w-[460px] mx-auto py-2">
            {/* Form Title & Subtitle */}
            {(title || subtitle) && (
              <div className="mb-6 text-left">
                {title && (
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124]">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-[#5F6368] mt-1.5 leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Child Form Component */}
            {children}
          </div>
        </main>
      </motion.div>

      {/* Page Footer */}
      <footer className="max-w-[1200px] w-full mx-auto text-center text-xs text-[#8A8F98] mt-4 sm:mt-6 z-10">
        <p>© 2026 LearnPath AI — AI-Powered Personalized Learning Path Recommender</p>
      </footer>
    </div>
  );
}
