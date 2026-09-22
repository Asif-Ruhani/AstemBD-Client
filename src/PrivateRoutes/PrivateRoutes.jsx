import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router';
import useAuth from '../Hooks/useAuth';
import AccessDenied from '../component/AccessDenied';

const PrivateRoutes = ({ children, courseId: propCourseId, category: propCategory }) => {
    const { authStatus, hasAccess, user } = useAuth();
    const location = useLocation();
    const params = useParams();

    // 1. URL Params theke accurate identifier ber kora:
    // Route-e :courseId ba :slug jeta-i thakuk seta safe vabe extract kora
    const courseIdentifier = propCourseId || params.courseId || params.slug;
    const category = propCategory || params.category || params.categorySlug;
    const rawSectionNumber = params.sectionNumber || params.secNum || params.secNumber;
    const sectionNumber = rawSectionNumber ? parseInt(rawSectionNumber, 10) : null;

    // 2. Auth Loading State (Wait for Firebase/Auth check)
    if (authStatus === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-zinc-950">
                <span className="loading loading-bars loading-lg text-slate-900 dark:text-white" />
            </div>
        );
    }

    // 3. Section 1 Free Preview Exception:
    // Section 1 hole login charao access pabe (Inherently Free Preview)
    if (sectionNumber === 1) {
        return children;
    }

    // 4. Admin Access:
    // Admin hole shorashori access pabe
    if (authStatus === 'admin' || user?.role === 'admin' || user?.isAdmin) {
        return children;
    }

    // 5. Unauthenticated User Check (Section 2+ access er jonno login mandatory)
    if (authStatus === 'not-authenticated' || !user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // 6. Enrolled User Entitlement Check (Section 2+ er jonno)
    if (authStatus === 'user') {
        // Jodi Course/Category identifier thake, tobe entitlement check hobe
        if (courseIdentifier || category) {
            const userHasAccess = typeof hasAccess === 'function' && hasAccess(courseIdentifier, category);

            if (!userHasAccess) {
                return (
                    <AccessDenied
                        message="You do not have active access to this course. Either it has not been purchased or your access has expired."
                    />
                );
            }
            return children;
        }

        // Identifier chara onno kono general private route (e.g. /profile, /dashboard)
        return children;
    }

    // Default Fallback
    return null;
};

export default PrivateRoutes;