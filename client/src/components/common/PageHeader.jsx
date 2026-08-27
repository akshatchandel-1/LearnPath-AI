import React from 'react';
import Badge from './Badge';

/**
 * Common PageHeader Component
 * Standardizes title, subtitle, metadata badges, and page-level CTA buttons.
 */
export default function PageHeader({
  title,
  description,
  badge,
  badgeVariant = 'primary',
  action,
  children,
  className = '',
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#E6E0D7] ${className}`}>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#202124]">
            {title}
          </h1>
          {badge && (
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs sm:text-sm text-[#5F6368] max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {(action || children) && (
        <div className="flex items-center gap-3 shrink-0">
          {action}
          {children}
        </div>
      )}
    </div>
  );
}
