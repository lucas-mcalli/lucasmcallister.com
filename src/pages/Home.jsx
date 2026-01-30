import { useState, useEffect, useRef } from 'react';
import { animate, hover, motion } from 'motion/react';
import '../input.css';

import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import GGProject from "../components/GGProject.jsx"
import CarullaProject from "../components/CarullaProject.jsx"

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
  const [showProjectOne, setShowProjectOne] = useState(false);
  const [showProjectTwo, setShowProjectTwo] = useState(false);

  const expandButtonRefs = useRef([]);
  const projectOneElementsRef = useRef([]);
  const projectTwoElementsRef = useRef([]);
  const projectOneContainerRef = useRef(null);
  const projectTwoContainerRef = useRef(null);

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
    if (projectNum === 1) {
      if (expandButtonRefs.current[0].textContent === 'Expand') {
        setShowProjectOne(true);
        expandButtonRefs.current[0].textContent = 'Close';
        
        // Scroll to the CONTEXT section after project renders
        setTimeout(() => {
          const contextSection = document.getElementById('CONTEXT-ONE');
          if (contextSection) {
            contextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        expandButtonRefs.current[0].textContent = 'Expand';
        
        // Scroll back to the projects section, then close the project
        const projectsSection = document.getElementById('projects-section-text');
        if (projectsSection) {
          const handleScrollEnd = () => {
            window.removeEventListener('scrollend', handleScrollEnd);
            setShowProjectOne(false);
          };
          
          window.addEventListener('scrollend', handleScrollEnd);
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    if (projectNum === 2) {
      if (expandButtonRefs.current[1].textContent === 'Expand') {
        setShowProjectTwo(true);
        expandButtonRefs.current[1].textContent = 'Close';
        
        // Scroll to the CONTEXT section after project renders
        setTimeout(() => {
          const contextSection = document.getElementById('CONTEXT');
          if (contextSection) {
            contextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        expandButtonRefs.current[1].textContent = 'Expand';
        
        // Scroll back to the cover image first, then close the project
        const p2ScrollAnchor = document.getElementById('project-two-scroll-anchor');
        if (p2ScrollAnchor) {
          const handleScrollEnd = () => {
            window.removeEventListener('scrollend', handleScrollEnd);
            setShowProjectTwo(false);
          };
          
          window.addEventListener('scrollend', handleScrollEnd);
          p2ScrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
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
          <li id='projects-section-text' className="scroll-mt-[30px] mb-15">
            <div className="projects-section-text flex w-full justify-start text-xs xl:text-base mb-[4%] md:mb-[2%]">// PROJECTS</div>
            <li id='project-one-container' className="relative">
              <div id='project-one-section' className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] overflow-hidden">
                <img src="/carulla_wireframe_cropped.webp" alt="Carulla wireframe" className="object-cover w-full h-full" />
              </div>
              <div className={`project-description w-full flex justify-between h-auto py-6 items-center ${showProjectOne ? 'sticky top-0 z-10 bg-white dark:bg-neutral-900 py-6' : ''}`}>
                <div className="container-text flex flex-col align-start">
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
              {showProjectOne && (
                <motion.div 
                  ref={projectOneContainerRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div id="project-1-border" className="mb-10 md:mb-12 lg:mb-18"></div>
                  <CarullaProject getGraphic={getGraphic} projectOneElementsRef={projectOneElementsRef} showProjectOne={showProjectOne} />
                </motion.div>
              )}
            </li>
          </li>
          <li id='project-two-container' className="relative">
            <div id="project-two-scroll-anchor" className="absolute -top-10 left-0"></div> 
            <div id='project-two-section' className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] overflow-hidden">
              <img src="/gatorgaming_cover.webp" alt="Gator Gaming Cover" className="object-cover w-full h-full" />
            </div>
            <div className={`project-description w-full flex justify-between h-auto py-6 items-center ${showProjectTwo ? 'sticky top-0 z-10 bg-white dark:bg-neutral-900 py-6' : ''}`}>
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
            {showProjectTwo && (
              <motion.div 
                ref={projectTwoContainerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div id="project-2-border" className="mb-10 md:mb-12 lg:mb-18"></div>
                <GGProject getGraphic={getGraphic} projectTwoElementsRef={projectTwoElementsRef} showProjectTwo={showProjectTwo} />
              </motion.div>
            )}
          </li>
        </ul>
      </section>
      <footer className="w-full flex flex-start">
        <a href="#landing-page" className="hidden sm:inline-block text-xs lg:text-md mb-4 underline">Back to top</a>
      </footer>
      </div>
    </div>
  );
}

