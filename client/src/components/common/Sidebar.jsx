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
  Sparkles,
  Flame
} from 'lucide-react';

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

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full border-r w-64 select-none bg-[#111418] border-white/[0.06] text-[#C7C2B6] shadow-2xl relative z-20">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center text-white shadow-lg shadow-[#FF6B5F]/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#F5F1E8] tracking-tight">
              AI Learning Path
            </h2>
            <p className="text-[10px] text-[#8C877D] font-medium">
              Learn. Build. Advance.
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/10 lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
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
                `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                  linkActive
                    ? 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white shadow-lg shadow-[#FF6B5F]/25 font-bold'
                    : 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5'
                }`
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-[#8C877D] group-hover:text-[#FF6B5F]'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>

              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                  isActive
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-[#7C786E] bg-white/[0.03] group-hover:text-[#C7C2B6]'
                }`}
              >
                {item.member.replace('Member ', 'M')}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Learning Streak Card */}
      <div className="p-3.5 m-3 rounded-2xl bg-[#16191E] border border-white/[0.08] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#FF857A] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              Learning Streak
            </span>
          </div>
          <div className="text-xl font-extrabold text-[#F5F1E8] tracking-tight">
            12 Days
          </div>
          <div className="text-[10px] text-[#8C877D] mt-0.5 flex items-center justify-between">
            <span>Keep it up! 🔥</span>
            <span className="text-[#FF6B5F] font-semibold">+50 XP Today</span>
          </div>
        </div>

        {/* Glowing Coral Neon Chart Curve */}
        <svg
          className="w-full h-8 mt-1 text-[#FF6B5F]"
          viewBox="0 0 100 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            d="M0,25 Q25,28 50,18 T100,8"
            className="stroke-[#FF6B5F] drop-shadow-[0_0_8px_rgba(255,107,95,0.8)]"
          />
          <circle cx="98" cy="8" r="3" className="fill-[#FFA49E] animate-ping" />
          <circle cx="98" cy="8" r="2.5" className="fill-white" />
        </svg>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/[0.06] text-xs text-[#7C786E]">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-mono text-[10px]">STATUS</span>
          <span className="flex items-center gap-1 text-[#34D399] font-medium text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            ONLINE
          </span>
        </div>
        <p className="text-[10px] text-[#7C786E]">
          HCLTech Hackathon Production
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
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
