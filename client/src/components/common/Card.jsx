import React from 'react';

/**
 * Common Card Component
 * Obsidian + Ivory + Coral Palette
 * Variants: default, interactive, glow, flat
 */
export function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  ...props
}) {
  const variantStyles = {
    default: 'bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-[#F5F1E8]',
    interactive: 'bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] hover:border-[#FF6B5F]/40 dark:hover:bg-[#16191E] text-gray-900 dark:text-[#F5F1E8] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-md hover:shadow-xl hover:shadow-[#FF6B5F]/10',
    glow: 'bg-white dark:bg-[#111418] border border-[#FF6B5F]/30 text-gray-900 dark:text-[#F5F1E8] shadow-[0_0_25px_-5px_rgba(255,107,95,0.25)]',
    flat: 'bg-gray-50 dark:bg-[#16191E] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-[#F5F1E8]',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 md:p-6 backdrop-blur-md ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/[0.06] mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-bold text-gray-900 dark:text-[#F5F1E8] tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-xs text-gray-500 dark:text-[#C7C2B6] mt-0.5 font-medium ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`pt-4 mt-4 border-t border-gray-200 dark:border-white/[0.06] flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

export default Card;
