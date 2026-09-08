import { useEffect, useLayoutEffect, useRef, useState } from "react"; // useLayoutEffect for animations that should run before paint
import { Link } from "react-router"
import { animate, stagger, press } from "motion";
import { Slant as Hamburger } from 'hamburger-react'
import { FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from 'motion/react'

const Navbar = ({isDark, toggleDarkMode, isFirstLoad}) => {
  const darkModeButtonRef = useRef(null);
  const navElementsRef = useRef([]);
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // Drives whether <nav> is fixed (overlay mode). Stays true through the
  // close animation too - reverting to relative the instant isOpen goes
  // false, while the menu panel is still mid-collapse, put it back in
  // normal flow and made it push page content down as it shrank.
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  // useLayoutEffect, not useEffect: this must land in the same paint as
  // isOpen flipping true, or there's a frame where the menu panel has
  // started growing but <nav> is still in normal flow, pushing content.
  useLayoutEffect(() => {
    if (isOpen) setIsOverlayActive(true);
  }, [isOpen]);

  // <nav> going fixed removes it from the document flow, so everything
  // below it would otherwise jump by nav's own height. This spacer
  // reserves that height for as long as the overlay is active so nothing
  // else on the page ever moves. Measured only while closed, since nav's
  // height while fixed includes the open menu, not just the header.
  const [collapsedNavHeight, setCollapsedNavHeight] = useState(0);
  useLayoutEffect(() => {
    if (isOverlayActive || !navRef.current) return;
    const el = navRef.current;
    const update = () => setCollapsedNavHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOverlayActive]);

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

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </AnimatePresence>

    <nav
      ref={navRef}
      id="main-nav"
      className={`pt-10 lg:mb-0 z-10 ${
        isOverlayActive
          ? `fixed top-0 inset-x-0 z-40 px-6 lg:px-15 max-w-[1900px] mx-auto pb-2 ${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'}`
          : 'relative'
      }`}
    >
      <div className="flex flex-wrap flex-row items-center justify-between">
        <Link to="/"><div id="nav-logo" className='flex gap-6 items-center'>
          <img ref={el => navElementsRef.current[0] = el} src='/THUMBNAIL.png' className='w-8 h-8 lg:h-12 lg:w-12'/>
        </div></Link>

        <div id="nav-links" className="flex gap-10 items-center">
          <div className="lg:hidden">
            <div ref={el => navElementsRef.current[2] = el}>
              <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
            </div>
          </div>

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
      </div>

      <AnimatePresence onExitComplete={() => setIsOverlayActive(false)}>
        {isOpen && (
          <motion.div
            className="lg:hidden relative z-10 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <nav className="flex flex-col space-y-4 pt-6 pb-4">
              <Link to="/about" onClick={() => setIsOpen(false)} className="text-lg">About</Link>
              <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="text-lg">LinkedIn</a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="text-lg">Resume</a>
              <button onClick={() => { toggleDarkMode(); setIsOpen(false); }} className="flex items-center gap-2 pt-2">
                {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    {isOverlayActive && <div style={{ height: collapsedNavHeight }} aria-hidden="true" />}
    </>
  )
}

export default Navbar;