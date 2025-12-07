import { useState, useEffect, useRef } from 'react';
import { animate, press, stagger, hover } from 'motion';
import './input.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [expandButtonOne, setExpandButtonOne] = useState('Expand');
  const [expandButtonTwo, setExpandButtonTwo] = useState('Expand');
  const [showImageOne, setShowImageOne] = useState(true);
  const [showImageTwo, setShowImageTwo] = useState(true);

  const darkModeButtonRef = useRef(null);
  const homeArrowRef = useRef(null);
  const heroElementsRef = useRef([]);
  const navElementsRef = useRef([]);
  const expandButtonRefs = useRef([]);
  const imageOneRef = useRef(null);
  const projectOneDescRef = useRef(null);
  const imageTwoRef = useRef(null);
  const projectTwoDescRef = useRef(null);

  // Set default to light mode (white background)
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark'); // Ensure we start in light mode
    setIsDark(false);
    
    if (darkModeButtonRef.current) {
      darkModeButtonRef.current.style.filter = "drop-shadow(0 0 20px rgba(0,0,0,0.5))";
    }
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newDark = !isDark;
    
    if (newDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    setIsDark(newDark);
    
    if (darkModeButtonRef.current) {
      const dmDropShadow = "drop-shadow(0 0 20px #FFFFFF)";
      const regDropShadow = "drop-shadow(0 0 20px rgba(0,0,0,0.5))";
      darkModeButtonRef.current.style.filter = newDark ? dmDropShadow : regDropShadow;
    }
  };

  // Expand button hover animations
  useEffect(() => {
    const cleanups = expandButtonRefs.current
      .filter(btn => btn !== null)
      .map(btn => {
        return hover(btn, (element) => {
          animate(element, { scale: 1.05 });
          return () => {
            animate(element, { scale: 1 });
          };
        });
      });

    return () => cleanups.forEach(cleanup => cleanup && cleanup());
  }, []);

  // Home arrow animation
  useEffect(() => {
    if (!homeArrowRef.current) return;

    animate(
      homeArrowRef.current,
      { y: [0, 30] },
      {
        delay: 0.5,
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse'
      }
    );
  }, []);

  // Hero elements animation
  useEffect(() => {
    const elements = heroElementsRef.current.filter(el => el !== null);
    if (elements.length === 0) return;

    animate(
      elements,
      { y: [-20, 0], opacity: [0, 100], filter: ["blur(6px)", "blur(0px)"] },
      { delay: stagger(0.3, { startDelay: 0.7 }), duration: 0.6 }
    );
  }, []);

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

  // Handles expansion of project
  const toggleExpand = (projectNum) => {

    let imageRef;
    let projectRef;
    let expandButton;
    let setExpandButton;
    let showImage;
    let setShowImage;
    let projectId;

    if (projectNum === 1) {
      imageRef = imageOneRef;
      projectRef = projectOneDescRef;
      expandButton = expandButtonOne;
      setExpandButton = setExpandButtonOne;
      showImage = showImageOne;
      setShowImage = setShowImageOne;
      projectId = 'projects-section-text';
    }

    if (projectNum === 2) {
      imageRef = imageTwoRef;
      projectRef = projectTwoDescRef;
      expandButton = expandButtonTwo;
      setExpandButton = setExpandButtonTwo;
      showImage = showImageTwo;
      setShowImage = setShowImageTwo;
      projectId = 'project-two-section'
    }

    if (expandButton === 'Expand'){
      const projectSection = document.getElementById(projectId);
      if (projectSection){
        projectSection.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
      setTimeout(()=>{
        if (imageRef.current){ // ensures imageRef exists
        animate(imageRef.current,
          {opacity: 0, height: 0},
          {duration: 0.4}
        )
      }
      }, 200)
      setExpandButton('Close');
      setTimeout(()=>{
        setShowImage(false);
      }, 600)
    } else {
      setShowImage(true);
      setExpandButton("Expand");
      requestAnimationFrame(() => { // without this, it will render image instantly
        const image = imageRef.current;
        if (!image) return;

        // Get natural height
        const fullHeight = image.scrollHeight;

        // Start collapsed
        image.style.height = "0px";
        image.style.opacity = "0";

        // Animate open
        animate(
          image,
          { height: fullHeight, opacity: 1 },
          { duration: 0.4, easing: "ease-out" }
        );

        // Remove fixed height after animation so responsive layout works
        setTimeout(() => (image.style.height = "auto"), 400);
      });
    }
  }

  return (
    <div className="dark:text-white dark:bg-black bg-white text-black min-h-screen overflow-x-hidden">
      <div className="mx-8 sm:mx-14 max-w-screen">
      <div id='landing-page' className="landing-page-container h-[80vh] lg:h-screen flex flex-col">
        <nav id="main-nav" className="flex flex-wrap flex-row mt-[50px] mb-[50px] md:mb-0 items-center justify-between">
          <div id="nav-logo">
            <p ref={el => navElementsRef.current[0] = el} className="nav-element text-xl lg:text-3xl">[ lucas mcallister ]</p>
          </div>
          <div id="nav-links" className="flex gap-[48px] lg:gap-[64px] items-center">
            <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" ref={el => navElementsRef.current[1] = el} className='nav-element inline-block md:hidden transform scale-200 mr-2'><i className="fa-brands fa-linkedin"></i></a>
            <a href="#projects-section-text" ref={el => navElementsRef.current[2] = el} className='nav-element hidden md:inline-block text-lg lg:text-xl mt-[20px] md:mt-[6px] underline md:no-underline z-2'>PROJECTS</a>
            <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" ref={el => navElementsRef.current[3] = el} className='nav-element hidden md:inline-block text-lg lg:text-xl mt-[20px] md:mt-[6px] underline md:no-underline z-2'>LINKEDIN</a>
            <div 
              ref={darkModeButtonRef}
              onClick={toggleDarkMode}
              id='dark-mode-button' 
              className="will-change-transform cursor-pointer drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden md:inline-block w-[48px] lg:w-[56px] h-[48px] lg:h-[56px] bg-[#D9D9D9] rounded-full dark:border-white border mt-[6px] nav-element"
            ></div>
          </div>
        </nav>
        <section id='hero' className='flex flex-col flex-grow justify-center items-center mt-0 md:items-start md:mt-[10%] xl:mt-[4%] 2xl:mt-[8%] lg:ml-6 gap-y-0 lg:gap-y-[7%]'>
          <p ref={el => heroElementsRef.current[0] = el} className='hero-element text-justify w-full text-4xl/12 text-wrap mb-[15vh] md:text-5xl/18 lg:text-left lg:text-5xl/18 2xl:text-6xl/20 3xl:text-7xl/20 lg:w-[95%] xl:w-[80%]'>
            I'm Lucas, a Computer Science undergraduate at UF focused on User Experience and front-end programming.
          </p>
          <div ref={el => heroElementsRef.current[1] = el} className="hero-element arrow-div hidden mt-0 lg:-mt-15 2xl:mt-0 lg:inline-block sm:mb-[15%] justify-start">
            <a href='#projects-section-text'>
              <svg ref={homeArrowRef} id="home-arrow" xmlns="http://www.w3.org/2000/svg" width="49" height="154" viewBox="0 0 49 154" fill="none" className="stroke-black dark:stroke-white">
                <path d="M24.5 0V152.5M24.5 152.5L48 129M24.5 152.5L1 129" strokeWidth="2"/>
              </svg>
            </a>  
          </div>
        </section>
      </div>

      <section id="projects-section" className="pt-0 lg:pt-[7%] mb-[10%] flex flex-col justify-start items-center">
        <ul>
          <li id='projects-section-text' className="mb-20 scroll-mt-[30px]">
            <div className="projects-section-text flex w-full justify-start text-md mb-[2%]">// PROJECTS</div>
            {showImageOne && ( // conditional rendering, only renders if showImageOne = true;
            <div ref={imageOneRef} className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] bg-gray-500 overflow-hidden">
              <img src="/public/carulla_wireframe_cropped.jpg" alt="Carulla wireframe" className="object-cover w-full h-full" />
            </div>
            )}
            <div className="project-description w-full flex justify-between h-auto mt-6 items-center">
              <div ref={projectOneDescRef} className="container-text flex flex-col align-start">
                <p className='text-lg xl:text-2xl text-wrap'>Carulla - Case Study</p>
                <p className="text-sm xl:text-lg text-wrap">complete web/mobile design</p>
              </div>
              <button
                ref={el => expandButtonRefs.current[0] = el}
                onClick={() => toggleExpand(1)}
                id='expand-button-one'
                className="expand-button w-20 xl:w-30 h-8 xl:h-12 bg-[#007AFF] rounded-full text-white text-md xl:text-xl hover:bg-[#0060C0] transition-colors duration-200 ease-in-out"
              >
                {expandButtonOne}
              </button>
            </div>
          </li>
          <li>
            {showImageTwo && ( // conditional rendering
            <div id='project-two-section' ref={imageTwoRef} className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] bg-gray-500 overflow-hidden">
              <img src="/public/gatorgaming_cover.png" alt="Carulla wireframe" className="object-cover w-full h-full" />
            </div>
            )}
            <div className="project-description w-full flex justify-between h-auto mt-6 items-center">
              <div ref={projectTwoDescRef} className="container-text flex flex-col align-start">
                <p className='hidden md:inline text-lg xl:text-2xl text-wrap'>Gator Gaming - Design Team</p>
                <p className="md:hidden text-lg text-wrap">Gator Gaming</p>
                <p className="text-sm xl:text-lg text-wrap">web/brand redesign</p>
              </div>
              <button
                ref={el => expandButtonRefs.current[1] = el}
                onClick={() => toggleExpand(2)}
                id='expand-button-two'
                className="expand-button w-20 xl:w-30 h-8 xl:h-12 bg-[#007AFF] rounded-full text-white text-md xl:text-xl hover:bg-[#0060C0] transition-colors duration-200 ease-in-out"
              >
                {expandButtonTwo}
              </button>
            </div>
          </li>
        </ul>
      </section>
      <footer className="w-full flex flex-start">
        <a href="#landing-page" className="hidden sm:inline-block text-xs lg:text-md mb-4 underline">Back to top</a>
      </footer>
      </div>
      <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg text-sm font-mono z-50">
        <span className="sm:hidden">xs (&lt;640px)</span>
        <span className="hidden sm:inline md:hidden">sm (≥640px)</span>
        <span className="hidden md:inline lg:hidden">md (≥768px)</span>
        <span className="hidden lg:inline xl:hidden">lg (≥1024px)</span>
        <span className="hidden xl:inline 2xl:hidden">xl (≥1280px)</span>
        <span className="hidden 2xl:inline">2xl (≥1536px)</span>
      </div>
    </div>
  );
}

export default App;