import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Compass,
  BookOpen,
  Folder,
  ClipboardCheck,
  TrendingUp,
  Bot,
  Settings,
  LogOut,
  X
} from 'lucide-react';

export const navigationItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    member: 'Member 1',
  },
  {
    name: 'My Profile',
    path: '/profile',
    icon: User,
    member: 'Member 1',
  },
  {
    name: 'My Learning Path',
    path: '/learning-path',
    icon: Compass,
    member: 'Member 2',
  },
  {
    name: 'Courses',
    path: '/courses',
    icon: BookOpen,
    member: 'Member 3',
  },
  {
    name: 'Projects',
    path: '/learning-path',
    icon: Folder,
    member: 'Member 3',
  },
  {
    name: 'Assessments',
    path: '/assessments',
    icon: ClipboardCheck,
    member: 'Member 3',
  },
  {
    name: 'Progress',
    path: '/progress',
    icon: TrendingUp,
    member: 'Member 4',
  },
  {
    name: 'AI Assistant',
    path: '/ai-assistant',
    icon: Bot,
    member: 'Member 4',
  },
  {
    name: 'Settings',
    path: '/profile',
    icon: Settings,
    member: 'Member 1',
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#0F172A] border-r border-slate-200/80 dark:border-slate-800/80 w-64 select-none transition-colors duration-200">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
            LP
          </div>
          <span className="text-sm font-semibold text-slate-800 dark:text-white">LearnPath AI</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path && (item.name !== 'Settings' || location.pathname === '/profile');

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive: linkActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  linkActive && (item.name !== 'Settings' || location.pathname === '/profile')
                    ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Action at Bottom */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
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
