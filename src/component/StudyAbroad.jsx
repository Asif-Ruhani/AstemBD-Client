import React from 'react';
import { Link } from 'react-router';


const StudyAbroad = () => {
  const cards = [
    {
      id: 1,
      category: "English Proficiency",
      title: "IELTS Preparation",
      desc: "Comprehensive 4-module mastery (Listening, Reading, Writing, Speaking) targeting Band 7.5+ with personalized mock evaluations.",
      badge: "Global Standard",
      path: "/ssc/general-math",
      borderTop: "from-rose-500 to-red-400",
      accentBg: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
      btnHover: "hover:bg-rose-600 hover:border-rose-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ["Academic & General Training", "Writing Task 1 & 2 Templates", "1-on-1 Speaking Interviews"],
    },
    {
      id: 2,
      category: "Graduate Admissions",
      title: "GRE General Test",
      desc: "Rigorous Verbal Reasoning strategies, high-yield Quant problem sets, and Analytical Writing masterclasses aimed at 320+ scores.",
      badge: "Target 320+",
      path: "/ssc/general-math",
      borderTop: "from-amber-500 to-orange-400",
      accentBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
      btnHover: "hover:bg-amber-600 hover:border-amber-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ["Advanced Verbal Text Completion", "Quant Shortcut Algorithms", "Full-Length Adaptive Tests"],
    },
  ];

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Global Higher Education
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Standardized Test Pathways
          </h2>
          <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Targeted preparation tracks engineered for global university admissions, competitive scholarship eligibility, and visa requirements.
          </p>
        </div>

        {/* 2-Card Centered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.14)] hover:border-slate-300 dark:hover:border-zinc-700 hover:-translate-y-1.5 transition-all duration-200 overflow-hidden"
            >
              {/* Top Gradient Stripe */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${card.borderTop}`} />

              <div className="p-6 sm:p-8 flex flex-col flex-1">
                {/* Header: Icon & Category Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${card.accentBg} shadow-sm ring-1 ring-black/5`}>
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700">
                    {card.badge}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
                  {card.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* Feature Checkmarks */}
                <div className="mt-auto space-y-2.5 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-zinc-300">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-8 pt-0">
                <Link
                  to={card.path}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 ${card.btnHover} hover:text-white transition-colors duration-150 flex items-center justify-center gap-2 shadow-sm`}
                >
                  <span>Start Test Preparation</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyAbroad;