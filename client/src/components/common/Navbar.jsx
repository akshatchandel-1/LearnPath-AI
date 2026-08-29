import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';
import {
  Sparkles,
  Flame,
  Search,
  Bell,
  User,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Compass,
  Target,
  BookOpen,
  ClipboardCheck,
  Bot,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const SEARCHABLE_ITEMS = [
  { title: 'Dashboard', category: 'Navigation', path: '/dashboard', icon: LayoutDashboard, keywords: 'home overview metrics stats' },
  { title: 'My Profile', category: 'Navigation', path: '/profile', icon: User, keywords: 'settings bio user preferences skills' },
  { title: 'Learning Path', category: 'Navigation', path: '/learning-path', icon: Compass, keywords: 'roadmap timeline curriculum phases milestones' },
  { title: 'Skill Gaps', category: 'Navigation', path: '/skill-gaps', icon: Target, keywords: 'radar analysis competency bottlenecks' },
  { title: 'Courses', category: 'Navigation', path: '/courses', icon: BookOpen, keywords: 'modules curriculum lessons tutorials' },
  { title: 'Assessments', category: 'Navigation', path: '/assessments', icon: ClipboardCheck, keywords: 'quiz test exam benchmark score certification' },
  { title: 'AI Assistant', category: 'Navigation', path: '/ai-assistant', icon: Bot, keywords: 'chat mentor tutor help prompts questions' },
  { title: 'Progress', category: 'Navigation', path: '/progress', icon: TrendingUp, keywords: 'analytics hours streak weekly activity badges' },
  // Topics & Tech Skills
  { title: 'React.js & State Management', category: 'Skill & Courses', path: '/courses', icon: BookOpen, keywords: 'react hooks redux zustand frontend javascript' },
  { title: 'Node.js & Express Architecture', category: 'Skill & Courses', path: '/courses', icon: BookOpen, keywords: 'backend api microservices javascript rest' },
  { title: 'MongoDB & Database Aggregations', category: 'Skill & Courses', path: '/courses', icon: BookOpen, keywords: 'database nosql mongo indexing query' },
  { title: 'TypeScript & Type Safety', category: 'Skill & Courses', path: '/courses', icon: BookOpen, keywords: 'typescript types interfaces languages' },
  { title: 'Docker & Microservices', category: 'Skill & Courses', path: '/courses', icon: BookOpen, keywords: 'docker containers devops kubernetes cloud' },
  { title: 'Vector Databases & RAG Pipelines', category: 'Skill & Courses', path: '/courses', icon: BookOpen, keywords: 'ai ml embeddings langchain vector' },
  { title: 'React Core Benchmark Quiz', category: 'Assessment', path: '/assessments', icon: ClipboardCheck, keywords: 'react quiz test benchmark' },
  { title: 'Node.js Microservices Quiz', category: 'Assessment', path: '/assessments', icon: ClipboardCheck, keywords: 'node backend quiz test' },
];

export default function Navbar({ onMobileMenuToggle, isMobileMenuOpen }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);
  const isDark = theme === 'dark';
  const userStreak = user?.streakDays ?? user?.streak ?? 0;

  // Fetch notifications
  useEffect(() => {
    if (user && !isAuthPage) {
      const fetchNotifs = async () => {
        try {
          const res = await api.get('/notifications');
          if (res.data?.success) {
            const fetched = res.data.notifications.map(n => ({
              id: n._id,
              title: n.title,
              desc: n.message,
              time: new Date(n.createdAt).toLocaleDateString(),
              unread: !n.read
            }));
            setNotifications(fetched);
            setUnreadNotifs(fetched.filter(n => n.unread).length);
          }
        } catch (err) {
          console.error('Failed to fetch notifications', err);
        }
      };
      fetchNotifs();
    }
  }, [user, isAuthPage]);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredSearchResults = searchQuery.trim()
    ? SEARCHABLE_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.keywords.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCHABLE_ITEMS.slice(0, 6);

  const handleSearchResultClick = (path) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredSearchResults.length > 0) {
      handleSearchResultClick(filteredSearchResults[0].path);
    }
  };

  const handleMarkAllNotifsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
      setUnreadNotifs(0);
    } catch (err) {
      console.error('Failed to mark read', err);
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-colors border-b shadow-sm ${
        isDark
          ? 'bg-[#0B0D0F]/90 backdrop-blur-xl border-white/[0.06]'
          : 'bg-[#FAF7F2]/90 backdrop-blur-xl border-black/[0.06]'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            {!isAuthPage && (
              <button
                type="button"
                onClick={onMobileMenuToggle}
                className={`p-2 rounded-xl lg:hidden focus:outline-none cursor-pointer transition-colors ${
                  isDark ? 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5' : 'text-[#7C786E] hover:text-[#111418] hover:bg-black/5'
                }`}
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
                <span className={`font-extrabold text-base tracking-tight flex items-center gap-1 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                  LearnPath <span className="text-[#FF6B5F]">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D] hidden sm:inline">
                  Intelligent Learning Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Global Search Bar & Results Dropdown */}
          {!isAuthPage && (
            <div ref={searchRef} className="hidden md:flex items-center flex-1 max-w-md mx-4 relative">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search roadmaps, skills, courses, assessments..."
                  className={`w-full text-xs rounded-xl pl-9 pr-12 py-2 transition-all focus:outline-none focus:ring-1 focus:ring-[#FF6B5F]/40 ${
                    isDark
                      ? 'bg-[#111418] border border-white/[0.08] text-[#F5F1E8] placeholder:text-[#8C877D] focus:border-[#FF6B5F]'
                      : 'bg-white border border-black/[0.1] text-[#111418] placeholder:text-[#7C786E] focus:border-[#FF6B5F]'
                  }`}
                />
                <kbd
                  onClick={() => setIsSearchOpen(true)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#8C877D] cursor-pointer"
                >
                  ⌘K
                </kbd>
              </form>

              {/* Global Search Results Dropdown Palette */}
              {isSearchOpen && (
                <div
                  className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 max-h-96 overflow-y-auto ${
                    isDark ? 'bg-[#111418] border-white/10 text-[#F5F1E8]' : 'bg-white border-black/10 text-[#111418]'
                  }`}
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8C877D] font-bold flex justify-between items-center">
                    <span>{searchQuery ? 'Search Results' : 'Suggested Quick Links'}</span>
                    <span className="text-[9px] lowercase">press esc to close</span>
                  </div>

                  <div className="space-y-1 mt-1">
                    {filteredSearchResults.length > 0 ? (
                      filteredSearchResults.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={idx}
                            onClick={() => handleSearchResultClick(item.path)}
                            className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all group ${
                              isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-[#FF6B5F]/15 text-[#FF857A] flex items-center justify-center shrink-0">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-tight group-hover:text-[#FF857A] transition-colors">
                                  {item.title}
                                </p>
                                <span className="text-[10px] text-[#8C877D] font-mono">
                                  {item.category}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#8C877D] group-hover:text-[#FF857A] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-xs text-[#8C877D]">
                        No matching results found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right: Theme Toggle, Notifications, Streak & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5'
                  : 'text-[#7C786E] hover:text-[#111418] hover:bg-black/5'
              }`}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#FBBF24]" /> : <Moon className="w-4 h-4 text-[#FF6B5F]" />}
            </button>

            {!isAuthPage && user && (
              <>
                {/* Streak Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono">{userStreak} Days</span>
                </div>

                {/* Notifications Button & Dropdown */}
                <div ref={notifRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNotifOpen(!isNotifOpen);
                      setIsProfileOpen(false);
                    }}
                    className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
                      isDark
                        ? 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5'
                        : 'text-[#7C786E] hover:text-[#111418] hover:bg-black/5'
                    }`}
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadNotifs > 0 && (
                      <>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF6B5F] animate-ping" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF6B5F]" />
                      </>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotifOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl p-3 z-50 text-xs animate-in fade-in zoom-in-95 ${
                        isDark ? 'bg-[#111418] border-white/10 text-[#F5F1E8]' : 'bg-white border-black/10 text-[#111418]'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
                        <span className="font-bold text-xs">Notifications</span>
                        {unreadNotifs > 0 && (
                          <button
                            onClick={handleMarkAllNotifsRead}
                            className="text-[10px] text-[#FF857A] hover:underline font-semibold cursor-pointer"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-2.5 rounded-xl border transition-all ${
                              n.unread
                                ? isDark
                                  ? 'bg-[#FF6B5F]/5 border-[#FF6B5F]/20'
                                  : 'bg-[#FF6B5F]/10 border-[#FF6B5F]/30'
                                : isDark
                                ? 'bg-white/[0.02] border-white/[0.04]'
                                : 'bg-black/[0.02] border-black/[0.04]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-bold text-xs leading-tight">{n.title}</h4>
                              <span className="text-[9px] text-[#8C877D] font-mono shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-[#8C877D] mt-1 leading-relaxed">{n.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Avatar Dropdown */}
                <div ref={profileRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsNotifOpen(false);
                    }}
                    className={`flex items-center gap-2 p-1.5 rounded-xl border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/[0.08] bg-[#111418] hover:bg-white/5'
                        : 'border-black/[0.08] bg-white hover:bg-black/5'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FF6B5F]/20 border border-[#FF6B5F]/40 flex items-center justify-center text-xs font-bold text-[#FF857A]">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                      <span className={`text-xs font-bold leading-tight ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                        {user.name || 'Learner'}
                      </span>
                      <span className="text-[10px] text-[#8C877D] font-mono truncate max-w-[110px]">
                        {user.targetRole || 'Full Stack'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 hidden sm:inline text-[#8C877D]" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl p-2 z-50 text-xs animate-in zoom-in-95 ${
                        isDark ? 'bg-[#111418] border-white/10 text-[#F5F1E8]' : 'bg-white border-black/10 text-[#111418]'
                      }`}
                    >
                      <div className="p-2.5 border-b border-white/10 mb-1">
                        <p className="font-bold truncate">{user.name || 'Learner'}</p>
                        <p className="text-[11px] text-[#8C877D] truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/profile');
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-colors cursor-pointer ${
                          isDark ? 'text-[#C7C2B6] hover:text-[#F5F1E8] hover:bg-white/5' : 'text-[#4A4740] hover:text-[#111418] hover:bg-black/5'
                        }`}
                      >
                        <User className="w-4 h-4 text-[#FF6B5F]" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/dashboard');
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-colors cursor-pointer ${
                          isDark ? 'text-[#C7C2B6] hover:text-[#F5F1E8] hover:bg-white/5' : 'text-[#4A4740] hover:text-[#111418] hover:bg-black/5'
                        }`}
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
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#F87171] hover:bg-[#F87171]/10 font-medium transition-colors cursor-pointer"
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
