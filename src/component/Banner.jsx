// import React from 'react';
// import { Link } from 'react-router';

// const Banner = () => {
//   return (
//     <section className="relative overflow-hidden bg-slate-50/70 dark:bg-zinc-950 py-16 sm:py-24 border-b border-slate-200/80 dark:border-zinc-800">
      
//       {/* Ambient background glow dots */}
//       <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-primary/10 to-indigo-500/10 blur-3xl pointer-events-none" />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-[100px]">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
//           {/* LEFT COLUMN: Main Value Proposition (7 Cols on Desktop) */}
//           <div className="lg:col-span-7 text-center lg:text-left">
            
//             {/* Pill Announcement */}
//             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 shadow-sm mb-6">
//               <span className="flex h-2 w-2 relative">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//               </span>
//               <span>2026-2027 Batches Now Live</span>
//             </div>

//             {/* Main Headline */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
//               Master Academics, <br className="hidden sm:inline" />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-primary to-indigo-600 dark:from-teal-400 dark:via-primary dark:to-indigo-400">
//                 Ace Exams & Study Abroad.
//               </span>
//             </h1>

//             {/* Sub-headline */}
//             <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
//               Structured courses for <strong className="font-semibold text-slate-900 dark:text-white">SSC & HSC Science</strong>, 
//               high-frequency <strong className="font-semibold text-slate-900 dark:text-white">English Vocabulary</strong>, and test-prep masterclasses for <strong className="font-semibold text-slate-900 dark:text-white">IELTS & GRE</strong>.
//             </p>

//             {/* Action Buttons */}
//             <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
//               <Link
//                 to="/ssc"
//                 className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 dark:shadow-none active:scale-[0.99]"
//               >
//                 <span>Explore All Programs</span>
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </Link>
              
//               <Link
//                 to="/englishVocub"
//                 className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border-2 border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
//               >
//                 <span>Free Vocabulary Drill</span>
//               </Link>
//             </div>

//             {/* Micro Stats & Proof */}
//             <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-zinc-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
//               <div>
//                 <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">50k+</p>
//                 <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Enrolled</p>
//               </div>
//               <div className="border-x border-slate-200 dark:border-zinc-800 px-2">
//                 <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">98.4%</p>
//                 <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Target GPA/Band</p>
//               </div>
//               <div>
//                 <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100%</p>
//                 <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Updated Syllabus</p>
//               </div>
//             </div>

//           </div>

//           {/* RIGHT COLUMN: Interactive Card Mockup / Visual Widget (5 Cols on Desktop) */}
//           <div className="lg:col-span-5 relative">
            
//             {/* Main Interactive Student Card */}
//             <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-slate-200/90 dark:border-zinc-800 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] p-6 sm:p-7 overflow-hidden">
              
//               {/* Card Top Strip */}
//               <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-primary to-indigo-500 absolute top-0 left-0" />

//               {/* Mock Header */}
//               <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100 dark:border-zinc-800">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black">
//                     E
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Learning Hub</h3>
//                     <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">● Live Sessions Ongoing</span>
//                   </div>
//                 </div>
//                 <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700">
//                   Batch 2026-27
//                 </span>
//               </div>

//               {/* Learning Track List Mini-Widgets */}
//               <div className="space-y-3">
                
//                 {/* Track 1: English Vocab */}
//                 <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/60 flex items-center justify-between hover:border-slate-300 transition-colors">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
//                       EV
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-slate-900 dark:text-white">Everyday Conversational Vocab</p>
//                       <p className="text-[11px] text-slate-500 dark:text-zinc-400">Mastered 140/200 words</p>
//                     </div>
//                   </div>
//                   <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400">70%</span>
//                 </div>

//                 {/* Track 2: HSC Physics */}
//                 <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/60 flex items-center justify-between hover:border-slate-300 transition-colors">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
//                       PH
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-slate-900 dark:text-white">HSC Physics (Mechanics CQ)</p>
//                       <p className="text-[11px] text-slate-500 dark:text-zinc-400">12 Solved Model Tests</p>
//                     </div>
//                   </div>
//                   <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">85%</span>
//                 </div>

//                 {/* Track 3: IELTS / Study Abroad */}
//                 <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/60 flex items-center justify-between hover:border-slate-300 transition-colors">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300 flex items-center justify-center font-bold text-xs">
//                       IE
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-slate-900 dark:text-white">IELTS Academic Writing Task 2</p>
//                       <p className="text-[11px] text-slate-500 dark:text-zinc-400">Band 7.5 Target Blueprint</p>
//                     </div>
//                   </div>
//                   <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">Active</span>
//                 </div>

//               </div>

//               {/* Bottom Quick Test Prompt inside Widget */}
//               <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
//                 <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">Daily Diagnostic Available</span>
//                 <Link
//                   to="/englishVocub"
//                   className="text-xs font-bold text-slate-900 dark:text-white hover:text-primary transition-colors flex items-center gap-1"
//                 >
//                   <span>Quick Test</span>
//                   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>
//               </div>

//             </div>

//             {/* Floating Achievement Badge */}
//             <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-2xl p-3.5 shadow-xl items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-xs font-black text-slate-900 dark:text-white">Board & Global Certified</p>
//                 <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">100% Updated 2026-27</p>
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;


import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
  const handleScrollToPrograms = () => {
    const target = document.getElementById('all-programs');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-zinc-950 py-16 sm:py-24 border-b border-slate-200/80 dark:border-zinc-800">
      
      {/* Ambient background glow dots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-primary/10 to-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Main Value Proposition (7 Cols on Desktop) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 shadow-sm mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>2026-2027 Batches Now Live</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Master Academics, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-primary to-indigo-600 dark:from-teal-400 dark:via-primary dark:to-indigo-400">
                Ace Exams & Study Abroad.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Structured courses for <strong className="font-semibold text-slate-900 dark:text-white">SSC & HSC Science</strong>, 
              high-frequency <strong className="font-semibold text-slate-900 dark:text-white">English Vocabulary</strong>, and test-prep masterclasses for <strong className="font-semibold text-slate-900 dark:text-white">IELTS & GRE</strong>.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={handleScrollToPrograms}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 dark:shadow-none active:scale-[0.99] cursor-pointer"
              >
                <span>Explore All Programs</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              <Link
                to="/englishVocub"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border-2 border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Free Vocabulary Drill</span>
              </Link>
            </div>

            {/* Micro Stats & Proof */}
            <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-zinc-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">50k+</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Enrolled</p>
              </div>
              <div className="border-x border-slate-200 dark:border-zinc-800 px-2">
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">98.4%</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Target GPA/Band</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100%</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Updated Syllabus</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Card Mockup / Visual Widget (5 Cols on Desktop) */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Student Card */}
            <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-slate-200/90 dark:border-zinc-800 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] p-6 sm:p-7 overflow-hidden">
              
              {/* Card Top Strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-primary to-indigo-500 absolute top-0 left-0" />

              {/* Mock Header */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black">
                    E
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Learning Hub</h3>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">● Live Sessions Ongoing</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700">
                  Batch 2026-27
                </span>
              </div>

              {/* Learning Track List Mini-Widgets */}
              <div className="space-y-3">
                
                {/* Track 1: English Vocab */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/60 flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                      EV
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Everyday Conversational Vocab</p>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400">Mastered 140/200 words</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400">70%</span>
                </div>

                {/* Track 2: HSC Physics */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/60 flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                      PH
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">HSC Physics (Mechanics CQ)</p>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400">12 Solved Model Tests</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">85%</span>
                </div>

                {/* Track 3: IELTS / Study Abroad */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/60 flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300 flex items-center justify-center font-bold text-xs">
                      IE
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">IELTS Academic Writing Task 2</p>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400">Band 7.5 Target Blueprint</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">Active</span>
                </div>

              </div>

              {/* Bottom Quick Test Prompt inside Widget */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">Daily Diagnostic Available</span>
                <Link
                  to="/englishVocub"
                  className="text-xs font-bold text-slate-900 dark:text-white hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>Quick Test</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

            </div>

            {/* Floating Achievement Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-2xl p-3.5 shadow-xl items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white">Board & Global Certified</p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">100% Updated 2026-27</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;