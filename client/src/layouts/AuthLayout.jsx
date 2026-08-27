import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-br from-[#F3E8FF]/40 via-[#F8FAFC] to-[#EEF2FF] text-slate-800 p-4 sm:p-8 relative overflow-hidden select-none">
      {/* Background Dots Pattern (Top Right) */}
      <div className="absolute top-6 right-6 opacity-30 pointer-events-none hidden sm:block">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#7C3AED" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      {/* Top Header Logo */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10 pt-2 px-2">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 flex items-center gap-1">
              LearnPath <span className="text-purple-600">AI</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Your Personalized Learning Companion
            </span>
          </div>
        </Link>
      </div>

      {/* Main Content Card Container */}
      <div className="flex-1 flex items-center justify-center my-6 z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Bottom Left Vector Illustration (Books, Graduation Cap & Plant) */}
      <div className="absolute bottom-0 left-0 p-6 pointer-events-none hidden md:block z-0">
        <div className="w-64 h-56">
          <svg viewBox="0 0 220 200" fill="none" className="w-full h-full">
            {/* Plant Pot & Desk */}
            <ellipse cx="170" cy="165" rx="20" ry="8" fill="#CBD5E1" />
            <path d="M156 135 L162 165 L178 165 L184 135 Z" fill="#A78BFA" />
            <path d="M170 135 C158 110 140 120 152 95 C164 115 170 128 170 135 Z" fill="#22C55E" />
            <path d="M170 135 C182 110 200 120 188 95 C176 115 170 128 170 135 Z" fill="#16A34A" />

            {/* Stack of Books */}
            <rect x="20" y="145" width="125" height="22" rx="5" fill="#4338CA" />
            <rect x="32" y="148" width="108" height="15" rx="3" fill="#EEF2FF" />

            <rect x="25" y="123" width="115" height="22" rx="5" fill="#7C3AED" />
            <rect x="35" y="126" width="100" height="15" rx="3" fill="#F3E8FF" />

            <rect x="30" y="101" width="105" height="22" rx="5" fill="#6366F1" />
            <rect x="38" y="104" width="92" height="15" rx="3" fill="#EEF2FF" />

            {/* Graduation Cap */}
            <polygon points="85,38 138,55 85,72 32,55" fill="#1E1B4B" />
            <path d="M48 62 L48 80 C48 88 122 88 122 80 L122 62 Z" fill="#312E81" />
            <circle cx="85" cy="55" r="3.5" fill="#F59E0B" />
            <path d="M85 55 L125 72 L125 90" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
