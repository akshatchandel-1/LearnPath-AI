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
  GitBranch
} from 'lucide-react';

export default function LandingPage() {
  const featureList = [
    {
      title: 'Dashboard & Profile',
      desc: 'Central command for learning metrics and user skill profiles.',
      path: '/dashboard',
      icon: LayoutDashboard,
      member: 'Member 1',
    },
    {
      title: 'Learning Path & Skill Gaps',
      desc: 'Adaptive roadmaps and AI-driven competency gap diagnosis.',
      path: '/learning-path',
      icon: Compass,
      member: 'Member 2',
    },
    {
      title: 'Courses & Assessments',
      desc: 'Smart course recommendations and automated benchmark quizzes.',
      path: '/courses',
      icon: BookOpen,
      member: 'Member 3',
    },
    {
      title: 'AI Assistant & Progress',
      desc: 'Interactive 24/7 AI mentor and real-time study analytics.',
      path: '/ai-assistant',
      icon: Bot,
      member: 'Member 4',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-white flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        {/* Background glow elements */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="md" dot>
              Hackathon Ready Foundation
            </Badge>
            <Badge variant="neutral" size="md">
              MERN + AI/ML Architecture
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            AI-Powered Personalized <br />
            <span className="gradient-text">Learning Path Recommender</span>
          </h1>

          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
            A unified, conflict-free collaborative foundation built for a 4-developer team.
            Navigate through all modules, test the design system, and launch feature development cleanly.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Explore Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In / Demo Mode
              </Button>
            </Link>
          </div>

          {/* Git Branch Architecture Banner */}
          <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-text-muted flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <div className="flex items-center gap-2 font-mono text-slate-300">
              <GitBranch className="w-4 h-4 text-primary" />
              <span>frontend branch ready</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span>4 Independent Developer Modules</span>
          </div>
        </div>
      </div>

      {/* Feature Modules Quick Access Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-white">4-Member Team Feature Modules</h2>
          <p className="text-sm text-text-muted mt-2">
            Each team member works inside isolated feature folders with zero merge collisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Link key={idx} to={feature.path} className="group">
                <Card variant="interactive" className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="primary" size="sm">{feature.member}</Badge>
                    </div>
                    <CardTitle className="text-base mb-1">{feature.title}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {feature.desc}
                    </CardDescription>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center text-xs text-primary-400 font-medium group-hover:text-primary-300">
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-text-subtle">
        <p>© 2026 LearnPath AI — AI-Powered Personalized Learning Path Recommender</p>
      </footer>
    </div>
  );
}
