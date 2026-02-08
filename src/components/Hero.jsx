import { useEffect, useRef } from "react";
import { animate, stagger } from "motion";

const Hero = ({ isFirstHeroLoad }) => {

  const homeArrowRef = useRef(null);
  const heroElementsRef = useRef([]);
  const isFirst = isFirstHeroLoad.current;

  // Home arrow animation
  useEffect(() => {
    if (!homeArrowRef.current) return;
    
    const arrowDelay = isFirst ? 0.5 : 0.2;
    
    animate(
      homeArrowRef.current,
      { y: [0, 30] },
      {
        delay: arrowDelay,
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
    
    const elementDelay = isFirst ? 0.7 : 0.1;
    
    animate(
      elements,
      { y: [-20, 0], opacity: [0, 100], filter: ["blur(6px)", "blur(0px)"] },
      { delay: stagger(0.3, { startDelay: elementDelay }), duration: 0.6 }
    );
    
    isFirstHeroLoad.current = false;
    }, []);
    

  return (
    <section id='hero' className='flex flex-col flex-grow justify-center items-center mt-0 md:items-start md:mt-16'>
        <p ref={el => heroElementsRef.current[0] = el} className='hero-element font-grotesk text-justify w-full text-[42px]/12 text-wrap mb-[16vh] md:text-5xl/16 lg:text-6xl/17 lg:text-left 2xl:text-7xl/20 3xl:text-8xl/20 lg:w-[95%] xl:w-[75%] 2xl:w-[70%] relative z-10'>
          I'm Lucas, a Computer Science undergraduate at UF focused on User Experience and front-end programming.
        </p>
        <div ref={el => heroElementsRef.current[1] = el} className="hero-element arrow-div hidden mt-0 lg:-mt-15 2xl:mt-0 lg:inline-block sm:mb-[15%] justify-start relative z-10">
          <a href='#projects-section-text'>
            <svg ref={homeArrowRef} id="home-arrow" xmlns="http://www.w3.org/2000/svg" width="49" height="154" viewBox="0 0 49 154" fill="none" className="stroke-black dark:stroke-white">
              <path d="M24.5 0V152.5M24.5 152.5L48 129M24.5 152.5L1 129" strokeWidth="2"/>
            </svg>
          </a>  
        </div>
    </section>
  )
}

export default Hero;