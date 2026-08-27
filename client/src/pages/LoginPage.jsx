import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Compass,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('alex.rivera@learnpath.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(res.error || 'Invalid credentials. Please verify and try again.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred during sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate(from, { replace: true });
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsDemo();
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2200);
  };

  // =========================================================================
  // LEFT OBSIDIAN BRAND PANEL CONTENT
  // =========================================================================
  const loginBrandPanel = (
    <div className="space-y-6">
      <div className="space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05A47]/15 border border-[#E05A47]/30 text-[#E05A47] text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Adaptive Career Engine</span>
        </div>
        <h2 className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight leading-snug">
          Learn Smarter.<br />
          Build Better.<br />
          <span className="text-[#E05A47]">Grow Further.</span>
        </h2>
        <p className="text-[#8A8F98] text-xs leading-relaxed max-w-sm">
          Continuous AI-guided roadmaps tailored to your career milestones. Bridge your skill gaps with high-yield modular learning.
        </p>
      </div>

      {/* Educational Visual: Compact Roadmap Milestone Card */}
      <div className="p-4 rounded-2xl bg-[#111214] border border-white/[0.08] shadow-lg space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E05A47]/20 border border-[#E05A47]/30 flex items-center justify-center text-[#E05A47]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white uppercase tracking-wider">Active Trajectory</p>
              <p className="text-[10px] text-[#8A8F98]">Full-Stack AI Engineering</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#E05A47] bg-[#E05A47]/10 px-2 py-0.5 rounded-full border border-[#E05A47]/20">
            74% Complete
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-[#E05A47] to-[#D99A8A] h-1.5 rounded-full w-[74%]" />
        </div>

        {/* Milestone Steps */}
        <div className="space-y-2 pt-0.5">
          <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/[0.03] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-white/90 text-[11px] font-medium">
              <span className="w-3.5 h-3.5 rounded-full bg-[#3F8F68]/20 text-[#3F8F68] flex items-center justify-center text-[9px]">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>Core Architecture & Patterns</span>
            </div>
            <span className="text-[10px] text-[#3F8F68] font-semibold">Mastered</span>
          </div>

          <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#E05A47]/10 border border-[#E05A47]/25">
            <div className="flex items-center gap-2 text-white text-[11px] font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E05A47] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E05A47]" />
              </span>
              <span>Advanced State & API Sync</span>
            </div>
            <span className="text-[10px] text-[#E05A47] font-semibold">In Progress</span>
          </div>

          <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/[0.02] text-white/50 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center text-[9px]">
                3
              </span>
              <span>Distributed AI Workflows</span>
            </div>
            <span className="text-[10px] text-[#8A8F98]">Upcoming</span>
          </div>
        </div>
      </div>

      {/* Trust metric stats pills */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
          <p className="text-sm font-bold text-white">94%</p>
          <p className="text-[9px] text-[#8A8F98]">Completion</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
          <p className="text-sm font-bold text-white">15k+</p>
          <p className="text-[9px] text-[#8A8F98]">Learners</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
          <p className="text-sm font-bold text-white">24/7</p>
          <p className="text-[9px] text-[#8A8F98]">AI Mentor</p>
        </div>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to resume your personalized learning journey"
      brandPanel={loginBrandPanel}
    >
      {/* Social Login 3-Button Row (Google, GitHub, Microsoft) */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
          className="h-[44px] flex items-center justify-center gap-2 px-2.5 rounded-xl bg-white hover:bg-[#F6F2EA] border border-[#E6E0D7] hover:border-[#D99A8A] text-xs font-semibold text-[#202124] transition-all duration-200 shadow-xs hover:shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z" />
            <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.2-1.9.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
          </svg>
          <span>Google</span>
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={() => handleSocialLogin('github')}
          disabled={isLoading}
          className="h-[44px] flex items-center justify-center gap-2 px-2.5 rounded-xl bg-white hover:bg-[#F6F2EA] border border-[#E6E0D7] hover:border-[#D99A8A] text-xs font-semibold text-[#202124] transition-all duration-200 shadow-xs hover:shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0 fill-[#202124]" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </button>

        {/* Microsoft */}
        <button
          type="button"
          onClick={() => handleSocialLogin('microsoft')}
          disabled={isLoading}
          className="h-[44px] flex items-center justify-center gap-2 px-2.5 rounded-xl bg-white hover:bg-[#F6F2EA] border border-[#E6E0D7] hover:border-[#D99A8A] text-xs font-semibold text-[#202124] transition-all duration-200 shadow-xs hover:shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          <span>Microsoft</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E6E0D7]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#FFFDF8] px-3 text-[#8A8F98] font-medium">Or continue with email</span>
        </div>
      </div>

      {/* Error Alert Box */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3.5 p-3 rounded-xl bg-[#C94A4A]/10 border border-[#C94A4A]/25 flex items-start gap-2.5 text-xs text-[#C94A4A]"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@learnpath.ai"
              className="w-full h-[48px] sm:h-[50px] bg-white border border-[#E6E0D7] text-sm text-[#202124] rounded-xl pl-10 pr-3.5 transition-all duration-200 focus:outline-none focus:border-[#E05A47] focus:ring-2 focus:ring-[#E05A47]/15 placeholder:text-[#8A8F98]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#202124]">
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                setForgotEmail(email);
                setShowForgotModal(true);
              }}
              className="text-xs text-[#E05A47] hover:text-[#C94A38] font-medium transition-colors hover:underline focus:outline-none cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-[48px] sm:h-[50px] bg-white border border-[#E6E0D7] text-sm text-[#202124] rounded-xl pl-10 pr-11 transition-all duration-200 focus:outline-none focus:border-[#E05A47] focus:ring-2 focus:ring-[#E05A47]/15 placeholder:text-[#8A8F98]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A8F98] hover:text-[#202124] transition-colors p-1 rounded-md focus:outline-none cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#E6E0D7] text-[#E05A47] focus:ring-[#E05A47]/20 accent-[#E05A47] cursor-pointer"
            />
            <span className="text-xs text-[#5F6368] font-medium">Remember me on this device</span>
          </label>
        </div>

        {/* Primary Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[50px] sm:h-[52px] bg-[#E05A47] hover:bg-[#C94A38] text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Instant 1-Click Demo Evaluation */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full h-[46px] bg-[#FFFDF8] hover:bg-[#F6F2EA] border border-[#E05A47]/35 hover:border-[#E05A47] text-[#E05A47] font-semibold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs active:scale-[0.99] cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Instant 1-Click Demo Login</span>
          </button>
        </div>
      </form>

      {/* Footer Navigation Link */}
      <p className="text-center text-xs text-[#5F6368] mt-5 pt-4 border-t border-[#E6E0D7]">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="text-[#E05A47] hover:text-[#C94A38] hover:underline font-bold transition-colors"
        >
          Create Account
        </Link>
      </p>

      {/* Forgot Password Modal Dialog */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFDF8] border border-[#E6E0D7] rounded-2xl shadow-xl p-6 max-w-sm w-full space-y-4 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E05A47]/15 text-[#E05A47] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#202124]">Reset Password</h3>
                </div>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="text-xs text-[#8A8F98] hover:text-[#202124] p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-[#5F6368] leading-relaxed">
                Enter your email address and we will send recovery instructions.
              </p>

              {forgotSent ? (
                <div className="p-3 rounded-xl bg-[#3F8F68]/10 border border-[#3F8F68]/25 text-xs text-[#3F8F68] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Reset instructions sent! Closing modal...</span>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@learnpath.ai"
                    className="w-full h-[44px] bg-white border border-[#E6E0D7] text-xs text-[#202124] rounded-xl px-3 focus:outline-none focus:border-[#E05A47] focus:ring-1 focus:ring-[#E05A47]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="w-1/2 h-[38px] rounded-xl bg-[#FFFDF8] hover:bg-[#F6F2EA] border border-[#E6E0D7] text-xs font-semibold text-[#202124] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 h-[38px] rounded-xl bg-[#E05A47] hover:bg-[#C94A38] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Send Link
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
