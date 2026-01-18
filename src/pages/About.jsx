import { useState, useEffect, useRef } from 'react';
import { animate, hover, motion } from 'motion/react';
import '../input.css';

import Navbar from "../components/Navbar.jsx"

export default function About({isDark, toggleDarkMode, isFirstLoad}){
  return (
    <div className="dark:text-gray-100 dark:bg-neutral-900 bg-white text-black">
      <div className="mx-6 md:mx-15 max-w-screen">
        <div id='landing-page' className="landing-page-container h-[80vh] lg:h-screen flex flex-col">
          <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad}/>
        </div>
      </div>
    </div>
    
  )
}