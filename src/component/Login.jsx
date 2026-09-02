import React, { useState } from 'react';
import { Link } from 'react-router';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    console.log('Login credentials:', formData);
    // Integrate authentication API logic here
  };

  const handleGoogleLogin = () => {
    console.log('Initiating Google OAuth Flow...');
    // Integrate Google OAuth / Firebase / Supabase sign-in here
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50/70 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Main Card Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden">
          
          {/* Top Decorative Gradient Stripe */}
          <div className="h-2 w-full bg-gradient-to-r from-teal-500 via-primary to-indigo-500" />

          <div className="p-8 sm:p-10">
            {/* Header / Brand Emblem */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-2xl shadow-md mb-4 ring-4 ring-slate-100 dark:ring-zinc-800">
                E
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1.5">
                Enter your credentials to access your student dashboard
              </p>
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-700/60 hover:border-slate-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm active:scale-[0.99]"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Visual Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-3 text-slate-400 dark:text-zinc-500 font-bold tracking-wider">
                  Or login with email
                </span>
              </div>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl border-2 border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center pt-1">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-slate-900 dark:text-white rounded border-slate-300 dark:border-zinc-700 focus:ring-slate-900 cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400 cursor-pointer"
                >
                  Remember this device for 30 days
                </label>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
                >
                  <span>Sign In to Account</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Bottom Register Prompt */}
            <div className="text-center mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-bold text-slate-900 dark:text-white hover:text-primary underline underline-offset-4 decoration-2"
                >
                  Create an account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Login;