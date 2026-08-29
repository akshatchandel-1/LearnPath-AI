import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Card, CardTitle, CardDescription } from '../components/common/Card';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Target,
  BookOpen,
  ClipboardCheck,
  Bot,
  TrendingUp,
  LayoutDashboard,
  User,
  ShieldCheck,
  Flame,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  const featureList = [
    {
      title: 'Dashboard & Profile',
      desc: 'Central command for learning metrics, milestones, and user skill profiles.',
      path: '/dashboard',
      icon: LayoutDashboard,
      tag: 'Overview',
    },
    {
      title: 'Learning Path & Skill Gaps',
      desc: 'Adaptive roadmaps and AI-driven competency gap diagnosis.',
      path: '/learning-path',
      icon: Compass,
      tag: 'Roadmap',
    },
    {
      title: 'Courses & Assessments',
      desc: 'Curated curriculum modules and automated benchmark quizzes.',
      path: '/courses',
      icon: BookOpen,
      tag: 'Learning',
    },
    {
      title: 'AI Assistant & Progress',
      desc: 'Interactive 24/7 AI tutor and real-time study analytics.',
      path: '/ai-assistant',
      icon: Bot,
      tag: 'Mentorship',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0B0D0F] text-gray-900 dark:text-[#F5F1E8] selection:bg-[#FF6B5F] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Ambient Coral Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF6B5F]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 pt-16 pb-20 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="coral" size="md" dot>
              Enterprise Edition
            </Badge>
            <Badge variant="secondary" size="md">
              AI-Powered SaaS
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-[#F5F1E8] leading-tight">
            AI-Powered Personalized <br />
            <span className="bg-gradient-to-r from-[#FF6B5F] via-[#FF857A] to-[#E85548] bg-clip-text text-transparent">
              Learning Path Recommender
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-[#C7C2B6] max-w-2xl mx-auto font-medium leading-relaxed">
            Accelerate your engineering mastery with real-time competency gap diagnosis, adaptive AI roadmap calibration, curated courses, and 24/7 AI mentorship.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/login">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-[#F5F1E8]">
            Complete Learning Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-[#8C877D] mt-2">
            Engineered with deep telemetry to guide software engineers from diagnosis to mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Link key={idx} to={f.path} className="group block">
                <Card variant="glow" className="h-full flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-[#8C877D]">
                        {f.tag}
                      </span>
                    </div>
                    <CardTitle className="text-base sm:text-lg mb-2 text-gray-900 dark:text-[#F5F1E8] group-hover:text-[#FF857A] transition-colors">
                      {f.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500 dark:text-[#8C877D] leading-relaxed">
                      {f.desc}
                    </CardDescription>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/[0.06] flex items-center gap-1 text-xs font-bold text-[#FF857A] group-hover:translate-x-1 transition-transform">
                    <span>Explore Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
