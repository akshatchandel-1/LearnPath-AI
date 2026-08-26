import React from 'react';

/**
 * Common Badge Component
 * Variants: success, warning, info, danger, neutral, primary
 * Sizes: sm, md
 */
export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  const variantStyles = {
    primary: 'bg-primary/15 text-primary-300 border border-primary/30',
    secondary: 'bg-secondary/15 text-purple-300 border border-secondary/30',
    success: 'bg-status-success/15 text-emerald-300 border border-status-success/30',
    warning: 'bg-status-warning/15 text-amber-300 border border-status-warning/30',
    danger: 'bg-status-danger/15 text-rose-300 border border-status-danger/30',
    info: 'bg-status-info/15 text-sky-300 border border-status-info/30',
    neutral: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
  };

  const dotColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    danger: 'bg-status-danger',
    info: 'bg-status-info',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-current'} animate-pulse`} />
      )}
      <span>{children}</span>
    </span>
  );
}
