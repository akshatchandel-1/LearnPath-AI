import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockSkillGaps } from '../../utils/mockData';
import { Target, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';

/**
 * Member 2: Skill Gaps Placeholder Component
 * Obsidian + Ivory + Coral Palette
 */
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
      <Card variant="default">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="primary" size="sm">Target Benchmark</Badge>
            <h2 className="text-xl font-bold text-[#202124] mt-1">Skill Gap Analysis for {targetRole}</h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
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
          <span className="text-xs text-[#5F6368]">Current vs Required Level</span>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#F6F2EA] border border-[#E6E0D7] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#202124]">{skill.name}</span>
                <Badge variant={gapBadgeVariant[skill.gap]} size="sm">
                  {skill.gap}
                </Badge>
              </div>

              {/* Progress bars comparison */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#5F6368]">
                  <span>Current: {skill.current}%</span>
                  <span>Target: {skill.required}%</span>
                </div>
                <div className="w-full bg-[#E6E0D7] rounded-full h-2 overflow-hidden relative">
                  {/* Required Target Marker */}
                  <div
                    className="absolute top-0 bottom-0 bg-[#D6D1C8] w-full"
                    style={{ width: `${skill.required}%` }}
                  />
                  {/* Current Level */}
                  <div
                    className="absolute top-0 bottom-0 bg-[#E05A47] rounded-full transition-all duration-300"
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
