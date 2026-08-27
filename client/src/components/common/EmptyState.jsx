import React from 'react';
import { Card } from './Card';
import Badge from './Badge';
import Button from './Button';
import { Code2, GitBranch, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Shared Empty / Module Placeholder Component
 * Standardized template across all unfinished modules.
 */
export default function EmptyState({
  title,
  description = 'This module is prepared and ready for member feature implementation.',
  memberBadge = 'Member Assigned',
  branchName = 'feature/module',
  plannedFeatures = [],
  icon: Icon = Sparkles,
  onActionClick,
  actionText = 'Explore Module Details',
  children,
}) {
  return (
    <div className="space-y-6">
      <Card variant="default" className="relative overflow-hidden">
        {/* Subtle warm background decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#E05A47]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#D99A8A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center py-10 px-4 max-w-2xl mx-auto">
          {/* Icon Circle */}
          <div className="w-16 h-16 rounded-2xl bg-[#FDF0EE] border border-[#F9D5CD] flex items-center justify-center mb-5 text-[#E05A47] shadow-sm">
            <Icon className="w-8 h-8" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <Badge variant="primary" size="sm" dot>
              {memberBadge}
            </Badge>
            <Badge variant="neutral" size="sm">
              <span className="flex items-center gap-1 font-mono">
                <GitBranch className="w-3 h-3 text-[#8A8F98]" />
                {branchName}
              </span>
            </Badge>
          </div>

          {/* Title & Description */}
          <h2 className="text-xl md:text-2xl font-bold text-[#202124] mb-2">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6368] mb-6">
            {description}
          </p>

          {/* Planned Feature Scope Checklist */}
          {plannedFeatures.length > 0 && (
            <div className="w-full bg-[#F6F2EA] border border-[#E6E0D7] rounded-2xl p-5 mb-6 text-left">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[#202124] uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-[#E05A47]" />
                Planned Feature Scope:
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-[#3F4247]">
                {plannedFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3F8F68] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Custom Slot / Children */}
          {children}

          {/* Actions */}
          {onActionClick && (
            <div className="flex items-center gap-3 mt-2">
              <Button variant="primary" size="md" onClick={onActionClick}>
                {actionText}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
