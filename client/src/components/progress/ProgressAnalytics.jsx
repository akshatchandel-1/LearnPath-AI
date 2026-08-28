import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockProgress } from '../../utils/mockData';
import {
  TrendingUp,
  Clock,
  Flame,
  Award,
  BarChart3,
  Download,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function ProgressAnalytics() {
  const { weeklyActivity, categoryBreakdown, totalTimeSpentHours, badgesEarnedCount } = mockProgress;

  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

  const badges = [
    { title: 'Full Stack Pioneer', date: 'Earned Aug 2026', level: 'Gold' },
    { title: 'React 18 Specialist', date: 'Earned Aug 2026', level: 'Silver' },
    { title: '12-Day Streak Master', date: 'Active', level: 'Platinum' },
    { title: 'Neural Net Builder', date: 'Earned Aug 2026', level: 'Gold' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Progress Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="interactive" className="group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C877D] font-medium uppercase tracking-wider">Total Time Invested</span>
            <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F5F1E8] mb-1">{totalTimeSpentHours || 48.5} Hours</div>
          <span className="text-[11px] text-[#34D399] font-semibold">+4.5 hrs this week</span>
        </Card>

        <Card variant="interactive" className="group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C877D] font-medium uppercase tracking-wider">Active Streak</span>
            <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F5F1E8] mb-1">12 Days</div>
          <span className="text-[11px] text-[#FF857A] font-semibold">Personal Best: 14 Days</span>
        </Card>

        <Card variant="interactive" className="group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C877D] font-medium uppercase tracking-wider">Badges Unlocked</span>
            <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F5F1E8] mb-1">{badgesEarnedCount || 4} Badges</div>
          <span className="text-[11px] text-[#38BDF8] font-semibold">Top 10% in cohort</span>
        </Card>

        <Card variant="interactive" className="group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C877D] font-medium uppercase tracking-wider">Total XP Earned</span>
            <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F5F1E8] mb-1">1,850 XP</div>
          <span className="text-[11px] text-[#34D399] font-semibold">Level 4: Advanced</span>
        </Card>
      </div>

      {/* Main Grid: Weekly Activity Chart (Left 8-col) + XP Distribution (Right 4-col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8-Cols: Interactive Weekly Study Bar Chart */}
        <div className="lg:col-span-8 space-y-6">
          <Card variant="default">
            <CardHeader>
              <div>
                <CardTitle>Weekly Study Activity</CardTitle>
                <CardDescription>Hours logged across the past 7 days</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={() => alert("Weekly analytics report exported as PDF.")}
              >
                Export Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-3 h-52 pt-8 px-3">
                {weeklyActivity.map((item, idx) => {
                  const heightPercent = (item.hours / maxHours) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[10px] text-[#FF857A] opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold">
                        {item.hours}h
                      </div>
                      <div className="w-full max-w-[42px] bg-white/5 rounded-t-xl h-36 flex items-end overflow-hidden p-0.5 border border-white/[0.04]">
                        <div
                          className="w-full bg-gradient-to-t from-[#FF6B5F] to-[#FF857A] rounded-t transition-all duration-500 group-hover:brightness-125"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#8C877D] group-hover:text-[#F5F1E8] transition-colors">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Badges & Milestone Achievements */}
          <Card variant="default">
            <CardHeader>
              <div>
                <CardTitle>Badges & Certifications</CardTitle>
                <CardDescription>Verified competencies achieved along your learning path</CardDescription>
              </div>
              <Badge variant="coral" size="sm">4 Earned</Badge>
            </CardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#16191E] border border-white/[0.06] hover:border-[#FF6B5F]/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B5F]/20 to-[#E85548]/10 border border-[#FF6B5F]/30 flex items-center justify-center text-[#FF857A] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F1E8]">{b.title}</h4>
                    <p className="text-[10px] text-[#8C877D]">{b.date} • <span className="text-[#FF857A] font-semibold">{b.level}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 4-Cols: Category Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="glow">
            <CardHeader>
              <div>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>Time distribution by category</CardDescription>
              </div>
            </CardHeader>

            <div className="space-y-4">
              {categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#F5F1E8]">{cat.name}</span>
                    <span className="text-[#FF6B5F]">{cat.percentage}% ({cat.hours}h)</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.06] text-xs text-[#8C877D]">
              <span className="font-semibold text-[#F5F1E8]">Tip:</span> Balancing time across Backend & AI/ML will optimize your gap closure speed.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
