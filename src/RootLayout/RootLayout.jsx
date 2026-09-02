import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router'
import Footer from '../component/Footer'


const RootLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default RootLayout