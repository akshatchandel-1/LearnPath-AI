import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0D0F] text-[#F5F1E8] p-4 relative overflow-hidden">
      {/* Subtle Coral Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B5F]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Top back navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C877D] hover:text-[#F5F1E8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF6B5F]" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center shadow-xl shadow-[#FF6B5F]/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tight text-[#F5F1E8]">
              LearnPath <span className="text-[#FF6B5F]">AI</span>
            </span>
          </Link>
          {title && (
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F1E8]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#C7C2B6] mt-1.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Card */}
        {children}
      </div>
    </div>
  );
}
