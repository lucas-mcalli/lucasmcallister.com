import { useState, useEffect, useRef } from 'react';
import { animate, hover } from 'motion';
import '../input.css';

import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import GGProject from "../components/GGProject.jsx"

export default function Home({ isDark, toggleDarkMode, isFirstLoad, isFirstHeroLoad }) {

  const graphics = {
    six: {
      light: "/6_graphic.webp",
      dark: "/6_graphic_dark.webp"
    },
    timeline: {
      light: "/timeline.png",
      dark: "/timeline_dark.png"
    },
    key_users: {
      light: "/key_users.png",
      dark: "/key_users_dark.png"
    },
    notes: {
      light: "/notes_graphic.png",
      dark: "/notes_graphic_dark.png"
    },
    comp_analysis: {
      light: "/comp_analysis.png",
      dark: "/comp_analysis_dark.png"
    },
    requirements: {
      light: "/requirements.png",
      dark: "/requirements_dark.png"
    },
    sitemap: {
      light: "/sitemap.webp",
      dark: "/sitemap_dark.webp"
    },
    user_persona_analysis: {
      light: "/user_persona_analysis.webp",
      dark: "/user_persona_analysis_dark.webp"
    },
    gaps: {
      light: "/gaps.png",
      dark: "/gaps_dark.png"
    },
    survey_insights: {
      light: "/survey_insights.webp",
      dark: "/survey_insights_dark.webp"
    },
    hifis: {
      light: "/hifis.webp",
      dark: "/hifis_dark.webp"
    },
    reflections: {
      light: "/reflections.webp",
      dark: "/reflections_dark.webp"
    },
    group_reflections: {
      light: "/group_reflections.webp",
      dark: "/group_reflections_dark.webp"
    }
  }
  
  const [expandButtonOne, setExpandButtonOne] = useState('Soon');
  const [expandButtonTwo, setExpandButtonTwo] = useState('Expand');
  const [showImageOne, setShowImageOne] = useState(true);
  const [showImageTwo, setShowImageTwo] = useState(true);
  const [showProjectOne, setShowProjectOne] = useState(false);
  const [showProjectTwo, setShowProjectTwo] = useState(false);

  const expandButtonRefs = useRef([]);
  const imageOneRef = useRef(null);
  const projectOneDescRef = useRef(null);
  const imageTwoRef = useRef(null);
  const projectTwoDescRef = useRef(null);
  const projectTwoElementsRef = useRef([]);
  const projectOneBorderRef = useRef(null);
  const projectTwoBorderRef = useRef(null);

  // Get appropriate graphic
  const getGraphic = (key) => {
    if (isDark){
      return graphics[key].dark;
    } else {
      return graphics[key].light;
    }
  }

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
  });

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
      projectId = "sticky-p2-desc";
      setShowProject = setShowProjectTwo;
    }

    if (expandButton === 'Expand'){
      setTimeout(()=>{
        if (imageRef.current){ // ensures imageRef exists
        animate(imageRef.current,
          {opacity: 0, height: 0},
          {duration: 0.4}
        )
      }
      }, 100)
      setExpandButton('Close');
      setTimeout(()=>{
        setShowImage(false);
        setShowProject(true);
      }, 300)
      setTimeout(()=>{
        const projectSection = document.getElementById(projectId);
        if (projectSection){
          projectSection.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }, 320)
    } else {   
      // Wait for scroll to complete, then show and animate the image
      setShowImage(true);
      setShowProject(false);
      setExpandButton("Expand");
      
      requestAnimationFrame(() => {
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

        // Remove fixed height after animation
        setTimeout(() => {
          image.style.height = "auto";
        }, 400);
        
        // Scroll to anchor
        setTimeout(() =>{
          const projectSection = document.getElementById(projectNum === 1 ? 'projects-section-text' : 'project-two-scroll-anchor');
          if (projectSection){
          projectSection.scrollIntoView({behavior: 'smooth', block: 'start'});
          }
        }, 400)
      });
    }
  }

  

  return (
    <div className="dark:text-gray-100 dark:bg-neutral-900 bg-white text-black">
      <div className="mx-6 md:mx-15 2xl:mx-auto max-w-[1600px]">
        <div id='landing-page' className="landing-page-container h-[80vh] lg:h-screen flex flex-col">
          <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad}/>
          <Hero isFirstHeroLoad={isFirstHeroLoad}/>
        </div>

      <section id="projects-section" className="pt-0 lg:pt-[7%] mb-[10%] flex flex-col justify-start items-center">
        <ul>
          <li id='projects-section-text' className="mb-20 scroll-mt-[30px]">
            <div className="projects-section-text flex w-full justify-start text-xs xl:text-base mb-[4%] md:mb-[2%]">// PROJECTS</div>
            {showImageOne && ( // conditional rendering, only renders if showImageOne = true;
            <div ref={imageOneRef} className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] bg-gray-500 overflow-hidden">
              <img src="/carulla_wireframe_cropped.webp" alt="Carulla wireframe" className="object-cover w-full h-full" />
            </div>
            )}
            <div className="project-description w-full flex justify-between h-auto mt-6 items-center">
              <div ref={projectOneDescRef} className="container-text flex flex-col align-start">
                <p className='text-lg xl:text-2xl text-wrap '>Carulla - Case Study</p>
                <p className="text-sm xl:text-lg text-wrap text-[#777777]">complete web/mobile design</p>
              </div>
              <button
                ref={el => expandButtonRefs.current[0] = el}
                // onClick={() => toggleExpand(1)}
                id='expand-button-one'
                className="expand-button w-20 xl:w-30 h-8 xl:h-12 bg-[#888888] rounded-full text-white text-md xl:text-xl hover:bg-[#888888] transition-colors duration-200 ease-in-out"
              >
                {expandButtonOne}
              </button>
            </div>
          </li>
          <li id='project-two-container' className="relative">
            <div id="project-two-scroll-anchor" className="absolute -top-10 left-0"></div> 
            {showImageTwo && ( // conditional rendering
            <div id='project-two-section' ref={imageTwoRef} className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] bg-gray-500 overflow-hidden scroll-mt-[30px]">
              <img src="/gatorgaming_cover.webp" alt="Gator Gaming Cover" className="object-cover w-full h-full" />
            </div>
            )}
            {/* Description when project is CLOSED */}
            {!showProjectTwo && (
              <div className="project-description w-full flex justify-between h-auto mt-6 items-center">
                <div ref={projectTwoDescRef} className="container-text flex flex-col align-start">
                  <p className='hidden md:inline text-lg xl:text-2xl text-wrap'>Gator Gaming - Design Team</p>
                  <p className="md:hidden text-lg text-wrap">Gator Gaming</p>
                  <p className="text-sm xl:text-lg text-wrap text-[#777777]">website redesign</p>
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
            )}
            {/* Load when project is OPEN (sticky version) */}
            {showProjectTwo && (
              <div>
                <div id="sticky-p2-desc" className="project-description sticky top-0 z-10 bg-white dark:bg-neutral-900 w-full flex justify-between py-6 items-center">
                  <div className="container-text flex flex-col align-start">
                    <p className='hidden md:inline text-lg xl:text-2xl text-wrap'>Gator Gaming - Design Team</p>
                    <p className="md:hidden text-lg text-wrap">Gator Gaming</p>
                    <p className="text-sm xl:text-lg text-wrap text-[#777777]">website redesign</p>
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
                <div id="project-2-border" ref={projectTwoBorderRef} className="border-t dark:border-white border-black w-full flex h-1 mb-10 md:mb-12 lg:mb-18"></div>
                <GGProject getGraphic={getGraphic} projectTwoElementsRef={projectTwoElementsRef} showProjectTwo={showProjectTwo} />
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

