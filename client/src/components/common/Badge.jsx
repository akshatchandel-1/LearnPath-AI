import React from 'react';

/**
 * Common Badge Component
 * Obsidian + Ivory + Coral Palette
 * Variants: primary, secondary, coral, success, warning, danger, info, neutral
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
    sm: 'text-[10px] sm:text-[11px] px-2 py-0.5 font-bold',
    md: 'text-xs px-2.5 py-1 font-bold',
  };

  const variantStyles = {
    primary: 'bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30',
    coral: 'bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30',
    secondary: 'bg-black/5 dark:bg-white/10 text-[#111418] dark:text-[#F5F1E8] border border-black/10 dark:border-white/15',
    success: 'bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30',
    warning: 'bg-[#FBBF24]/15 text-[#FBBF24] border border-[#FBBF24]/30',
    danger: 'bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30',
    info: 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30',
    neutral: 'bg-black/5 dark:bg-white/5 text-[#4B5563] dark:text-[#C7C2B6] border border-black/10 dark:border-white/10',
  };

  const dotColors = {
    primary: 'bg-[#FF6B5F]',
    coral: 'bg-[#FF6B5F]',
    secondary: 'bg-[#FF6B5F]',
    success: 'bg-[#34D399]',
    warning: 'bg-[#FBBF24]',
    danger: 'bg-[#F87171]',
    info: 'bg-[#38BDF8]',
    neutral: 'bg-[#8C877D]',
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
