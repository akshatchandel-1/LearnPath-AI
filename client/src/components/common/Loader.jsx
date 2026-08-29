import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export function FullPageLoader({ message = 'Loading LearnPath AI...' }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0D0F] flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-[#FF6B5F]/20 border-t-[#FF6B5F] animate-spin" />
        <div className="absolute w-8 h-8 rounded-full border-2 border-black/10 dark:border-white/20 border-b-gray-900 dark:border-b-[#F5F1E8] animate-spin animate-reverse" />
      </div>
      <p className="text-sm font-semibold text-gray-900 dark:text-[#F5F1E8] animate-pulse">
        {message}
      </p>
      <span className="text-xs text-gray-500 dark:text-[#8C877D] font-mono mt-1 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-[#FF6B5F]" />
        LearnPath AI Engine
      </span>
    </div>
  );
}

export function InlineLoader({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`flex items-center justify-center p-2 ${className}`}>
      <Loader2 className={`${sizeMap[size] || sizeMap.md} animate-spin text-[#FF6B5F]`} />
    </div>
  );
}

export function SkeletonCard({ rows = 3, className = '' }) {
  return (
    <div className={`bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 animate-pulse ${className}`}>
      <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-1/3 mb-4" />
      <div className="space-y-2.5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-3.5 bg-gray-100 dark:bg-white/5 rounded w-full" style={{ width: `${100 - i * 15}%` }} />
        ))}
      </div>
      <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-1/4 mt-6" />
    </div>
  );
}

export default FullPageLoader;
