import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { mockDashboard } from '../../utils/mockData';
import {
  ArrowRight,
  Clock,
  Target,
  BookOpen,
  Award,
  Sparkles,
  PlayCircle,
  CheckCircle2,
  TrendingUp,
  Star,
  ChevronRight,
  X,
  Code2,
  Layers,
  Flame
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function DashboardOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const recommendedCourses = [
    {
      id: 'rc1',
      title: 'Full Stack MERN Architecture',
      level: 'Intermediate',
      duration: '4.5 hrs',
      rating: 4.9,
      type: 'Core Roadmap',
      progress: 68,
    },
    {
      id: 'rc2',
      title: 'Vector Databases & LLM Embeddings',
      level: 'Advanced',
      duration: '3.2 hrs',
      rating: 4.8,
      type: 'AI Specialty',
      progress: 40,
    },
    {
      id: 'rc3',
      title: 'Node.js Event Loop & Microservices',
      level: 'Intermediate',
      duration: '2.8 hrs',
      rating: 4.7,
      type: 'Backend Mastery',
      progress: 85,
    }
  ];

  const skillMatrix = [
    { name: 'React.js & State Management', progress: 85, level: 'Advanced' },
    { name: 'Node.js & Express API', progress: 75, level: 'Intermediate' },
    { name: 'MongoDB Indexing & Aggregations', progress: 65, level: 'Intermediate' },
    { name: 'AI/ML Prompt Engineering & LangChain', progress: 50, level: 'Beginner' },
  ];

  const statIcons = [Clock, Target, BookOpen, Award];

  return (
    <div className="space-y-6">
      {/* Metric Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockDashboard.stats.map((stat, idx) => {
          const Icon = statIcons[idx % statIcons.length];
          return (
            <Card key={idx} variant="interactive" className="relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#8C877D] font-medium">{stat.label}</span>
                <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#F5F1E8] tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
              <span className="text-[11px] text-[#34D399] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </Card>
          );
        })}
      </div>

      {/* Main Row: Active Milestone (Left 8-col) + Skill Mastery (Right 4-col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8-Cols: Active Roadmap Milestone & Recommended Modules */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Milestone Card */}
          <Card variant="glow" className="relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="coral" size="sm" dot>Current Milestone</Badge>
                  <span className="text-xs text-[#8C877D] font-mono">Stage 2 of 5</span>
                </div>
                <h3 className="text-lg font-bold text-[#F5F1E8]">
                  Full-Stack Architecture & Microservices
                </h3>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={PlayCircle}
                onClick={() => setActiveModal('learning')}
              >
                Continue Lesson
              </Button>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C7C2B6] font-medium">Stage Progress</span>
                <span className="text-[#FF6B5F] font-bold">65% Completed</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#16191E] border border-white/[0.06] flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F1E8]">Next Up: Express REST Architecture & JWT Auth</h4>
                    <p className="text-[10px] text-[#8C877D]">Estimated time: 45 mins • Hands-on Lab</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal('learning')}
                  className="text-xs font-bold text-[#FF6B5F] hover:text-[#FF857A] flex items-center gap-1 cursor-pointer"
                >
                  <span>Start</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>

          {/* Recommended Modules */}
          <Card variant="default">
            <CardHeader>
              <div>
                <CardTitle>Recommended For Your Goal</CardTitle>
                <CardDescription>Tailored modules based on your target role: {user?.targetRole || 'Full Stack Developer'}</CardDescription>
              </div>
              <Link to="/courses">
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                  View All
                </Button>
              </Link>
            </CardHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course);
                    setActiveModal('course');
                  }}
                  className="p-4 rounded-xl bg-[#16191E] border border-white/[0.06] hover:border-[#FF6B5F]/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#FF6B5F] bg-[#FF6B5F]/10 px-2 py-0.5 rounded-md border border-[#FF6B5F]/20">
                        {course.type}
                      </span>
                      <span className="text-[11px] text-[#8C877D] font-mono">{course.duration}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#F5F1E8] group-hover:text-[#FF6B5F] transition-colors line-clamp-2 mb-1">
                      {course.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#8C877D]">
                      <span>{course.level}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#FBBF24]">
                        <Star className="w-3 h-3 fill-current" />
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] text-[#8C877D] font-semibold">{course.progress}% progress</span>
                    <span className="text-xs font-bold text-[#FF6B5F] group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 4-Cols: Skill Mastery & Recent Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Skill Mastery Card */}
          <Card variant="default">
            <CardHeader>
              <div>
                <CardTitle>Skill Competency</CardTitle>
                <CardDescription>Verified skills in your profile</CardDescription>
              </div>
              <Link to="/skill-gaps">
                <Button variant="ghost" size="sm" className="text-xs">
                  Analysis →
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-3.5 pt-1">
              {skillMatrix.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#F5F1E8]">{skill.name}</span>
                    <span className="text-[#FF6B5F]">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Milestones Activity */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <span className="text-xs text-[#8C877D]">Live</span>
            </CardHeader>

            <ul className="space-y-3 text-xs">
              {mockDashboard.recentMilestones.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start justify-between pb-3 border-b border-white/[0.06] last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#34D399]/15 text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#F5F1E8]">{item.title}</p>
                      <p className="text-[10px] text-[#8C877D]">{item.date}</p>
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">
                    {item.category}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Interactive Modals */}
      {activeModal === 'learning' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#111418] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-[#F5F1E8]">
            <div className="flex justify-between items-center border-b pb-3 border-white/[0.08]">
              <h3 className="font-bold text-base flex items-center gap-2 text-[#F5F1E8]">
                <Sparkles className="w-5 h-5 text-[#FF6B5F]" /> Continue Learning
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-[#8C877D] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#C7C2B6] leading-relaxed">
              You are currently on <strong>Express REST Architecture & Microservices</strong> in <em>{user?.targetRole || 'Full Stack MERN'}</em>.
            </p>
            <div className="p-3 bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 rounded-xl text-xs text-[#FF857A]">
              🎯 Next Lesson: Authentication Middleware, JWT Token Verification & Rate Limiting.
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  setActiveModal(null);
                  navigate('/learning-path');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white text-xs font-bold shadow-md shadow-[#FF6B5F]/20 hover:scale-105 transition-all"
              >
                Go to Lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'course' && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#111418] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-[#F5F1E8]">
            <div className="flex justify-between items-center border-b pb-3 border-white/[0.08]">
              <h3 className="font-bold text-base text-[#F5F1E8]">
                {selectedCourse.title}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-[#8C877D] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F]">
                {selectedCourse.type}
              </span>
              <span className="text-xs text-[#8C877D]">Duration: {selectedCourse.duration}</span>
            </div>
            <p className="text-xs text-[#C7C2B6] leading-relaxed">
              Recommended module tailored for your target competency profile: <strong>{user?.targetRole || 'Full Stack Developer'}</strong>.
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  setActiveModal(null);
                  navigate('/courses');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white text-xs font-bold shadow-md shadow-[#FF6B5F]/20 hover:scale-105 transition-all"
              >
                Enroll & Open Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
