import React from 'react';

/**
 * Common Card Component
 * Warm Ivory (#FFFDF8) with thin borders (#E6E0D7) and soft shadows
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
    default: 'bg-[#FFFDF8] border border-[#E6E0D7] shadow-[0_8px_28px_rgba(32,33,36,0.06)]',
    interactive: 'bg-[#FFFDF8] border border-[#E6E0D7] shadow-[0_8px_28px_rgba(32,33,36,0.06)] hover:border-[#D99A8A] hover:bg-[#FFFFFF] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(32,33,36,0.09)] transition-all duration-200 cursor-pointer',
    glow: 'bg-[#FFFDF8] border border-[#E05A47]/30 shadow-[0_8px_28px_rgba(224,90,71,0.06)]',
    flat: 'bg-[#F6F2EA] border border-[#E6E0D7]',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 md:p-6 text-[#202124] ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-between pb-4 border-b border-[#E6E0D7] mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-bold text-[#202124] tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-xs text-[#5F6368] mt-0.5 ${className}`}>
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
    <div className={`pt-4 mt-4 border-t border-[#E6E0D7] flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

export default Card;
