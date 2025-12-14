import { useState, useEffect, useRef } from 'react';
import { animate, press, stagger, hover } from 'motion';
import './input.css';

import SixGraphic from "/public/6_graphic.svg";
import SixGraphicDark from "/public/6_graphic_dark.svg";
import TimelineGraphic from "/public/timeline.png";
import TimelineGraphicDark from "/public/timeline_dark.png";
import KeyUsersGraphic from "/public/key_users.png";
import KeyUsersGraphicDark from "/public/key_users_dark.png";
import NotesGraphic from "/public/notes_graphic.png";
import NotesGraphicDark from "/public/notes_graphic_dark.png";
import CompAnalysis from "/public/comp_analysis.png";
import CompAnalysisDark from "/public/comp_analysis_dark.png";
import Requirements from "/public/requirements.png";
import RequirementsDark from "/public/requirements_dark.png";


function App() {

  const graphics = {
    six: {
      light: SixGraphic,
      dark: SixGraphicDark
    },
    timeline: {
      light: TimelineGraphic,
      dark: TimelineGraphicDark
    },
    key_users: {
      light: KeyUsersGraphic,
      dark: KeyUsersGraphicDark
    },
    notes: {
      light: NotesGraphic,
      dark: NotesGraphicDark
    },
    comp_analysis: {
      light: CompAnalysis,
      dark: CompAnalysisDark
    },
    requirements: {
      light: Requirements,
      dark: RequirementsDark
    }
  }
  
  const [isDark, setIsDark] = useState(false);
  const [expandButtonOne, setExpandButtonOne] = useState('Expand');
  const [expandButtonTwo, setExpandButtonTwo] = useState('Expand');
  const [showImageOne, setShowImageOne] = useState(true);
  const [showImageTwo, setShowImageTwo] = useState(true);
  const [showProjectOne, setShowProjectOne] = useState(false);
  const [showProjectTwo, setShowProjectTwo] = useState(false);

  const darkModeButtonRef = useRef(null);
  const homeArrowRef = useRef(null);
  const heroElementsRef = useRef([]);
  const navElementsRef = useRef([]);
  const expandButtonRefs = useRef([]);
  const imageOneRef = useRef(null);
  const projectOneDescRef = useRef(null);
  const imageTwoRef = useRef(null);
  const projectTwoDescRef = useRef(null);
  const projectTwoElementsRef = useRef([]);

  // Get appropriate graphic
  const getGraphic = (key) => {
    if (isDark){
      return graphics[key].dark;
    } else {
      return graphics[key].light;
    }
  }

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

  // Project two element animation
  useEffect(() => {
    const elements = projectTwoElementsRef.current.filter(el => el !== null);
    if (elements.length === 0) return;

    animate(
      elements,
      {y: [15, 0], opacity: [0,100], filter:["blur(6px)", "blur(0px)"]},
      {delay: stagger(0.15, { startDelay: 0.1 }), duration: 0.3, easing: "ease-out"}
    );
  }, [showProjectTwo])

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
    let setShowProject;

    if (projectNum === 1) {
      imageRef = imageOneRef;
      projectRef = projectOneDescRef;
      expandButton = expandButtonOne;
      setExpandButton = setExpandButtonOne;
      showImage = showImageOne;
      setShowImage = setShowImageOne;
      projectId = 'projects-section-text';
      setShowProject = setShowProjectOne;
    }

    if (projectNum === 2) {
      imageRef = imageTwoRef;
      projectRef = projectTwoDescRef;
      expandButton = expandButtonTwo;
      setExpandButton = setExpandButtonTwo;
      showImage = showImageTwo;
      setShowImage = setShowImageTwo;
      projectId = 'project-two-section';
      setShowProject = setShowProjectTwo;
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
        setShowProject(true);
      }, 500)
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

        // Remove fixed height after animation so responsive layout works, show project two
        setTimeout(() => (
          image.style.height = "auto",
          setShowProject(false)
        ), 400);
      });
    }
  }

  return (
    <div className="dark:text-gray-100 dark:bg-neutral-900 bg-white text-black min-h-screen overflow-x-hidden">
      <div className="mx-6 md:mx-15 max-w-screen">
      <div id='landing-page' className="landing-page-container h-[80vh] lg:h-screen flex flex-col">
        <nav id="main-nav" className="flex flex-wrap flex-row mt-[50px] mb-[50px] md:mb-0 items-center justify-between">
          <div id="nav-logo" className='flex gap-6 items-center'>
            <img ref={el => navElementsRef.current[0] = el} src='/public/THUMBNAIL.png' className='w-8 h-8 md:w-9 md:h-9'/>
            <p ref={el => navElementsRef.current[1] = el} className="nav-element text-xl lg:text-3xl">lucas mcallister</p>
          </div>
          <div id="nav-links" className="flex gap-[48px] lg:gap-[64px] items-center">
            <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" ref={el => navElementsRef.current[2] = el} className='nav-element inline-block md:hidden transform scale-200 mr-2'><i className="fa-brands fa-linkedin"></i></a>
            <a href="#projects-section-text" ref={el => navElementsRef.current[3] = el} className='nav-element hidden md:inline-block text-lg lg:text-xl mt-[20px] md:mt-[6px] underline md:no-underline z-2'>PROJECTS</a>
            <a href="https://www.linkedin.com/in/lucas-mcallister-29a794289/" ref={el => navElementsRef.current[4] = el} className='nav-element hidden md:inline-block text-lg lg:text-xl mt-[20px] md:mt-[6px] underline md:no-underline z-2'>LINKEDIN</a>
            <div 
              ref={darkModeButtonRef}
              onClick={toggleDarkMode}
              id='dark-mode-button' 
              className="will-change-transform cursor-pointer drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden md:inline-block w-[48px] lg:w-[56px] h-[48px] lg:h-[56px] bg-[#D9D9D9] rounded-full dark:border-white border mt-[6px] nav-element"
            ></div>
          </div>
        </nav>
        <section id='hero' className='flex flex-col flex-grow justify-center items-center mt-0 md:items-start md:mt-[10%] xl:mt-[4%] 2xl:mt-[8%] gap-y-0 lg:gap-y-[7%]'>
          <p ref={el => heroElementsRef.current[0] = el} className='hero-element text-justify w-full text-4xl/12 text-wrap mb-[15vh] md:text-5xl/18 lg:text-left lg:text-5xl/18 2xl:text-6xl/20 3xl:text-7xl/20 lg:w-[95%] xl:w-[75%]'>
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
            <div className="projects-section-text flex w-full justify-start text-sm xl:text-base mb-[2%]">// PROJECTS</div>
            {showImageOne && ( // conditional rendering, only renders if showImageOne = true;
            <div ref={imageOneRef} className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] bg-gray-500 overflow-hidden">
              <img src="/public/carulla_wireframe_cropped.webp" alt="Carulla wireframe" className="object-cover w-full h-full" />
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
            <div id='project-two-section' ref={imageTwoRef} className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] bg-gray-500 overflow-hidden scroll-mt-[30px]">
              <img src="/public/gatorgaming_cover.webp" alt="Carulla wireframe" className="object-cover w-full h-full" />
            </div>
            )}
            <div className="project-description w-full flex justify-between h-auto mt-6 items-center">
              <div ref={projectTwoDescRef} className="container-text flex flex-col align-start ">
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
            {showProjectTwo && (
              <div className="border-t dark:border-white border-black w-full flex h-auto mt-6">
                <div className="project-two flex gap-9 flex-col">
                  <section id="CONTEXT" ref={el => projectTwoElementsRef.current[0] = el}>
                    <p className=" mt-10 md:mt-12 lg:mt-18 text-sm">CONTEXT</p>
                    <div className="flex flex-col gap-4 md:gap-6">
                      <div className="flex items-center w-full gap-8 xl:gap-12 xl:w-[90%]">
                        <p className=" font-serif mt-2 sm:text-2xl lg:text-3xl xl:text-4xl xl:w-[75%]">This project was completed as part of a Gator User Design initiative to give members experience in research-driven design serving other on-campus organizations.</p>
                        <img className="w-1/10 h-1/10 max-w-[100px] max-h-[100px] min-w-[80px] max-w-[80px] rotate-[17.45deg] rounded-full shadow-[0px_0px_21.399999618530273px_12px_rgba(0,0,0,0.25)] dark:shadow-[0px_0px_21.4px_12px_rgba(255,255,255,0.25)] outline outline-1 outline-black" src="/public/gator_user_design_logo.jpeg" />
                      </div>
                      <div className='flex items-start xl:items-center w-full gap-8 xl:gap-12 xl:w-[80%]'>
                        <div className="flex flex-col ml-3 xl:ml-5 gap-2 xl:gap-6 items-center max-w-[100px] w-[20%]">
                          <img src={getGraphic("six")} className="h-auto w-full"/>
                          <p className=" font-sans text-sm lg:text-base xl:text-lg whitespace-nowrap">Team Members</p>
                        </div>
                        <div className='flex flex-col gap-3 items-center'>
                          <p className=" font-sans text-xs md:text-base lg:text-lg">Gator Gaming is a student org at UF founded in 2010 focused on building community through video games. They host tournaments, social events, and GatorLAN, a signature in-person gaming event for the greater North/Central Florida community. We were tasked with redesigning their website, which should act as a recruitment tool as well as provide continuous info for existing members.</p>
                          <img src={getGraphic("timeline")} className="hidden sm:block"/>
                        </div>
                      </div>
                      <img src={getGraphic("timeline")} className="sm:hidden -mt-2"/>
                    </div>
                  </section>
                  <section id='PROBLEM' ref={el => projectTwoElementsRef.current[1] = el}>
                    <div className="flex flex-col gap-4 md:gap-6">
                      <div>
                        <p className=" mt-10 lg:mt-18 text-sm">PROBLEM</p>
                        <p className=" font-serif mt-2 sm:text-2xl lg:text-3xl xl:text-4xl xl:w-[70%]">How might we communicate value to prospective members while serving as a central hub for existing ones? How can we memorably distinguish ourselves from others?</p>
                      </div>
                      <img src="/public/problem_image.jpg" className="xl:w-[80%] h-auto"/>
                      <p className=" font-sans text-xs xl:w-[80%] md:text-base lg:text-lg">The University of Florida is home to over 1,000 student organizations, each with their own story, mission, and community.  Yet despite this abundance, students struggle to find clubs that reflect their interests due to outdated online information, a lack of clear digital presence, and poor branding. Understanding that this was the difference between a club being discovered or overlooked was fundamental to our process.</p>
                    </div>
                  </section>
                  <section id="RESEARCH" ref={el => projectTwoElementsRef.current[2] = el}>
                    <div className="flex flex-col gap-4 md:gap-6">
                      <div className="flex flex-col gap-2">
                        <p className=" mt-10 lg:mt-18 text-sm">RESEARCH</p>
                        <p className=" font-serif sm:text-2xl lg:text-3xl xl:text-4xl xl:w-[70%]">Understanding what our product would be used for, who it will serve, and the opportunities it may bring for the club.</p>
                      </div>
                      <div className="flex flex-col gap-8">
                        <p className=" font-sans text-xs xl:w-[80%] md:text-base lg:text-lg">After interviewing club executives and understanding what their priorities and expectations are for a website redesign, each group member created a user persona. Together, we identified 4 key user groups that our redesign needed to support.</p>
                        <img src={getGraphic("key_users")} className="xl:w-[80%] h-auto"/>
                        <p className=" font-serif mt-2 sm:text-2xl lg:text-3xl xl:text-4xl xl:w-[70%]">Next, we defined what constitutes a successful design from the perspective of our key user groups.</p>
                        <p className=" font-sans text-xs xl:w-[80%] md:text-base lg:text-lg">First, we quickly wrote down ways the current website fails to deliver on the goals of our key user groups. </p>
                        <img src={getGraphic("notes")} className="xl:w-[79%] h-auto"/>
                        <p className=" font-sans text-xs xl:w-[80%] md:text-base lg:text-lg">Next, we observed similar clubs using the issues found as criteria, ensuring we focused on actual user pain points and was relevant to discovering how to meet the goals of target users.</p>
                        <img src={getGraphic("comp_analysis")} className="xl:w-[79%] h-auto"/>
                        <p className=" font-sans text-xs xl:w-[80%] md:text-base lg:text-lg">We then grouped our findings into three key requirements, each informing an area of the redesign.</p>
                        <img src={getGraphic("requirements")} className="xl:w-[70%] h-auto"/>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
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