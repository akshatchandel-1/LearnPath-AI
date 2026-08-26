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
  ExternalLink,
  ChevronDown,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

/**
 * Shared Navbar Component
 * Features brand logo, quick navigation, search bar placeholder, notifications, and user status.
 */
export default function Navbar({ onMobileMenuToggle, isMobileMenuOpen }) {
  const { user, logout, loginAsDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isLandingPage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            {!isAuthPage && (
              <button
                type="button"
                onClick={onMobileMenuToggle}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 md:hidden focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  LearnPath <span className="gradient-text">AI</span>
                </span>
                <span className="text-[10px] text-text-subtle font-mono uppercase tracking-wider hidden sm:inline">
                  Foundation Shell
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search / Context Bar (Visible on larger screens) */}
          {!isAuthPage && !isLandingPage && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Quick search learning paths, skills, courses..."
                  className="w-full bg-slate-900/80 border border-slate-800 text-xs text-slate-200 rounded-lg pl-9 pr-12 py-2 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-500"
                  readOnly
                  onClick={() => navigate('/dashboard')}
                />
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                  ⌘K
                </kbd>
              </div>
            </div>
          )}

          {/* Right: Actions & User Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLandingPage && (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button variant="primary" size="sm" icon={LayoutDashboard}>
                    Open App
                  </Button>
                </Link>
              </div>
            )}

            {!isLandingPage && !isAuthPage && user && (
              <>
                {/* Notifications icon placeholder */}
                <button
                  type="button"
                  className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
                </button>

                {/* User Menu Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors focus:outline-none"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover border border-primary/40"
                    />
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-xs font-medium text-slate-200 leading-tight">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-text-subtle">
                        {user.targetRole || 'Learner'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                  </button>

                  {/* Dropdown Card */}
                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-surface-card border border-surface-cardBorder rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                        <div className="px-4 py-2 border-b border-slate-800">
                          <p className="text-xs font-semibold text-white">{user.name}</p>
                          <p className="text-[11px] text-text-muted truncate">{user.email}</p>
                          <div className="mt-1.5">
                            <Badge variant="primary" size="sm">
                              {user.experienceLevel || 'Intermediate'}
                            </Badge>
                          </div>
                        </div>

                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                          <span>Dashboard</span>
                        </Link>

                        <div className="border-t border-slate-800 my-1" />

                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {!user && !isAuthPage && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    loginAsDemo();
                    navigate('/dashboard');
                  }}
                >
                  Demo Mode
                </Button>
                <Link to="/login">
                  <Button variant="primary" size="sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
