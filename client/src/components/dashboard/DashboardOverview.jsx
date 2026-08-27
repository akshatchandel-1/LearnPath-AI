import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockDashboard } from '../../utils/mockData';
import { ArrowRight, Clock, Target, BookOpen, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Member 1: Dashboard Overview Placeholder Component
 * Obsidian + Ivory + Coral Palette
 */
export default function DashboardOverview() {
  const { stats, recentMilestones, recommendedNextStep } = mockDashboard;

  const statIcons = [Clock, Target, BookOpen, Award];

  return (
    <div className="space-y-6">
      {/* Metric Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = statIcons[idx % statIcons.length];
          return (
            <Card key={idx} variant="interactive">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#5F6368] font-medium">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-[#FDF0EE] text-[#E05A47] flex items-center justify-center border border-[#F9D5CD]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-bold text-[#202124] mb-2">{stat.value}</div>
              <div className="w-full bg-[#E6E0D7] rounded-full h-1.5 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#E05A47] to-[#D99A8A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
              <span className="text-[11px] text-[#3F8F68] font-semibold">{stat.change}</span>
            </Card>
          );
        })}
      </div>

      {/* 2-Column Grid: Next Milestone & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Action Card */}
        <Card variant="glow" className="lg:col-span-2">
          <CardHeader>
            <div>
              <Badge variant="primary" size="sm" dot>Recommended Next Step</Badge>
              <CardTitle className="mt-2">AI-Recommended Module</CardTitle>
            </div>
            <Sparkles className="w-5 h-5 text-[#E05A47]" />
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-[#F6F2EA] border border-[#E6E0D7] space-y-2">
              <h4 className="text-base font-semibold text-[#202124]">{recommendedNextStep.title}</h4>
              <p className="text-xs text-[#5F6368]">{recommendedNextStep.module} • {recommendedNextStep.duration}</p>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <Link to="/learning-path">
                <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                  Resume Roadmap
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Milestones Card */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentMilestones.map((item, idx) => (
                <li key={idx} className="flex items-start justify-between text-xs pb-2.5 border-b border-[#E6E0D7] last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-[#202124]">{item.title}</p>
                    <p className="text-[10px] text-[#8A8F98]">{item.date}</p>
                  </div>
                  <Badge variant="neutral" size="sm">{item.category}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
