// import React from 'react'
// import Navbar from '../component/Navbar'
// import { Outlet } from 'react-router'
// import Footer from '../component/Footer'


// const RootLayout = () => {
//   return (
//     <div>
//         <Navbar></Navbar>
//         <Outlet></Outlet>
//         <Footer></Footer>
//     </div>
//   )
// }

// export default RootLayout

import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet, ScrollRestoration } from 'react-router'
import Footer from '../component/Footer'
import ChatBubble from '../component/ChatBubble'

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {/* Scroll restoration handles scrolling to top on navigation and remembers scroll on back/forward */}
      <ScrollRestoration />

      <Navbar />

      {/* flex-1 ensures the footer is always pushed to the bottom even on short pages */}
      <main className="flex-1">
        <Outlet />
      </main>
      <ChatBubble></ChatBubble>

      <Footer />
    </div>
  )
}

export default RootLayout