import React, { useRef, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { LuLock, LuSparkles } from 'react-icons/lu';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const EverydayWords = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const { user, loading, authStatus, hasAccess, hasBundleAccess } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Robust enrollment check: Bundle category OR specific child course ID
  const isEnrolled = useMemo(() => {
    // 1. Admin bypass
    if (authStatus === 'admin' || user?.role === 'admin' || user?.isAdmin) {
      return true;
    }

    // 2. Bundle access by category key
    if (typeof hasBundleAccess === 'function' && hasBundleAccess('basic-eng-vocab')) {
      return true;
    }

    // 3. Single course direct ID access (CRS_BEV_CONV_01 or slug variants)
    if (typeof hasAccess === 'function') {
      if (
        hasAccess('CRS_BEV_CONV_01') ||
        hasAccess('basic-eng-vocab')
      ) {
        return true;
      }
    }

    // 4. Fallback check directly in user arrays
    const accessList = [
      ...(Array.isArray(user?.purchasedCourses) ? user.purchasedCourses : [])
    ];

    return accessList.some((item) => {
      const id = typeof item === 'string' ? item : item?.courseId || item?.id;
      const cat = item?.category;
      return (
        cat === 'basic-eng-vocab' ||
        id === 'CRS_BEV_CONV_01' ||
        id === 'basic-eng-vocab'
        // id === 'everyday-word' ||
        // id === 'everyday-words'
      );
    });
  }, [authStatus, user, hasAccess, hasBundleAccess]);

  // 1. 30 Life Scenario Sections
  const {
    data: sections = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['sections'],
    queryFn: async () => {
      const res = await axiosSecure.get('/sections');
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  // 2. Extra Vocabulary Sections
  const {
    data: extraSections = [],
    isLoading: isExtraLoading,
    isError: isExtraError,
    error: extraError,
  } = useQuery({
    queryKey: ['extraSections'],
    queryFn: async () => {
      const res = await axiosSecure.get('/extra-vocab-sections');
      return res.data?.sections || res.data || [];
    },
    staleTime: 1000 * 60 * 10,
  });

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

  const handleLockedClick = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { selectedCourseId: 'basic-eng-vocab' } });
  };

  if (loading || isLoading || isExtraLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg text-slate-800 dark:text-white"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-rose-500 font-medium">
        Failed to load sections: {error?.message || 'Something went wrong.'}
      </div>
    );
  }

  if (isExtraError) {
    return (
      <div className="py-20 text-center text-rose-500 font-medium">
        Failed to load extra vocabulary: {extraError?.message || 'Something went wrong.'}
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
        <div className="space-y-6">

          {/* TOP BANNER: Unlock All Sections */}
          {!isEnrolled && (
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 dark:bg-zinc-900 text-white p-5 sm:p-6 border border-slate-800 dark:border-zinc-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <LuSparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Full Blueprint Access
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Unlock All 30 Daily Life Scenarios
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-zinc-400 max-w-xl">
                  Section 1 is free for preview. Enroll now to unlock all 30 conversational blueprint sections and complete vocabulary sets.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/payment', { state: { selectedCourseId: 'basic-eng-vocab' } })}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex-shrink-0"
              >
                Unlock All Sections
              </button>
            </div>
          )}

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

          {/* 30 Scenario Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredSections.map((item, index) => {
              const isItemUnlocked = index === 0 || isEnrolled;

              return (
                <Link
                  key={item._id || index}
                  to={
                    isItemUnlocked
                      ? `/courses/basic-eng-vocab/everyday-word/section/${item.sectionNumber ?? index + 1}`
                      : '#'
                  }
                  onClick={!isItemUnlocked ? handleLockedClick : undefined}
                  className={`group rounded-xl p-4 border-2 shadow-sm transition-all duration-200 flex items-center justify-between gap-3 ${isItemUnlocked
                      ? 'bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                      : 'bg-slate-100/70 dark:bg-zinc-900/40 border-dashed border-slate-300 dark:border-zinc-800 opacity-80 hover:opacity-100 hover:border-amber-400 cursor-pointer'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center font-black text-xs border transition-colors ${isItemUnlocked
                          ? 'bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border-slate-200/80 dark:border-zinc-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900'
                          : 'bg-amber-100/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800/60'
                        }`}
                    >
                      {item.no ?? index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                          SECTION {item.no ?? index + 1}: {item.title}
                        </h3>
                        {index === 0 && !isEnrolled && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 uppercase tracking-tight">
                            Preview
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
                        {item.engTitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center justify-center flex-shrink-0">
                    {isItemUnlocked ? (
                      <svg
                        className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    ) : (
                      <LuLock className="w-4.5 h-4.5 text-black dark:text-amber-200" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* EXTRA VOCABULARY FOR IMPORTANT AREAS (Dynamic Carousel) */}
          <div className="mt-14 pt-10 border-t-2 border-slate-200/80 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Extra Vocabulary for Important Areas:
                </h2>
              </div>

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
            <div
              ref={sliderRef}
              className="flex items-stretch gap-3 overflow-x-auto scroll-smooth pb-3 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
            >
              {extraSections.map((cat) => {
                const isExtraUnlocked = isEnrolled;

                return (
                  <Link
                    key={cat._id || cat.code}
                    to={
                      isExtraUnlocked
                        ? `/courses/basic-eng-vocab/everyday-word/extra-section/${cat.code}`
                        : '#'
                    }
                    onClick={!isExtraUnlocked ? handleLockedClick : undefined}
                    className={`flex-shrink-0 w-36 h-28 p-2.5 rounded-xl border-2 shadow-sm text-center flex flex-col justify-between items-center group cursor-pointer transition-all ${isExtraUnlocked
                        ? 'bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 hover:border-primary hover:shadow-md'
                        : 'bg-slate-100/70 dark:bg-zinc-900/40 border-dashed border-slate-300 dark:border-zinc-800 opacity-75 hover:opacity-100'
                      }`}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {cat.logo || cat.icon || '📖'}
                    </span>

                    <div className="flex items-center justify-center h-8 w-full">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {cat.title || cat.name}
                      </span>
                    </div>

                    <span className="text-[12px] font-mono text-slate-700 dark:text-zinc-500 flex items-center gap-1">
                      {!isExtraUnlocked && <LuLock className="w-4.5 h-4.5 text-black dark:text-amber-500" />}
                      Section-{cat.code}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EverydayWords;
