import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Bell, Search, LogOut, User, ChevronDown } from 'lucide-react';

<<<<<<< Updated upstream
=======
/**
 * Shared Navbar Component
 * Obsidian Theme (#111214) with Coral Accent Highlights
 */
>>>>>>> Stashed changes
export default function Navbar({ onMobileMenuToggle, isMobileMenuOpen }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  // Default values for mockup simulation if no user
  const displayUser = user || {
    name: 'Demo Learner',
    targetRole: 'Full Stack MERN Developer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=80',
    email: 'demo@example.com'
  };

  return (
<<<<<<< Updated upstream
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 shadow-sm">
=======
    <header className="sticky top-0 z-30 w-full bg-[#111214] border-b border-white/[0.08] text-[#F5F5F5]">
>>>>>>> Stashed changes
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Mobile Toggle & Logo */}
          <div className="flex items-center gap-3 w-64 shrink-0">
            {!isAuthPage && (
              <button
                type="button"
                onClick={onMobileMenuToggle}
<<<<<<< Updated upstream
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none md:hidden"
=======
                className="p-2 rounded-lg text-[#A7ABB2] hover:text-white hover:bg-white/[0.06] md:hidden focus:outline-none focus:ring-2 focus:ring-[#E05A47]"
                aria-label="Toggle navigation menu"
>>>>>>> Stashed changes
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
<<<<<<< Updated upstream
            
            {/* Desktop & Mobile Logo */}
            <Link to="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#7C3AED" />
                <path d="M8 10h6l4 6-4 6H8l4-6-4-6z" fill="white" opacity="0.9" />
                <path d="M16 10h8l-4 6 4 6h-8l4-6-4-6z" fill="white" opacity="0.6" />
              </svg>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-slate-900 leading-tight">
                  LearnPath <span className="text-violet-600">AI</span>
                </span>
                <span className="text-[9px] font-semibold text-slate-400 tracking-widest uppercase leading-none mt-0.5">
=======

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E05A47] to-[#D99A8A] flex items-center justify-center shadow-md shadow-[#E05A47]/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  LearnPath <span className="text-[#E05A47]">AI</span>
                </span>
                <span className="text-[10px] text-[#8A8F98] font-mono uppercase tracking-wider hidden sm:inline">
>>>>>>> Stashed changes
                  Foundation Shell
                </span>
              </div>
            </Link>
          </div>

<<<<<<< Updated upstream
          {/* Center: Search Bar */}
          <div className="flex-1 flex justify-center max-w-2xl">
            {!isAuthPage && (
              <div className="relative w-full max-w-xl">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search learning paths, skills, courses..."
                  className="w-full bg-slate-100/70 border border-transparent text-sm text-slate-800 rounded-lg pl-11 pr-12 py-2 focus:outline-none focus:bg-white focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-slate-400"
                  readOnly
                  onClick={() => navigate('/dashboard')}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                   <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-slate-200 border border-slate-300 rounded text-[10px] font-mono text-slate-500">⌘K</kbd>
                </div>
=======
          {/* Center: Search / Context Bar */}
          {!isAuthPage && !isLandingPage && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-[#8A8F98] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Quick search learning paths, skills, courses..."
                  className="w-full bg-[#191A1C] border border-white/10 text-xs text-[#F5F5F5] rounded-xl pl-9 pr-12 py-2 focus:outline-none focus:border-[#E05A47] focus:ring-1 focus:ring-[#E05A47] transition-all placeholder:text-[#8A8F98]"
                  readOnly
                  onClick={() => navigate('/dashboard')}
                />
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-[#222428] text-[#8A8F98] px-1.5 py-0.5 rounded border border-white/10">
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
>>>>>>> Stashed changes
              </div>
            )}
          </div>

          {/* Right: Actions & User Dropdown */}
          <div className="flex items-center gap-4 shrink-0">
            {!isAuthPage && (
              <>
<<<<<<< Updated upstream
                <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-violet-600 border-2 border-white"></span>
=======
                {/* Notifications icon */}
                <button
                  type="button"
                  className="relative p-2 rounded-xl text-[#A7ABB2] hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E05A47] animate-ping" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E05A47]" />
>>>>>>> Stashed changes
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
<<<<<<< Updated upstream
                    className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    <img
                      src={displayUser.avatar}
                      alt={displayUser.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm"
                    />
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-sm font-semibold text-slate-800 leading-tight">
                        {displayUser.name}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        {displayUser.targetRole}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:inline" />
=======
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.06] transition-colors focus:outline-none"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover border border-[#E05A47]/40"
                    />
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-xs font-medium text-[#F5F5F5] leading-tight">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-[#A7ABB2]">
                        {user.targetRole || 'Learner'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-[#A7ABB2] hidden sm:inline" />
>>>>>>> Stashed changes
                  </button>

                  {isProfileOpen && (
                    <>
<<<<<<< Updated upstream
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-semibold text-slate-800">{displayUser.name}</p>
                          <p className="text-xs text-slate-500 truncate">{displayUser.email}</p>
                        </div>
                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-violet-700 hover:bg-violet-50">
                          <User className="w-4 h-4" /> <span>My Profile</span>
                        </Link>
                        <div className="border-t border-slate-100 my-1" />
                        <button onClick={() => { setIsProfileOpen(false); logout(); navigate('/login'); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">
                          <LogOut className="w-4 h-4" /> <span>Log Out</span>
=======
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-[#191A1C] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 text-[#F5F5F5]">
                        <div className="px-4 py-2 border-b border-white/10">
                          <p className="text-xs font-semibold text-white">{user.name}</p>
                          <p className="text-[11px] text-[#A7ABB2] truncate">{user.email}</p>
                          <div className="mt-1.5">
                            <Badge variant="primary" size="sm">
                              {user.experienceLevel || 'Intermediate'}
                            </Badge>
                          </div>
                        </div>

                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-[#D6D8DC] hover:text-white hover:bg-white/[0.06]"
                        >
                          <User className="w-3.5 h-3.5 text-[#A7ABB2]" />
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-[#D6D8DC] hover:text-white hover:bg-white/[0.06]"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-[#A7ABB2]" />
                          <span>Dashboard</span>
                        </Link>

                        <div className="border-t border-white/10 my-1" />

                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#E05A47] hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log Out</span>
>>>>>>> Stashed changes
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
<<<<<<< Updated upstream
=======

            {!user && !isAuthPage && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    loginAsDemo();
                    navigate('/dashboard');
                  }}
                  className="border-white/20 text-white hover:bg-white/10"
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
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </header>
  );
}
