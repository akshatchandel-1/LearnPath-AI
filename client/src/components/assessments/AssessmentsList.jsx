import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockAssessments } from '../../utils/mockData';
import { ClipboardCheck, Clock, HelpCircle, Lock, Play, Award } from 'lucide-react';

/**
 * Member 3: Assessments List Placeholder Component
 * Location: src/components/assessments/AssessmentsList.jsx
 */
export default function AssessmentsList() {
  const statusBadgeVariant = {
    'Passed': 'success',
    'Ready to Take': 'primary',
    'Locked': 'neutral',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockAssessments.map((assessment) => {
          const isLocked = assessment.status === 'Locked';
          const isPassed = assessment.status === 'Passed';

          return (
            <Card
              key={assessment.id}
              variant={isLocked ? 'default' : 'interactive'}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={statusBadgeVariant[assessment.status]} size="sm">
                    {assessment.status}
                  </Badge>
                  <span className="text-xs text-text-subtle">{assessment.difficulty}</span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2">
                  {assessment.title}
                </h3>

                <div className="space-y-1 text-xs text-text-muted mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duration: {assessment.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Questions: {assessment.questionsCount}</span>
                  </div>
                  {isPassed && (
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>Last Score: {assessment.lastScore}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                {isLocked ? (
                  <Button variant="outline" size="sm" className="w-full opacity-60" disabled icon={Lock}>
                    Locked
                  </Button>
                ) : isPassed ? (
                  <Button variant="outline" size="sm" className="w-full" icon={Play}>
                    Retake Assessment
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" className="w-full" icon={Play}>
                    Start Assessment
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
