import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { generateProgressReportPDF } from '../../utils/reportGenerator';
import { INITIAL_COURSES, INITIAL_ASSESSMENTS } from '../../data/coursesAndAssessmentsData';
import {
  TrendingUp,
  Clock,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  Download,
  Sparkles,
  BarChart,
  Target,
  Zap
} from 'lucide-react';

export default function ProgressAnalytics() {
  const { user } = useAuth();

  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('m3_courses_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_COURSES;
  });

  const [assessments, setAssessments] = useState(() => {
    try {
      const saved = localStorage.getItem('m3_assessments_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ASSESSMENTS;
  });

  useEffect(() => {
    try {
      const savedCourses = localStorage.getItem('m3_courses_data');
      if (savedCourses) setCourses(JSON.parse(savedCourses));
      const savedAssessments = localStorage.getItem('m3_assessments_data');
      if (savedAssessments) setAssessments(JSON.parse(savedAssessments));
    } catch (e) {}
  }, []);

  const enrolledCourses = courses.filter((c) => c.enrolled);
  const completedCourses = courses.filter((c) => c.progress === 100);
  const passedAssessments = assessments.filter((a) => a.status === 'Passed');

  const userStreak = user?.streakDays ?? user?.streak ?? 0;
  const userHours = user?.completedHours || 0;
  const userXp = user?.totalXp || 0;

  const weeklyActivity = [
    { day: 'Mon', hours: userHours > 0 ? 1.5 : 0 },
    { day: 'Tue', hours: userHours > 0 ? 2.0 : 0 },
    { day: 'Wed', hours: userHours > 0 ? 1.2 : 0 },
    { day: 'Thu', hours: userHours > 0 ? 1.8 : 0 },
    { day: 'Fri', hours: userHours > 0 ? 1.0 : 0 },
    { day: 'Sat', hours: userHours > 0 ? 0.0 : 0 },
    { day: 'Sun', hours: userHours > 0 ? 0.0 : 0 },
  ];

  const maxHours = Math.max(2.5, ...weeklyActivity.map((d) => d.hours));

  const handleExport = () => {
    generateProgressReportPDF(
      { totalTimeSpentHours: userHours },
      user,
      enrolledCourses,
      assessments.filter(a => a.lastScore !== null || a.status === 'Passed')
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Progress Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C877D] font-medium">Total Time Invested</span>
            <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F5F1E8] tracking-tight font-mono">{userHours} Hours</div>
          <span className="text-[11px] text-[#34D399] font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            {userHours > 0 ? '+4.2 hrs logged recently' : 'Log your first session'}
          </span>
        </Card>

        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C877D] font-medium">Active Learning Streak</span>
            <div className="w-8 h-8 rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/20 text-[#FBBF24] flex items-center justify-center">
              <Flame className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F5F1E8] tracking-tight font-mono">{userStreak} Days</div>
          <span className="text-[11px] text-[#8C877D] mt-1 block">
            {userStreak > 0 ? 'Consistency bonus active 🔥' : 'Start your streak today'}
          </span>
        </Card>

        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C877D] font-medium">Total XP Earned</span>
            <div className="w-8 h-8 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 text-[#34D399] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F5F1E8] tracking-tight font-mono">+{userXp} XP</div>
          <span className="text-[11px] text-[#FF857A] font-semibold block mt-1">
            {passedAssessments.length} checkpoints passed
          </span>
        </Card>

        <Card variant="interactive">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C877D] font-medium">Active Tracks</span>
            <div className="w-8 h-8 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F5F1E8] tracking-tight font-mono">{enrolledCourses.length}</div>
          <span className="text-[11px] text-[#38BDF8] font-semibold block mt-1">
            {completedCourses.length} tracks completed
          </span>
        </Card>
      </div>

      {/* Main Grid: Weekly Activity & Domain Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Study Activity Histogram */}
        <Card variant="glow" className="lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
            <div>
              <CardTitle className="text-[#F5F1E8]">7-Day Study Cadence</CardTitle>
              <p className="text-xs text-[#8C877D]">Hours focused on curriculum lessons and code challenges</p>
            </div>
            <Button variant="outline" size="sm" icon={Download} onClick={handleExport}>
              Export Report
            </Button>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {weeklyActivity.map((day, idx) => {
              const heightPercent = maxHours > 0 ? (day.hours / maxHours) * 100 : 0;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-[#8C877D] opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.hours}h
                  </span>
                  <div className="w-full bg-white/5 rounded-xl h-40 flex items-end p-1 overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-[#FF6B5F] to-[#FF857A] rounded-lg transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${Math.max(8, heightPercent)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#8C877D] group-hover:text-[#F5F1E8] transition-colors font-mono">
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Competency Mastery Domain Breakdown */}
        <Card variant="default" className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <CardTitle className="text-[#F5F1E8]">Domain Breakdown</CardTitle>
            <Badge variant="coral" size="sm">Telemetry</Badge>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#C7C2B6] font-semibold">Frontend & React</span>
                <span className="font-mono text-[#FF857A] font-bold">75%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#C7C2B6] font-semibold">Backend & APIs</span>
                <span className="font-mono text-[#38BDF8] font-bold">60%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#38BDF8] to-[#0284C7] h-full rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#C7C2B6] font-semibold">Databases & Indexing</span>
                <span className="font-mono text-[#34D399] font-bold">55%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#34D399] to-[#059669] h-full rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#C7C2B6] font-semibold">DevOps & Cloud</span>
                <span className="font-mono text-[#FBBF24] font-bold">45%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#FBBF24] to-[#D97706] h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Unlocked Badges & Achievements Section */}
      <Card variant="default">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[#FF6B5F]" />
          <h3 className="text-sm font-bold text-[#F5F1E8]">Unlocked Milestones & Badges</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[#0E1114] border border-white/[0.06] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F5F1E8]">Architect Pioneer</h4>
              <span className="text-[10px] text-[#8C877D]">Joined platform</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E1114] border border-white/[0.06] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F5F1E8]">First Checkpoint</h4>
              <span className="text-[10px] text-[#8C877D]">Passed quiz</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E1114] border border-white/[0.06] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F5F1E8]">Curriculum Explorer</h4>
              <span className="text-[10px] text-[#8C877D]">Enrolled in track</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E1114] border border-white/[0.06] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/15 border border-[#FBBF24]/30 text-[#FBBF24] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F5F1E8]">Streak Flame</h4>
              <span className="text-[10px] text-[#8C877D]">Continuous focus</span>
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
}
