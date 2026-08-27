import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, BookOpen, Target, TrendingUp, Map, BarChart2, Lightbulb } from 'lucide-react';

/* ── inline SVG logo identical to the screenshot ── */
function LearnPathLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#6366F1" />
        <path d="M8 10h6l4 6-4 6H8l4-6-4-6z" fill="white" opacity="0.9" />
        <path d="M16 10h8l-4 6 4 6h-8l4-6-4-6z" fill="white" opacity="0.6" />
      </svg>
      <span className="font-bold text-lg tracking-tight text-slate-800">
        LearnPath <span className="text-indigo-600">AI</span>
      </span>
    </div>
  );
}

/* ── Social Icons ── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

export default function AuthPage({ defaultIsLogin = true }) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, signup, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Update state if navigated with a different route
  useEffect(() => {
    setIsLogin(defaultIsLogin);
    // Reset forms on toggle
    // Reset forms and errors on toggle
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
  }, [defaultIsLogin]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    navigate(isLogin ? '/signup' : '/login', { replace: true, state: { from } });
  };

  const validateForm = () => {
    setErrorMsg('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }

    if (!isLogin) {
      // Password must be at least 8 characters, contain at least 1 letter and 1 number
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrorMsg("Password must be at least 8 characters long and contain both letters and numbers.");
        return false;
      }

      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return false;
      }

      if (!agreedToTerms) {
        setErrorMsg("Please agree to the Terms of Service and Privacy Policy.");
        return false;
      }
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    navigate(from, { replace: true });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await signup(name, email, password, "Learner"); 
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider) => {
    alert(`Redirecting to ${provider} authentication...`);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address first to reset your password.");
    } else {
      alert(`Password reset instructions have been sent to ${email}`);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500" 
      style={{ backgroundColor: isLogin ? '#F0F2FF' : '#F4FBF9' }}
    >
      
      {/* Background blobs for Signup Mode */}
      {!isLogin && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-50/60 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        </div>
      )}

      {/* ── Top Navbar ── */}
      <header className="flex items-center justify-between px-8 py-4 relative z-10">
        <LearnPathLogo />
        <p className="text-sm text-slate-500 flex items-center">
          {isLogin ? 'New here? ' : 'Already have an account? '}
          <button 
            onClick={toggleAuthMode}
            className={`font-semibold ml-2 px-4 py-2 rounded-lg border shadow-sm transition hover:shadow ${
              isLogin 
                ? 'text-indigo-600 border-transparent hover:bg-indigo-50 bg-transparent' 
                : 'text-indigo-600 border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </header>

      {/* ── Main 2-column body ── */}
      <main className="flex flex-1 items-stretch justify-center px-4 py-6 gap-8 max-w-6xl mx-auto w-full relative z-10 transition-all duration-500">
        
        {/* ── LEFT PANEL ── */}
        {isLogin ? (
          /* Login Left Panel (Purple Gradient) */
          <div
            className="hidden lg:flex flex-col justify-between flex-1 rounded-3xl p-10 min-h-[560px] relative overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500"
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 60%, #A78BFA 100%)',
            }}
          >
            {/* Decorative circles */}
            <div className="absolute top-6 right-8 w-24 h-24 rounded-full border border-white/20" />
            <div className="absolute top-10 right-12 w-14 h-14 rounded-full border border-white/15" />
            <div className="absolute bottom-20 left-6 w-16 h-16 rounded-full border border-white/20" />

            {/* Heading */}
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white leading-tight">Your Journey.</h1>
              <h1 className="text-4xl font-bold leading-tight" style={{ color: '#FCD34D' }}>Your Path.</h1>
              <h1 className="text-4xl font-bold text-white leading-tight mb-4">Your Future.</h1>
              <p className="text-indigo-100 text-sm leading-relaxed max-w-xs">
                AI-powered personalized learning paths to help you learn smarter and achieve your goals faster.
              </p>
            </div>

            {/* Floating icon cards */}
            <div className="absolute top-32 right-10 flex flex-col gap-3 z-10">
              <div className="bg-white/90 rounded-2xl p-3 shadow-lg">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="bg-white/90 rounded-2xl p-3 shadow-lg">
                <Target className="w-6 h-6 text-amber-500" />
              </div>
              <div className="bg-white/90 rounded-2xl p-3 shadow-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>

            {/* Illustration */}
            <div className="relative z-10 flex justify-center mt-6">
              <svg width="200" height="170" viewBox="0 0 200 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Person sitting illustration */}
                <rect x="30" y="130" width="100" height="12" rx="3" fill="#4338CA" opacity="0.8" />
                <rect x="25" y="118" width="110" height="14" rx="3" fill="#6366F1" opacity="0.9" />
                <rect x="20" y="106" width="120" height="14" rx="3" fill="#818CF8" />
                <rect x="55" y="85" width="90" height="55" rx="6" fill="#E0E7FF" />
                <rect x="60" y="90" width="80" height="45" rx="3" fill="#C7D2FE" />
                <rect x="50" y="138" width="100" height="6" rx="3" fill="#A5B4FC" />
                <rect x="65" y="95" width="70" height="35" rx="2" fill="#6366F1" opacity="0.2" />
                <rect x="70" y="100" width="50" height="5" rx="2" fill="#6366F1" opacity="0.5" />
                <rect x="70" y="110" width="35" height="4" rx="2" fill="#6366F1" opacity="0.4" />
                <rect x="70" y="119" width="45" height="4" rx="2" fill="#6366F1" opacity="0.3" />
                <ellipse cx="100" cy="90" rx="22" ry="18" fill="#7C3AED" />
                <circle cx="100" cy="62" r="18" fill="#FDE68A" />
                <ellipse cx="100" cy="50" rx="18" ry="10" fill="#1F2937" />
                <path d="M78 88 Q68 100 72 110" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M122 88 Q132 100 128 110" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M88 106 Q82 125 75 130" stroke="#4B5563" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M112 106 Q118 125 125 130" stroke="#4B5563" strokeWidth="8" strokeLinecap="round" fill="none" />
                <ellipse cx="70" cy="133" rx="10" ry="5" fill="#1F2937" />
                <ellipse cx="128" cy="133" rx="10" ry="5" fill="#1F2937" />
                <rect x="20" y="115" width="6" height="25" rx="3" fill="#059669" />
                <ellipse cx="23" cy="108" rx="12" ry="10" fill="#10B981" />
                <ellipse cx="15" cy="114" rx="8" ry="7" fill="#059669" />
                <ellipse cx="31" cy="114" rx="8" ry="7" fill="#059669" />
              </svg>
            </div>
          </div>
        ) : (
          /* Signup Left Panel (White Glassmorphism with Mint touches) */
          <div className="hidden lg:flex flex-col flex-1 bg-white/40 rounded-3xl p-10 relative overflow-hidden backdrop-blur-sm border border-white/50 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-slate-800 leading-tight">Learn Smarter.</h1>
              <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: '#059669' }}>Achieve Bigger.</h1>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm mb-10">
                Join thousands of learners who are building in-demand skills with personalized learning paths.
              </p>

              <div className="space-y-4 max-w-md">
                <div className="flex items-start gap-4 p-3 bg-white/60 rounded-2xl border border-slate-100">
                  <div className="p-2.5 bg-green-100 text-green-600 rounded-xl"><Map className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Personalized Paths</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Custom roadmap tailored to your goals and skill level.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/60 rounded-2xl border border-slate-100">
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl"><Target className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Skill Gap Analysis</h4>
                    <p className="text-xs text-slate-500 mt-0.5">AI identifies gaps and suggests the right resources.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/60 rounded-2xl border border-slate-100">
                  <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl"><BarChart2 className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Track Progress</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Visualize your progress and stay motivated.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/60 rounded-2xl border border-slate-100">
                  <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl"><Lightbulb className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Smart Recommendations</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Get course, project & resource suggestions that fit you.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="absolute -bottom-4 right-0 left-0 flex justify-center pointer-events-none opacity-90">
              <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Woman sitting illustration */}
                  <path d="M50 280 Q70 200 40 180 Q80 210 50 280" fill="#0D9488" />
                  <path d="M50 280 Q30 220 10 210 Q60 240 50 280" fill="#14B8A6" />
                  <path d="M50 280 Q80 230 110 220 Q80 260 50 280" fill="#0F766E" />
                  <path d="M350 280 Q330 150 280 130 Q360 200 350 280" fill="#93C5FD" />
                  <path d="M350 280 Q380 180 400 170 Q370 230 350 280" fill="#BFDBFE" />
                  <path d="M350 280 Q290 190 260 200 Q330 250 350 280" fill="#60A5FA" />
                  <rect x="120" y="270" width="60" height="10" rx="2" fill="#E2E8F0" />
                  <rect x="125" y="260" width="50" height="10" rx="2" fill="#F87171" />
                  <rect x="115" y="250" width="70" height="10" rx="2" fill="#38BDF8" />
                  <rect x="120" y="240" width="60" height="10" rx="2" fill="#34D399" />
                  <rect x="135" y="215" width="20" height="25" fill="#F1F5F9" />
                  <rect x="130" y="210" width="30" height="5" fill="#94A3B8" />
                  <rect x="135" y="235" width="20" height="10" fill="#D97706" />
                  <path d="M180 260 Q150 270 155 285 Q170 290 210 275" fill="#1E3A8A" />
                  <path d="M210 275 Q250 290 265 285 Q270 270 240 260" fill="#1E40AF" />
                  <path d="M180 230 L240 230 L230 260 L190 260 Z" fill="#FBBF24" />
                  <rect x="195" y="235" width="50" height="35" rx="3" fill="#E2E8F0" />
                  <circle cx="220" cy="252" r="4" fill="#CBD5E1" />
                  <path d="M190 235 Q175 250 195 260" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <path d="M230 235 Q245 250 225 260" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <path d="M195 260 Q200 265 205 260" stroke="#FCD34D" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <path d="M225 260 Q220 265 215 260" stroke="#FCD34D" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <circle cx="210" cy="210" r="15" fill="#FCD34D" />
                  <path d="M195 210 Q190 185 215 190 Q235 185 230 220 Q225 240 215 245 Q190 240 195 210 Z" fill="#1F2937" />
                  <circle cx="205" cy="208" r="1.5" fill="#111827" />
                  <circle cx="215" cy="208" r="1.5" fill="#111827" />
                  <path d="M207 215 Q210 218 213 215" stroke="#111827" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>
        )}

        {/* ── RIGHT PANEL — Form Card ── */}
        <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="text-slate-500 text-sm mb-7">
            {isLogin ? 'Login to continue your learning journey' : 'Start your personalized learning journey'}
          </p>

          <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit} className="space-y-4">
            
            {/* Error Message Display */}
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {errorMsg}
              </div>
            )}

            {/* Full Name (Signup Only) */}
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border border-slate-200 text-sm text-slate-700 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition placeholder:text-slate-400 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Email (Both) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  className="w-full border border-slate-200 text-sm text-slate-700 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Password (Both) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  className="w-full border border-slate-200 text-sm text-slate-700 rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition placeholder:text-slate-400 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!isLogin && <p className="text-xs text-slate-400 mt-1.5">Min. 8 characters with letters and numbers</p>}
            </div>

            {/* Confirm Password (Signup Only) */}
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full border border-slate-200 text-sm text-slate-700 rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition placeholder:text-slate-400 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button 
                  type="button"
                  onClick={handleForgotPassword} 
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Terms (Signup Only) */}
            {!isLogin && (
              <div className="flex items-start gap-2.5 pt-1 pb-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer select-none">
                  I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all"
              style={{ 
                background: isLogin ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' : '#10B981',
                boxShadow: isLogin ? '0 4px 14px 0 rgba(99, 102, 241, 0.39)' : '0 4px 14px 0 rgba(16, 185, 129, 0.39)'
              }}
            >
              {isLoading 
                ? (isLogin ? 'Logging in…' : 'Creating account…') 
                : (isLogin ? 'Log in' : 'Sign up')}
            </button>
            
            {/* Demo Login Button */}
            <button
              type="button"
              onClick={async () => {
                setIsLoading(true);
                await loginAsDemo();
                setIsLoading(false);
                navigate('/dashboard');
              }}
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all mt-2"
              style={{ 
                background: 'linear-gradient(135deg, #334155 0%, #0F172A 100%)',
                boxShadow: '0 4px 14px 0 rgba(15, 23, 42, 0.39)'
              }}
            >
              1-Click Demo Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-slate-400">or continue with</span>
            </div>
          </div>

          {/* Social buttons */}
          {isLogin ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <button 
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center gap-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                <GoogleIcon /> Continue with Google
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('Microsoft')}
                className="w-full flex items-center justify-center gap-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                <MicrosoftIcon /> Continue with Microsoft
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <button 
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex-1 flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                <GoogleIcon />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('Microsoft')}
                className="flex-1 flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                <MicrosoftIcon />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="flex-1 flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-800 transition"
              >
                <GithubIcon />
              </button>
            </div>
          )}

          {/* Extra login terms (from original design) */}
          {isLogin && (
            <p className="text-center text-xs text-slate-400 mt-5 animate-in fade-in">
              By continuing, you agree to our{' '}
              <a href="#" className="text-indigo-500 hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-indigo-500 hover:underline">Privacy Policy</a>.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
