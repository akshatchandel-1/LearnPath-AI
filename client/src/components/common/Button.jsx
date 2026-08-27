import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Common Button Component
 * Coral Primary (#E05A47), Ivory Secondary (#FFFDF8)
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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F6F2EA] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-semibold',
    md: 'text-xs sm:text-sm px-4 py-2.5 gap-2 font-semibold',
    lg: 'text-sm sm:text-base px-5 py-3 gap-2.5 font-bold',
  };

  const variantStyles = {
    primary: 'bg-[#E05A47] hover:bg-[#C94A38] text-white shadow-md shadow-[#E05A47]/20 hover:shadow-lg hover:shadow-[#E05A47]/30 border border-[#C94A38] focus:ring-[#E05A47]',
    secondary: 'bg-[#FFFDF8] hover:bg-[#F6F2EA] text-[#202124] border border-[#E6E0D7] hover:border-[#D99A8A] shadow-sm focus:ring-[#E05A47]',
    outline: 'bg-transparent hover:bg-[#F6F2EA] text-[#202124] border border-[#E6E0D7] hover:border-[#D99A8A] focus:ring-[#E05A47]',
    danger: 'bg-[#C94A4A] hover:bg-[#B33E3E] text-white shadow-md shadow-[#C94A4A]/20 focus:ring-[#C94A4A]',
    ghost: 'bg-transparent hover:bg-[#F6F2EA] text-[#5F6368] hover:text-[#202124] focus:ring-[#E05A47]',
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
