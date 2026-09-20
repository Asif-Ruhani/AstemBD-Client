import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router';
import useAuth from '../Hooks/useAuth';
import AccessDenied from '../component/AccessDenied';

const PrivateRoutes = ({ children, courseId: propCourseId, category: propCategory }) => {
    const { authStatus, hasAccess } = useAuth();
    const location = useLocation();
    const params = useParams();

    // Props na thakle URL params theke fallback
    const courseId = propCourseId || params.courseId;
    const category = propCategory || params.category || params.categorySlug;
    const sectionNumber = params.sectionNumber || params.secNum || params.secNumber;

    // 1. Loading State
    if (authStatus === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-zinc-950">
                <span className="loading loading-bars loading-lg text-slate-900 dark:text-white" />
            </div>
        );
    }

    // 4. Section 1 Free Preview Exception (Allows preview without enrollment)
    if (sectionNumber && Number(sectionNumber) === 1) {
        return children;
    }

    // 2. Not Authenticated -> Redirect to Login
    if (authStatus === 'not-authenticated') {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // 3. Admin -> Direct Access
    if (authStatus === 'admin') {
        return children;
    }



    // 5. Authenticated User Evaluation (Course & Bundle check)
    if (authStatus === 'user') {
        // courseId ba category jodi thake, tobe entitlement check hobe
        if (courseId || category) {
            if (!hasAccess(courseId, category)) {
                return (
                    <AccessDenied
                        message="You do not have active access to this course. Either it has not been purchased or your access has expired."
                    />
                );
            }
            return children;
        }

        // General Private Route (e.g. /payment jekhane courseId/category URL-e thakena)
        return children;
    }

    return null;
};

export default PrivateRoutes;