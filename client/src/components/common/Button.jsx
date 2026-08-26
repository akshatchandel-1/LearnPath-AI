import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Common Button Component
 * Standardized across all 4 member modules.
 * Variants: primary, secondary, outline, danger, ghost
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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-600 text-white shadow-md shadow-primary/20 hover:shadow-primary/35 focus:ring-primary',
    secondary: 'bg-secondary hover:bg-secondary-600 text-white shadow-md shadow-secondary/20 hover:shadow-secondary/35 focus:ring-secondary',
    outline: 'bg-transparent hover:bg-slate-800/60 text-slate-200 border border-slate-700 hover:border-slate-500 focus:ring-slate-500',
    danger: 'bg-status-danger hover:bg-red-600 text-white shadow-md shadow-red-500/20 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white focus:ring-slate-600',
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
