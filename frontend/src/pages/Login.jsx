import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-stretch">
      <div className="mx-auto w-full max-w-6xl flex flex-col md:flex-row items-stretch">
        {/* Left marketing panel */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-700 to-emerald-900 px-10 py-12 text-slate-50 flex-col justify-between rounded-r-none rounded-2xl md:rounded-2xl md:mr-4">
          <div>
            <div className="flex items-center gap-2 mb-10">
              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-sm font-bold">ET</span>
              </div>
              <span className="text-lg font-semibold">Expense Tracker</span>
            </div>
            <blockquote className="space-y-4 max-w-md">
              <p className="text-2xl font-semibold leading-snug">
                &quot;This app has completely transformed how I manage my expenses. It&apos;s
                intuitive, fast, and beautiful.&quot;
              </p>
              <p className="text-sm text-emerald-100">Sofia Davis, Founder at TechStart</p>
            </blockquote>
          </div>
          <p className="mt-8 text-[11px] text-emerald-100/80">
            © {new Date().getFullYear()} Expense Tracker Inc. All rights reserved.
          </p>
        </div>

        {/* Right login panel */}
        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md border border-slate-800 rounded-2xl bg-slate-900/80 p-8 shadow-xl">
            <h1 className="text-2xl font-semibold mb-1 text-center">Sign in</h1>
            <p className="text-sm text-slate-400 mb-6 text-center">
              Enter your email and password to access your account.
            </p>
            {error && (
              <div className="mb-3 text-sm text-red-400 border border-red-500/60 bg-red-950/30 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm text-slate-200">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm text-slate-200">Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-sm font-semibold text-white"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-400 text-center">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-emerald-400 hover:text-emerald-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

