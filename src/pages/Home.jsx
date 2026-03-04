import { useState, useEffect } from 'react';
import '../input.css';

import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import ASCIIRain from '../components/ASCIIText.jsx';
import { projectsData } from '../data/projectsData';
import { getGraphic } from '../helpers/getGraphic';

export default function Home({ isDark, toggleDarkMode, isFirstLoad, isFirstHeroLoad }) {

  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const getGraphicFn = getGraphic(isDark);

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
        fontSize={24}
        isDark={isDark}
        updateInterval={1}      // How often chars change (ms)
        isVisible={!expandedProjectId}
      />
      <div className="mx-6 md:mx-15 2xl:mx-auto max-w-[1600px]">
        <div id='landing-page' className="landing-page-container h-[80vh] lg:h-screen flex flex-col">
          <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad}/>
          <Hero isFirstHeroLoad={isFirstHeroLoad}/>
        </div>

      <section id="projects-section" className="pt-0 lg:pt-[7%] mb-[10%] flex flex-col justify-start items-center">
        <ul>
          <li id='projects-section-text' className="scroll-mt-[30px] mb-15">
            <div className="projects-section-text flex w-full justify-start text-xs xl:text-base mb-[4%] md:mb-[2%] z-20 relative">// PROJECTS</div>
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

