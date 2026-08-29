import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Common Button Component
 * Standardized across all 8 member modules.
 * Obsidian + Ivory + Coral Palette
 * Variants: primary, secondary, outline, danger, ghost, coral
 * Sizes: sm, md, lg
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0D0F] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-6 py-3 gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white shadow-lg shadow-[#FF6B5F]/25 focus:ring-[#FF6B5F]',
    coral: 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white shadow-lg shadow-[#FF6B5F]/25 focus:ring-[#FF6B5F]',
    secondary: 'bg-white/10 hover:bg-white/15 text-[#F5F1E8] border border-white/10 focus:ring-white/30',
    outline: 'bg-transparent hover:bg-white/5 text-[#F5F1E8] border border-white/15 hover:border-[#FF6B5F]/50 focus:ring-[#FF6B5F]',
    danger: 'bg-[#F87171] hover:bg-[#EF4444] text-white shadow-md shadow-red-500/20 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-white/5 text-[#C7C2B6] hover:text-[#F5F1E8] focus:ring-white/20',
  };

  const isBtnDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isBtnDisabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      )}

      {!isLoading && Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}

      <span>{children}</span>

      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}
