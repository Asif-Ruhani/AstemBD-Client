import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../component/Login";
import Registration from "../component/Registration";
import ComingSoon from "../component/ComingSoon";
import Payment from "../component/Payment";
import Content from "../component/Content";

import DynamicCourseSections from "../component/DynamicCourseSections";
import DynamicSectionDetail from "../component/DynamicSectionDetail";

// Admin & Protected Imports
import AdminRoute from "../PrivateRoutes/AdminRoute";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import UserManagement from "../component/UserManagement";
import PaymentHistory from "../component/PaymentHistory";
import ScreenshotAuditLogs from "../component/ScreenshotAuditLogs";
import DocumentPage from "../component/DocumentPage";
import MyCourses from "../component/MyCourses";
import SectionEditor from "../component/SectionEditor";
import ContentShield from "../component/ContentShield";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            // 1. Public & Core Pages
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/registration',
                element: <Registration />
            },
            {
                path: '/payment',
                element: <PrivateRoutes>
                    <Payment></Payment>
                </PrivateRoutes>
            },
            {
                path: '/coming-soon',
                element: <ComingSoon />
            },
            {
                path: '/my-courses',
                element: (
                    <PrivateRoutes>
                        <MyCourses />
                    </PrivateRoutes>
                )
            },

            // 2. Backward-Compatible Legacy Paths (For existing links/bookmarks)
            {
                path: '/courses/basic-eng-vocab/everyday-word',
                element: <DynamicCourseSections />
            },
            {
                path: '/courses/basic-eng-vocab/everyday-word/section/:sectionNumber',
                element: <ContentShield>
                    <PrivateRoutes>
                        <DynamicSectionDetail />
                    </PrivateRoutes>
                </ContentShield>
            },
            {
                path: '/courses/basic-eng-vocab/everyday-word/extra-section/:sectionNumber',
                element: <ContentShield>
                    <PrivateRoutes>
                        <DynamicSectionDetail />
                    </PrivateRoutes>
                </ContentShield>
            },

            // 3. Category Catalog View (e.g. /courses/basic-eng-vocab, /courses/cse-courses)
            {
                path: '/courses/:category',
                element: <Content />
            },

            // 4. Dynamic Polymorphic Course Routes (Works for EVERY course & bundle)
            // Lists all sections/modules of a course
            {
                path: '/courses/:category/:slug',
                element: <ContentShield>
                    <DynamicCourseSections></DynamicCourseSections>
                </ContentShield>
            },
            // Detail view of a standard section
            {
                path: '/courses/:category/:slug/section/:sectionNumber',
                element: <ContentShield>
                    <PrivateRoutes>
                        <DynamicSectionDetail />
                    </PrivateRoutes>
                </ContentShield>
            },
            // Detail view of an extra/supplementary vault section
            {
                path: '/courses/:category/:slug/extra-section/:sectionNumber',
                element: <ContentShield>
                    <PrivateRoutes>
                        <DynamicSectionDetail />
                    </PrivateRoutes>
                </ContentShield>
            },

            // 5. Admin Protected Routes
            {
                path: '/users',
                element: (
                    <AdminRoute>
                        <UserManagement />
                    </AdminRoute>
                )
            },
            {
                path: '/payment-history',
                element: (
                    <AdminRoute>
                        <PaymentHistory />
                    </AdminRoute>
                )
            },
            {
                path: '/user-log',
                element: (
                    <AdminRoute>
                        <ScreenshotAuditLogs />
                    </AdminRoute>
                )
            },
            {
                path: '/data-manipulation',
                element: (
                    <AdminRoute>
                        <DocumentPage />
                    </AdminRoute>
                )
            },
            // Compound Route for Section Details (CourseId + SectionNumber)
            {
                path: '/english-vocab-details/:courseId/:sectionNumber',
                element: (
                    <AdminRoute>
                        <SectionEditor />
                    </AdminRoute>
                )
            },
            // Legacy / "new" route handler for backward compatibility
            {
                path: '/english-vocab-details/:sectionNumber',
                element: (
                    <AdminRoute>
                        <SectionEditor />
                    </AdminRoute>
                )
            },
            {
                path: '/all-courses-edit/:courseId',
                element: (
                    <AdminRoute>
                        <SectionEditor />
                    </AdminRoute>
                )
            }
        ]
    }
]);

export default router;