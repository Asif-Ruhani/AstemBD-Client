// import React, { useState } from 'react';
// import { Link } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../Hooks/useAuth';
// import useAxiosSecure from '../Hooks/useAxiosSecure'; // 1. Import hook

// const EverydayWords = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure(); // 2. Initialize hook

//   // TanStack Query handles fetching, caching, and state management cleanly
//   const {
//     data: sections = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['sections', user?.uid],
//     queryFn: async () => {
//       // Automatically sends HttpOnly cookie and anti-CSRF header
//       const res = await axiosSecure.get('/sections');
//       return res.data;
//     },
//     // Only runs when Firebase finishes loading and a user exists
//     enabled: !loading && !!user,
//     staleTime: 1000 * 60 * 10, // Caches data for 10 mins
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-bars loading-lg text-slate-800 dark:text-white"></span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="py-20 text-center text-rose-500 font-medium">
//         Failed to load: {error.message}
//       </div>
//     );
//   }

//   const extraCategories = [
//     { name: "Hospital & Medical", icon: "🏥" },
//     { name: "Bank & Financial", icon: "🏦" },
//     { name: "Airport & Travel", icon: "✈️" },
//     { name: "Restaurant & Cafe", icon: "☕" },
//     { name: "Emergency Services", icon: "🚨" },
//     { name: "Tech & Software", icon: "💻" },
//   ];

//   const filteredSections = sections.filter((s) => {
//     const q = searchQuery.toLowerCase();
//     const titleMatch = s?.title ? s.title.toLowerCase().includes(q) : false;
//     const engTitleMatch = s?.engTitle ? s.engTitle.toLowerCase().includes(q) : false;
//     const noMatch = s?.no ? String(s.no).includes(searchQuery) : false;
//     return titleMatch || engTitleMatch || noMatch;
//   });

//   return (
//     <section className="bg-slate-50/70 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-[100px] min-h-screen">
//       <div className="max-w-7xl mx-auto">

//         {/* Section Header */}
//         <div className="text-center max-w-2xl mx-auto mb-10">
//           <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-3">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//             {sections.length > 0 ? `${sections.length}-Day Conversational Blueprint` : 'Conversational Blueprint'}
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
//             Everyday English Hub
//           </h1>
//           <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
//             Select a life scenario to master categorized verbs, nouns, adjectives, and adverbs.
//           </p>
//         </div>

//         {/* MAIN CONTENT AREA */}
//         <div className="space-y-10">

//           {/* Search and Section Stats */}
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800">
//             <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-zinc-200">
//               <span className="w-3 h-3 rounded-full bg-emerald-500" />
//               <span>{sections.length} Daily Life Scenarios Available</span>
//             </div>

//             {/* Search Bar */}
//             <div className="relative w-full sm:w-80">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search section by keyword (e.g. ঘুম, নাশতা)..."
//                 className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:border-slate-900 dark:focus:border-white"
//               />
//               <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>

//           {/* Loading / Error States for Cards */}
//           {isLoading ? (
//             <div className="py-12 text-center text-slate-400 dark:text-zinc-500">
//               Loading sections...
//             </div>
//           ) : isError ? (
//             <div className="py-12 text-center text-rose-500 font-medium">
//               {error?.message || 'Failed to load sections.'}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
//               {filteredSections.map((item, index) => (
//                 <Link
//                   key={item._id}
//                   to={`/english-vocab/everyday-Word/section/${item.sectionNumber}`}
//                   className="group bg-white dark:bg-zinc-900 rounded-xl p-4 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-slate-400 dark:hover:border-zinc-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 flex-shrink-0 flex items-center justify-center font-black text-xs border border-slate-200/80 dark:border-zinc-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors">
//                       {item.no ?? index + 1}
//                     </span>
//                     <div>
//                       <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
//                         SECTION {item.no ?? index + 1}: {item.title}
//                       </h3>
//                       <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
//                         {item.engTitle}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center justify-center flex-shrink-0">
//                     <svg
//                       className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2.5}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}

//           {/* EXTRA VOCABULARY FOR IMPORTANT AREAS */}
//           <div className="mt-14 pt-10 border-t-2 border-slate-200/80 dark:border-zinc-800">
//             <div className="flex items-center gap-2 mb-6">
//               <span className="w-2 h-2 rounded-full bg-primary" />
//               <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
//                 Extra Vocabulary for Important Areas:
//               </h2>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
//               {extraCategories.map((cat, idx) => (
//                 <button
//                   key={idx}
//                   className="p-4 rounded-xl bg-white dark:bg-zinc-900 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-primary hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2 group cursor-pointer"
//                 >
//                   <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
//                   <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors">
//                     {cat.name}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default EverydayWords;

import React, { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const EverydayWords = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const sliderRef = useRef(null);

  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Existing 30 Life Scenario Sections
  const {
    data: sections = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['sections', user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get('/sections');
      return res.data;
    },
    enabled: !loading && !!user,
    staleTime: 1000 * 60 * 10,
  });

  // 2. Newly added 30 Extra Vocabulary Sections from Backend
  const {
    data: extraSections = [],
    isLoading: isExtraLoading,
    isError: isExtraError,
  } = useQuery({
    queryKey: ['extraSections', user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get('/extra-vocab/sections');
      // Handles both { sections: [...] } and raw array responses
      return res.data?.sections || res.data || [];
    },
    enabled: !loading && !!user,
    staleTime: 1000 * 60 * 10,
  });

  console.log("extra is : ", extraSections);

  // Carousel horizontal scroll controls
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg text-slate-800 dark:text-white"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-rose-500 font-medium">
        Failed to load: {error.message}
      </div>
    );
  }

  const filteredSections = sections.filter((s) => {
    const q = searchQuery.toLowerCase();
    const titleMatch = s?.title ? s.title.toLowerCase().includes(q) : false;
    const engTitleMatch = s?.engTitle ? s.engTitle.toLowerCase().includes(q) : false;
    const noMatch = s?.no ? String(s.no).includes(searchQuery) : false;
    return titleMatch || engTitleMatch || noMatch;
  });

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-[100px] min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {sections.length > 0 ? `${sections.length}-Day Conversational Blueprint` : 'Conversational Blueprint'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Everyday English Hub
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
            Select a life scenario to master categorized verbs, nouns, adjectives, and adverbs.
          </p>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="space-y-10">

          {/* Search and Section Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-zinc-200">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>{sections.length} Daily Life Scenarios Available</span>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search section by keyword (e.g. ঘুম, নাশতা)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:border-slate-900 dark:focus:border-white"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Loading / Error States for Cards */}
          {isLoading ? (
            <div className="py-12 text-center text-slate-400 dark:text-zinc-500">
              Loading sections...
            </div>
          ) : isError ? (
            <div className="py-12 text-center text-rose-500 font-medium">
              {error?.message || 'Failed to load sections.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredSections.map((item, index) => (
                <Link
                  key={item._id}
                  to={`/english-vocab/everyday-Word/section/${item.sectionNumber}`}
                  className="group bg-white dark:bg-zinc-900 rounded-xl p-4 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-slate-400 dark:hover:border-zinc-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 flex-shrink-0 flex items-center justify-center font-black text-xs border border-slate-200/80 dark:border-zinc-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors">
                      {item.no ?? index + 1}
                    </span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                        SECTION {item.no ?? index + 1}: {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
                        {item.engTitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* EXTRA VOCABULARY FOR IMPORTANT AREAS (Dynamic Carousel) */}
          <div className="mt-14 pt-10 border-t-2 border-slate-200/80 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Extra Vocabulary for Important Areas:
                </h2>
              </div>

              {/* Carousel Left & Right Arrow Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollLeft}
                  title="Previous categories"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border-2 border-slate-200/80 dark:border-zinc-800 flex items-center justify-center text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  title="Next categories"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border-2 border-slate-200/80 dark:border-zinc-800 flex items-center justify-center text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Container */}
            {isExtraLoading ? (
              <div className="py-8 text-center text-xs font-semibold text-slate-400 dark:text-zinc-500">
                Loading vocabulary areas...
              </div>
            ) : isExtraError ? (
              <div className="py-8 text-center text-xs text-rose-500">
                Failed to load extra categories.
              </div>
            ) : (
              <div
                ref={sliderRef}
                className="flex items-stretch gap-3 overflow-x-auto scroll-smooth pb-3 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
              >
                {extraSections.map((cat) => (
                  <Link
                    key={cat._id || cat.code}
                    to={`/english-vocab/everyday-Word/extra-section/${cat.code}`}
                    className="flex-shrink-0 w-36 h-28 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-primary hover:shadow-md transition-all text-center flex flex-col justify-between items-center group cursor-pointer"
                  >
                    {/* 1. Icon */}
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {cat.logo || cat.icon || '📖'}
                    </span>

                    {/* 2. Title (uniform 2-line reserved area) */}
                    <div className="flex items-center justify-center h-8 w-full">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {cat.title || cat.name}
                      </span>
                    </div>

                    {/* 3. Section Tag */}
                    <span className="text-[12px] font-mono text-slate-700 dark:text-zinc-500">
                      Section-{cat.code}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default EverydayWords;