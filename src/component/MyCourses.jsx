import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { formatExpiry } from '../Utils/formatDate';


const MyCourses = () => {
  const axiosSecure = useAxiosSecure();

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-500">
        <p>Failed to load courses: {error?.message || 'Something went wrong'}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-slate-50 rounded-xl my-8 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">No Courses Enrolled</h2>
        <p className="text-slate-600 mt-2">You have not enrolled in any courses yet.</p>
        <Link
          to="/"
          className="mt-4 inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Enrolled Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          // Calling your util function directly
          const expiryInfo = formatExpiry(course.expiresAt);

          const targetRoute =
            course.category === 'basic-eng-vocab'
              ? '/everyday-words'
              : `/courses/${course.courseId}`;

          return (
            <div
              key={course.courseId}
              className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                  {course.category || 'Course'}
                </span>

                <h3 className="text-lg font-bold text-slate-800 mt-3">
                  {course.title || course.courseId}
                </h3>

                {/* Expiry Pill */}
                <div className="mt-3">
                  <span
                    className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${
                      expiryInfo.isExpired
                        ? 'bg-red-100 text-red-700'
                        : expiryInfo.isExpiringSoon
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {expiryInfo.text}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                {expiryInfo.isExpiringSoon && (
                  <Link
                    to="/payment-instructions"
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Renew Subscription
                  </Link>
                )}

                <Link
                  to={targetRoute}
                  className="ml-auto px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition"
                >
                  Continue Learning →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;