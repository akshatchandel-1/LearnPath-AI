import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
  const userXp = user?.points ?? user?.totalXp ?? 0;

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

  // Dynamic Domain Breakdown Calculations (Starts at 0% for new users, updates as user earns progress)
  const calculateDomainProgress = (domainType) => {
    let progressValues = [];

    // 1. Matching courses progress
    const matchingCourses = courses.filter((c) => {
      const title = (c.title || '').toLowerCase();
      const cat = (c.category || '').toLowerCase();
      const skills = (c.skillsCovered || []).map((s) => (s || '').toLowerCase());

      if (domainType === 'frontend') {
        return (
          cat.includes('frontend') ||
          title.includes('react') ||
          title.includes('frontend') ||
          skills.some((s) => s.includes('react') || s.includes('html') || s.includes('javascript') || s.includes('css'))
        );
      }
      if (domainType === 'backend') {
        return (
          (cat.includes('backend') ||
            title.includes('node') ||
            title.includes('express') ||
            title.includes('api') ||
            skills.some((s) => s.includes('node') || s.includes('express') || s.includes('api') || s.includes('rest'))) &&
          !title.includes('database')
        );
      }
      if (domainType === 'database') {
        return (
          cat.includes('database') ||
          title.includes('database') ||
          title.includes('mongodb') ||
          title.includes('sql') ||
          title.includes('indexing') ||
          skills.some((s) => s.includes('mongo') || s.includes('sql') || s.includes('postgres') || s.includes('database') || s.includes('redis'))
        );
      }
      if (domainType === 'devops') {
        return (
          cat.includes('devops') ||
          cat.includes('cloud') ||
          title.includes('devops') ||
          title.includes('cloud') ||
          title.includes('docker') ||
          title.includes('kubernetes') ||
          skills.some((s) => s.includes('docker') || s.includes('kubernetes') || s.includes('aws') || s.includes('cloud') || s.includes('ci/cd') || s.includes('linux'))
        );
      }
      return false;
    });

    const enrolledDomainCourses = matchingCourses.filter((c) => c.enrolled || c.progress > 0);
    if (enrolledDomainCourses.length > 0) {
      const totalCourseProg = enrolledDomainCourses.reduce((sum, c) => sum + (c.progress || 0), 0);
      progressValues.push(totalCourseProg / enrolledDomainCourses.length);
    }

    // 2. Matching assessments progress
    const matchingAssessments = assessments.filter((a) => {
      const title = (a.title || '').toLowerCase();
      const cat = (a.category || '').toLowerCase();
      const skill = (a.skill || '').toLowerCase();

      if (domainType === 'frontend') {
        return cat.includes('frontend') || skill.includes('react') || skill.includes('frontend') || skill.includes('javascript') || title.includes('frontend');
      }
      if (domainType === 'backend') {
        return cat.includes('backend') || skill.includes('node') || skill.includes('express') || skill.includes('backend') || skill.includes('api');
      }
      if (domainType === 'database') {
        return cat.includes('database') || skill.includes('database') || skill.includes('sql') || skill.includes('mongo');
      }
      if (domainType === 'devops') {
        return cat.includes('devops') || cat.includes('cloud') || skill.includes('docker') || skill.includes('cloud') || skill.includes('devops');
      }
      return false;
    });

    const attemptedAssessments = matchingAssessments.filter((a) => a.lastScore !== null && a.lastScore !== undefined);
    if (attemptedAssessments.length > 0) {
      const totalScore = attemptedAssessments.reduce((sum, a) => sum + (a.lastScore || 0), 0);
      progressValues.push(totalScore / attemptedAssessments.length);
    }

    // 3. Matching user skills progress
    if (user?.skills && Array.isArray(user.skills) && user.skills.length > 0) {
      const matchingSkills = user.skills.filter((s) => {
        const name = (s.name || s.skill || '').toLowerCase();
        const cat = (s.category || '').toLowerCase();
        if (domainType === 'frontend') return cat.includes('frontend') || name.includes('react') || name.includes('javascript') || name.includes('html') || name.includes('css') || name.includes('frontend');
        if (domainType === 'backend') return cat.includes('backend') || name.includes('node') || name.includes('express') || name.includes('backend') || name.includes('api');
        if (domainType === 'database') return cat.includes('database') || name.includes('mongo') || name.includes('sql') || name.includes('postgres') || name.includes('database');
        if (domainType === 'devops') return cat.includes('devops') || cat.includes('cloud') || name.includes('docker') || name.includes('kubernetes') || name.includes('aws') || name.includes('cloud') || name.includes('devops');
        return false;
      });

      const activeSkills = matchingSkills.filter((s) => (s.level || s.progress || s.currentLevel || 0) > 0);
      if (activeSkills.length > 0) {
        const avgSkill = activeSkills.reduce((sum, s) => sum + (s.level || s.progress || s.currentLevel || 0), 0) / activeSkills.length;
        progressValues.push(avgSkill);
      }
    }

    if (progressValues.length === 0) return 0;
    const avg = progressValues.reduce((sum, v) => sum + v, 0) / progressValues.length;
    return Math.min(100, Math.max(0, Math.round(avg)));
  };

  const frontendProgress = calculateDomainProgress('frontend');
  const backendProgress = calculateDomainProgress('backend');
  const databaseProgress = calculateDomainProgress('database');
  const devopsProgress = calculateDomainProgress('devops');

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
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>{userHours} Hours</div>
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
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>{userStreak} Days</div>
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
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>+{userXp} XP</div>
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
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>{enrolledCourses.length}</div>
          <span className="text-[11px] text-[#38BDF8] font-semibold block mt-1">
            {completedCourses.length} tracks completed
          </span>
        </Card>
      </div>

      {/* Main Grid: Weekly Activity & Domain Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Study Activity Histogram */}
        <Card variant="glow" className="lg:col-span-2">
          <div className={`flex items-center justify-between pb-4 border-b mb-4 ${isDark ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
            <div>
              <CardTitle className={isDark ? "text-[#F5F1E8]" : "text-[#111418]"}>7-Day Study Cadence</CardTitle>
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
                  <div className={`w-full rounded-xl h-40 flex items-end p-1 overflow-hidden ${isDark ? "bg-white/5" : "bg-[#FAF7F2] border border-black/[0.06]"}`}>
                    <div
                      className="w-full bg-gradient-to-t from-[#FF6B5F] to-[#FF857A] rounded-lg transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${Math.max(8, heightPercent)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold transition-colors font-mono ${isDark ? "text-[#8C877D] group-hover:text-[#F5F1E8]" : "text-[#6B7280] group-hover:text-[#111418]"}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Competency Mastery Domain Breakdown */}
        <Card variant="default" className="space-y-4">
          <div className={`flex items-center justify-between pb-2 border-b ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
            <CardTitle className={isDark ? "text-[#F5F1E8]" : "text-[#111418]"}>Domain Breakdown</CardTitle>
            <Badge variant="coral" size="sm">Telemetry</Badge>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={`font-semibold ${isDark ? "text-[#C7C2B6]" : "text-[#374151]"}`}>Frontend & React</span>
                <span className="font-mono text-[#FF857A] font-bold">{frontendProgress}%</span>
              </div>
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                <div className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500" style={{ width: `${frontendProgress}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={`font-semibold ${isDark ? "text-[#C7C2B6]" : "text-[#374151]"}`}>Backend & APIs</span>
                <span className="font-mono text-[#38BDF8] font-bold">{backendProgress}%</span>
              </div>
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                <div className="bg-gradient-to-r from-[#38BDF8] to-[#0284C7] h-full rounded-full transition-all duration-500" style={{ width: `${backendProgress}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={`font-semibold ${isDark ? "text-[#C7C2B6]" : "text-[#374151]"}`}>Databases & Indexing</span>
                <span className="font-mono text-[#34D399] font-bold">{databaseProgress}%</span>
              </div>
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                <div className="bg-gradient-to-r from-[#34D399] to-[#059669] h-full rounded-full transition-all duration-500" style={{ width: `${databaseProgress}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={`font-semibold ${isDark ? "text-[#C7C2B6]" : "text-[#374151]"}`}>DevOps & Cloud</span>
                <span className="font-mono text-[#FBBF24] font-bold">{devopsProgress}%</span>
              </div>
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                <div className="bg-gradient-to-r from-[#FBBF24] to-[#D97706] h-full rounded-full transition-all duration-500" style={{ width: `${devopsProgress}%` }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Unlocked Badges & Achievements Section */}
      <Card variant="default">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[#FF6B5F]" />
          <h3 className={`text-sm font-bold ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>Unlocked Milestones & Badges</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${isDark ? "bg-[#0E1114] border-white/[0.06]" : "bg-[#FAF7F2] border-black/[0.06]"}`}>
            <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>Architect Pioneer</h4>
              <span className="text-[10px] text-[#8C877D]">Joined platform</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${isDark ? "bg-[#0E1114] border-white/[0.06]" : "bg-[#FAF7F2] border-black/[0.06]"}`}>
            <div className="w-10 h-10 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>First Checkpoint</h4>
              <span className="text-[10px] text-[#8C877D]">Passed quiz</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${isDark ? "bg-[#0E1114] border-white/[0.06]" : "bg-[#FAF7F2] border-black/[0.06]"}`}>
            <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>Curriculum Explorer</h4>
              <span className="text-[10px] text-[#8C877D]">Enrolled in track</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${isDark ? "bg-[#0E1114] border-white/[0.06]" : "bg-[#FAF7F2] border-black/[0.06]"}`}>
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/15 border border-[#FBBF24]/30 text-[#FBBF24] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>Streak Flame</h4>
              <span className="text-[10px] text-[#8C877D]">Continuous focus</span>
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
}
