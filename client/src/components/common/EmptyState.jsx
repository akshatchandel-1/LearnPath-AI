import React from 'react';
import { Card } from './Card';
import Badge from './Badge';
import Button from './Button';
import { Code2, GitBranch, Sparkles, CheckCircle2 } from 'lucide-react';

export default function EmptyState({
  title,
  description = 'This module is ready for your personalized learning recommendations.',
  memberBadge = 'Active Module',
  branchName = 'frontend',
  plannedFeatures = [],
  icon: Icon = Sparkles,
  onActionClick,
  actionText = 'Explore Module Details',
  children,
}) {
  return (
    <div className="space-y-6">
      <Card variant="glow" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FF6B5F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center py-10 px-4 max-w-2xl mx-auto">
          {/* Icon Circle */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B5F]/20 to-[#E85548]/10 border border-[#FF6B5F]/30 flex items-center justify-center mb-5 text-[#FF857A] shadow-lg shadow-[#FF6B5F]/15">
            <Icon className="w-8 h-8" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <Badge variant="primary" size="sm" dot>
              {memberBadge}
            </Badge>
            <Badge variant="neutral" size="sm">
              <span className="flex items-center gap-1 font-mono">
                <GitBranch className="w-3 h-3 text-[#8C877D]" />
                {branchName}
              </span>
            </Badge>
          </div>

          {/* Title & Description */}
          <h2 className="text-xl md:text-2xl font-extrabold text-[#F5F1E8] mb-2">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#C7C2B6] mb-6 font-medium">
            {description}
          </p>

          {/* Planned Feature Scope */}
          {plannedFeatures.length > 0 && (
            <div className="w-full bg-[#0B0D0F]/80 border border-white/[0.08] rounded-xl p-4 mb-6 text-left">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#F5F1E8] uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-[#FF6B5F]" />
                Feature Highlights:
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#C7C2B6]">
                {plannedFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Custom Slot */}
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
