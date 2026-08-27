import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Lock,
  User,
  Target,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Compass,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack MERN Developer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { signup, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const suggestedRoles = [
    'Full Stack MERN',
    'Frontend Architect',
    'AI/ML Engineer',
    'DevOps Cloud',
  ];

  // Dynamic Password Strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-transparent' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-[#C94A4A]' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-[#C48A3A]' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-[#D99A8A]' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-[#3F8F68]' };
      default:
        return { score: 0, label: '', color: 'bg-transparent' };
    }
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and retry.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await signup(name, email, password, targetRole);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(res.error || 'Failed to create account. Please try again.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred during account creation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsDemo();
      setIsLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  // =========================================================================
  // LEFT OBSIDIAN BRAND & BENEFITS PANEL CONTENT
  // =========================================================================
  const signupBrandPanel = (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05A47]/15 border border-[#E05A47]/30 text-[#E05A47] text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>Launch Your Growth</span>
        </div>
        <h2 className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight leading-snug">
          Accelerate Your Career With <span className="text-[#E05A47]">Precision AI.</span>
        </h2>
        <p className="text-[#8A8F98] text-xs leading-relaxed max-w-sm">
          Join ambitious developers mastering in-demand engineering competencies with real-time gap analysis and adaptive roadmaps.
        </p>
      </div>

      {/* 4 Core Value Pillars / Benefit Cards */}
      <div className="grid grid-cols-1 gap-2.5 pt-0.5">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3 transition-colors hover:bg-white/[0.05]">
          <div className="w-8 h-8 rounded-lg bg-[#E05A47]/15 border border-[#E05A47]/25 text-[#E05A47] flex items-center justify-center shrink-0 mt-0.5">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Personalized Learning Paths</h3>
            <p className="text-[11px] text-[#8A8F98] leading-tight mt-0.5">
              Dynamic modular curriculum adapted to your goals and pace.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3 transition-colors hover:bg-white/[0.05]">
          <div className="w-8 h-8 rounded-lg bg-[#E05A47]/15 border border-[#E05A47]/25 text-[#E05A47] flex items-center justify-center shrink-0 mt-0.5">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Skill Gap Diagnosis</h3>
            <p className="text-[11px] text-[#8A8F98] leading-tight mt-0.5">
              Automated benchmarks highlighting target skill milestones.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3 transition-colors hover:bg-white/[0.05]">
          <div className="w-8 h-8 rounded-lg bg-[#E05A47]/15 border border-[#E05A47]/25 text-[#E05A47] flex items-center justify-center shrink-0 mt-0.5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Real-Time Progress Tracking</h3>
            <p className="text-[11px] text-[#8A8F98] leading-tight mt-0.5">
              Track weekly velocity and benchmark competency scores.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3 transition-colors hover:bg-white/[0.05]">
          <div className="w-8 h-8 rounded-lg bg-[#E05A47]/15 border border-[#E05A47]/25 text-[#E05A47] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Smart AI Mentorship</h3>
            <p className="text-[11px] text-[#8A8F98] leading-tight mt-0.5">
              24/7 intelligent assistance providing instant guidance and hints.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Quote / Security Badge */}
      <div className="p-3 rounded-xl bg-[#111214] border border-white/[0.08] flex items-center gap-2.5 text-xs text-white/90">
        <div className="w-6 h-6 rounded-full bg-[#3F8F68]/20 text-[#3F8F68] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <p className="text-[10.5px] text-[#8A8F98] leading-tight">
          Empowering learners across top engineering teams & universities.
        </p>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start generating your personalized AI roadmap today"
      brandPanel={signupBrandPanel}
    >
      {/* Social Sign Up 3-Button Row (Google, GitHub, Microsoft) */}
      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        <button
          type="button"
          onClick={() => handleSocialSignup('google')}
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

        <button
          type="button"
          onClick={() => handleSocialSignup('github')}
          disabled={isLoading}
          className="h-[44px] flex items-center justify-center gap-2 px-2.5 rounded-xl bg-white hover:bg-[#F6F2EA] border border-[#E6E0D7] hover:border-[#D99A8A] text-xs font-semibold text-[#202124] transition-all duration-200 shadow-xs hover:shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0 fill-[#202124]" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignup('microsoft')}
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
      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E6E0D7]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#FFFDF8] px-3 text-[#8A8F98] font-medium">Or register with email</span>
        </div>
      </div>

      {/* Error Alert Box */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 p-2.5 rounded-xl bg-[#C94A4A]/10 border border-[#C94A4A]/25 flex items-start gap-2 text-xs text-[#C94A4A]"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full h-[46px] sm:h-[48px] bg-white border border-[#E6E0D7] text-sm text-[#202124] rounded-xl pl-10 pr-3.5 transition-all duration-200 focus:outline-none focus:border-[#E05A47] focus:ring-2 focus:ring-[#E05A47]/15 placeholder:text-[#8A8F98]"
            />
          </div>
        </div>

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
              placeholder="name@example.com"
              className="w-full h-[46px] sm:h-[48px] bg-white border border-[#E6E0D7] text-sm text-[#202124] rounded-xl pl-10 pr-3.5 transition-all duration-200 focus:outline-none focus:border-[#E05A47] focus:ring-2 focus:ring-[#E05A47]/15 placeholder:text-[#8A8F98]"
            />
          </div>
        </div>

        {/* Target Career Role */}
        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">
            Target Career Role
          </label>
          <div className="relative">
            <Target className="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Full Stack MERN Developer"
              className="w-full h-[46px] sm:h-[48px] bg-white border border-[#E6E0D7] text-sm text-[#202124] rounded-xl pl-10 pr-3.5 transition-all duration-200 focus:outline-none focus:border-[#E05A47] focus:ring-2 focus:ring-[#E05A47]/15 placeholder:text-[#8A8F98]"
            />
          </div>
          {/* Quick Role Selection Pills */}
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {suggestedRoles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setTargetRole(role)}
                className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  targetRole === role
                    ? 'bg-[#E05A47]/10 border-[#E05A47] text-[#E05A47] font-semibold'
                    : 'bg-white border-[#E6E0D7] text-[#5F6368] hover:border-[#D99A8A] hover:text-[#202124]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full h-[46px] sm:h-[48px] bg-white border border-[#E6E0D7] text-sm text-[#202124] rounded-xl pl-10 pr-11 transition-all duration-200 focus:outline-none focus:border-[#E05A47] focus:ring-2 focus:ring-[#E05A47]/15 placeholder:text-[#8A8F98]"
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

          {/* Dynamic Password Strength Bar */}
          {password.length > 0 && (
            <div className="mt-1.5 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#8A8F98]">Password Strength:</span>
                <span className={`font-semibold ${
                  passwordStrength.score >= 3 ? 'text-[#3F8F68]' : passwordStrength.score === 2 ? 'text-[#C48A3A]' : 'text-[#C94A4A]'
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full rounded-full transition-all duration-300 ${
                      passwordStrength.score >= step
                        ? passwordStrength.color
                        : 'bg-[#E6E0D7]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className={`w-full h-[46px] sm:h-[48px] bg-white border text-sm text-[#202124] rounded-xl pl-10 pr-11 transition-all duration-200 focus:outline-none placeholder:text-[#8A8F98] ${
                passwordMismatch
                  ? 'border-[#C94A4A] focus:ring-2 focus:ring-[#C94A4A]/20'
                  : passwordsMatch
                  ? 'border-[#3F8F68] focus:ring-2 focus:ring-[#3F8F68]/20'
                  : 'border-[#E6E0D7] focus:border-[#E05A47] focus:ring-2 focus:ring-[#E05A47]/15'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A8F98] hover:text-[#202124] transition-colors p-1 rounded-md focus:outline-none cursor-pointer"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {/* Match validation badge */}
          {confirmPassword.length > 0 && (
            <div className="flex items-center gap-1 mt-1 text-[10.5px]">
              {passwordsMatch ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3F8F68]" />
                  <span className="text-[#3F8F68] font-medium">Passwords match</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-[#C94A4A]" />
                  <span className="text-[#C94A4A] font-medium">Passwords do not match</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Terms & Privacy Policy Checkbox */}
        <div className="pt-0.5">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-[#E6E0D7] text-[#E05A47] focus:ring-[#E05A47]/20 accent-[#E05A47] cursor-pointer shrink-0"
            />
            <span className="text-[11.5px] text-[#5F6368] leading-tight">
              I agree to the{' '}
              <a href="#" className="text-[#E05A47] hover:underline font-medium">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-[#E05A47] hover:underline font-medium">Privacy Policy</a>.
            </span>
          </label>
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[50px] sm:h-[52px] bg-[#E05A47] hover:bg-[#C94A38] text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Create Account & Launch</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Skip with Demo User Button */}
        <div>
          <button
            type="button"
            onClick={() => {
              loginAsDemo();
              navigate('/dashboard');
            }}
            className="w-full h-[44px] bg-[#FFFDF8] hover:bg-[#F6F2EA] border border-[#E05A47]/35 hover:border-[#E05A47] text-[#E05A47] font-semibold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs active:scale-[0.99] cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Skip With Demo User</span>
          </button>
        </div>
      </form>

      {/* Footer Navigation Link */}
      <p className="text-center text-xs text-[#5F6368] mt-4 pt-3.5 border-t border-[#E6E0D7]">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-[#E05A47] hover:text-[#C94A38] hover:underline font-bold transition-colors"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
