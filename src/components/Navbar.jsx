import { useEffect, useRef } from "react";
import { animate, stagger, press } from "motion";

const Navbar = ({isDark, toggleDarkMode}) => {

  const darkModeButtonRef = useRef(null);
  const navElementsRef = useRef([]);

  // Nav elements animation
  useEffect(() => {
    const elements = navElementsRef.current.filter(el => el !== null);
    if (elements.length === 0) return;

    animate(
      elements,
      { y: [-20, 0], opacity: [0, 100] },
      { delay: stagger(0.1) }
    );
  }, []);

   // Dark mode button animations
  useEffect(() => {
    if (!darkModeButtonRef.current) return;
    
    const cleanup = press(darkModeButtonRef.current, (element) => {
      animate(element, { scale: 0.9 }, { type: "spring", stiffness: 1000 });
      return () => {
        animate(element, { scale: 1.0 }, { type: "spring", stiffness: 500 });
      };
    });

    return cleanup;
  }, []);
  
  return (
    <nav id="main-nav" className="flex flex-wrap flex-row mt-[50px] mb-[50px] md:mb-0 items-center justify-between">
      <div id="nav-logo" className='flex gap-6 items-center'>
        <img ref={el => navElementsRef.current[0] = el} src='/public/THUMBNAIL.png' className='w-8 h-8 md:w-9 md:h-9'/>
        <p ref={el => navElementsRef.current[1] = el} className="nav-element hidden md:block sm:text-xl lg:text-3xl">lucas mcallister</p>
      </div>
      <div id="nav-links" className="flex gap-[48px] lg:gap-[64px] items-center">
        <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" ref={el => navElementsRef.current[2] = el} className='nav-element inline-block md:hidden transform scale-200 mr-2'><i className="fa-brands fa-linkedin"></i></a>
        <a href="#projects-section-text" ref={el => navElementsRef.current[3] = el} className='nav-element hidden md:inline-block text-lg lg:text-xl mt-[20px] md:mt-[6px] underline md:no-underline z-2'>PROJECTS</a>
        <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" ref={el => navElementsRef.current[4] = el} className='nav-element hidden md:inline-block text-lg lg:text-xl mt-[20px] md:mt-[6px] underline md:no-underline z-2'>LINKEDIN</a>
        <div 
          ref={el => { 
            darkModeButtonRef.current = el;
            navElementsRef.current[5] = el;
          }}
          onClick={toggleDarkMode}
          id='dark-mode-button' 
          className={`will-change-transform cursor-pointer hidden md:inline-block w-[48px] lg:w-[56px] h-[48px] lg:h-[56px] bg-[#D9D9D9] rounded-full dark:border-white border mt-[6px] ${isDark ? "drop-shadow-[0_0_20px_#ffffff]" : "drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"} nav-element`}
        ></div>
      </div>
    </nav>
)}

export default Navbar;