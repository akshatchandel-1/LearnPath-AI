import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, Target, TrendingUp, ShieldCheck, ArrowRight, Bot } from 'lucide-react';

export default function AuthPage({ defaultIsLogin = true }) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [targetRole, setTargetRole] = useState('Full Stack MERN Developer');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, signup, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    setIsLogin(defaultIsLogin);
    setErrorMsg('');
  }, [defaultIsLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (isLogin) {
      const res = await login(email, password);
      setIsLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.error || 'Invalid email or password');
      }
    } else {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match');
        setIsLoading(false);
        return;
      }
      const res = await signup(name, email, password, targetRole);
      setIsLoading(false);
      if (res.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setErrorMsg(res.error || 'Registration failed');
      }
    }
  };

  const handleDemoSignIn = async () => {
    setErrorMsg('');
    setIsLoading(true);
    const res = await loginAsDemo();
    setIsLoading(false);
    if (res.success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F5F1E8] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B5F]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center shadow-xl shadow-[#FF6B5F]/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tight text-[#F5F1E8]">
            LearnPath <span className="text-[#FF6B5F]">AI</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-[#F5F1E8] tracking-tight">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <p className="text-xs text-[#C7C2B6] mt-1 font-medium">
          {isLogin
            ? 'Sign in to continue your personalized AI learning journey'
            : 'Join LearnPath AI to calibrate your engineering competencies'}
        </p>
      </div>

      {/* Auth Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-[#111418] border border-white/10 rounded-[28px] p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#16191E] border border-white/[0.06] text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setErrorMsg('');
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                isLogin
                  ? 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white shadow-xs'
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
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                !isLogin
                  ? 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white shadow-xs'
                  : 'text-[#8C877D] hover:text-[#F5F1E8]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-[#F87171]/15 border border-[#F87171]/30 rounded-xl text-xs text-[#F87171] font-medium animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#C7C2B6] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Akshat Singh"
                      className="w-full bg-[#16191E] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F5F1E8] placeholder:text-[#8C877D] focus:outline-none focus:border-[#FF6B5F]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#C7C2B6] mb-1">
                    Target Role / Objective
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-[#16191E] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                  >
                    <option value="Full Stack MERN Developer" className="bg-[#111418]">Full Stack MERN Developer</option>
                    <option value="AI / ML Engineer" className="bg-[#111418]">AI / ML Engineer</option>
                    <option value="Backend Microservices Engineer" className="bg-[#111418]">Backend Microservices Engineer</option>
                    <option value="Frontend Architecture Specialist" className="bg-[#111418]">Frontend Architecture Specialist</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-[#C7C2B6] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#16191E] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F5F1E8] placeholder:text-[#8C877D] focus:outline-none focus:border-[#FF6B5F]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#C7C2B6] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#16191E] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#F5F1E8] placeholder:text-[#8C877D] focus:outline-none focus:border-[#FF6B5F]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C877D] hover:text-[#F5F1E8]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#16191E] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F5F1E8] placeholder:text-[#8C877D] focus:outline-none focus:border-[#FF6B5F]"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] text-white shadow-xl shadow-[#FF6B5F]/25 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : isLogin ? (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Button */}
          <div className="pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-[#F5F1E8] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B5F]" />
              <span>Instant 1-Click Demo Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
