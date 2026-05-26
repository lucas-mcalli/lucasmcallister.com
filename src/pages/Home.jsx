import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import '../input.css';
import { animate, stagger } from "motion";
import { motion } from "motion/react"
import Navbar from "../components/Navbar.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import Footer from "../components/Footer.jsx"
import Waves from '../components/Waves.jsx';
import { projectsData } from '../data/projectsData';
import { getGraphic } from '../helpers/getGraphic';

export default function Home({ isDark, toggleDarkMode, isFirstLoad, isFirstHeroLoad }) {

  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const getGraphicFn = getGraphic(isDark);
  const heroElementsRef = useRef([]);
  const isFirst = isFirstHeroLoad.current;

  // Hero elements animation
  useLayoutEffect(() => {
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
    <div className="fixed inset-0 z-0">
      <Waves
        lineColor={isDark ? "#1f1f1f" : "#F5F5F5"}
        backgroundColor={isDark ? "rgba(0,0,0,0)" : "rgba(255, 255, 255, 0)"}
        waveSpeedX={0}
        waveSpeedY={0.04}
        waveAmpX={15}
        waveAmpY={25}
        friction={0.75}
        tension={0.001}
        maxCursorMove={20}
        xGap={12}
        yGap={36}
      />
    </div>
    <div className="px-6 lg:px-15 max-w-[1750px] mx-auto relative z-10">
      <div id='landing-page' className="landing-page-container h-full lg:h-[95vh] 2xl:h-[80vh] flex flex-col">
        <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad}/>
        {/* Grid */}
        <div
          className="
            flex flex-col
            lg:grid lg:grid-cols-2
            gap-10 lg:gap-[5%]
            h-full
            max-h-none lg:max-h-[1200px]
            justify-items-center
          "
        >
          {/* Left col */}
          <div
            ref={el => heroElementsRef.current[0] = el}
            className="
              flex flex-col justify-end gap-6
              order-2 lg:order-1
              w-full
            "
          >
            <img
              src="/laptop.webp"
              className="
                w-full
                h-72
                lg:h-auto
                max-h-[60%]
                min-h-0
                object-cover
              "
            />

            <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-otto tracking-tight">
              Lucas McAllister
            </h1>
          </div>

          {/* Right col */}
          <div
            ref={el => heroElementsRef.current[1] = el}
            className="
              flex flex-col justify-start
              w-full lg:w-[80%] 2xl:w-[75%]
              pt-2 lg:pt-15
              order-1 lg:order-2
            "
          >
            <h2 className="text-3xl 2xl:text-4xl font-bold tracking-[-0.05em] mb-2 2xl:mb-4 pt-12 lg:pt-0">
              Welcome!
            </h2>

            <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-4 2xl:mb-8 text-left w-full sm:w-[80%] md:w-[65%] lg:w-full">
              I am a product designer and Computer Science undergraduate at the
              University of Florida. Inspired by industrial design, architecture,
              and computer hardware design, I am passionate about how design serves
              as a profound tool for expression.
            </p>

            <h3 className="font-semibold mb-4 hidden lg:block">
              My experience:
            </h3>

            <ul className="hidden lg:flex flex-col gap-4">
              <li className="flex items-center gap-3 ml-2 lg:ml-6">
                <a
                  href="https://theagency.jou.ufl.edu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    src="/the_agency.jpg"
                    className="w-9 h-9 lg:w-8 lg:h-8 rounded object-cover shrink-0"
                  />
                </a>

                <span className="text-gray-500 text-sm">
                  Visual/Graphic Designer
                </span>

                <span className="text-gray-400 text-xs ml-auto">
                  Mar 2026 -
                </span>
              </li>

              <li className="flex items-center gap-3 ml-2 lg:ml-6">
                <a
                  href="https://gatoruserdesign.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    src="/gator_user_design_logo.jpeg"
                    className="w-9 h-9 lg:w-8 lg:h-8 rounded object-cover shrink-0"
                  />
                </a>

                <span className="text-gray-500 text-sm">
                  First Year Design Team Lead
                </span>

                <span className="text-gray-400 text-xs ml-auto">
                  Jan 2026 -
                </span>
              </li>

              <li className="flex items-center gap-3 ml-2 lg:ml-6">
                <a
                  href="https://ufsec.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    src="/ufsec.png"
                    className="w-9 h-9 lg:w-8 lg:h-8 rounded shrink-0"
                  />
                </a>

                <span className="text-gray-500 text-sm">
                  Web UX/UI Designer
                </span>

                <span className="text-gray-400 text-xs ml-auto">
                  Aug 2025 – Nov 2025
                </span>
              </li>

              <li className="flex items-center gap-3 ml-2 lg:ml-6">
                <a
                  href="https://gatorgaminguf.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    src="/gg_icon.jpg"
                    className="w-9 h-9 lg:w-8 lg:h-8 rounded shrink-0"
                  />
                </a>

                <span className="text-gray-500 text-sm">
                  Web UX/UI Designer
                </span>

                <span className="text-gray-400 text-xs ml-auto">
                  Jan 2025 – Apr 2025
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section id="projects-section" className="pt-24 mb-[10%] flex flex-col justify-start items-center">
        <ul>
          <li id='projects-section-text' className="scroll-mt-[30px] mb-15">
            <div ref={el => heroElementsRef.current[2]= el} className="projects-section-text flex w-full justify-start text-xs xl:text-base font-departure mb-[4%] lg:mb-[2%] z-20 relative">// PROJECTS</div>
            <div ref={el => heroElementsRef.current[3] = el}>
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

