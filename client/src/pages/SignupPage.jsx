import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { Card } from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Target, ArrowRight, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack MERN Developer');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(name, email, password, targetRole);
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start generating your personalized AI roadmap today"
    >
      <Card variant="default">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full bg-slate-900/90 border border-slate-800 text-sm text-slate-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

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
                placeholder="name@example.com"
                className="w-full bg-slate-900/90 border border-slate-800 text-sm text-slate-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Target Career Role
            </label>
            <div className="relative">
              <Target className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Full Stack MERN Developer"
                className="w-full bg-slate-900/90 border border-slate-800 text-sm text-slate-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full bg-slate-900/90 border border-slate-800 text-sm text-slate-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Create Account & Launch
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            className="w-full border-primary/40 text-primary-300 hover:bg-primary/10"
            onClick={() => {
              loginAsDemo();
              navigate('/dashboard');
            }}
            icon={Sparkles}
          >
            Skip With Demo User
          </Button>
        </form>

        <p className="text-center text-xs text-text-muted mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold">
            Sign In
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
