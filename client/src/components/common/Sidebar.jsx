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
  Code2,
  Flame,
  Sparkles
} from 'lucide-react';

export const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, member: 'Member 1' },
  { name: 'My Profile', path: '/profile', icon: User, member: 'Member 1' },
  { name: 'Learning Path', path: '/learning-path', icon: Compass, member: 'Member 2' },
  { name: 'Skill Gaps', path: '/skill-gaps', icon: Target, member: 'Member 2' },
  { name: 'Courses', path: '/courses', icon: BookOpen, member: 'Member 3' },
  { name: 'Projects', path: '/projects', icon: BookOpen, member: 'Member 3' },
  { name: 'Assessments', path: '/assessments', icon: ClipboardCheck, member: 'Member 3' },
  { name: 'AI Assistant', path: '/ai-assistant', icon: Bot, member: 'Member 4' },
  { name: 'Progress', path: '/progress', icon: TrendingUp, member: 'Member 4' },
];

<<<<<<< Updated upstream
=======
/**
 * Shared Sidebar Component
 * Obsidian Theme (#191A1C) with Coral Accents (#E05A47)
 */
>>>>>>> Stashed changes
export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const sidebarContent = (
<<<<<<< Updated upstream
    <div className="flex flex-col h-full bg-[#F8FAFC] border-r border-slate-200 w-64 select-none pt-4 pb-2">
      
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 mb-4 lg:hidden">
        <span className="text-sm font-bold text-slate-800">Menu</span>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200">
=======
    <div className="flex flex-col h-full bg-[#191A1C] border-r border-white/[0.08] w-64 select-none">
      {/* Mobile Header (Close button) */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E05A47] flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#E05A47]/30">
            LP
          </div>
          <span className="text-sm font-semibold text-white">Menu Navigation</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#AEB3BA] hover:text-white hover:bg-white/[0.06]"
          aria-label="Close sidebar"
        >
>>>>>>> Stashed changes
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Team Architecture Notice */}
<<<<<<< Updated upstream
      <div className="mx-4 mb-6 bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Code2 className="w-4 h-4 text-slate-600" />
          <span>Team Feature Workspace</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">
          4 Developers • 4 Feature Modules
=======
      <div className="p-3 mx-3 mt-3 bg-[#222428] rounded-2xl border border-white/10 shadow-sm">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D6D8DC]">
          <Code2 className="w-3.5 h-3.5 text-[#E05A47]" />
          <span>Team Feature Workspace</span>
        </div>
        <p className="text-[10px] text-[#8A8F98] mt-0.5">
          4 Developers • 8 Feature Modules
>>>>>>> Stashed changes
        </p>
      </div>

      {/* Navigation List */}
<<<<<<< Updated upstream
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
=======
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
>>>>>>> Stashed changes
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive: linkActive }) =>
<<<<<<< Updated upstream
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  linkActive
                    ? 'bg-[#EDE9FE] text-[#7C3AED] shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
=======
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all group ${
                  linkActive
                    ? 'bg-[#E05A47]/15 text-white font-semibold border-l-4 border-[#E05A47] shadow-sm'
                    : 'text-[#D6D8DC] hover:text-white hover:bg-white/[0.06] border-l-4 border-transparent'
>>>>>>> Stashed changes
                }`
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
<<<<<<< Updated upstream
                    isActive ? 'text-[#7C3AED]' : 'text-slate-400 group-hover:text-slate-600'
=======
                    isActive ? 'text-[#E05A47]' : 'text-[#AEB3BA] group-hover:text-white'
>>>>>>> Stashed changes
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>

              <span
<<<<<<< Updated upstream
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-[#DDD6FE] text-[#6D28D9]'
                    : 'text-slate-400 group-hover:text-slate-500'
=======
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-lg ${
                  isActive
                    ? 'bg-[#E05A47]/25 text-[#FCEBE7] font-bold'
                    : 'text-[#8A8F98] bg-[#222428] group-hover:text-[#D6D8DC]'
>>>>>>> Stashed changes
                }`}
              >
                {item.member.replace('Member ', 'M')}
              </span>
            </NavLink>
          );
        })}
      </nav>

<<<<<<< Updated upstream


      {/* Sidebar Footer */}
      <div className="px-5 mt-4 pt-4 border-t border-slate-200 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold text-slate-400">BRANCH: READY</span>
          <span className="flex items-center gap-1 text-emerald-500 text-[9px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            STABLE
          </span>
        </div>
        <p className="text-[9px] text-slate-400">LearnPath AI v1.0.0 (Foundation)</p>
=======
      {/* Sidebar Streak Card */}
      <div className="p-3 mx-3 mb-2 rounded-2xl bg-[#222428] border border-[#E05A47]/20 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-[#E05A47] font-bold">
            <Flame className="w-3.5 h-3.5 fill-current" />
            Learning Streak
          </span>
          <span className="text-[10px] text-[#D99A8A] font-mono font-semibold">Active</span>
        </div>
        <div className="mt-1.5 flex items-baseline justify-between">
          <p className="text-lg font-black text-white font-mono">12 Days</p>
          <span className="text-[11px] text-[#D6D8DC]">Keep it up! 🔥</span>
        </div>
        <div className="w-full bg-[#191A1C] rounded-full h-1 mt-2 overflow-hidden">
          <div className="bg-gradient-to-r from-[#E05A47] to-[#D99A8A] h-full w-4/5 rounded-full" />
        </div>
      </div>

      {/* Sidebar Footer: System Status */}
      <div className="p-3.5 border-t border-white/10 text-xs text-[#8A8F98]">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[10px]">BRANCH READY</span>
          <span className="flex items-center gap-1 text-[#3F8F68] text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F8F68] animate-pulse" />
            STABLE
          </span>
        </div>
        <p className="text-[10px] text-[#8A8F98]">
          LearnPath AI v1.0.0 (Foundation)
        </p>
>>>>>>> Stashed changes
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Changed from lg:block to md:block to ensure visibility on laptops) */}
      <aside className="hidden md:block h-[calc(100vh-4rem)] z-20 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isOpen && (
<<<<<<< Updated upstream
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed inset-y-0 left-0 flex z-10 animate-in slide-in-from-left shadow-xl">
=======
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-full flex z-10 animate-in slide-in-from-left duration-200">
>>>>>>> Stashed changes
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
