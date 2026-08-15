import { useState, useRef, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const getBreakpoint = (width) => {
  if (width >= 1536) return '2xl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
};

export default function App() {

  const [isDark, setIsDark] = useState(false);
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(window.innerWidth));
  const isFirstLoad = useRef(true);
  const isFirstHeroLoad = useRef(true);

  useEffect(() => {
    const updateBreakpoint = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

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
    <>
      <div className="fixed bottom-3 left-3 z-[9999] rounded-full border border-black/10 bg-white/80 px-2 py-1 font-[Inter] text-[10px] font-medium tracking-[0.16em] text-black shadow-sm backdrop-blur-sm">
        {breakpoint}
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad} isFirstHeroLoad={isFirstHeroLoad} />} />
          <Route path="/about" element={<About isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad} />} />
        </Routes>
        <Analytics/>
        <SpeedInsights/>
      </BrowserRouter>
    </>
  );
}
