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
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-8 border-b border-slate-800/80 ${className}`}>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-50">
            {title}
          </h1>
          {badge && (
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm md:text-base text-text-muted max-w-3xl">
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
