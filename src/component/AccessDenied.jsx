import React from 'react';
import { useNavigate, Link } from 'react-router';

const AccessDenied = ({ 
  title = "Access Denied", 
  message = "You don't have the required administrative permissions to access this page. If you believe this is an error, contact platform support." 
}) => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-slate-50/60 dark:bg-zinc-950 p-4 sm:p-6 lg:p-10">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-2xl p-8 sm:p-12 text-center overflow-hidden">
        
        {/* Soft background ambient blur */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-rose-500/10 dark:bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Shield / Lock Badge Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner">
              <svg 
                className="w-10 h-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={1.75}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 9v3.75m0 3.75h.007v.008H12v-.008zM12 3c-4.97 0-9 1.5-9 5.5v5.25c0 5.25 7.5 7.75 9 8.25 1.5-.5 9-3 9-8.25V8.5C21 4.5 16.97 3 12 3z" 
                />
              </svg>
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
            </span>
          </div>

          {/* Status Code & Headings */}
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900/50 mb-3">
            Error 403 • Forbidden
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed max-w-sm">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            
            {/* Go Back */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-700/60 transition shadow-sm active:scale-[0.99]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Go Back</span>
            </button>

            {/* Back to Home */}
            <Link
              to="/"
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-100 transition shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home Page</span>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AccessDenied;