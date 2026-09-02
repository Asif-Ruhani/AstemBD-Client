import React from 'react';
import { Link } from 'react-router';

const HSC = () => {
  const cards = [
    {
      id: 1,
      category: "1st & 2nd Paper",
      title: "Physics",
      desc: "Master Newtonian mechanics, thermodynamics, wave optics, electromagnetism, and modern physics with board CQ & admission shortcuts.",
      badge: "Science Core",
      path: "/ssc/general-math",
      borderTop: "from-indigo-500 to-violet-400",
      accentBg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
      btnHover: "hover:bg-indigo-600 hover:border-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ["Vector & Calculus Derivations", "Board CQ Problem Framework", "BUET / Medical MCQ Hacks"],
    },
    {
      id: 2,
      category: "1st & 2nd Paper",
      title: "Chemistry",
      desc: "Complete conceptual mastery across qualitative chemistry, periodic properties, chemical changes, and comprehensive organic reaction mechanisms.",
      badge: "Science Core",
      path: "/ssc/general-math",
      borderTop: "from-emerald-500 to-teal-400",
      accentBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
      btnHover: "hover:bg-emerald-600 hover:border-emerald-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      features: ["Organic Reaction Roadmaps", "Quantitative Stoichiometry", "Standard CQ Solving Methods"],
    },
    {
      id: 3,
      category: "Botany & Zoology",
      title: "Biology",
      desc: "In-depth breakdown of cell genetics, plant physiology, animal classification, human physiology, and biotechnology with exact diagram mastery.",
      badge: "Pre-Med Focus",
      path: "/ssc/general-math",
      borderTop: "from-rose-500 to-pink-400",
      accentBg: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
      btnHover: "hover:bg-rose-600 hover:border-rose-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      features: ["Anatomy Diagram Blueprints", "High-Yield Medical Info Bank", "Chapter-wise Theory Summary"],
    },
    {
      id: 4,
      category: "1st & 2nd Paper",
      title: "Higher Mathematics",
      desc: "Rigorous step-by-step prep covering matrices, straight lines, calculus (differentiation & integration), conic sections, and mechanics.",
      badge: "Engineering Track",
      path: "/ssc/general-math",
      borderTop: "from-amber-500 to-orange-400",
      accentBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
      btnHover: "hover:bg-amber-600 hover:border-amber-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      features: ["Calculus Mastery Series", "Engineering Admission Shortcuts", "100% Board CQ Coverage"],
    },
  ];

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            HSC Academic Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            HSC Science Track Modules
          </h2>
          <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Targeted preparation for board examinations and competitive university admission tests with structured concept sheets and CQ banks.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.14)] hover:border-slate-300 dark:hover:border-zinc-700 hover:-translate-y-1.5 transition-all duration-200 overflow-hidden"
            >
              {/* Top Gradient Stripe */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${card.borderTop}`} />

              <div className="p-6 flex flex-col flex-1">
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
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2.5">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* Subject Bullet Highlights */}
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

              {/* Card Action Link */}
              <div className="p-6 pt-0">
                <Link
                  to={card.path}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 ${card.btnHover} hover:text-white transition-colors duration-150 flex items-center justify-center gap-2 shadow-sm`}
                >
                  <span>Explore HSC Track</span>
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

export default HSC;