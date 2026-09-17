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
// import EverydayWords from "../component/EverydayWords"
// import EverydayWordSectionDetail from "../component/EverydayWordSectionDetail"
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
//                 // element: <PrivateRoutes><EverydayWords></EverydayWords></PrivateRoutes>
//                 element: <AdminRoute><EverydayWords></EverydayWords></AdminRoute>
//             },
//             {
//                 path: '/english-vocab/basic/everyday-Word/section/:sectionNumber',
//                 element: <PrivateRoutes> <EverydayWordSectionDetail /> </PrivateRoutes>
//                 // element: <AdminRoute><EverydayWordSectionDetail></EverydayWordSectionDetail></AdminRoute>

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

import EverydayWords from "../component/EverydayWords";
import EverydayWordSectionDetail from "../component/EverydayWordSectionDetail";

// Admin Imports
import AdminRoute from "../PrivateRoutes/AdminRoute";
import UserManagement from "../component/UserManagement";
import PaymentHistory from "../component/PaymentHistory";
import ScreenshotAuditLogs from "../component/ScreenshotAuditLogs";
import DocumentPage from "../component/DocumentPage";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import MyCourses from "../component/MyCourses";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            // 1. Public & Core Pages
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/registration',
                Component: Registration
            },
            {
                path: '/payment',
                Component: Payment
            },
            {
                path: '/coming-soon',
                Component: ComingSoon
            },

            // 2. All Courses Catalog & Content (Public Route, Inline-Gated inside Content.jsx)
            // Handles both /courses/basic-eng-vocab, /courses/advanced-eng-vocab, /courses/ssc, etc.
            {
                path: '/courses/:category',
                Component: Content
            },

            // 3. Freemium Everyday English Hub & Sections (Publicly routed, gated within components)
            {
                path: '/courses/basic-eng-vocab/everyday-word',
                Component: EverydayWords
            },
            {
                path: '/courses/basic-eng-vocab/everyday-word/section/:sectionNumber',
                Component: EverydayWordSectionDetail
            },
            {
                path:'/my-courses',
                element: <PrivateRoutes><MyCourses></MyCourses></PrivateRoutes>
            },

            // 4. Admin Protected Routes
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
            }
        ]
    }
]);

export default router;