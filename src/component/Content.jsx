import React from 'react';
import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  LuBookOpen,
  LuGlobe,
  LuCode,
  LuFlaskConical,
  LuAward,
  LuLayers,
  LuGraduationCap,
  LuLock,
  LuLockOpen
} from 'react-icons/lu';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useAuth from '../Hooks/useAuth';

// Helper to render crisp icons based on MongoDB data
const renderCardIcon = (iconVal) => {
  if (!iconVal) return <LuGraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;

  if (typeof iconVal === 'string' && /\p{Extended_Pictographic}/u.test(iconVal)) {
    return <span className="text-2xl">{iconVal}</span>;
  }

  const iconMap = {
    'book-open': LuBookOpen,
    'globe': LuGlobe,
    'code': LuCode,
    'flask-conical': LuFlaskConical,
    'award': LuAward,
    'layers': LuLayers,
  };

  const ResolvedIcon = iconMap[iconVal] || LuGraduationCap;
  return <ResolvedIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
};

const Content = () => {
  const axiosPublic = useAxiosPublic();
  const { authStatus, hasAccess, hasBundleAccess } = useAuth();
  const { category: routeCategory } = useParams();

  // Active Category resolution
  const activeCategory = routeCategory || 'overall-courses';
  // console.groupCollapsed(`%c[Content.jsx] 🔍 Route Diagnostic: ${activeCategory}`, 'color: #38bdf8; font-weight: bold;');
  // console.log('useParams() raw value:', { routeCategory });
  // console.log('Resolved activeCategory:', activeCategory);
  // console.groupEnd();

  const {
    data: cards = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['courses', activeCategory],
    queryFn: async () => {
      const targetEndpoint = `/courses/${activeCategory}`;
      // console.log(`%c[Content.jsx] 📡 GET Request dispatched to: ${targetEndpoint}`, 'color: #eab308;');

      const res = await axiosPublic.get(targetEndpoint);
      const data = res.data;

      // console.groupCollapsed(`%c[Content.jsx] 📦 API Response for [${activeCategory}]`, 'color: #22c55e; font-weight: bold;');
      // console.log('HTTP Status:', res.status);
      // console.log('Raw Payload:', data);

      const parsedArray = data?.sections || data?.courses || data?.data || (Array.isArray(data) ? data : []);
      // console.log('Resolved Array Count:', parsedArray.length);
      // console.log('Resolved Items:', parsedArray);

      if (parsedArray.length === 0) {
        // console.warn(`⚠️ [Content.jsx] Response returned 0 items. Check whether database category matches '${activeCategory}'.`);
      }
      console.groupEnd();

      return parsedArray;
    },
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    // console.log('%c[Content.jsx] ⏳ Loading state active...', 'color: #94a3b8;');
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50/50 dark:bg-[#090D16]">
        <span className="loading loading-bars loading-lg text-slate-800 dark:text-white"></span>
      </div>
    );
  }

  if (isError) {
    console.error(`%c[Content.jsx] ❌ Query Failed for [${activeCategory}]:`, 'color: #ef4444; font-weight: bold;', error);
    return (
      <div className="py-24 text-center text-rose-500 font-medium">
        Failed to load: {error.message}
      </div>
    );
  }

  return (
    <section id="all-programs" className="relative bg-slate-50/50 dark:bg-[#090D16] py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-80 bg-gradient-to-tr from-sky-400/10 via-indigo-500/10 to-emerald-400/10 dark:from-sky-500/5 dark:via-indigo-500/5 dark:to-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/80 dark:bg-zinc-900/80 text-slate-800 dark:text-zinc-200 border border-slate-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-md mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse" />
            Curriculum Catalog ({cards.length} Loaded)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Explore Learning Tracks
          </h2>
          <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Standardized academic curriculums and preparation programs built for top results.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const courseIdentifier = card.courseId || card.id || card._id;
            const isFree = Number(card.price || 0) === 0;

            const hasBundle = typeof hasBundleAccess === 'function' && hasBundleAccess(activeCategory);
            const isUnlocked =
              isFree ||
              authStatus === 'admin' ||
              (typeof hasAccess === 'function' && hasAccess(courseIdentifier)) ||
              hasBundle;

            // Pure dynamic route calculation strictly from DB document data
            const targetCourseRoute =
              card.routePath ||
              (card.category && card.slug
                ? `/courses/${card.category}/${card.slug}`
                : `/courses/${activeCategory}/${card.slug || courseIdentifier}`);

            // if (index === 0 || index === cards.length - 1) {
            //   console.log(`%c[Content.jsx] 🔗 Rendered Card Route: "${card.title}"`, 'color: #a855f7;', {
            //     title: card.title,
            //     dbRoutePath: card.routePath,
            //     dbCategory: card.category,
            //     dbSlug: card.slug,
            //     resolvedRoute: targetCourseRoute,
            //     isUnlocked
            //   });
            // }

            return (
              <div
                key={courseIdentifier}
                className={`group relative flex flex-col justify-between bg-white dark:bg-[#0E131F] rounded-3xl border shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 transition-all duration-300 ease-out overflow-hidden ${isUnlocked
                    ? 'border-slate-200/90 dark:border-zinc-800/80 hover:border-emerald-400 dark:hover:border-emerald-600/80'
                    : 'border-slate-200/90 dark:border-zinc-800/80 hover:border-indigo-400 dark:hover:border-indigo-600/80'
                  }`}
              >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 dark:from-indigo-400/10 dark:to-emerald-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-50/70 dark:bg-zinc-800/80 border border-indigo-100/80 dark:border-zinc-700/60 shadow-inner group-hover:scale-110 group-hover:shadow-md transition-all duration-300 ease-out">
                      {renderCardIcon(card.icon, card.category)}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isUnlocked ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                          <LuLockOpen className="w-3 h-3" />
                          {isFree ? 'Free Access' : 'Enrolled'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                          <LuLock className="w-3 h-3" />
                          {card.badge || 'Preview Open'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                      {card.track || card.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                    {card.desc || card.description}
                  </p>

                  <div className="mt-auto space-y-2.5 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                    {card.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="leading-snug truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 sm:p-7 pt-0 relative z-10">
                  <Link
                    to={targetCourseRoute}
                    className={`group/btn relative w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer ${isUnlocked
                        ? 'text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500'
                        : 'text-white bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white'
                      }`}
                  >
                    <span className="relative z-10 transition-transform duration-200 group-hover/btn:-translate-x-0.5">
                      {isUnlocked ? 'Enter Course' : 'View Course & Preview'}
                    </span>
                    <svg
                      className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Content;