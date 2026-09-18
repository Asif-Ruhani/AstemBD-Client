






// this component is same as everydayWordS.jsx file. that show the all section grid.
// if this component is not in any bundle, then "handleBundleAccess" is not needed.
// if this component is a single component, then only handleAccessBundle is enough to find courseId













import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';

// CONFIGURATION (Adjust for each course)
const COURSE_CATEGORY = 'advanced-eng-vocab';
const COURSE_ID = 'CRS_AEV_CONV_01';

const CourseOverview = () => {
    const navigate = useNavigate();
    const { user, authStatus, hasAccess, hasBundleAccess } = useAuth();

    // Function 1: Check enrollment status
    const isEnrolled = useMemo(() => {
        // 1. Admin bypass
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

















        // ****************************************************for bundle courses*******************************************************

    //     return accessList.some((item) => {
    //         const now = new Date();
    //         if (item?.status && item.status !== 'active') return false;
    //         if (item?.expiresAt && new Date(item.expiresAt) <= now) return false;

    //         const id = typeof item === 'string' ? item : item?.courseId || item?.id;
    //         const cat = item?.category;
    //         return cat === COURSE_CATEGORY || id === COURSE_ID;
    //     });
    // }, [authStatus, user, hasAccess, hasBundleAccess]);

    // // Function 2: Handle click on locked card
    // const handleLockedClick = (e) => {
    //     e.preventDefault();
    //     navigate('/payment', { state: { selectedCourseId: COURSE_CATEGORY } });
    // };









    // ********************************************************for single course*******************************************************
    
    return accessList.some((item) => {
        const now = new Date();
        if (item?.status && item.status !== 'active') return false;
        if (item?.expiresAt && new Date(item.expiresAt) <= now) return false;

        const id = typeof item === 'string' ? item : item?.courseId || item?.id;
        return id === COURSE_ID;
    });
}, [authStatus, user, hasAccess]); // Removed hasBundleAccess from dependency array

// Function 2: Handle click on locked card
const handleLockedClick = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { selectedCourseId: COURSE_ID } }); // Passing COURSE_ID instead
};




























return (
    <div>
        {/* 
        In your Card Grid map:
        const isItemUnlocked = index === 0 || isEnrolled;
        
        <Link 
          to={isItemUnlocked ? `/courses/${COURSE_CATEGORY}/section/${item.sectionNumber ?? index + 1}` : '#'}
          onClick={!isItemUnlocked ? handleLockedClick : undefined}
        >
          ...
        </Link>
      */}
    </div>
);
};

export default CourseOverview;