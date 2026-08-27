import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Target } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(name, email, password, targetRole);
    setIsLoading(false);
    navigate('/dashboard', { replace: true });
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-6">
        {/* Title & Subtitle */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-xs text-slate-500 mt-1">
            Start your AI-powered personalized learning path
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200">
          <Link
            to="/login"
            className="flex-1 py-2.5 text-center text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            Login
          </Link>
          <button
            type="button"
            className="flex-1 py-2.5 text-center text-sm font-bold text-purple-600 border-b-2 border-purple-600 transition-colors"
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Kritika Gupta"
                className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kritika.gupta@example.com"
                className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Target Engineering Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Role
            </label>
            <div className="relative">
              <Target className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="AI / ML Engineer">AI / ML Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-xl py-3 shadow-md shadow-purple-600/25 active:scale-[0.99] transition-all"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
