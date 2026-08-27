import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockDashboard } from '../../utils/mockData';
import {
  Flame,
  BookOpen,
  FolderCheck,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  Star,
  ChevronRight,
  Code2,
  Sparkles,
  X
} from 'lucide-react';

export default function DashboardOverview() {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(' ')[0] : 'Kritika';

  const [activeModal, setActiveModal] = useState(null); // 'milestone' | 'course' | null
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Let's continue your learning journey!
          </p>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Current Streak */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 fill-orange-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Current Streak</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">7</span>
                <span className="text-xs font-medium text-slate-500">days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Courses Completed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Courses Completed</p>
              <span className="text-2xl font-bold text-slate-900 dark:text-white block mt-0.5">12</span>
            </div>
          </div>
        </div>

        {/* Card 3: Projects Done */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center shrink-0">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Projects Done</p>
              <span className="text-2xl font-bold text-slate-900 dark:text-white block mt-0.5">5</span>
            </div>
          </div>
        </div>

        {/* Card 4: Skills Gained */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Skills Gained</p>
              <span className="text-2xl font-bold text-slate-900 dark:text-white block mt-0.5">18</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Your Learning Path & Next Milestone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Learning Path Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Your Learning Path
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
                In Progress
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Full Stack Web Development
            </h3>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>Overall Progress</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">65% Complete</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Current Module</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                JavaScript Fundamentals
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveModal('learning')}
              className="w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-purple-600/20 active:scale-[0.98]"
            >
              Continue Learning
            </button>
          </div>
        </div>

        {/* Next Milestone Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Next Milestone
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Build a Responsive Portfolio
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Create and deploy a personal portfolio website using HTML, CSS, and JavaScript.
            </p>

            <div className="flex items-center gap-2 text-xs text-purple-600 font-medium bg-purple-50 dark:bg-purple-950/40 px-3 py-1.5 rounded-lg w-fit">
              <Calendar className="w-4 h-4" />
              <span>Due in 5 days</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveModal('milestone')}
              className="w-auto px-5 py-2.5 rounded-xl border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-sm font-semibold transition-colors active:scale-[0.98]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Next Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recommended Next</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Based on your progress and goals
            </p>
          </div>
          <button
            onClick={() => setActiveModal('allCourses')}
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Recommended Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Item 1: React.js Complete Guide */}
          <div
            onClick={() => {
              setSelectedCourse(mockDashboard.recommendedNext[0]);
              setActiveModal('course');
            }}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                React.js - Complete Guide
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                  Course
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 4.5 hrs
                </span>
              </div>
            </div>
          </div>

          {/* Item 2: Node.js Basics */}
          <div
            onClick={() => {
              setSelectedCourse(mockDashboard.recommendedNext[1]);
              setActiveModal('course');
            }}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                Node.js Basics
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  Course
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 3.0 hrs
                </span>
              </div>
            </div>
          </div>

          {/* Item 3: Build a Todo App */}
          <div
            onClick={() => {
              setSelectedCourse(mockDashboard.recommendedNext[2]);
              setActiveModal('course');
            }}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                Build a Todo App
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                  Project
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 2.5 hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Skill Development & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Development Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Skill Development</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your top skills</p>
          </div>

          <div className="space-y-3.5 pt-1">
            {mockDashboard.skills.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                  <span className="text-slate-500">{skill.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Keep going!</p>
          </div>

          <div className="space-y-4 pt-1">
            {mockDashboard.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 dark:border-slate-800/80 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  {activity.status === 'completed' ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-500 flex items-center justify-center shrink-0">
                      <Star className="w-3.5 h-3.5 fill-orange-500" />
                    </div>
                  )}
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {activity.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals for Interactivity */}
      {activeModal === 'learning' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" /> Continue Learning
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              You are currently on <strong>JavaScript Fundamentals</strong> in <em>Full Stack Web Development</em>.
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-xs text-purple-700 dark:text-purple-300">
              🎯 Next Lesson: Scope, Closures, and Higher-Order Functions.
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
              >
                Start Lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'milestone' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Milestone Details
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Build a Responsive Portfolio</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Create and deploy a personal portfolio website using HTML, CSS, and JavaScript. Include section links, theme toggle, and contact form.
              </p>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Target Deadline:</span>
                <span className="font-semibold text-purple-600">5 Days remaining</span>
              </div>
              <div className="flex justify-between">
                <span>Evaluation Criteria:</span>
                <span className="font-semibold">HTML5, CSS Flex/Grid, JS Form Handler</span>
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
              >
                Submit Project Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'course' && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {selectedCourse.title}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600">
                {selectedCourse.type}
              </span>
              <span className="text-xs text-slate-500">Duration: {selectedCourse.duration}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Recommended module tailored for your goal: <strong>{user?.targetRole || 'Full Stack Developer'}</strong>.
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
              >
                Enroll & Start Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
