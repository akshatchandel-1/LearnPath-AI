import React from 'react';
import { Card } from './Card';
import Badge from './Badge';
import Button from './Button';
import { Code2, GitBranch, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Shared Empty / Module Placeholder Component
 * Standardized template across all unfinished modules so team members can replace only the content.
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
      <Card variant="glow" className="relative overflow-hidden">
        {/* Background decorative gradient glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center py-10 px-4 max-w-2xl mx-auto">
          {/* Icon Circle */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center mb-5 text-primary-300 shadow-lg shadow-primary/10">
            <Icon className="w-8 h-8" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <Badge variant="primary" size="sm" dot>
              {memberBadge}
            </Badge>
            <Badge variant="neutral" size="sm">
              <span className="flex items-center gap-1 font-mono">
                <GitBranch className="w-3 h-3 text-slate-400" />
                {branchName}
              </span>
            </Badge>
          </div>

          {/* Title & Description */}
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">
            {title}
          </h2>
          <p className="text-sm md:text-base text-text-muted mb-6">
            {description}
          </p>

          {/* Planned Feature Scope Checklist */}
          {plannedFeatures.length > 0 && (
            <div className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-primary" />
                Planned Feature Scope:
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {plannedFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
