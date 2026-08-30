import React from 'react';
import Badge from './Badge';

export default function PageHeader({
  title,
  description,
  badge,
  badgeVariant = 'primary',
  action,
  children,
  className = '',
  greeting,
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 mb-7 border-b border-black/[0.06] dark:border-white/[0.06] ${className}`}>
      <div>
        {greeting && (
          <p className="text-xs font-semibold text-[#FF857A] mb-1 flex items-center gap-1.5 font-mono">
            {greeting}
          </p>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111418] dark:text-[#F5F1E8]">
            {title}
          </h1>
          {badge && (
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs sm:text-sm text-[#4B5563] dark:text-[#C7C2B6] font-medium max-w-3xl leading-relaxed">
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
