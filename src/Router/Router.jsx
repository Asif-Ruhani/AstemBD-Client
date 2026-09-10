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
import SimpleButton from "../component/SimpleButton"




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
                path: "/english-vocab/everyday-word",
                loader: ()=> fetch("http://localhost:3000/sections"),
                Component: EverydayWords
            },
            {
                path: '/english-vocab/everyday-Word/section/:sectionNumber',
                loader: ({ params }) => fetch(`http://localhost:3000/everydayWordSectionDetail/${params.sectionNumber}`),
                Component: EverydayWordSectionDetail
            },
            {
                path:'/ssc/general-math',
                Component: ComingSoon
            },
            {
                path: '/logout',
                Component: SimpleButton
            }
        ]
    }
])
export default router