import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const Registration = () => {
  const { userRegistration, userLoginWithGoole } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      targetExam: 'SSC (2026-2027)',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });

  // Watch password field to compute live strength meter and validate match
  const watchedPassword = watch('password', '');

  const evaluatePassword = (pass = '') => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passwordStrength = evaluatePassword(watchedPassword);

  const onSubmit = (data) => {
    userRegistration(data.email, data.confirmPassword)
      .then((result) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignup = () => {
    userLoginWithGoole()
      .then((result) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const getStrengthBar = () => {
    switch (passwordStrength) {
      case 1:
        return { width: 'w-1/4', color: 'bg-rose-500', label: 'Weak' };
      case 2:
        return { width: 'w-2/4', color: 'bg-amber-500', label: 'Fair' };
      case 3:
        return { width: 'w-3/4', color: 'bg-blue-500', label: 'Good' };
      case 4:
        return { width: 'w-full', color: 'bg-emerald-500', label: 'Strong' };
      default:
        return { width: 'w-0', color: 'bg-slate-200 dark:bg-zinc-700', label: '' };
    }
  };

  const strength = getStrengthBar();

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100/60 dark:bg-zinc-950 p-4 sm:p-6 lg:p-10">
      {/* Outer Card Container */}
      <div className="w-full max-w-6xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">

        {/* Left Side: Brand Value Showcase (5 Columns) */}
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
              Master your exams with focused learning.
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Access curated question banks, personalized mock tests, and real-time performance analytics crafted for your success.
            </p>

            {/* Feature List */}
            <ul className="mt-8 space-y-4">
              {['Smart adaptive diagnostic tests', 'Comprehensive subject roadmaps', 'Direct mentor question resolution'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial Snippet */}
          <div className="relative z-10 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs italic text-slate-300 leading-relaxed">
              "The targeted prep track helped me improve my diagnostic score by 28% within 6 weeks."
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs">
                AK
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Anisul Karim</p>
                <p className="text-[10px] text-slate-400">SSC Candidate, Top 1% Rank</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: Registration Form (7 Columns) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-xl w-full mx-auto">

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Create your student account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                Get started with your free personalized study dashboard.
              </p>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-700/60 transition shadow-sm active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-3 text-slate-400 font-semibold tracking-wider">
                  or register with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

              {/* Row 1: Full Name & Primary Track */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register('fullName', {
                      required: 'Full name is required',
                      minLength: { value: 3, message: 'Name must be at least 3 characters' },
                      pattern: {
                        value: /^[a-zA-Z\s.'-]+$/,
                        message: 'Name cannot contain numbers or special symbols'
                      }
                    })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 transition ${errors.fullName
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                      }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                    Primary Study Track
                  </label>
                  <select
                    {...register('targetExam', { required: 'Please select an exam track' })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition cursor-pointer"
                  >
                    <option value="SSC (2026-2027)">SSC Science (2026-2027)</option>
                    <option value="HSC (2026-2027)">HSC Science (2026-2027)</option>
                    <option value="English Vocabulary">English Vocabulary & Syntax</option>
                    <option value="IELTS / GRE">Study Abroad (IELTS / GRE)</option>
                    <option value="Job / Admission">University & Job Prep</option>
                  </select>
                  {errors.targetExam && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.targetExam.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Please enter a valid email address containing @ and domain'
                    }
                  })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 transition ${errors.email
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                    }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-500 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Row 3: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                      Password
                    </label>
                    {watchedPassword && (
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{strength.label}</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Must be at least 8 characters' },
                        validate: {
                          hasUppercase: (v) => /[A-Z]/.test(v) || 'Must contain at least one uppercase letter',
                          hasLowercase: (v) => /[a-z]/.test(v) || 'Must contain at least one lowercase letter',
                          hasNumber: (v) => /[0-9]/.test(v) || 'Must contain at least one number',
                          hasSpecial: (v) => /[^A-Za-z0-9]/.test(v) || 'Must contain at least one special character'
                        }
                      })}
                      className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 transition ${errors.password
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {/* Strength Bar */}
                  {watchedPassword && (
                    <div className="h-1 w-full bg-slate-200 dark:bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                    </div>
                  )}
                  {errors.password && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (val) => val === watchedPassword || 'Passwords do not match'
                      })}
                      className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 transition ${errors.confirmPassword
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div>
                <div className="flex items-start pt-1">
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    {...register('agreeTerms', {
                      required: 'You must accept the terms & conditions'
                    })}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="ml-2.5 text-xs text-slate-600 dark:text-zinc-400 cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="font-semibold text-slate-900 dark:text-white hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-semibold text-slate-900 dark:text-white hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="mt-1 text-xs text-rose-500 font-medium">
                    {errors.agreeTerms.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-100 transition shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Create Account</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {/* Bottom Footer */}
            <p className="text-center mt-6 text-xs text-slate-600 dark:text-zinc-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-slate-900 dark:text-white hover:underline">
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Registration;