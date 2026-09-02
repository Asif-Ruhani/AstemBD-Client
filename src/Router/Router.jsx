import { createBrowserRouter } from "react-router"
import RootLayout from "../RootLayout/RootLayout"
import Home from "../Pages/Home"
import EnglishVocub from "../component/EnglishVocub"
import HSC from "../component/HSC"
import StudyAbroad from "../component/StudyAbroad"
import SSC_Component from "../component/SSC_Component"
import PresentationBoard from "../component/PresentationBoard"
import { path } from "framer-motion/client"
import Login from "../component/Login"
import Registration from "../component/Registration"
import EverydayWords from "../component/EverydayWords"
import EverydayWordSectionDetail from "../component/EverydayWordSectionDetail"
import ComingSoon from "../component/ComingSoon"




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
                path: '/englishVocub',
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
                path: '/studyAbroad',
                Component: StudyAbroad
            },
            {
                path:'/presentationBoard',
                Component: PresentationBoard
            },
            {
                path:'/login',
                Component: Login
            },
            {
                path:'/registration',
                Component: Registration
            },
            {
                path: '/vocab/everydayWord',
                Component: EverydayWords
            },
            {
                path: '/everydayWordSectionDetail',
                Component: EverydayWordSectionDetail
            },
            {
                path:'/ssc/general-math',
                Component: ComingSoon
            }
        ]
    }
])
export default router