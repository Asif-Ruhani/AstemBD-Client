// import { createBrowserRouter } from "react-router"
// import RootLayout from "../RootLayout/RootLayout"
// import Home from "../Pages/Home"
// // import EnglishVocub from "../component/EnglishVocub"
// // import HSC from "../component/HSC"
// // import StudyAbroad from "../component/StudyAbroad"
// // import SSC_Component from "../component/SSC_Component"
// import { path } from "framer-motion/client"
// import Login from "../component/Login"
// import Registration from "../component/Registration"
// import DynamicCourseSections from "../component/DynamicCourseSections"
// import DynamicSectionDetail from "../component/DynamicSectionDetail"
// import ComingSoon from "../component/ComingSoon"
// import PrivateRoutes from "../PrivateRoutes/PrivateRoutes"
// import AdminRoute from "../PrivateRoutes/AdminRoute"
// import UserManagement from "../component/UserManagement"
// import Payment from "../component/Payment"
// import PaymentHistory from "../component/PaymentHistory"
// // import CSE from "../component/CSE"
// import ScreenshotAuditLogs from "../component/ScreenshotAuditLogs"
// import RegularExtraVocabWordDetails from "../component/RegularExtraVocabWordDetails"
// import DocumentPage from "../component/DocumentPage"
// import SectionEditor from "../component/SectionEditor"
// import BasicEngVocab from "../component/BasicEngVocab"
// import AdvancedEngVocab from "../component/AdvancedEngVocab"
// import Content from "../component/Content"





// const router = createBrowserRouter([
//     {
//         path: '/',
//         Component: RootLayout,
//         children: [
//             {
//                 index: true,
//                 Component: Home
//             },
//             // {
//             //     path: '/courses/english-vocabulary',
//             //     Component: EnglishVocub
//             // },
//             // {
//             //     path: '/courses/ssc',
//             //     Component: SSC_Component
//             // },
//             // {
//             //     path: '/courses/hsc',
//             //     Component: HSC
//             // },
//             // {
//             //     path: '/courses/cse',
//             //     Component: CSE
//             // },
//             // {
//             //     path: 'courses/study-abroad',
//             //     // loader: () => fetch("https://astem-bd-server.vercel.app/users"),
//             //     Component: StudyAbroad
//             // },
//             {
//                 path:'/courses/:category',
//                 Component: Content
//             },

//             {
//                 path: '/login',
//                 Component: Login
//             },
//             {
//                 path: '/registration',
//                 Component: Registration
//             },
//             {
//                 path: "/english-vocab/basic/everyday-word",
//                 // element: <PrivateRoutes><DynamicCourseSections></DynamicCourseSections></PrivateRoutes>
//                 element: <AdminRoute><DynamicCourseSections></DynamicCourseSections></AdminRoute>
//             },
//             {
//                 path: '/english-vocab/basic/everyday-Word/section/:sectionNumber',
//                 element: <PrivateRoutes> <DynamicSectionDetail /> </PrivateRoutes>
//                 // element: <AdminRoute><DynamicSectionDetail></DynamicSectionDetail></AdminRoute>

//             },
//             {
//                 path: '/english-vocab/basic/everyday-Word/extra-section/:code',
//                 element: <PrivateRoutes><RegularExtraVocabWordDetails></RegularExtraVocabWordDetails></PrivateRoutes>
//             },
//             {
//                 path: '/coming-soon',
//                 Component: ComingSoon
//             },
//             {
//                 path: '/users',
//                 element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
//             },
//             {
//                 path: '/payment',
//                 Component: Payment
//             },
//             {
//                 path: '/payment-history',
//                 element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
//             },
//             {
//                 path: '/user-log',
//                 element: <AdminRoute><ScreenshotAuditLogs></ScreenshotAuditLogs></AdminRoute>
//             },
//             {
//                 path: '/data-manipulation',
//                 element: <AdminRoute><DocumentPage></DocumentPage></AdminRoute>
//             },
//             {
//                 path: '/english-vocab/everyday-Word/section-edit/:sectionNumber',
//                 element: <AdminRoute><SectionEditor></SectionEditor></AdminRoute>
//             },
//             {
//                 path: '/english-vocab/everyday-Word/extra-section-edit/:code',
//                 element: <AdminRoute><SectionEditor></SectionEditor></AdminRoute>
//             },
//             {
//                 path:'/english-vocab/basic-vocab',
//                 element: <BasicEngVocab></BasicEngVocab>
//             },
//              {
//                 path:'/english-vocab/advanced-vocab',
//                 element: <AdvancedEngVocab></AdvancedEngVocab>
//             }
//         ]
//     }
// ])
// export default router

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
                element: <Payment />
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
                element: <DynamicSectionDetail />
            },
            {
                path: '/courses/basic-eng-vocab/everyday-word/extra-section/:sectionNumber',
                element: <DynamicSectionDetail />
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
                element: <DynamicCourseSections />
            },
            // Detail view of a standard section
            {
                path: '/courses/:category/:slug/section/:sectionNumber',
                element: <DynamicSectionDetail />
            },
            // Detail view of an extra/supplementary vault section
            {
                path: '/courses/:category/:slug/extra-section/:sectionNumber',
                element: <DynamicSectionDetail />
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