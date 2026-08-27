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

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#F8FAFC] border-r border-slate-200 w-64 select-none pt-4 pb-2">
      
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 mb-4 lg:hidden">
        <span className="text-sm font-bold text-slate-800">Menu</span>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Team Architecture Notice */}
      <div className="mx-4 mb-6 bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Code2 className="w-4 h-4 text-slate-600" />
          <span>Team Feature Workspace</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">
          4 Developers • 4 Feature Modules
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive: linkActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  linkActive
                    ? 'bg-[#EDE9FE] text-[#7C3AED] shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#7C3AED]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-[#DDD6FE] text-[#6D28D9]'
                    : 'text-slate-400 group-hover:text-slate-500'
                }`}
              >
                {item.member.replace('Member ', 'M')}
              </span>
            </NavLink>
          );
        })}
      </nav>



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
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed inset-y-0 left-0 flex z-10 animate-in slide-in-from-left shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
