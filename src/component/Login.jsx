import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
  const { userSignIn, userLoginWithGoole, resetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    userSignIn(data.email, data.password)
      .then((result) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully Logged in",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Email or Password incorrect",
        });
      });
  };

  const handleGoogleLogin = () => {
    userLoginWithGoole()
      .then((result) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully Logged in",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
      })
  };


  const handleForgotPassword = async () => {
    // Validate the email field specifically
    const isEmailValid = await trigger('email');

    if (!isEmailValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter a valid email address first to reset your password.',
      });
      return;
    }

    const email = getValues('email');
    // console.log('Sending password reset email to:', email);
    resetPassword(email)
      .then(() => {
        Swal.fire("Check your email", "Password reset link has been sent!", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100/60 dark:bg-zinc-950 p-4 sm:p-6 lg:p-10">
      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

        {/* Left Side: Brand Showcase Panel (5 Columns) */}
        <aside className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 text-white overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white text-slate-900 font-black text-xl shadow-lg">
                E
              </div>
              <span className="text-xl font-bold tracking-tight">EduPlatform</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-black tracking-tight leading-tight mb-4">
              Welcome back to your study hub.
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pick up right where you left off. Continue your lessons, review error logs, and track test performance.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-2xl font-black text-white">12,000+</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Active Questions</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-2xl font-black text-emerald-400">98.4%</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Target Exam Pass Rate</p>
              </div>
            </div>
          </div>

          {/* Secure Login Badge */}
          <div className="relative z-10 flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">End-to-End Encrypted</p>
              <p className="text-[11px] text-slate-400">Your session & academic records are safe</p>
            </div>
          </div>
        </aside>

        {/* Right Side: Login Form (7 Columns) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-700/60 transition shadow-sm active:scale-[0.99]"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Visual Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-3 text-slate-400 font-semibold tracking-wider">
                  or login with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address containing @ and domain',
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 transition ${errors.email
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-500 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    className={`w-full pl-10 pr-12 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 transition ${errors.password
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-rose-500 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center pt-1">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register('rememberMe')}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2.5 text-xs text-slate-600 dark:text-zinc-400 cursor-pointer select-none">
                  Remember this device for 30 days
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-100 transition shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Sign In to Dashboard</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {/* Bottom Prompt */}
            <p className="text-center mt-6 text-xs text-slate-600 dark:text-zinc-400">
              Don't have an account?{' '}
              <Link to="/registration" className="font-bold text-slate-900 dark:text-white hover:underline">
                Create an account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Login;