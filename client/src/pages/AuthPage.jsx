import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CAREER_OBJECTIVES } from '../data/careerObjectives';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Target
} from 'lucide-react';

export default function AuthPage({ defaultIsLogin = true }) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetRole, setTargetRole] = useState(CAREER_OBJECTIVES[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, signup, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    setIsLogin(defaultIsLogin);
    setErrorMsg('');
    setPassword('');
    setConfirmPassword('');
  }, [defaultIsLogin]);

  const validateForm = () => {
    setErrorMsg('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return false;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return false;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const res = await login(email, password);
        if (res?.success) {
          navigate(from, { replace: true });
        } else {
          setErrorMsg(res?.error || 'Failed to sign in. Please check credentials.');
        }
      } else {
        const res = await signup(name || 'Learner', email, password, targetRole);
        if (res?.success) {
          navigate('/dashboard', { replace: true });
        } else {
          setErrorMsg(res?.error || 'Failed to create account.');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B0D0F] dark:bg-[#0B0D0F] text-[#F5F1E8] p-4 relative overflow-hidden selection:bg-[#FF6B5F] selection:text-white">
      {/* Ambient Coral Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B5F]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3 group cursor-default">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center shadow-xl shadow-[#FF6B5F]/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tight text-[#F5F1E8]">
              LearnPath <span className="text-[#FF6B5F]">AI</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#F5F1E8]">
            {isLogin ? 'Welcome Back' : 'Launch Your Career Path'}
          </h1>
          <p className="text-xs sm:text-sm text-[#8C877D] mt-1">
            {isLogin ? 'Sign in to continue your personalized learning roadmap' : 'Create your learner profile and get an adaptive curriculum'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#111418] border border-white/[0.08] rounded-[24px] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Tabs Switcher */}
          <div className="flex bg-[#0E1114] p-1 rounded-xl border border-white/[0.06] mb-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setErrorMsg('');
                navigate('/login', { replace: true });
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isLogin
                  ? 'bg-[#FF6B5F] text-white shadow-md shadow-[#FF6B5F]/20'
                  : 'text-[#8C877D] hover:text-[#F5F1E8]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setErrorMsg('');
                navigate('/signup', { replace: true });
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !isLogin
                  ? 'bg-[#FF6B5F] text-white shadow-md shadow-[#FF6B5F]/20'
                  : 'text-[#8C877D] hover:text-[#F5F1E8]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-[#F87171]/10 border border-[#F87171]/30 text-xs text-[#F87171] font-semibold animate-in fade-in">
              {errorMsg}
            </div>
          )}

          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 placeholder:text-[#8C877D] transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#C7C2B6] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 placeholder:text-[#8C877D] transition-all"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1.5 uppercase tracking-wider">
                  Target Career Objective
                </label>
                <div className="relative">
                  <Target className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 transition-all cursor-pointer"
                  >
                    {CAREER_OBJECTIVES.map((obj) => (
                      <option key={obj} value={obj} className="bg-[#111418] text-[#F5F1E8]">
                        {obj}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#C7C2B6] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
                  className="w-full bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 placeholder:text-[#8C877D] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C877D] hover:text-[#F5F1E8] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1.5 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 placeholder:text-[#8C877D] transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C877D] hover:text-[#F5F1E8] cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white text-sm font-bold shadow-lg shadow-[#FF6B5F]/25 transition-all mt-4 active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-[#8C877D] mt-6">
          LearnPath AI — Personalized Learning Path & Competency Recommender
        </p>
      </div>
    </div>
  );
}

