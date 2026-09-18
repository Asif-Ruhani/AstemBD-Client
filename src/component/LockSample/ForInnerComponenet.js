




// this component is same as everydayWordSectionDetails.jsx file. that show the details of each section.
// if this component is not in any bundle, then "handleBundleAccess" is not needed.
// if this component is a single component, then only handleAccessBundle is enough to find courseId










import React, { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

// CONFIGURATION (Adjust for each course)
const COURSE_CATEGORY = 'advanced-eng-vocab';
const COURSE_ID = 'CRS_AEV_CONV_01';

const SectionDetail = () => {
    const { sectionNumber } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const { user, authStatus, hasAccess, hasBundleAccess } = useAuth();

    // Free preview rule: Section 1 is always unlocked
    const isSample = String(sectionNumber) === '1';

    // Function 1: Check enrollment status (identical to outer)
    const isEnrolled = useMemo(() => {
        if (authStatus === 'admin' || user?.role === 'admin' || user?.isAdmin) {
            return true;
        }

        // 2. Bundle access check
        if (typeof hasBundleAccess === 'function' && hasBundleAccess(COURSE_CATEGORY)) {
            return true;
        }

        // 3. Single course ID check
        if (typeof hasAccess === 'function' && hasAccess(COURSE_ID)) {
            return true;
        }

        // 4. Fallback safe check in user purchase arrays
        const accessList = [
            ...(Array.isArray(user?.purchasedCourses) ? user.purchasedCourses : [])
        ];














        // *******************************************for bundle courses************************************************

        //     return accessList.some((item) => {
        //         const now = new Date();
        //         if (item?.status && item.status !== 'active') return false;
        //         if (item?.expiresAt && new Date(item.expiresAt) <= now) return false;

        //         const id = typeof item === 'string' ? item : item?.courseId || item?.id;
        //         const cat = item?.category;
        //         return cat === COURSE_CATEGORY || id === COURSE_ID;
        //     });
        // }, [authStatus, user, hasAccess, hasBundleAccess]);

        // // Combined gate verdict
        // const canViewCurrentSection = isSample || isEnrolled;

        // // Function 2: Handle section switching in sidebar
        // const handleSectionChange = (targetSection) => {
        //     const targetIsSample = String(targetSection) === '1';

        //     if (!targetIsSample && !isEnrolled) {
        //         navigate('/payment', { state: { selectedCourseId: COURSE_CATEGORY } });
        //         return;
        //     }

        //     if (String(sectionNumber) === String(targetSection)) return;

        //     const pathParts = location.pathname.split('/');
        //     pathParts[pathParts.length - 1] = targetSection;
        //     navigate(pathParts.join('/'));
        // };












        // ***********************************************for single course*************************************************
        return accessList.some((item) => {
            const now = new Date();
            if (item?.status && item.status !== 'active') return false;
            if (item?.expiresAt && new Date(item.expiresAt) <= now) return false;

            const id = typeof item === 'string' ? item : item?.courseId || item?.id;
            return id === COURSE_ID;
        });
    }, [authStatus, user, hasAccess]);

    // Combined gate verdict
    const canViewCurrentSection = isSample || isEnrolled;

    // Function 2: Handle section switching in sidebar
    const handleSectionChange = (targetSection) => {
        const targetIsSample = String(targetSection) === '1';

        if (!targetIsSample && !isEnrolled) {
            navigate('/payment', { state: { selectedCourseId: COURSE_ID } });
            return;
        }

        if (String(sectionNumber) === String(targetSection)) return;

        const pathParts = location.pathname.split('/');
        pathParts[pathParts.length - 1] = targetSection;
        navigate(pathParts.join('/'));
    };





















    // Function 3: Gated React Query fetch
    const { data: sectionData = {}, isLoading, isError } = useQuery({
        queryKey: ['sectionDetail', COURSE_ID, String(sectionNumber)],
        queryFn: async ({ signal }) => {
            const response = await axiosSecure.get(`/section-detail/${sectionNumber}`, { signal });
            return response.data || {};
        },
        enabled: canViewCurrentSection && !!sectionNumber, // Blocks fetch if locked
        staleTime: 1000 * 60 * 10,
    });

    return (
        <div>
            {!canViewCurrentSection ? (
                <div>
                    {/* Render Full Page Paywall */}
                    <h2>This section is locked</h2>
                    <button onClick={() => navigate('/payment', { state: { selectedCourseId: COURSE_CATEGORY } })}>
                        Unlock Full Access
                    </button>
                </div>
            ) : (
                <div>
                    {/* Render Lesson Content */}
                </div>
            )}
        </div>
    );
};

export default SectionDetail;