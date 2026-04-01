import { useState, useEffect, useRef } from 'react';
import '../input.css';
import { animate, stagger } from "motion";

import Navbar from "../components/Navbar.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import Footer from "../components/Footer.jsx"
import ASCIIRain from '../components/ASCIIText.jsx';
import { projectsData } from '../data/projectsData';
import { getGraphic } from '../helpers/getGraphic';

export default function Home({ isDark, toggleDarkMode, isFirstLoad, isFirstHeroLoad }) {

  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const getGraphicFn = getGraphic(isDark);
  const heroElementsRef = useRef([]);
  const isFirst = isFirstHeroLoad.current;

  // Hero elements animation
  useEffect(() => {
    const elements = heroElementsRef.current.filter(el => el !== null);
    if (elements.length === 0) return;
    
    const elementDelay = isFirst ? 1 : 0.1;
    
    animate(
      elements,
      { y: [-20, 0], opacity: [0, 100], filter: ["blur(6px)", "blur(0px)"] },
      { delay: stagger(0.3, { startDelay: elementDelay }), duration: 0.6 }
    );
    
    isFirstHeroLoad.current = false;
  }, []);

  // Auto-close project if user scrolls back to top
  useEffect(() => {
    if (!expandedProjectId) return;

    const handleScroll = () => {
      // Use responsive threshold: smaller on mobile, larger on desktop
      const scrollThreshold = window.innerWidth < 768 ? 200 : 400;
      
      if (window.scrollY < scrollThreshold) {
        // User scrolled back to near the top, close the project
        setExpandedProjectId(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expandedProjectId]);

  

  return (
    <div className="dark:text-gray-100 dark:bg-neutral-900 bg-white text-black">
      <ASCIIRain 
        fontSize={16}
        isDark={isDark}
        isVisible={!expandedProjectId}
        affectedCharColor={isDark ? "#332501ff" : "#f6de8fff"}
        mouseEffectRadius={1}
      />
      <div className="mx-6 md:mx-15 2xl:mx-auto max-w-[1600px]">
        <div id='landing-page' className="landing-page-container h-[80vh] lg:h-[70vh] flex flex-col">
          <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad}/>
          <section id='hero' className='flex flex-col flex-grow justify-center items-center mt-0 md:items-start md:mt-16'>
            <p ref={el => heroElementsRef.current[0] = el} className='hero-element font-grotesk text-justify w-full text-[42px]/12 text-wrap mb-[16vh] md:text-5xl/16 lg:text-6xl/17 lg:text-left 2xl:text-7xl/20 3xl:text-8xl/20 lg:w-[95%] xl:w-[75%] 2xl:w-[70%] relative z-10'>
              I'm Lucas, a Computer Science undergraduate at UF focused on User Experience and front-end programming.
            </p>
          </section>
        </div>

      <section id="projects-section" className="pt-0 lg:pt-[7%] mb-[10%] flex flex-col justify-start items-center">
        <ul>
          <li id='projects-section-text' className="scroll-mt-[30px] mb-15">
            <div ref={el => heroElementsRef.current[1] = el} className="projects-section-text flex w-full justify-start text-xs xl:text-base mb-[4%] md:mb-[2%] z-20 relative">// PROJECTS</div>
            <div ref={el => heroElementsRef.current[2] = el}>
              {projectsData.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                getGraphic={getGraphicFn}
                isExpanded={expandedProjectId === project.id}
                onToggle={(projectId, isOpening) => {
                  if (isOpening) {
                    setExpandedProjectId(projectId);
                  } else {
                    setExpandedProjectId(null);
                  }
                }}
              />
            ))}
            </div>
          </li>
        </ul>
      </section>
      <Footer />
      </div>
    </div>
  );
}

