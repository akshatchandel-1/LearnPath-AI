import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
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
  Flame,
  LogOut
} from 'lucide-react';

export const navigationItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & metrics'
  },
  {
    name: 'My Profile',
    path: '/profile',
    icon: User,
    description: 'Skills & preferences'
  },
  {
    name: 'Learning Path',
    path: '/learning-path',
    icon: Compass,
    description: 'Roadmap & timeline'
  },
  {
    name: 'Skill Gaps',
    path: '/skill-gaps',
    icon: Target,
    description: 'Analysis & radar'
  },
  {
    name: 'Courses',
    path: '/courses',
    icon: BookOpen,
    description: 'Curated modules'
  },
  {
    name: 'Assessments',
    path: '/assessments',
    icon: ClipboardCheck,
    description: 'Quizzes & tests'
  },
  {
    name: 'AI Assistant',
    path: '/ai-assistant',
    icon: Bot,
    description: 'Mentor & tutor'
  },
  {
    name: 'Progress',
    path: '/progress',
    icon: TrendingUp,
    description: 'Analytics & stats'
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const userStreak = user?.streakDays ?? user?.streak ?? 0;

  const handleSignOut = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const sidebarContent = (
    <div className={`flex flex-col h-full border-r w-64 select-none transition-colors relative z-20 shadow-xl ${
      isDark
        ? 'bg-[#111418] border-white/[0.06] text-[#C7C2B6]'
        : 'bg-[#FAF7F2] border-black/[0.08] text-[#4B5563]'
    }`}>
      {/* Brand Header */}
      <div className={`p-5 border-b flex items-center justify-between ${
        isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center text-white shadow-lg shadow-[#FF6B5F]/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              LearnPath AI
            </h2>
            <p className="text-[10px] text-[#8C877D] font-medium">
              Intelligent Learning Platform
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          className={`p-1 rounded-lg lg:hidden cursor-pointer transition-colors ${
            isDark ? 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/10' : 'text-[#6B7280] hover:text-[#111418] hover:bg-black/5'
          }`}
          aria-label="Close navigation sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Modules Section */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto" aria-label="Main Navigation">
        <div className="px-3 pb-2 text-[10px] font-mono tracking-widest text-[#8C877D] uppercase font-bold">
          Navigation
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (onClose) onClose();
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                isActive
                  ? 'bg-[#FF6B5F] text-white shadow-md shadow-[#FF6B5F]/20'
                  : isDark
                  ? 'text-[#C7C2B6] hover:text-[#F5F1E8] hover:bg-white/[0.04]'
                  : 'text-[#4B5563] hover:text-[#111418] hover:bg-black/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-[#FF857A]'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Learning Streak Card (Elevated white card on top of ivory sidebar in Light Mode) */}
      <div className={`p-3.5 m-3 rounded-2xl border relative overflow-hidden transition-all ${
        isDark
          ? 'bg-[#16191E] border-white/[0.08] text-white shadow-xl'
          : 'bg-white border-black/[0.08] text-[#111418] shadow-sm'
      }`}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#FF857A] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              Learning Streak
            </span>
          </div>
          <div className={`text-xl font-extrabold tracking-tight font-mono ${
            isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'
          }`}>
            {userStreak} Days
          </div>
          <div className="text-[10px] text-[#8C877D] mt-0.5 flex items-center justify-between">
            <span>{userStreak > 0 ? 'Keep it up! 🚀' : 'Start your streak today!'}</span>
            <span className="text-[#FF6B5F] font-semibold">+50 XP</span>
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

      {/* Sidebar Footer & Logout */}
      <div className={`p-3 border-t space-y-2 ${
        isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
      }`}>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#F87171] hover:bg-[#F87171]/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>

        <div className="flex items-center justify-between px-1 text-[10px] text-[#8C877D]">
          <span className="font-mono">STATUS</span>
          <span className="flex items-center gap-1 text-[#34D399] font-medium font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            ONLINE
          </span>
        </div>
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
