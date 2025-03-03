import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router'
import ScrollToTop from '../Components/sharedComps/ScrollToTop'
import Footer from '../Components/Footer/Footer'

const RootPage = () => {
  return (
    <>
    <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootPage
