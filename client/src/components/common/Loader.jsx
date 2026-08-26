import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Full Page Loading Screen
 */
export function FullPageLoader({ message = 'Loading LearnPath AI...' }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute w-8 h-8 rounded-full border-2 border-secondary/20 border-b-secondary animate-spin animate-reverse" />
      </div>
      <p className="text-sm font-medium text-slate-300 animate-pulse">
        {message}
      </p>
      <span className="text-xs text-text-subtle font-mono mt-1">
        LearnPath AI Engine
      </span>
    </div>
  );
}

/**
 * Inline Spinner Loader
 */
export function InlineLoader({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`flex items-center justify-center p-2 ${className}`}>
      <Loader2 className={`${sizeMap[size] || sizeMap.md} animate-spin text-primary`} />
    </div>
  );
}

/**
 * Skeleton Card Loader
 */
export function SkeletonCard({ rows = 3, className = '' }) {
  return (
    <div className={`bg-surface-card border border-surface-cardBorder rounded-xl p-6 animate-pulse ${className}`}>
      <div className="h-5 bg-slate-800 rounded w-1/3 mb-4" />
      <div className="space-y-2.5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-3.5 bg-slate-800/60 rounded w-full" style={{ width: `${100 - i * 15}%` }} />
        ))}
      </div>
      <div className="h-8 bg-slate-800/80 rounded w-1/4 mt-6" />
    </div>
  );
}

export default FullPageLoader;
