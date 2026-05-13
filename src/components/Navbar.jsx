import { useEffect, useLayoutEffect, useRef, useState } from "react"; // useLayoutEffect for animations that should run before paint
import { Link } from "react-router"
import { animate, stagger, press } from "motion";
import { Slant as Hamburger } from 'hamburger-react'
import { FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from 'motion/react'

const Navbar = ({isDark, toggleDarkMode, isFirstLoad}) => {
  const darkModeButtonRef = useRef(null);
  const navElementsRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);

  // Nav elements animation
  useLayoutEffect(() => {
    if (isFirstLoad.current){
      const elements = navElementsRef.current.filter(el => el !== null);
      if (elements.length === 0) return;

      animate(
        elements,
        { y: [-20, 0], opacity: [0, 100] },
        { delay: stagger(0.1, { startDelay: 0.3 }) }
      );
      isFirstLoad.current = false;
    }
  }, []);

  // Dark mode button press animation
  useEffect(() => {
    if (!darkModeButtonRef.current) return;
    const cleanup = press(darkModeButtonRef.current, (element) => {
      animate(element, { scale: 0.9 }, { type: "spring", stiffness: 1000 });
      return () => animate(element, { scale: 1.0 }, { type: "spring", stiffness: 500 });
    });
    return cleanup;
  }, []);

  return (
    <nav id="main-nav" className={`flex flex-wrap flex-row pt-10 lg:mb-0 items-center justify-between z-10 relative ${isOpen && 'lg:hidden'}`}>
      <Link to="/"><div id="nav-logo" className='flex gap-6 items-center'>
        <img ref={el => navElementsRef.current[0] = el} src='/THUMBNAIL.png' className='w-8 h-8 lg:h-12 lg:w-12'/>
      </div></Link>

      <div id="nav-links" className="flex gap-10 items-center">
        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <div ref={el => navElementsRef.current[2] = el}>
            <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
          </div>

          <AnimatePresence>
            {isOpen && (
              <>
                {/* Full overlay with shade */}
                <motion.div
                  className="fixed inset-0 z-30 bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.2,0.8,0.2,1] }}
                  onClick={() => setIsOpen(false)}
                />

                {/* Menu container - includes navbar area and extends below */}
                <motion.div
                  className={`${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'} fixed top-0 left-0 right-0 w-full z-40`}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.2,0.8,0.2,1] }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Navbar replica in menu */}
                  <div className="flex items-center justify-between px-6 pt-10 pb-4">
                    <div className="flex gap-6 items-center">
                      <a href="/"><img src='/THUMBNAIL.png' className='w-8 h-8' /></a>
                    </div>
                    <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
                  </div>

                  {/* Menu items */}
                  <nav className="flex flex-col space-y-4 px-6 py-4">
                    <Link to="/about" onClick={() => setIsOpen(false)} className="text-lg">About</Link>
                    <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="text-lg">LinkedIn</a>
                    <a href="/resume.pdf" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="text-lg">Resume</a>
                    <button onClick={() => { toggleDarkMode(); setIsOpen(false); }} className="flex items-center gap-2 pt-2">
                      {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
                    </button>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop links */}
        <Link to="/about" ref={el => navElementsRef.current[3] = el} className='nav-element hidden lg:inline-block text-xl underline lg:no-underline z-2'>About</Link>
        <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" target="_blank" ref={el => navElementsRef.current[4] = el} className='nav-element hidden lg:inline-block text-xl underline lg:no-underline z-2'>LinkedIn</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" ref={el => navElementsRef.current[5] = el} className='nav-element hidden lg:inline-block text-xl underline lg:no-underline z-2'>Resume</a>

        <div 
          ref={el => { 
            darkModeButtonRef.current = el;
            navElementsRef.current[6] = el;
          }}
          onClick={toggleDarkMode}
          id='dark-mode-button' 
          className={`will-change-transform cursor-pointer hidden lg:inline-block w-12 h-12 bg-[#D9D9D9] rounded-full dark:border-white border mt-[6px] ${isDark ? "drop-shadow-[0_0_20px_#ffffff]" : "drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"} nav-element`}>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;