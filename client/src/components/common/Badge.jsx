import React from 'react';

/**
 * Common Badge Component
 * Variants: primary (coral), secondary, success (emerald), warning (amber), danger (red), info (blue), neutral
 */
export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-[#FDF0EE] text-[#E05A47] border border-[#F9D5CD]',
    secondary: 'bg-[#FAF0ED] text-[#A83B2B] border border-[#F3B2A4]',
    success: 'bg-[#EDF7F2] text-[#3F8F68] border border-[#C6E7D6]',
    warning: 'bg-[#FAF3E8] text-[#C48A3A] border border-[#F0DEC0]',
    danger: 'bg-[#FDF0F0] text-[#C94A4A] border border-[#F7D2D2]',
    info: 'bg-[#EFF5FB] text-[#4A7BC7] border border-[#CFE0F5]',
    neutral: 'bg-[#F1ECE3] text-[#5F6368] border border-[#E6E0D7]',
  };

  const dotColors = {
    primary: 'bg-[#E05A47]',
    secondary: 'bg-[#D99A8A]',
    success: 'bg-[#3F8F68]',
    warning: 'bg-[#C48A3A]',
    danger: 'bg-[#C94A4A]',
    info: 'bg-[#4A7BC7]',
    neutral: 'bg-[#8A8F98]',
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
