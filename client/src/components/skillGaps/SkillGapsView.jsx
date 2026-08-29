import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockSkillGaps } from '../../utils/mockData';
import { Target, Sparkles } from 'lucide-react';

export default function SkillGapsView() {
  const { targetRole, skills } = mockSkillGaps;

  const gapBadgeVariant = {
    'Low Gap': 'success',
    'Medium Gap': 'warning',
    'High Gap': 'danger',
  };

  return (
    <div className="space-y-6">
      {/* Skill Gaps Header Card */}
      <Card variant="glow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="coral" size="sm">Target Benchmark</Badge>
            <h2 className="text-xl font-bold text-[#F5F1E8] mt-1">Skill Gap Analysis for {targetRole}</h2>
            <p className="text-xs text-[#8C877D] mt-0.5 font-medium">
              Identifies disparity between current proficiency vs industry role expectations.
            </p>
          </div>
          <Button variant="primary" size="sm" icon={Sparkles}>
            Run New AI Skill Scan
          </Button>
        </div>
      </Card>

      {/* Skill Breakdown List */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Skill Matrix Comparison</CardTitle>
          <span className="text-xs text-[#8C877D]">Current vs Required Level</span>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#16191E] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#F5F1E8]">{skill.name}</span>
                <Badge variant={gapBadgeVariant[skill.gap]} size="sm">
                  {skill.gap}
                </Badge>
              </div>

              {/* Progress bars comparison */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#8C877D]">
                  <span>Current: {skill.current}%</span>
                  <span>Target: {skill.required}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden relative">
                  <div
                    className="absolute top-0 bottom-0 bg-white/10 w-full"
                    style={{ width: `${skill.required}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-[#FF6B5F] to-[#E85548] rounded-full transition-all duration-300"
                    style={{ width: `${skill.current}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
