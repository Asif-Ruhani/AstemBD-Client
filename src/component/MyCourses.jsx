import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { LuBookOpen, LuClock, LuSparkles, LuArrowRight, LuRefreshCw } from 'react-icons/lu';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { formatExpiry } from '../Utils/formatDate';

const MyCourses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: courses = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['my-purchased-courses'],
    queryFn: async () => {
      const res = await axiosSecure.get('/purchased-courses/my-courses');
      return res.data?.courses || [];
    },
    staleTime: 1000 * 60 * 10,
  });

  // Dynamic Route Resolver matching router.jsx architecture
  const resolveCourseRoute = (course) => {
    if (!course) return '/';

    // 1. If course has an explicit routePath in DB
    if (course.routePath) {
      return course.routePath;
    }

    const cat = course.category || '';
    const slug = course.slug || course.courseSlug;

    // 2. Vocabulary tracks (both basic and advanced)
    if (cat.includes('vocab')) {
      if (slug) {
        return `/courses/${cat}/${slug}`;
      }
      return `/courses/${cat}/everyday-word`;
    }

    // 3. Academic & Tech Courses (SSC, HSC, CSE, Study Abroad)
    if (cat && slug) {
      return `/courses/${cat}/${slug}`;
    }

    // 4. Default Category Hub fallback
    if (cat) {
      return `/courses/${cat}`;
    }

    return '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-zinc-800 dark:border-t-indigo-400 animate-spin mb-3" />
        <p className="text-sm font-bold text-slate-500 dark:text-zinc-400">Loading your learning workspace...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400">
          <p className="font-bold text-base">Failed to load courses</p>
          <p className="text-sm mt-1">{error?.message || 'Please check your connection and try again.'}</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-100 dark:border-zinc-700 shadow-sm">
          <LuBookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          No Enrolled Courses Found
        </h2>
        <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2 max-w-md mx-auto">
          You have not enrolled in any programs yet. Browse our catalog to unlock comprehensive curricula, drills, and active recall resources.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-black uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-zinc-100 transition shadow-md cursor-pointer"
        >
          <LuSparkles className="w-4 h-4 text-amber-400 dark:text-amber-600" />
          Explore Courses Catalog
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50/70 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Student Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              My Learning Workspace
            </h1>
          </div>

          <div className="text-xs font-bold text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-2xs self-start sm:self-center">
            Total Active Enrollments: <span className="text-slate-900 dark:text-white font-black">{courses.length}</span>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const expiryInfo = formatExpiry(course.expiresAt);
            const targetRoute = resolveCourseRoute(course);
            const isExpired = expiryInfo?.isExpired === true;

            return (
              <div
                key={course.courseId || course._id}
                className="group rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Pricing Model Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 px-2.5 py-0.5 rounded-lg">
                      {course.category?.replace(/-/g, ' ') || 'Course'}
                    </span>

                    {course.pricingModel === 'bundle' && (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 px-2 py-0.5 rounded-md">
                        Bundle Access
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-3 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {course.title || course.courseName || course.courseId}
                  </h3>

                  {/* Course ID tag */}
                  <p className="font-mono text-xs text-slate-400 dark:text-zinc-500 mt-1">
                    ID: {course.courseId}
                  </p>

                  {/* Expiry Pill */}
                  <div className="mt-4 flex items-center gap-1.5">
                    <LuClock className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 ${isExpired
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                          : expiryInfo?.isExpiringSoon
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        }`}
                    >
                      {expiryInfo?.text || 'Active Enrollment'}
                    </span>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                  {/* If Expiring soon or expired: Show Renew Link */}
                  {(expiryInfo?.isExpiringSoon || isExpired) ? (
                    <button
                      type="button"
                      onClick={() =>
                        navigate('/payment', {
                          state: { selectedCourseId: course.category || course.courseId }
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      <LuRefreshCw className="w-3 h-3" />
                      Renew Pass
                    </button>
                  ) : (
                    <div />
                  )}

                  {/* Continue Learning Button */}
                  {!isExpired ? (
                    <Link
                      to={targetRoute}
                      className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs sm:text-sm font-bold hover:bg-slate-800 dark:hover:bg-zinc-100 transition shadow-xs group-hover:gap-2 cursor-pointer"
                    >
                      <span>Continue Learning</span>
                      <LuArrowRight className="w-3.5 h-3.5 transition-transform" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        navigate('/payment', {
                          state: { selectedCourseId: course.category || course.courseId }
                        })
                      }
                      className="ml-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer"
                    >
                      Re-enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MyCourses;