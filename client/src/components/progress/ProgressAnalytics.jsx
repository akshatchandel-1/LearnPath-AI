import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockProgress } from '../../utils/mockData';
import { TrendingUp, Clock, Flame, Award, BarChart3, Download } from 'lucide-react';

/**
 * Member 4: Progress Analytics Placeholder Component
 * Obsidian + Ivory + Coral Palette
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
            <span className="text-xs text-[#5F6368] font-medium">Total Time Invested</span>
            <Clock className="w-4 h-4 text-[#E05A47]" />
          </div>
          <div className="text-2xl font-bold text-[#202124]">{totalTimeSpentHours} Hours</div>
          <span className="text-[11px] text-[#3F8F68] font-semibold">+4.2 hrs this week</span>
        </Card>

        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#5F6368] font-medium">Active Streak</span>
            <Flame className="w-4 h-4 text-[#C48A3A]" />
          </div>
          <div className="text-2xl font-bold text-[#202124]">5 Days</div>
          <span className="text-[11px] text-[#5F6368]">Personal Best: 14 Days</span>
        </Card>

        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#5F6368] font-medium">Badges & Certificates</span>
            <Award className="w-4 h-4 text-[#E05A47]" />
          </div>
          <div className="text-2xl font-bold text-[#202124]">{badgesEarnedCount} Unlocked</div>
          <span className="text-[11px] text-[#E05A47] font-semibold">Top 15% in cohort</span>
        </Card>
      </div>

      {/* Weekly Activity Bar Chart Skeleton */}
      <Card variant="default">
        <CardHeader>
          <div>
            <CardTitle>Weekly Study Activity</CardTitle>
            <p className="text-xs text-[#5F6368]">Hours logged across the past 7 days</p>
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
                  <div className="text-[10px] text-[#8A8F98] opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {item.hours}h
                  </div>
                  <div className="w-full max-w-[36px] bg-[#E6E0D7] rounded-t-lg h-28 flex items-end overflow-hidden p-0.5">
                    <div
                      className="w-full bg-gradient-to-t from-[#E05A47] to-[#D99A8A] rounded-t transition-all duration-500 group-hover:brightness-110"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#5F6368]">{item.day}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
