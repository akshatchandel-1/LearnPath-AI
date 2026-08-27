import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockLearningPath } from '../../utils/mockData';
import { CheckCircle2, Circle, Clock, PlayCircle, Sparkles } from 'lucide-react';

/**
 * Member 2: Learning Path Placeholder Component
 * Obsidian + Ivory + Coral Palette
 */
export default function LearningPathView() {
  const { roadmapTitle, estimatedCompletion, stages } = mockLearningPath;

  const statusBadgeVariant = {
    'Completed': 'success',
    'In Progress': 'primary',
    'Upcoming': 'neutral',
  };

  return (
    <div className="space-y-6">
      {/* Roadmap Header Summary */}
      <Card variant="default">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm" dot>Active Recommended Roadmap</Badge>
              <span className="text-xs text-[#5F6368] font-mono">{estimatedCompletion}</span>
            </div>
            <h2 className="text-xl font-bold text-[#202124] mt-1">{roadmapTitle}</h2>
          </div>
          <Button variant="primary" size="sm" icon={Sparkles}>
            Re-generate Path with AI
          </Button>
        </div>
      </Card>

      {/* Stage-by-Stage Timeline Container */}
      <div className="space-y-4">
        {stages.map((stage) => {
          const isCompleted = stage.status === 'Completed';
          const isInProgress = stage.status === 'In Progress';

          return (
            <Card
              key={stage.id}
              variant={isInProgress ? 'interactive' : 'default'}
              className="relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#3F8F68]" />
                    ) : isInProgress ? (
                      <PlayCircle className="w-5 h-5 text-[#E05A47]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#8A8F98]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#8A8F98] uppercase">
                      Stage {stage.id}
                    </span>
                    <h3 className="text-base font-semibold text-[#202124]">
                      {stage.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-24 bg-[#E6E0D7] rounded-full h-2 overflow-hidden hidden sm:block">
                    <div
                      className={`h-full rounded-full ${isCompleted ? 'bg-[#3F8F68]' : 'bg-[#E05A47]'}`}
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                  <Badge variant={statusBadgeVariant[stage.status]} size="sm">
                    {stage.status} ({stage.progress}%)
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
