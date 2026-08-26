import React from 'react';

/**
 * Common Card Component
 * All dashboard/course/roadmap/skill/assessment cards must use this component.
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
    default: 'bg-surface-card border border-surface-cardBorder',
    interactive: 'bg-surface-card border border-surface-cardBorder hover:border-primary/50 hover:bg-slate-900/90 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-md hover:shadow-xl hover:shadow-primary/10',
    glow: 'bg-surface-card border border-primary/30 shadow-glow-primary',
    flat: 'bg-slate-900/60 border border-slate-800/80',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-5 md:p-6 backdrop-blur-md ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-between pb-4 border-b border-slate-800/60 mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-slate-100 tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-xs text-text-muted mt-0.5 ${className}`}>
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
    <div className={`pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

export default Card;
