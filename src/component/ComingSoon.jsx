import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const ComingSoon = ({
  title = "Interactive Module Coming Soon",
  subtitle = "We are currently curating verified question banks, video masterclasses, and interactive quizzes for this track.",
  expectedRelease = "Q4 2026",
  progressPercent = 75,
  badgeText = "Under Active Development",
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const milestones = [
    { title: "Curriculum Architecture", status: "Completed", completed: true },
    { title: "Video Masterclasses & Notes", status: "Completed", completed: true },
    { title: "Interactive MCQ & CQ Engine", status: "In Progress", current: true },
    { title: "Final Board Standardization", status: "Upcoming", completed: false },
  ];

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50/70 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-[100px]">
      <div className="max-w-4xl w-full">
        
        {/* Main Card */}
        <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Top Decorative Gradient Accent */}
          <div className="h-2 w-full bg-gradient-to-r from-teal-500 via-primary to-indigo-500" />

          <div className="p-8 sm:p-12 lg:p-14">
            
            {/* Top Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>{badgeText}</span>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                Target Launch: {expectedRelease}
              </span>
            </div>

            {/* Main Headline & Subtitle */}
            <div className="max-w-2xl mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                {title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                {subtitle}
              </p>
            </div>

            {/* Development Progress Bar */}
            <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-200/80 dark:border-zinc-700/80 mb-10">
              <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-bold">
                <span className="text-slate-800 dark:text-zinc-200 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Module Readiness
                </span>
                <span className="text-primary font-black">{progressPercent}%</span>
              </div>

              {/* Progress Track */}
              <div className="h-3 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-primary rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Development Milestones */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-200/60 dark:border-zinc-700/60">
                {milestones.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {m.completed ? (
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : m.current ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-zinc-600" />
                      )}
                      <span className={m.completed ? "text-slate-900 dark:text-white" : m.current ? "text-primary" : "text-slate-400 dark:text-zinc-500"}>
                        Step {idx + 1}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400 line-clamp-1">
                      {m.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notify Me Form & CTA */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-2 border-t border-slate-100 dark:border-zinc-800">
              
              {/* Early Access Subscription Form */}
              <div className="w-full lg:w-auto flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200 mb-2">
                  Get notified when this launches
                </h4>

                {isSubscribed ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thank you! We will notify you on launch day.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your student email..."
                      className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  ← Go Back
                </button>
                <Link
                  to="/"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all shadow-sm"
                >
                  Home Dashboard
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ComingSoon;