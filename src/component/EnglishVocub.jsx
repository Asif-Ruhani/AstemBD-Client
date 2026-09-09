import React from 'react';
import { Link } from 'react-router';

const EnglishVocub = () => {
  const cards = [
    {
      id: 1,
      category: "Fluency & Daily Use",
      title: "Everyday Conversational English",
      desc: "Essential collocations, idioms, and natural expressions used in daily workplace and casual conversations.",
      badge: "Beginner",
      path: "/english-vocab/everyday-word",
      borderTop: "from-teal-500 to-emerald-400",
      accentBg: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300",
      btnHover: "hover:bg-teal-600 hover:border-teal-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      features: ["Common Phrasal Verbs", "Daily Speaking Prompts", "Audio Pronunciation"],
    },
    {
      id: 2,
      category: "IELTS 6.5 / GRE Core",
      title: "Essential Academic Vocabulary",
      desc: "High-frequency word lists and contextual usage required to secure foundational scores in IELTS, TOEFL, and GRE.",
      badge: "Easy - Mid",
      path: "/english-vocab/everyday-word",
      borderTop: "from-sky-500 to-blue-400",
      accentBg: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
      btnHover: "hover:bg-sky-600 hover:border-sky-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: ["800+ Core Words", "Root Words & Mnemonics", "Contextual Flashcards"],
    },
    {
      id: 3,
      category: "IELTS 7.5+ / GRE High-Yield",
      title: "Hard High-Yield Vocabulary",
      desc: "Nuanced, high-difficulty academic words designed to elevate Reading and Writing band scores significantly.",
      badge: "Hard",
      path: "/english-vocab/everyday-word",
      borderTop: "from-indigo-500 to-violet-400",
      accentBg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
      btnHover: "hover:bg-indigo-600 hover:border-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ["Band 8.0+ Lexical Sets", "Tone & Connotation Traps", "Active Recall Drills"],
    },
    {
      id: 4,
      category: "GRE 325+ / IELTS 8.5+",
      title: "Advanced Elite Vocabulary",
      desc: "Sophisticated GRE verbal words, rare connotations, and master-level synonyms for top-percentile test takers.",
      badge: "Mastery",
      path: "/english-vocab/everyday-word",
      borderTop: "from-rose-500 to-pink-400",
      accentBg: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
      btnHover: "hover:bg-rose-600 hover:border-rose-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      features: ["Dense GRE Verbal Prep", "Complex Text Comprehension", "Speed Recall Drills"],
    },
    {
      id: 5,
      category: "BCS, Bank & University",
      title: "Admission & Job Exam Vocabulary",
      desc: "Curated question-bank vocabulary specifically for University Admissions (DU, IBA), BCS, and Bank Officer exams.",
      badge: "Govt / Bank",
      path: "/english-vocab/everyday-word",
      borderTop: "from-amber-500 to-yellow-400",
      accentBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
      btnHover: "hover:bg-amber-600 hover:border-amber-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      features: ["Past 15 Years Question Bank", "Synonym & Antonym Focus", "MCQ Model Tests"],
    },
    {
      id: 6,
      category: "Grammar & Structure",
      title: "Sentence Anatomy & Syntax",
      desc: "Deconstruct complex sentences, clause structures, modifiers, and inversion rules to write accurately in tests.",
      badge: "Writing & Syntax",
      path: "/english-vocab/everyday-word",
      borderTop: "from-cyan-500 to-emerald-400",
      accentBg: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",
      btnHover: "hover:bg-cyan-600 hover:border-cyan-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: ["Clause & Modifier Analysis", "Complex Sentence Building", "Common Structural Errors"],
    },
  ];

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Lexical Mastery Modules
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Targeted English Vocabulary Tracks
          </h2>
          <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select your target exam or proficiency level to access structured flashcards, model tests, and syntax breakdowns.
          </p>
        </div>

        {/* Responsive 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2.5">
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

              {/* Action Link Button */}
              <div className="p-6 pt-0">
                <Link
                  to={card.path}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 ${card.btnHover} hover:text-white transition-colors duration-150 flex items-center justify-center gap-2 shadow-sm`}
                >
                  <span>Start Practice</span>
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

export default EnglishVocub;