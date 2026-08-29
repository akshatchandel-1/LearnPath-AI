import React from 'react';
import { Sparkles, Cpu, GitFork, ShieldCheck, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 glass-panel mt-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyan-400 p-0.5">
              <div className="w-full h-full bg-[#0e1019] rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight font-display">
                LearnPath AI
              </p>
              <p className="text-xs text-slate-400">
                AI-Powered Personalized Learning Path Recommender
              </p>
            </div>
          </div>

          {/* AI/ML Badge & Tech Stack */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300">
              <Cpu className="w-3.5 h-3.5 text-brand-400" />
              <span>7-Factor Hybrid Scoring</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              <GitFork className="w-3.5 h-3.5 text-cyan-400" />
              <span>Topological Prerequisite DAG</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Gemini 3.7 AI Assistant</span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} LearnPath AI. Built for Next-Gen Tech Education.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
