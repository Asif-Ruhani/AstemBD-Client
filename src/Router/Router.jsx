import { createBrowserRouter } from "react-router"
import RootLayout from "../RootLayout/RootLayout"
import Home from "../Pages/Home"
import EnglishVocub from "../component/EnglishVocub"
import HSC from "../component/HSC"
import StudyAbroad from "../component/StudyAbroad"
import SSC_Component from "../component/SSC_Component"
import { path } from "framer-motion/client"
import Login from "../component/Login"
import Registration from "../component/Registration"
import EverydayWords from "../component/EverydayWords"
import EverydayWordSectionDetail from "../component/EverydayWordSectionDetail"
import ComingSoon from "../component/ComingSoon"
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes"




const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/english-vocab',
                Component: EnglishVocub
            },
            {
                path: '/ssc',
                Component: SSC_Component
            },
            {
                path: '/hsc',
                Component: HSC
            },
            {
                path: '/study-abroad',
                loader: () => fetch("http://localhost:3000/users"),
                Component: StudyAbroad
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
                path: "/english-vocab/everyday-word",
                element: <PrivateRoutes><EverydayWords></EverydayWords></PrivateRoutes>
            },
            {
                path: '/english-vocab/everyday-Word/section/:sectionNumber',
                element: <PrivateRoutes> <EverydayWordSectionDetail /> </PrivateRoutes>
                
            },
            {
                path: '/ssc/general-math',
                Component: ComingSoon
            },
        ]
    }
])
export default router