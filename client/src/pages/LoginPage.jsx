import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { Card } from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('alex.rivera@learnpath.ai');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    navigate(from, { replace: true });
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate(from, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to resume your personalized learning journey"
    >
      <Card variant="default">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@learnpath.ai"
                className="w-full bg-slate-900/90 border border-slate-800 text-sm text-slate-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                Password
              </label>
              <a href="#" className="text-xs text-primary-400 hover:text-primary-300">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/90 border border-slate-800 text-sm text-slate-100 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Sign In
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-card px-2 text-text-subtle">Or for quick evaluation</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="md"
            className="w-full border-primary/40 text-primary-300 hover:bg-primary/10"
            onClick={handleDemoLogin}
            icon={Sparkles}
          >
            Instant 1-Click Demo Login
          </Button>
        </form>

        <p className="text-center text-xs text-text-muted mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-semibold">
            Create Account
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
