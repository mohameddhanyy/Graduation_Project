import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline } from "react-detect-offline";
import Home from '../Home/Home';
import About from '../About/About';
import Lost from '../Lost/Lost';

export default function Layout() {
  return <>
  
  <NavBar />
  <Outlet></Outlet>


    {/* <Offline>
  <div className='network'>
      <i className='fas fa-wifi me-3'></i>
      You are offline now (surprise!)
  </div>
      </Offline> */}

  <Footer />
</>
}
