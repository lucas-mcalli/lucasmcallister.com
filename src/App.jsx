import {React, useEffect, useState, useRef } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

export default function App() {

  const [isDark, setIsDark] = useState(false);
  const isFirstLoad = useRef(true);
  const isFirstHeroLoad = useRef(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const html = document.documentElement;
    
    if (!isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    setIsDark(!isDark);
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad} isFirstHeroLoad={isFirstHeroLoad} />} />
        <Route path="/about" element={<About isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad} />} />
      </Routes>
    </BrowserRouter>
  );
}
