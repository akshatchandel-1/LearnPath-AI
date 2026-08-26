import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockProgress } from '../../utils/mockData';
import { TrendingUp, Clock, Flame, Award, BarChart3, Download } from 'lucide-react';

/**
 * Member 4: Progress Analytics Placeholder Component
 * Location: src/components/progress/ProgressAnalytics.jsx
 */
export default function ProgressAnalytics() {
  const { weeklyActivity, categoryBreakdown, totalTimeSpentHours, badgesEarnedCount } = mockProgress;

  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

  return (
    <div className="space-y-6">
      {/* Top Progress Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Total Time Invested</span>
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-white">{totalTimeSpentHours} Hours</div>
          <span className="text-[11px] text-emerald-400 font-medium">+4.2 hrs this week</span>
        </Card>

        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Active Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">5 Days</div>
          <span className="text-[11px] text-text-muted">Personal Best: 14 Days</span>
        </Card>

        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Badges & Certificates</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{badgesEarnedCount} Unlocked</div>
          <span className="text-[11px] text-purple-300 font-medium">Top 15% in cohort</span>
        </Card>
      </div>

      {/* Weekly Activity Bar Chart Skeleton */}
      <Card variant="default">
        <CardHeader>
          <div>
            <CardTitle>Weekly Study Activity</CardTitle>
            <p className="text-xs text-text-muted">Hours logged across the past 7 days</p>
          </div>
          <Button variant="outline" size="sm" icon={Download}>
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-40 pt-6 px-2">
            {weeklyActivity.map((item, idx) => {
              const heightPercent = (item.hours / maxHours) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {item.hours}h
                  </div>
                  <div className="w-full max-w-[36px] bg-slate-800 rounded-t-lg h-28 flex items-end overflow-hidden p-0.5">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-secondary rounded-t transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400">{item.day}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
