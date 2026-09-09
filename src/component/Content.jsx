

// import React from 'react';
// import { Link } from 'react-router';

// const Content = () => {
//   const cards = [
//     {
//       id: 1,
//       category: "Language Track",
//       title: "English Vocabulary",
//       desc: "Master high-frequency vocabulary through retention drills, contextual usage, and active recall tests.",
//       badge: "Self-Paced",
//       path: "/englishVocub",
//       color: "emerald",
//       borderTop: "from-emerald-500 to-teal-400",
//       accentBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
//       btnHover: "hover:bg-emerald-600 hover:border-emerald-600",
//       icon: (
//         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//         </svg>
//       ),
//       features: ["3,000+ Smart Flashcards", "Daily Retention Quizzes", "Contextual Sentences"],
//     },
//     {
//       id: 2,
//       category: "Board Exam",
//       title: "SSC (2026-2027)",
//       desc: "Complete textbook coverage with structured weekly model tests, chapter-wise notes, and live question banks.",
//       badge: "Batch 2026-27",
//       path: "/ssc",
//       color: "blue",
//       borderTop: "from-blue-500 to-cyan-400",
//       accentBg: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
//       btnHover: "hover:bg-blue-600 hover:border-blue-600",
//       icon: (
//         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         </svg>
//       ),
//       features: ["Full Syllabus Breakdown", "100+ Model Test Series", "Chapter-wise PDF Notes"],
//     },
//     {
//       id: 3,
//       category: "Higher Secondary",
//       title: "HSC (2026-2027)",
//       desc: "Concept-first live masterclasses, board standard problem-solving sessions, and dedicated CQ/MCQ strategies.",
//       badge: "Target Board + Uni",
//       path: "/hsc",
//       color: "indigo",
//       borderTop: "from-indigo-500 to-purple-400",
//       accentBg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
//       btnHover: "hover:bg-indigo-600 hover:border-indigo-600",
//       icon: (
//         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//         </svg>
//       ),
//       features: ["Specialized CQ/MCQ Prep", "Weekly Doubt Clearing", "Solved Past Papers"],
//     },
//     {
//       id: 4,
//       category: "Global Pathway",
//       title: "Study Abroad",
//       desc: "Complete admissions roadmap: university shortlisting, SOP & essay reviews, scholarship guidance, and visa mocks.",
//       badge: "Mentorship",
//       path: "/studyAbroad",
//       color: "amber",
//       borderTop: "from-amber-500 to-orange-400",
//       accentBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
//       btnHover: "hover:bg-amber-600 hover:border-amber-600",
//       icon: (
//         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       features: ["1-on-1 Profile Assessment", "SOP & LOR Refinement", "Visa Interview Prep"],
//     },
//   ];

//   return (
//     <section className="bg-slate-50/70 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Section Header */}
//         <div className="text-center max-w-2xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-4">
//             <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
//             Curriculum Catalog
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
//             Explore Learning Tracks
//           </h2>
//           <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
//             Standardized academic curriculums and preparation programs built for top results.
//           </p>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               className="relative flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.14)] hover:border-slate-300 dark:hover:border-zinc-700 hover:-translate-y-1.5 transition-all duration-200 overflow-hidden"
//             >
//               {/* Colored Top Banner Line */}
//               <div className={`h-1.5 w-full bg-gradient-to-r ${card.borderTop}`} />

//               <div className="p-6 flex flex-col flex-1">
//                 {/* Header Row: Icon & Status Badge */}
//                 <div className="flex items-center justify-between mb-5">
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${card.accentBg} shadow-sm ring-1 ring-black/5`}>
//                     {card.icon}
//                   </div>
//                   <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700">
//                     {card.badge}
//                   </span>
//                 </div>

//                 {/* Subtitle & Title */}
//                 <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
//                   {card.category}
//                 </span>
//                 <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
//                   {card.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
//                   {card.desc}
//                 </p>

//                 {/* Checkmark Feature List */}
//                 <div className="mt-auto space-y-2.5 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
//                   {card.features.map((feature, idx) => (
//                     <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-zinc-300">
//                       <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span>{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Action Button */}
//               <div className="p-6 pt-0">
//                 <Link
//                   to={card.path}
//                   className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 ${card.btnHover} hover:text-white transition-colors duration-150 flex items-center justify-center gap-2 shadow-sm`}
//                 >
//                   <span>Enroll & Explore</span>
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Content;


import React from 'react';
import { Link } from 'react-router';

const Content = () => {
  const cards = [
    {
      id: 1,
      category: "Language Track",
      title: "English Vocabulary",
      desc: "Master high-frequency vocabulary through retention drills, contextual usage, and active recall tests.",
      badge: "Self-Paced",
      path: "/english-vocab",
      color: "emerald",
      borderTop: "from-emerald-500 to-teal-400",
      accentBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
      btnHover: "hover:bg-emerald-600 hover:border-emerald-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: ["3,000+ Smart Flashcards", "Daily Retention Quizzes", "Contextual Sentences"],
    },
    {
      id: 2,
      category: "Board Exam",
      title: "SSC (2026-2027)",
      desc: "Complete textbook coverage with structured weekly model tests, chapter-wise notes, and live question banks.",
      badge: "Batch 2026-27",
      path: "/ssc",
      color: "blue",
      borderTop: "from-blue-500 to-cyan-400",
      accentBg: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
      btnHover: "hover:bg-blue-600 hover:border-blue-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: ["Full Syllabus Breakdown", "100+ Model Test Series", "Chapter-wise PDF Notes"],
    },
    {
      id: 3,
      category: "Higher Secondary",
      title: "HSC (2026-2027)",
      desc: "Concept-first live masterclasses, board standard problem-solving sessions, and dedicated CQ/MCQ strategies.",
      badge: "Target Board + Uni",
      path: "/hsc",
      color: "indigo",
      borderTop: "from-indigo-500 to-purple-400",
      accentBg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
      btnHover: "hover:bg-indigo-600 hover:border-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      features: ["Specialized CQ/MCQ Prep", "Weekly Doubt Clearing", "Solved Past Papers"],
    },
    {
      id: 4,
      category: "Global Pathway",
      title: "Study Abroad",
      desc: "Complete admissions roadmap: university shortlisting, SOP & essay reviews, scholarship guidance, and visa mocks.",
      badge: "Mentorship",
      path: "/study-abroad",
      color: "amber",
      borderTop: "from-amber-500 to-orange-400",
      accentBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
      btnHover: "hover:bg-amber-600 hover:border-amber-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ["1-on-1 Profile Assessment", "SOP & LOR Refinement", "Visa Interview Prep"],
    },
  ];

  return (
    <section id="all-programs" className="bg-slate-50/70 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Curriculum Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore Learning Tracks
          </h2>
          <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Standardized academic curriculums and preparation programs built for top results.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.14)] hover:border-slate-300 dark:hover:border-zinc-700 hover:-translate-y-1.5 transition-all duration-200 overflow-hidden"
            >
              {/* Colored Top Banner Line */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${card.borderTop}`} />

              <div className="p-6 flex flex-col flex-1">
                {/* Header Row: Icon & Status Badge */}
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
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* Checkmark Feature List */}
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
              <div className="p-6 pt-0">
                <Link
                  to={card.path}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 ${card.btnHover} hover:text-white transition-colors duration-150 flex items-center justify-center gap-2 shadow-sm`}
                >
                  <span>Enroll & Explore</span>
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

export default Content;