import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import Badge from './Badge';
import {
  Sparkles,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  User,
  ChevronDown,
  LayoutDashboard,
  ShieldAlert,
  Flame,
  Settings
} from 'lucide-react';

export default function Navbar({ onMobileMenuToggle, isMobileMenuOpen }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isLandingPage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-30 w-full transition-colors bg-[#0B0D0F]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-sm">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            {!isAuthPage && (
              <button
                type="button"
                onClick={onMobileMenuToggle}
                className="p-2 rounded-xl text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5 lg:hidden focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center shadow-lg shadow-[#FF6B5F]/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-[#F5F1E8] flex items-center gap-1">
                  LearnPath <span className="text-[#FF6B5F]">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D] hidden sm:inline">
                  AI-Powered Learning Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search Bar */}
          {!isAuthPage && !isLandingPage && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
                <input
                  type="text"
                  placeholder="Quick search roadmaps, skills, courses, assessments..."
                  className="w-full text-xs rounded-xl pl-9 pr-12 py-2 bg-[#111418] border border-white/[0.08] text-[#F5F1E8] placeholder:text-[#8C877D] focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 transition-all"
                  onClick={() => navigate('/learning-path')}
                  readOnly
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#8C877D] border border-white/10">
                  ⌘K
                </kbd>
              </div>
            </div>
          )}

          {/* Right: User Menu & Streak & Notifications */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {isLandingPage && (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button variant="primary" size="sm" icon={LayoutDashboard}>
                    Launch App
                  </Button>
                </Link>
              </div>
            )}

            {!isLandingPage && !isAuthPage && user && (
              <>
                {/* Streak Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] text-xs font-bold shadow-2xs">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{user.streakDays || 12} Days</span>
                </div>

                {/* Notifications Button */}
                <button
                  type="button"
                  className="relative p-2 rounded-xl text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF6B5F] animate-ping" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF6B5F]" />
                </button>

                {/* User Profile Pill */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/5 transition-colors focus:outline-none border border-transparent hover:border-white/10"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover border border-[#FF6B5F]/40"
                    />
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-xs font-semibold leading-tight text-[#F5F1E8]">
                        {user.name || 'Akshat Singh'}
                      </span>
                      <span className="text-[10px] text-[#8C877D] leading-tight">
                        {user.targetRole || 'Full Stack Developer'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 hidden sm:inline text-[#8C877D]" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#111418] border border-white/10 shadow-2xl p-2 z-50 text-xs animate-in zoom-in-95">
                      <div className="p-2.5 border-b border-white/10 mb-1">
                        <p className="font-bold text-[#F5F1E8]">{user.name}</p>
                        <p className="text-[11px] text-[#8C877D] truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/profile');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#C7C2B6] hover:text-[#F5F1E8] hover:bg-white/5 font-medium transition-colors"
                      >
                        <User className="w-4 h-4 text-[#FF6B5F]" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/dashboard');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#C7C2B6] hover:text-[#F5F1E8] hover:bg-white/5 font-medium transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#FF6B5F]" />
                        <span>Dashboard</span>
                      </button>

                      <div className="border-t border-white/10 my-1 pt-1">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#F87171] hover:bg-[#F87171]/10 font-medium transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
