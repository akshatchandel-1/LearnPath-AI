import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Compass,
  Target,
  BookOpen,
  ClipboardCheck,
  Bot,
  TrendingUp,
  X,
  Code2
} from 'lucide-react';
import Badge from './Badge';

/**
 * 8 Major Navigation Routes & Member Assignments
 */
export const navigationItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    member: 'Member 1',
    description: 'Overview & metrics'
  },
  {
    name: 'My Profile',
    path: '/profile',
    icon: User,
    member: 'Member 1',
    description: 'Skills & preferences'
  },
  {
    name: 'Learning Path',
    path: '/learning-path',
    icon: Compass,
    member: 'Member 2',
    description: 'Roadmap & timeline'
  },
  {
    name: 'Skill Gaps',
    path: '/skill-gaps',
    icon: Target,
    member: 'Member 2',
    description: 'Analysis & radar'
  },
  {
    name: 'Courses',
    path: '/courses',
    icon: BookOpen,
    member: 'Member 3',
    description: 'Curated modules'
  },
  {
    name: 'Assessments',
    path: '/assessments',
    icon: ClipboardCheck,
    member: 'Member 3',
    description: 'Quizzes & tests'
  },
  {
    name: 'AI Assistant',
    path: '/ai-assistant',
    icon: Bot,
    member: 'Member 4',
    description: 'Mentor & tutor'
  },
  {
    name: 'Progress',
    path: '/progress',
    icon: TrendingUp,
    member: 'Member 4',
    description: 'Analytics & stats'
  },
];

/**
 * Shared Sidebar Component
 * Renders the primary navigation list with active highlighting, icons, and member tags.
 * Works seamlessly on desktop and inside mobile drawer.
 */
export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-background/95 lg:bg-background border-r border-slate-800/80 w-64 select-none">
      {/* Mobile Header (Close button) */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">
            LP
          </div>
          <span className="text-sm font-semibold text-white">Menu Navigation</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Team Architecture Notice (Subtle helper badge) */}
      <div className="p-3 mx-3 mt-3 bg-slate-900/90 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
          <Code2 className="w-3.5 h-3.5 text-primary" />
          <span>Team Feature Workspace</span>
        </div>
        <p className="text-[10px] text-text-subtle mt-0.5">
          4 Developers • 8 Feature Modules
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive: linkActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  linkActive
                    ? 'bg-primary/15 text-primary-300 border border-primary/30 shadow-sm shadow-primary/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>

              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive
                    ? 'bg-primary/20 text-primary-300'
                    : 'text-slate-400 bg-slate-900 group-hover:text-slate-300'
                }`}
              >
                {item.member.replace('Member ', 'M')}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer: System Status */}
      <div className="p-4 border-t border-slate-800/80 text-xs text-text-subtle">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[10px]">BRANCH READY</span>
          <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            STABLE
          </span>
        </div>
        <p className="text-[10px] text-slate-400">
          LearnPath AI v1.0.0 (Foundation)
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] z-20 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer with Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-full flex z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
